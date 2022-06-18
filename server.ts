import compression from 'compression';
import express from 'express';
import mongoose from 'mongoose';
import { errorHandler } from './middlewares/error-handler';
import propertyRoutes from './routes/property.routes';
import { PropertyService } from './services';

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

const mongoDB = 'mongodb://127.0.0.1/clooper';
mongoose.connect(mongoDB);

export const port = 8000;

const services = {
  property: new PropertyService()
}
propertyRoutes(app, services);
app.use(errorHandler);






