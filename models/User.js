import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from 'bcrypt';
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
});
// Set up pre-save middleware to create password
userSchema.pre("save", async function () {
  // "this" refers to the document we're trying to save to the database
  if (this.isNew || this.isModified("password")) {
    // also known as the "cost factor" (how much time and effort it takes to generate the hash)
    const saltRounds = 10;
    // store the hashed password value into the password field
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

// Compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  // take the plain text password, hash it, then compare it with the saved hashed password in our database
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
