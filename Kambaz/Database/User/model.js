import mongoose from "mongoose";
import schema from "./Schema.js";
const model = mongoose.model("UserModel", schema);
export default model;