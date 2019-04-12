import { WebApp } from 'meteor/webapp';
import express from 'express';
const cors = require('cors');

export const app = express();
app.use(cors());

WebApp.connectHandlers.use(app);
