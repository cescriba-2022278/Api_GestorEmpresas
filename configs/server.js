'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import usuarioRoutes from '../src/usuario/usuario.routes.js';
import loginRoutes from '../src/auth/login.routes.js';
import empresaRoutes from '../src/empresa/empresa.routes.js';

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/coperex/v1/usuario';
        this.loginPath = '/coperex/v2/login';
        this.empresaPath = '/coperex/v3/empresas';

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.usuarioPath, usuarioRoutes);
        this.app.use(this.loginPath, loginRoutes);
        this.app.use(this.empresaPath, empresaRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;
