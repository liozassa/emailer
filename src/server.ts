import App from './app'
import loggerMiddleware from './middleware/logger';
import { EmailController } from './controllers/email.controller';
import { HealthController } from './controllers/health.controller';
import { env } from 'process';
import express from 'express';
import cors from 'cors';

const whiteListDomain = (process.env.WHITE_LIST_DOMAIN)?.split(',') || [];

const options: cors.CorsOptions = {
    allowedHeaders: [
    'Origin',
    'Access-Control-Allow-Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept'
    ],
    credentials: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    origin: whiteListDomain,
    preflightContinue: false
};

const app = new App({
    port:  (env.PORT ? parseInt(env.PORT) : 80),
    controllers: [
        new HealthController(),
        new EmailController()
    ],
    middleWares: [
        express.json(),
        express.urlencoded({ extended: true }),
        cors(options),
        loggerMiddleware
    ]
})

app.listen();