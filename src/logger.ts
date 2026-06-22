import { pino } from 'pino';
import prettifier from 'pino-pretty';

export const logger = pino(
  {
    enabled: false,
  },
  prettifier({ colorize: true, sync: true })
);

export const configureLogger = (enabled: boolean): string =>
  (logger.level = enabled ? 'info' : 'silent');
