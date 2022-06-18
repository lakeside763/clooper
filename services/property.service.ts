import Property, { IProperty, propertyValidation } from "../models/property.model";
import { BadRequestError } from "../utils/errors/bad-request-error";

class PropertyService {
  async createProperty(data: IProperty) {
    return Property.create({
      ...data
    });
  }

  async updateProperty({ _id, ...rest }: Partial<IProperty>) {
    const updateProperty = await Property.findOneAndUpdate({ _id }, { ...rest }, { returnDocument: 'after' });
    if (!updateProperty) {
      throw new BadRequestError('Invalid ID was provided');
    }
    return updateProperty;
  }

  async getProperties() {
    return await Property.find();
  }

  async publishProperty({ _id, is_published }: { _id: string, is_published: boolean }) {
    const data = await Property.findOne({ _id });

    if(!data) {
      throw new BadRequestError('Invalid ID was provided');
    }

    const validate = propertyValidation.validate({
      name: data.name,
      address: data.address,
      type: data.type,
      description: data.description,
      image_url: data.image_url,
      total_rooms: data.total_rooms,
      occupancy_type: data.occupancy_type,
      rent_amount: data.rent_amount,
      rent_frequency: data.rent_frequency
    });

    if (validate.error) {
      throw new BadRequestError(validate.error.details[0].message);
    }

    const publishProperty = await Property.findOneAndUpdate(
      { _id }, 
      { is_published, updated_at: Date.now() }, 
      { returnDocument: 'after' }
    );
    
    return publishProperty;
  }

  async deleteProperty(_id: string) {
    const property = await Property.deleteOne({ _id });

    if(property.deletedCount !== 1) {
      throw new BadRequestError('Invalid ID was provided, property deletion failed.');
    }

    return { message: `Property with ID ${_id} deleted successfully` };
  }
}

export default PropertyService;