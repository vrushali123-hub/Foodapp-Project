/* eslint-disable no-unused-vars */

import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useForm } from "react-hook-form";

const UserProfile = () => {

  const { updateUserProfile } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    const name = data.name;
    const photoURL = data.photoURL;

    updateUserProfile(name, photoURL)
      .then(() => {
        alert("Profile updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (

    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-green-200 to-green-300">

      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* LEFT SIDE */}
        <div className="w-1/2 bg-green-500 text-white flex flex-col justify-center p-12">

          <h1 className="text-4xl font-bold mb-6">
            Update Profile
          </h1>

          <p className="text-lg mb-4">
            Feel free to reach and modify your profile.
          </p>

          <p className="opacity-90">
            You can update your personal details anytime.
            Keep your profile updated for better experience.
          </p>

          <div className="mt-8 pt-4 border-t border-green-300">
            <p className="opacity-80">
              Fast • Secure • Easy
            </p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 p-10">

          <form onSubmit={handleSubmit(onSubmit)}>

            <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
              Profile Settings
            </h2>

            <div className="mb-5">

              <label className="font-semibold block mb-1">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                {...register("name")}
                className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-green-400"
              />

            </div>

            <div className="mb-5">

              <label className="font-semibold block mb-1">
                Upload Photo
              </label>

              <input
                type="file"
                {...register("photoURL")}
                className="file-input file-input-bordered w-full rounded-xl"
              />

            </div>

            <input
              type="submit"
              value="Update Profile"
              className="btn bg-green-500 hover:bg-green-600 text-white w-full rounded-xl text-lg mt-4"
            />

          </form>

        </div>

      </div>

    </div>

  );
};

export default UserProfile;