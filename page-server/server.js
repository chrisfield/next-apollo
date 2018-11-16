require('dotenv').config();
const next = require('next');
const express = require('express');
var parseUrl = require('parseurl');
console.log('NODE_ENV', process.env.NODE_ENV);
const nextApp = next({dev: process.env.NODE_ENV !== 'production'});
const handle = nextApp.getRequestHandler();

//const cookieParser = require('cookie-parser');

const app = express();
//app.use(cookieParser());

app.get('page.json', (req, res) => {
  res.json({name: 'value from page.json route'});
});

app.use('*.ico', express.static('static/favicon.ico'));

const start = async () => {
  const apiUrl = process.env.API_URL;
  try {
    await nextApp.prepare();

    app.get('*', (req, res) => {
      const requestPath = req.path;
      if (!isInternalPath(requestPath) && requestPath.endsWith('.html')) {
        req.customProps = {
          apiUrl,
          requestPath
        };
        nextApp.render(req, res, '/dynamic');
      } else {
        handle(req, res)
      }
    });

    await app.listen(process.env.PORT, process.env.HOST);

    console.log(`Next online at ${process.env.HOST}:${process.env.PORT}`);
    console.log(`     api url is ${apiUrl}`);
  } catch (e) {
    console.error(e);
  }
};

const isInternalPath = path => (path.startsWith('/_next') || path.startsWith('_next'));

start();


