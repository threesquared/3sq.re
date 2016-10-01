import 'angular2-universal/polyfills';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { enableProdMode } from '@angular/core';
import { expressEngine } from 'angular2-universal';
import { setGlobal } from 'angular2-universal/dist/node/mock/window';

enableProdMode();
setGlobal();

const app = express();
const port = process.env.PORT || 3000;
const ip = process.env.HOST || '0.0.0.0';
const ROOT = path.join(path.resolve(__dirname, '..'));

app.engine('.html', expressEngine);
app.set('views', __dirname);
app.set('view engine', 'html');

app.use(cookieParser('Angular 2 Universal'));
app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, 'assets'), {maxAge: 30}));
app.use(express.static(path.join(ROOT, 'dist/client'), {index: false}));

import { ngApp } from './main.node';

app.get('/', ngApp);
app.get('/blog', ngApp);
app.get('/blog/*', ngApp);

function indexFile(req, res) {
  res.sendFile('/index.html', {root: __dirname});
}

app.get('*', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var pojo = { status: 404, message: 'No Content' };
  var json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

app.listen(port, ip, () => {
  console.log(`Listening on: http://${ip}:${port}`);
});
