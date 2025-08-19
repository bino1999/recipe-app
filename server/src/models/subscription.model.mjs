import mongoose, { Mongoose } from "mongoose";

const subscriptionSchema = new Mongoose.Schema({

},{timestamps: true});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;