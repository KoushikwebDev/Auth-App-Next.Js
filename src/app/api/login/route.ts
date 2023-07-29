import dbConnect from "@/dbConfig/dbConfig";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    let userSignupData = await req.json();

    let { email, password } = userSignupData;

    if (!(email && password)) {
      return NextResponse.json({
        message: "user details missing",
        status: 400,
      });
    }

    //   check if user is exist
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message: "User not found!",
        status: 404,
      });
    }

    // check is password valid
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({
        message: "Invaild credentials.",
        status: 400,
      });
    }
    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    // create jwt token
    const token = await jwt.sign(tokenData, process.env.Secret_Token!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
