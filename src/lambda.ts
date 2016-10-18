/// <reference path="../../DefinitelyTyped/aws-serverless-express/aws-serverless-express.d.ts" />

import * as awsServerlessExpress from 'aws-serverless-express';
import app from './server';
import 'intl';

const server = awsServerlessExpress.createServer(app);
export const handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
