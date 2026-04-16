import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  slug: string;
  content: string;
  image?: string;
  category: 'Charging Issues' | 'Battery' | 'Performance' | 'Apps' | 'Network';
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Please provide a slug'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
      minlength: [50, 'Content must be at least 50 characters'],
    },
    image: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      enum: ['Charging Issues', 'Battery', 'Performance', 'Apps', 'Network'],
      required: [true, 'Please select a category'],
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);
