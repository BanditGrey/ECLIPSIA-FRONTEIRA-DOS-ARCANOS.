import pino from 'pino';

/** Logger estruturado para produção e para diagnóstico do preview. */
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  base: { service: 'eclipsia-server' },
  timestamp: pino.stdTimeFunctions.isoTime,
});
