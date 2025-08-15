import cron from 'node-cron';
import { deleteExpiredTokens } from '../tokens';

cron.schedule('0 * * * *', () => {
  deleteExpiredTokens();
});
