import { useState } from 'react';
import { itemNames } from '../../../data/itemNames';
import { ITEMS } from '../../../data/items';
import { recipes, upgradeCost, MAX_UPGRADE_LEVEL } from '../../../data/recipes';
import { buildItemEffect, EFFECT, getEffectPairs, MAX_EFFECTS_PER_ITEM } from '../../../data/effectRegistry';
import { describeEffect } from '../../../data/effectNames';
import { useI18n } from '../../../hooks/useI18n';
import { useGameStore } from '../../../store/useGameStore';
import { refOf, usePlayerStore } from '../../../store/usePlayerStore';
import type { Item } from '../../../types/item.types';
import { resolveItemRef, serializeItem } from '../../../utils/itemSerializer';
import { rollElementForWeapon } from '../../../data/weaponElements';
import { Button } from '../../ui/Button';

const itemNameOf = (id: string, lang: 'pt-BR' | 'en-US' | 'es-ES' | 'ja-JP') => {
  const item = (ITEMS as Record<string, Item>)[id];

  if (!item) return id;

  return itemNames[item.id]?.[lang]?.name ?? item.id;
};

/**
 * Painel de crafting + upgrade (sistema ItemEffects).
 * Crafting: materiais + ouro → item do catálogo.
 * Upgrade: +5% nos stats flat (1–11) por nível, gravado como UPGRADE_LEVEL (99).
 */
export const CraftingPanel = () => {
  const { t, lang } = useI18n();
  const player = usePlayerStore((state) => state.data);
  const addItem = usePlayerStore((state) => state.addItem);
  const removeItem = usePlayerStore((state) => state.removeItem);
  const spendGold = usePlayerStore((state) => state.spendGold);
  const addNotification = useGameStore((state) => state.addNotification);
  const [selectedRef, setSelectedRef] = useState<string | null>(null);
  const [enchantTarget, setEnchantTarget] = useState<string | null>(null);
  const [enchantStone, setEnchantStone] = useState<string | null>(null);

  const inventory = player?.inventory ?? [];
  const countOf = (itemId: string) =>
    inventory.filter((entry) => {
      const item = resolveItemRef(refOf(entry));
      return item?.id === itemId;
    }).reduce((total, entry) => total + entry.qty, 0);

  const canCraft = (recipeId: string) => {
    const recipe = recipes.find((entry) => entry.id === recipeId);

    if (!recipe || !player) return false;
    if ((recipe.requireLevel ?? 1) > player.level) return false;
    if (player.gold < recipe.gold) return false;

    return recipe.inputs.every((input) => countOf(input.itemId) >= input.qty);
  };

  const craft = (recipeId: string) => {
    const recipe = recipes.find((entry) => entry.id === recipeId);

    if (!recipe || !player || !canCraft(recipeId)) {
      addNotification(t('crafting.cannot'), 'warning');
      return;
    }

    for (const input of recipe.inputs) {
      let remaining = input.qty;

      for (const entry of inventory) {
        if (remaining <= 0) break;

        const item = resolveItemRef(refOf(entry));

        if (item?.id === input.itemId && entry.qty > 0) {
          const take = Math.min(remaining, entry.qty);
          removeItem(refOf(entry), take);
          remaining -= take;
        }
      }
    }

    // Armas craftadas nascem com elemento rolado (toda arma × todo elemento;
    // avançados só épico+) — o par vira effect 12–17 na itemStr.
    const outputItem = (ITEMS as Record<string, Item>)[recipe.outputId];
    let outRef: string = recipe.outputId;
    if (outputItem && (outputItem.slot === 'weapon_main' || outputItem.slot === 'weapon_off')) {
      const roll = rollElementForWeapon(outputItem.rarity);
      const pairs = [...getEffectPairs(outputItem.effects), { effectId: roll.effectId, value: roll.power }];
      outRef = serializeItem(outputItem, buildItemEffect(pairs));
    }

    // capacidade ANTES de consumir (fix: antes gastava materiais c/ bolsa cheia)
    if (usePlayerStore.getState().isInvFull()) {
      addNotification(t('crafting.invFull'), 'warning');
      return;
    }

    spendGold(recipe.gold);

    if (!addItem(outRef, 1)) {
      addNotification(t('crafting.invFull'), 'warning');
      return;
    }

    usePlayerStore.getState().recordDailyEvent('craft');
    addNotification(`${t('crafting.success')}: ${itemNameOf(recipe.outputId, lang)}`, 'gold');
  };

  // ── Upgrade ──
  const upgradeableRefs = inventory
    .map((entry) => refOf(entry))
    .filter((ref) => {
      const item = resolveItemRef(ref);
      return Boolean(item && item.type !== 'material' && item.type !== 'special');
    });

  const selectedItem = selectedRef ? resolveItemRef(selectedRef) : null;
  const selectedLevel = selectedItem ? getEffectPairs(selectedItem.effects).find((p) => p.effectId === EFFECT.UPGRADE_LEVEL)?.value ?? 0 : 0;
  const cost = upgradeCost(selectedLevel);
  const pairsCount = selectedItem ? getEffectPairs(selectedItem.effects).filter((p) => p.effectId !== EFFECT.UPGRADE_LEVEL).length : 0;

  // ── Encantamento ──
  const enchantableRefs = upgradeableRefs.filter((ref) => {
    const item = resolveItemRef(ref);

    if (!item) return false;

    const pairs = getEffectPairs(item.effects);

    return pairs.some((pair) => pair.effectId === EFFECT.ENCHANT_SLOT) && pairs.length < MAX_EFFECTS_PER_ITEM;
  });

  const stoneRefs = inventory
    .map((entry) => refOf(entry))
    .filter((ref) => resolveItemRef(ref)?.type === 'spirit_stone');

  const ENCHANTABLE_STONE_EFFECTS = [61, 62, 63, 64, 65, 66, 55, 49];

  const enchantPair = (() => {
    if (!enchantStone) return null;

    const stone = resolveItemRef(enchantStone);

    if (!stone) return null;

    return getEffectPairs(stone.effects).find((pair) => ENCHANTABLE_STONE_EFFECTS.includes(pair.effectId)) ?? null;
  })();

  const canEnchant = Boolean(enchantTarget && enchantStone && enchantPair);

  const enchant = () => {
    const target = enchantTarget ? resolveItemRef(enchantTarget) : null;

    if (!target || !enchantTarget || !enchantStone || !enchantPair) {
      addNotification(t('crafting.cannot'), 'warning');
      return;
    }

    const basePairs = getEffectPairs(target.effects);
    const newEffects = buildItemEffect([...basePairs, enchantPair]);
    const newRef = serializeItem(target, newEffects);

    removeItem(enchantTarget, 1);
    removeItem(enchantStone, 1);
    addItem(newRef, 1);
    setEnchantTarget(null);
    setEnchantStone(null);
    addNotification(`${t('crafting.enchanted')}: ${describeEffect(enchantPair.effectId, enchantPair.value, lang).text}`, 'gold');
  };

  const canUpgrade = Boolean(
    selectedItem &&
      player &&
      selectedLevel < MAX_UPGRADE_LEVEL &&
      pairsCount < MAX_EFFECTS_PER_ITEM &&
      player.gold >= cost.gold &&
      countOf(cost.materialId) >= cost.materialQty
  );

  const upgrade = () => {
    if (!selectedItem || !selectedRef || !canUpgrade) {
      addNotification(t('crafting.cannot'), 'warning');
      return;
    }

    const basePairs = getEffectPairs(selectedItem.effects).filter((pair) => pair.effectId !== EFFECT.UPGRADE_LEVEL);
    const boosted = basePairs.map((pair) =>
      pair.effectId >= 1 && pair.effectId <= 11
        ? { ...pair, value: Math.max(1, Math.round(pair.value * 1.05)) }
        : pair
    );
    const newEffects = buildItemEffect([...boosted, { effectId: EFFECT.UPGRADE_LEVEL, value: selectedLevel + 1 }]);
    const newRef = serializeItem(selectedItem, newEffects);

    removeItem(selectedRef, 1);
    removeItem(cost.materialId, cost.materialQty);
    spendGold(cost.gold);
    addItem(newRef, 1);
    setSelectedRef(newRef);
    addNotification(`${t('crafting.upgraded')} +${selectedLevel + 1}`, 'gold');
  };

  return (
    <div className="grid h-full grid-rows-[1fr_auto] gap-3 overflow-hidden">
      {/* Receitas */}
      <section className="min-h-0 overflow-auto pr-1">
        <div className="grid gap-2">
          {recipes.map((recipe) => {
            const output = (ITEMS as Record<string, Item>)[recipe.outputId];
            const available = canCraft(recipe.id);

            if (!output) return null;

            return (
              <article key={recipe.id} className="rounded-xl border border-game-border bg-game-card p-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{output.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-title text-sm text-game-gold">{itemNameOf(recipe.outputId, lang)}</h3>
                    <p className="truncate font-mono text-xs text-game-muted">
                      {getEffectPairs(output.effects).slice(0, 2).map((pair) => describeEffect(pair.effectId, pair.value, lang).text).join(' • ')}
                    </p>
                    <p className="font-mono text-xs text-game-muted">
                      {recipe.inputs.map((input) => `${itemNameOf(input.itemId, lang)} ${countOf(input.itemId)}/${input.qty}`).join(' · ')}
                      {' · '}
                      {recipe.gold} 🪙
                      {recipe.requireLevel ? ` · ${t('game.level')} ${recipe.requireLevel}` : ''}
                    </p>
                  </div>
                  <Button disabled={!available} onClick={() => craft(recipe.id)}>
                    {t('crafting.craft')}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="grid min-h-0 gap-3 overflow-auto pr-1">
      {/* Upgrade */}
      <section className="rounded-xl border border-night-600 bg-night-900/60 p-3 shadow-panel">
        <h3 className="mb-2 font-title text-game-gold">{t('crafting.upgradeTitle')}</h3>
        <div className="grid gap-2">
          <select
            className="input-field"
            value={selectedRef ?? ''}
            onChange={(event) => setSelectedRef(event.target.value || null)}
          >
            <option value="">{t('crafting.selectItem')}</option>
            {upgradeableRefs.map((ref) => {
              const item = resolveItemRef(ref);

              if (!item) return null;

              const level = getEffectPairs(item.effects).find((pair) => pair.effectId === EFFECT.UPGRADE_LEVEL)?.value ?? 0;

              return (
                <option key={ref} value={ref}>
                  {itemNameOf(item.id, lang)} {level > 0 ? `+${level}` : ''}
                </option>
              );
            })}
          </select>

          {selectedItem && (
            <div className="flex items-center justify-between gap-2 font-mono text-xs text-game-muted">
              <span>
                {t('crafting.level')}: {selectedLevel}/{MAX_UPGRADE_LEVEL} · {cost.gold} 🪙 + {cost.materialQty}× {itemNameOf(cost.materialId, lang)}
              </span>
              <Button disabled={!canUpgrade} onClick={upgrade}>
                {t('crafting.upgrade')}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Encantamento */}
      <section className="rounded-xl border border-night-600 bg-night-900/60 p-3 shadow-panel">
        <h3 className="mb-2 font-title text-game-gold">{t('crafting.enchantTitle')}</h3>
        <div className="grid gap-2">
          <select
            className="input-field"
            value={enchantTarget ?? ''}
            onChange={(event) => setEnchantTarget(event.target.value || null)}
          >
            <option value="">{t('crafting.selectItem')}</option>
            {enchantableRefs.map((ref) => {
              const item = resolveItemRef(ref);

              if (!item) return null;

              const slots = getEffectPairs(item.effects).find((pair) => pair.effectId === EFFECT.ENCHANT_SLOT)?.value ?? 0;

              return (
                <option key={ref} value={ref}>
                  {itemNameOf(item.id, lang)} ({slots}💎)
                </option>
              );
            })}
          </select>
          <select
            className="input-field"
            value={enchantStone ?? ''}
            onChange={(event) => setEnchantStone(event.target.value || null)}
          >
            <option value="">{t('crafting.selectStone')}</option>
            {stoneRefs.map((ref) => {
              const item = resolveItemRef(ref);
              return item ? <option key={ref} value={ref}>{item.icon} {itemNameOf(item.id, lang)}</option> : null;
            })}
          </select>
          <Button disabled={!canEnchant} onClick={enchant}>
            {t('crafting.enchant')}
          </Button>
        </div>
      </section>
      </div>
    </div>
  );
};
