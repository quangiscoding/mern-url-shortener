import mongoose from "mongoose";
import { time } from "node:console";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
