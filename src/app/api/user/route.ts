import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userSchema";
import dbConnect from "@/dbConfig/dbConfig";
dbConnect();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const userId = await getDataFromToken(req);
    let user = await User.findOne({ _id: userId }).select("-password -isAdmin");

    return NextResponse.json({
      message: "user found",
      user,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
