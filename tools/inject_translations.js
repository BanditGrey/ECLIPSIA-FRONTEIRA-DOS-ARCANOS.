import fs from 'fs';

const filePath = 'client/src/i18n/index.ts';
let content = fs.readFileSync(filePath, 'utf8');

const shopTexts = {
  'pt-BR': {
    title: "💎 Banco dos Arcanos",
    subtitle: "Adquira cristais para negociar no mercado e expandir seu poder.",
    package: "Pacote",
    crystals: "Cristais",
    bonus: "Bônus",
    buyBrl: "Comprar R$",
    pending: "Pix Pendente",
    pixInstructions: "Copie o código abaixo e pague no aplicativo do seu banco:",
    copy: "Copiar Pix Copia e Cola",
    copied: "Copiado!",
    simulateDev: "Simular Pagamento (DEV)",
    waiting: "Aguardando pagamento...",
    paid: "Pagamento confirmado! Cristais creditados.",
    close: "Fechar Banco"
  },
  'en-US': {
    title: "💎 Arcane Bank",
    subtitle: "Acquire crystals to trade in the market and expand your power.",
    package: "Package",
    crystals: "Crystals",
    bonus: "Bonus",
    buyBrl: "Buy R$",
    pending: "Pending Payment",
    pixInstructions: "Copy the code below and pay in your bank's app:",
    copy: "Copy Code",
    copied: "Copied!",
    simulateDev: "Simulate Payment (DEV)",
    waiting: "Waiting for payment...",
    paid: "Payment confirmed! Crystals credited.",
    close: "Close Bank"
  },
  'es-ES': {
    title: "💎 Banco de los Arcanos",
    subtitle: "Adquiere cristales para negociar en el mercado y expandir tu poder.",
    package: "Paquete",
    crystals: "Cristales",
    bonus: "Bono",
    buyBrl: "Comprar R$",
    pending: "Pago Pendiente",
    pixInstructions: "Copia el código a continuación y paga en la aplicación de tu banco:",
    copy: "Copiar Código",
    copied: "¡Copiado!",
    simulateDev: "Simular Pago (DEV)",
    waiting: "Esperando pago...",
    paid: "¡Pago confirmado! Cristales acreditados.",
    close: "Cerrar Banco"
  },
  'ja-JP': {
    title: "💎 アルカナ銀行",
    subtitle: "市場で取引し、力を拡大するためにクリスタルを取得します。",
    package: "パッケージ",
    crystals: "クリスタル",
    bonus: "ボーナス",
    buyBrl: "購入 R$",
    pending: "支払い待ち",
    pixInstructions: "以下のコードをコピーして、銀行のアプリで支払います:",
    copy: "コードをコピー",
    copied: "コピーしました！",
    simulateDev: "支払いをシミュレート (DEV)",
    waiting: "支払いを待っています...",
    paid: "支払い確認済み！クリスタルが付与されました。",
    close: "銀行を閉じる"
  }
};

for (const [lang, texts] of Object.entries(shopTexts)) {
  const shopJson = `\n    "shop": ${JSON.stringify(texts, null, 6).replace(/}/g, '    }')},`;
  const regex = new RegExp(`"${lang}": \\{`);
  content = content.replace(regex, `"${lang}": {${shopJson}`);
}

fs.writeFileSync(filePath, content, 'utf8');
