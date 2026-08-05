import mongoose from 'mongoose';

export const connectDatabase = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    // Se estivermos rodando no Sandbox Offline (sem rede para baixar mongod),
    // a gente apenas "finge" conectar para não explodir o processo do Node.
    if (process.env.SANDBOX_OFFLINE) {
      console.log('⚠ SANDBOX_OFFLINE ativo — Servidor backend mockado sem DB.');
      // Stub Mongoose to prevent crashing when queries are called
      mongoose.connect = async () => {};
      mongoose.set('bufferCommands', false); // Para não travar requisições para sempre
      return;
    }

    if (!mongoUri) {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const memoryServer = await MongoMemoryServer.create();
      mongoUri = memoryServer.getUri('eclipsia');
      console.log('⚠ MONGO_URI ausente — usando MongoDB em memória (dados efêmeros)');
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};
