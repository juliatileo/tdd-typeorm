import express, { Express } from 'express';
import cors from 'cors';
import { routes } from './routes';

class App {
  public server: Express = express();

  constructor() {
    this.middlewares();
    this.cors();
  }

  private middlewares(): void {
    this.server.use(express.json());
  }

  private cors(): void {
    this.server.use(cors());
  }
}

export default routes(new App().server);
