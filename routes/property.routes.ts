import { Express, Request, Response, NextFunction } from 'express';
import { Services } from '../models/services.model';
import { errorResponse } from '../utils/utils';

function propertyRoutes (app: Express, services: Services) {
  app.get('/property/get-properties', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const properties = await services.property.getProperties();
      return res.status(200).json(properties);
    } catch (error) {
      errorResponse(error, res, next);
    }
  });

  app.post('/property/create-property', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const property = await services.property.createProperty(req.body);
      return res.status(200).json(property);
    } catch (error: any) {
      errorResponse(error, res, next);
    }
  });

  app.put('/property/update-property', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const property = await services.property.updateProperty(req.body);
      return res.status(200).json(property);
    } catch (error: any) {
      errorResponse(error, res, next);
    }
  });

  app.put('/property/publish-property', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const publishProperty = await services.property.publishProperty(req.body);
      return res.status(200).json(publishProperty);
    } catch (error) {
      errorResponse(error, res, next);
    }
  });

  app.delete('/property/delete-property/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteProperty = await services.property.deleteProperty(req.params.id);
      return res.status(200).json(deleteProperty);
    } catch (error) {
      errorResponse(error, res, next);
    }
  });
}


export default propertyRoutes;
