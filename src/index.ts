import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { createServer } from 'http';
import routes from './routes';
import { initDb } from './db';
import { errorHandler } from './utils/protectedRoute';



initDb();


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Pass to next layer of middleware
  next();
});

app.use('/', routes);

// Attach the error handling middleware
app.use(errorHandler);

const httpServer = createServer(app);


const PORT = process.env.PORT || process.env.API_PORT;
httpServer.listen({ port: PORT }, () => {
  console.log(`httpServer ready at http://localhost:${PORT}`);
});
