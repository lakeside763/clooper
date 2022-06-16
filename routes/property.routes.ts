import { Express, Request, Response, NextFunction } from 'express';
import { Services } from '../models/services.model';
import { BadRequestError } from '../utils/errors/bad-request-error';

function propertyRoutes (app: Express, services: Services) {
  app.get('/', async (req: Request, res: Response) => {
    res.status(200).json('default page');
  });

  app.post('/create-property', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const property = await services.property.createProperty(req.body);
      return res.status(200).json(property);
    } catch (error: any) {
      return res.status(400).json({ errors: [{ messag: error.message }]});
    }
  });
}

export default propertyRoutes;