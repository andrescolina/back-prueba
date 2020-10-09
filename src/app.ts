import { application } from "express";
import express, { Application } from 'express';
import  morgan  from 'morgan';
import cors from 'cors';
import PostRoute from './routes/crud.routes';

export class App {
    private app: Application;

    constructor (
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middleware();
        this.routes();
    }

    private settings() {
        this.app.set('port', this.port || 3000)
    }   


    private routes() {
        this.app.use('/api/crud', PostRoute);
    }

    private middleware() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors());
    }

    public async listen () {
        
        await this.app.listen(this.app.get('port'));
        console.log('Server on port:', this.app.get('port'));
    }

}