import mongoose from "mongoose";
const ProfileSchema = mongoose.Schema(
  {
    career: { type: "string", required: [true] },
    grades: { type: "string", required: [true] },
    time: { type: "string", required: [true] },
   userId: {type: "string", required: [true]
     
    },

  },
  {
    versionKey: false,
  }
);
const Profile = mongoose.model("Profile", ProfileSchema);
export default Profile;
//  type: mongoose.Schema.Types.ObjectId,
//       ref: "User", 
//       required: true,