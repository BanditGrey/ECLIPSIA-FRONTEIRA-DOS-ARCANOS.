import os

exclusive_map = {
    0: 31, 1: 32, 2: 33, 3: 34, 4: 35,
    5: 36, 6: 37, 7: 38, 8: 39, 9: 40,
}

items_dir = 'client/src/data/items'
for filename in os.listdir(items_dir):
    if not filename.endswith('.ts'):
        continue
    filepath = os.path.join(items_dir, filename)
    with open(filepath, 'r') as f:
        content = f.read()

    # Se já tem exclusiveEffect, pula
    if 'exclusiveEffect' in content:
        print(f"Pulando (já tem): {filename}")
        continue

    # Procura por itens com rarity: 'legendary' ou 'relic'
    # Vamos fazer uma abordagem simples: para cada linha que tem 'numId:',
    # procuramos se há uma linha próxima com rarity 'legendary'/'relic'
    lines = content.split('\n')
    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        new_lines.append(line)
        # Se a linha contém numId
        if '"numId"' in line:
            # Coleta as próximas linhas até encontrar uma que fecha o bloco ou raridade
            block_lines = [line]
            j = i + 1
            found_legendary = False
            found_relic = False
            num_id = None
            while j < len(lines) and j < i + 15:  # limite de linhas próximas
                block_line = lines[j]
                if '"numId"' in line:
                    import re
                    m = re.search(r'"numId":\s*(\d+)', line)
                    if m:
                        num_id = int(m.group(1))
                if '"rarity"' in block_line:
                    if '"legendary"' in block_line:
                        found_legendary = True
                    elif '"relic"' in block_line:
                        found_relic = True
                # Se encontramos o fechamento do bloco (})
                if block_line.strip() == '},' or block_line.strip() == '}' or block_line.strip() == '},':
                    # Se é legendary/relic, adiciona exclusiveEffect antes desta linha
                    if (found_legendary or found_relic) and num_id is not None:
                        exclusive_id = exclusive_map.get(num_id % 10, 31)
                        indent = '    '  # ajuste conforme arquivo
                        # Tenta encontrar a indentação da linha atual
                        stripped = block_line.lstrip()
                        indent_len = len(block_line) - len(stripped)
                        indent = block_line[:indent_len]
                        new_lines.insert(-1, f"{indent}\"exclusiveEffect\": {exclusive_id},")
                    break
                j += 1
        i += 1

    new_content = '\n'.join(new_lines)
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Atualizado: {filename}")
    else:
        print(f"Sem alteração: {filename}")
