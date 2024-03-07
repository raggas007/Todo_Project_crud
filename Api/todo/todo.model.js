import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 40,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 40,
    },
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model("Todo", todoSchema);
