import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const reviewSchema = new Schema({
  hotelId: {
    required: true,
    type: ObjectId,
  },
  userId: {
    required: true,
    type: ObjectId,
  },
  review: {
    required: true,
    type: Number,
  },
});

export const amenitiesModel =
  mongoose.models.amenities ?? mongoose.model("amenities", amenitiesModel);
