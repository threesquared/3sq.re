const awsServerlessExpress = require('aws-serverless-express');
import app from './server';
const server = awsServerlessExpress.createServer(app);

global.Intl = require('intl');

export const handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
