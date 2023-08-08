import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

export const PostModel = mongoose.model('Post', schema);