"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function EditProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const userId = session?.user?.id;
  const [image, setImage] = useState(null);
  const [birthday, setBirthday] = useState("");
  const [horoscope, setHoroscope] = useState("");
  const [zodiac, setZodiac] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [interests, setInterests] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("User not logged in.");
      return;
    }

    const profileData = {
      image,
      birthday,
      horoscope,
      zodiac,
      height,
      weight,
      interests,
      userId,
    };

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (res.ok) {
        router.push("/profile");
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (err) {
      console.error("Profile Update Error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  if (status === "loading") {
    return (
      <div className="bg-[#614419] min-h-screen flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; 
  }

  return (
    <div className="bg-[#614419] min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-200 rounded-xl shadow-2xl max-w-4xl w-full p-10  min-h-[65vh] transition-all duration-300 animate-fade-in">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Edit Profile
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleForm}>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-900">Profile Picture</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-900">Birthday</label>
              <input
                type="date"
                name="birthday"
                onChange={(e) => setBirthday(e.target.value)}
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-900">Horoscope</label>
              <input
                type="text"
                name="horoscope"
                placeholder="e.g., Aries"
                onChange={(e) => setHoroscope(e.target.value)}
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-900">Zodiac</label>
              <input
                type="text"
                name="zodiac"
                placeholder="e.g., Rat"
                onChange={(e) => setZodiac(e.target.value)}
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-900">Height (cm)</label>
              <input
                type="number"
                name="height"
                onChange={(e) => setHeight(e.target.value)}
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-900">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                onChange={(e) => setWeight(e.target.value)}
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-900">Interests</label>
              <input
                type="text"
                name="interests"
                placeholder="e.g., Coding, Music"
                onChange={(e) => setInterests(e.target.value)}
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>

            {error && <p className="text-red-600 text-sm font-bold">{error}</p>}

            <button
              type="submit"
              className="w-full text-white bg-[#614419] hover:bg-[#FFB343] focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
