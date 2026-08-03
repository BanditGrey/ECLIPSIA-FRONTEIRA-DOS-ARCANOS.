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

    spendGold(recipe.gold);

    if (!addItem(recipe.outputId, 1)) {
      addNotification(t('crafting.invFull'), 'warning');
      return;
    }

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

      {/* Upgrade */}
      <section className="rounded-xl border border-game-border bg-game-panel p-3">
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
    </div>
  );
};
