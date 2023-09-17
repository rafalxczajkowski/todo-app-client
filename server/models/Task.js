import { Schema, model } from 'mongoose'

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: [100, 'The name cannot be longer than 100 characters'],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default model('Task', TaskSchema)
