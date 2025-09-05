import mongoose from "mongoose";

const geoSchema = new mongoose.Schema({
	lat: { type: Number, required: true },
	lng: { type: Number, required: true }
}, { _id: false });

const addressSchema = new mongoose.Schema({
	street: { type: String, required: true },
	city: { type: String, required: true },
	zip: { type: String, required: true },
	geo: { type: geoSchema, required: true }
}, { _id: false });

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: {
		type: String,
		required: true,
		match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
	},
	phone: { 
		type: String, 
		required: true,
		unique: true
	},
	company: { type: String, required: true },
	address: { type: addressSchema, required: true }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
