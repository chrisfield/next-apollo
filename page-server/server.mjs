import Dotenv from 'dotenv';
import next from 'next';
import express from 'express';
import Auth from './lib/auth.mjs'; 
import bodyParser  from 'body-parser';
import cors from 'cors';

const nextApp = next({dev: process.env.NODE_ENV !== 'production'});
const handle = nextApp.getRequestHandler();


const dotenv = Dotenv.config();

//const cookieParser = require('cookie-parser');

const app = express();
//app.use(cookieParser());

app.get('page.json', (req, res) => {
  res.json({name: 'value from page.json route'});
});

app.use(cors());
app.use('*.ico', express.static('static/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const start = async () => {
  const apiUrl = process.env.API_URL;
  try {
    await nextApp.prepare();

    app.post('/login', async (req, res) => {
      const {username, password, urlSuccess, urlError} = req.body;
      const auth = Auth('http://localhost:3112/login');
      const authData = await auth({username, password});
      const authToken = authData.authToken;
      if (authToken) {
        res.cookie('authToken', authToken);
      } else {
        res.clearCookie('authToken');
      }
      if ( req.header('Content-Type') === 'application/json') {
        res.json({authToken});
      } else {
        if (authToken) {
          res.writeHead(301, {Location: urlSuccess})
        } else {
          res.writeHead(301, {Location: urlError})
        }
        res.send();
      }
    });

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


