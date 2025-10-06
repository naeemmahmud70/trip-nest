import { userModel } from "@/models/user-model";
import { dbConnect } from "@/service/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { fname, lname, email, password } = await request.json();
    if (!fname || !lname || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required!" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await userModel.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists!" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name: `${fname} ${lname}`,
      email: email.toLowerCase(),
      password: hashedPassword,
    };

    // Create new user
    const createdUser = await userModel.create(newUser);

    return NextResponse.json(
      {
        message: "User has been created successfully",
        user: {
          id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
};
