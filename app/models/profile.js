import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    birthday: {
      type: Date,
      default: null,
    },
    horoscope: {
      type: String,
      default: null,
    },
    zodiac: {
      type: String,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    weight: {
      type: Number,
      default: null,
    },
    interests: {
      type: [String],
      default: [],
    },
  }
);

const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
