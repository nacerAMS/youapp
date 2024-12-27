"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Profile = () => {
  
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  console.log("session",session)
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
      const fetchProfile = async () => {
        try {
          const res = await fetch(`/api/profile/${session.user.id}`); 
          const data = await res.json();

          if (res.ok) {
            setProfile(data.profile);
          } else {
            console.error("Failed to fetch profile:", data.message);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    
  }, [status, session, router]);


  return (
    <div className="bg-[#614419] min-h-screen flex items-center justify-center p-4">
          <div className="bg-gray-200 rounded-xl shadow-2xl max-w-4xl w-full p-10  min-h-[65vh] transition-all duration-300 animate-fade-in">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 mb-8 md:mb-0">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 ">About Me</h2>
            </div>
            <p className="text-gray-900 border border-gray-400 p-2 rounded">Birthday: {new Date(profile?.birthday).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) || 'add birthday'}</p>
        <p className="text-gray-900 border border-gray-400 p-2 rounded">Horoscope: {profile?.horoscope || "add horoscope"}</p>
        <p className="text-gray-900 border border-gray-400 p-2 rounded">Zodiac: {profile?.zodiac || "add zodiac"}</p>
        <p className="text-gray-900 border border-gray-400 p-2 rounded">Height: {profile?.height || "add height"}</p>
        <p className="text-gray-900 border border-gray-400 p-2 rounded">Weight: {profile?.weight || "add weight"}</p>
            <div className="text-center">
            <h2 className="text-xl font-semibold text-[#614419] py-8">Interests</h2>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {profile?.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-[#614419] text-white px-3 rounded-full text-xl  py-2"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="md:w-1/3 text-center md:pl-8">
            <img
              src={profile?.image || "/img-uplaod.png"}
              alt="Profile Picture"
              className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-[#614419] transition-transform duration-300 hover:scale-105"
            />
            <h1 className="text-2xl font-bold text-[#614419]">{session?.user?.username}</h1>
            <p className="text-gray-600">{session?.user?.email}</p>
            <button
              onClick={() => router.push("/edit-profile")}
              className="mt-4 bg-[#614419] text-white px-4 py-2 rounded-lg hover:bg-[#FFB343] transition-colors duration-300"
            >
              Edit Profile
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="mt-4 bg-[#614419] text-white px-4 py-2 rounded-lg hover:bg-[#FFB343] transition-colors duration-300"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
