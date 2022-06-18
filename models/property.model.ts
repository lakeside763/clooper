import mongoose, { ObjectId } from "mongoose";
import joi from 'joi';

export interface IProperty {
  _id?: ObjectId;
  name: string;
  address: string;
  type: string;
  description: string;
  image_url: string;
  total_rooms: string;
  occupancy_type: string;
  rent_amount: number;
  rent_frequency: number
  is_published: boolean;
  notification: string;
  created_at: Date;
  updated_at: Date;
}

const propertySchema = new mongoose.Schema<IProperty>({
  name: {
    type: String,
    required: true,
  },
  address: String,
  type: String,
  description: String,
  image_url: String,
  total_rooms: Number,
  occupancy_type: String,
  rent_amount: Number,
  rent_frequency: Number,
  is_published: {
    type: Boolean,
    default: () => false,
  },
  notification: {
    type: String,
    default: () => 'PENDING',
  },
  created_at: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updated_at: {
    type: Date,
    default: () => Date.now()
  }
});


const Property = mongoose.model<IProperty>('Property', propertySchema);

export const propertyValidation = joi.object({
  name: joi.string().required(),
  address: joi.string().required(),
  type: joi.string().required(),
  description: joi.string().required(),
  image_url: joi.string().required(),
  total_rooms: joi.number().required(),
  occupancy_type: joi.string().required(),
  rent_amount: joi.number().required(),
  rent_frequency: joi.number().required(),
})

export default Property;