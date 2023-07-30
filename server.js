require("app-module-path").addPath(`${__dirname}/`);
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
// const { host, httpPort } = require("config");
const { connections } = require("./app/models/index");
const { errorHandler } = require("./app/middleware");
const i18next = require('i18next')
const backend = require('i18next-fs-backend')
const middleware = require('i18next-http-middleware')
const formidable = require('express-formidable');
i18next.use(backend).use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './app/response/{{lng}}/translation.json'
    }
  })


const cors = require("cors");
const path = require("path");
require('dotenv').config();

const app = express();

app.use(middleware.handle(i18next))
app.set(path.join(__dirname));
app.use(express.static(__dirname))
app.use(cors());
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(formidable());
app.use(express.static('public'));

const httpServer = http
  .createServer(app.handle.bind(app))
  .listen(process.env.PORT, () => {
    console.info(`Server up successfully - port: ${process.env.PORT}`);
  });

// API routes
// const routes = require('./app')
// app.use('/api', require('./app/index'))
app.use('/api', require('./app/router/index'))


// app.use(require("./app/index"));

// Error Middleware
app.use(errorHandler.methodNotAllowed);
app.use(errorHandler.genericErrorHandler);

process.on("unhandledRejection", (err) => {
  console.error("possibly unhandled rejection happened");
  console.error(err.message);
  // enabledStackTrace && console.error(`stack: ${err.stack}`);
});

const closeHandler = () => {
  Object.values(connections).forEach((connection) => connection.close());
  httpServer.close(() => {
    console.info("Server is stopped successfully");
    process.exit(0);
  });
};

process.on("SIGTERM", closeHandler);
process.on("SIGINT", closeHandler);