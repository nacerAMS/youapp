import { connectMongoDB } from "@/app/lib/mongodb";
import Profile from "@/app/models/profile";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { userId } = params;

  try {  
    await connectMongoDB();

    
    const profile = await Profile.findOne({ userId })
      .populate("userId", "username email") 
      .exec();

    
    if (!profile) {
      return NextResponse.json({ message: "Profile not found." }, { status: 404 });
    }

   
    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Error while fetching profile:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the profile." },
      { status: 500 }
    );
  }
}
