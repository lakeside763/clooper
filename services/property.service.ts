import Property, { IProperty } from "../models/property.model";

class PropertyService {
  async createProperty(data: IProperty) {
    
    return Property.create({
      ...data
    });
  }

  async updateProperty(data: Partial<IProperty>) {
    const property = Property.updateOne()
  }
}

export default PropertyService;