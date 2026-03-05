import { User } from "../models/User.ts";

export async function createAccount(userData: any) {
  // Check if someone already used this email
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  // Save the new user
  return await User.create(userData);
}
