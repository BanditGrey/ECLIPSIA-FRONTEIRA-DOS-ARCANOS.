import mongoose from 'mongoose';

let dbReady = false;

/** Banco conectado de verdade (false = modo sandbox/mockado). */
export const isDbReady = () => dbReady;

const enableMockMode = (reason) => {
  console.warn(`⚠ ${reason}`);
  console.log('⚠ Ativando modo SANDBOX_OFFLINE automático (backend mockado sem DB).');
  // Stub Mongoose to prevent crashing when queries are called
  mongoose.connect = async () => {};
  mongoose.set('bufferCommands', false); // Para não travar requisições para sempre
  dbReady = false;
};

export const connectDatabase = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    // Se estivermos rodando no Sandbox Offline (sem rede para baixar mongod),
    // a gente apenas "finge" conectar para não explodir o processo do Node.
    if (process.env.SANDBOX_OFFLINE) {
      console.log('⚠ SANDBOX_OFFLINE ativo — Servidor backend mockado sem DB.');
      enableMockMode('SANDBOX_OFFLINE definido via ambiente.');
      return;
    }

    if (!mongoUri) {
      try {
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const memoryServer = await MongoMemoryServer.create();
        mongoUri = memoryServer.getUri('eclipsia');
        console.log('⚠ MONGO_URI ausente — usando MongoDB em memória (dados efêmeros)');
      } catch (memoryError) {
        // Sandbox sem rede para baixar o binário do mongod: degrada para o
        // modo mockado em vez de derrubar o processo (jogo segue no Modo Sandbox).
        enableMockMode(`MongoDB em memória indisponível: ${memoryError?.message || memoryError}`);
        return;
      }
    }

    await mongoose.connect(mongoUri);
    dbReady = true;
    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};
