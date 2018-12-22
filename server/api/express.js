import { WebApp } from 'meteor/webapp';
import express from 'express';

export const app = express();
WebApp.connectHandlers.use(app);
