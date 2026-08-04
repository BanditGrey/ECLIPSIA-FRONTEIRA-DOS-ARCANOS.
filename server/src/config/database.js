import mongoose from 'mongoose';

export const connectDatabase = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    // Fallback sem Atlas: MongoDB efêmero em memória (testes/preview).
    // ⚠ Dados somem ao reiniciar — em produção configure MONGO_URI (Atlas).
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
