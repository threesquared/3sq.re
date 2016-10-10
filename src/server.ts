import 'angular2-universal-polyfills';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { enableProdMode } from '@angular/core';
import { createEngine } from 'angular2-express-engine';

import { MainModule } from './main.node';

enableProdMode();

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

app.locals.asset_url = (path) => {
  const base = process.env.LAMBDA_TASK_ROOT ? 'https://d11t4m2g3rm2fm.cloudfront.net' : '';
  return `${base}${path}`;
};

app.engine('.html', createEngine({}));
app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(cookieParser('Angular 2 Universal'));
app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, 'assets'), {maxAge: 30}));
app.use(express.static(path.join(ROOT, 'dist/client'), {index: false}));
app.use(express.static(path.join(ROOT, 'src/public'), {index: false}));

function ngApp(req, res) {
  res.render('index', {
    req,
    res,
    ngModule: MainModule,
    preboot: false,
    baseUrl: '/',
    requestUrl: req.originalUrl,
    originUrl: 'http://localhost:3000'
  });
}

app.get('/', ngApp);
app.get('/blog', ngApp);
app.get('/blog/*', ngApp);

app.get('*', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var pojo = { status: 404, message: 'No Content' };
  var json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

export default app

let server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on: http://localhost:${server.address().port}`);
});

