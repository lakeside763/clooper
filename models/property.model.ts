import mongoose from "mongoose";

export interface IProperty {
  name: string;
  address: string;
  type: string;
  description: string;
  image_url: string;
  total_rooms: string;
  occupancy_type: string;
  rent_amount: number;
  rent_frequency: string
  is_published: boolean;
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
  rent_frequency: String,
  is_published: Boolean,
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

export default Property;