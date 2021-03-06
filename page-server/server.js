require('dotenv').config()
const next = require('next')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const nextApp = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = nextApp.getRequestHandler()

const app = express()
app.use(cookieParser())

app.get('page.json', (req, res) => {
  res.json({ name: 'value from page.json route' })
})

app.use(cors())
app.use('*.ico', express.static('static/favicon.ico'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const start = async () => {
  try {
    await nextApp.prepare()

    app.post('/login-form', async (req, res) => {
      nextApp.render(req, res, '/login-form')
    })

    const isInternalPath = path => (path.startsWith('/_next') || path.startsWith('_next'))
    app.get('*', (req, res) => {
      const requestPath = req.path
      console.log('requestPath', requestPath);
      if (!isInternalPath(requestPath) && (
        requestPath === '/' ||
        requestPath.endsWith('.html')
      )) {
        nextApp.render(req, res, '/dynamic')
      } else {
        handle(req, res)
      }
    })

    await app.listen(process.env.PORT, process.env.HOST)

    console.log(`Next online at ${process.env.HOST}:${process.env.PORT}`) /* eslint-disable-line no-console */
  } catch (e) {
    console.error(e) /* eslint-disable-line no-console */
  }
}

start()
