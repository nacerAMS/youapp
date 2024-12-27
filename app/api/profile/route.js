import { connectMongoDB } from "@/app/lib/mongodb";
import Profile from "@/app/models/profile";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      image,
      birthday,
      horoscope,
      zodiac,
      height,
      weight,
      interests,
      userId,
    } = await req.json();
    await connectMongoDB();

   
    const newProfile = await Profile.create({
      image,  
      birthday,
      horoscope,
      zodiac,
      height,
      weight,
      interests,
      userId,
    });

    return NextResponse.json({ message: "Profile created successfully." }, { status: 201 });
  } catch (error) {
    console.error("Error while creating profile:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the profile." },
      { status: 500 }
    );
  }
}
