import dbConnect from "@/dbConfig/dbConfig";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

dbConnect();
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    let userSignupData = await req.json();

    let { username, email, password } = userSignupData;
    console.log(userSignupData);
    if (!(username && email && password)) {
      return NextResponse.json({
        message: "user details missing",
        status: 400,
      });
    }
    // check is user Already existr ?
    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({
        message: "User already exists",
        status: 400,
      });
    }
    // hash user password
    const salt = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password, salt);

    // create new user
    let newUser = await new User({
      username,
      email,
      password: hashedpassword,
    });

    let savedUser = await newUser.save();
    console.log(savedUser);

    // send success message
    return NextResponse.json({
      message: "new user created successfully",
      succes: true,
      savedUser,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
