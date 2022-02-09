import { connectToDb, startApp } from './app'

connectToDb();

const app = startApp();

export default app;

