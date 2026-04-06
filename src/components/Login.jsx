

/* eslint-disable no-unused-vars */

import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";

const Login = () => {

  const [errorMessage, seterrorMessage] = useState("");

  const { signUpWithGmail, login } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    const email = data.email;
    const password = data.password;

    login(email, password)
      .then((result) => {

        alert("Login successful!");
        navigate(from);

      })

      .catch((error) => {

        seterrorMessage("Please provide valid email & password!");

      });

    reset();

  };

  const handleRegister = () => {

    signUpWithGmail()
      .then((result) => {

        navigate(from);

      })
      .catch((error) => console.log(error));

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="max-w-md bg-white shadow-2xl rounded-2xl p-8 w-full border border-gray-200 relative">

        <form
          className="card-body space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >

          <h3 className="font-bold text-2xl text-center text-gray-700">
            Please Login!
          </h3>

          <p className="text-center text-gray-500 text-sm">
            Welcome back 🍔
          </p>

        <div className="form-control w-full mb-3">

  <label className="label pb-1">
    <span className="label-text font-semibold text-gray-700">
      Email
    </span>
  </label>

  <input
    type="email"
    placeholder="Enter email"
    className="input input-bordered w-full mt-1"
    {...register("email")}
  />

</div>

<div className="form-control w-full mb-3">

  <label className="label pb-1">
    <span className="label-text font-semibold text-gray-700">
      Password
    </span>
  </label>

  <input
    type="password"
    placeholder="Enter password"
    className="input input-bordered w-full mt-1"
    {...register("password",{required:true})}
  />

  <label className="label pt-1">

    <span className="label-text-alt link link-hover text-green-500">
      Forgot password?
    </span>

  </label>

</div>

          {errorMessage && (

            <p className="text-red-500 text-sm text-center">
              {errorMessage}
            </p>

          )}

        <div className="form-control mt-5">

  <input
    type="submit"
    className="btn bg-green-500 hover:bg-green-600 text-white w-full"
    value="Login"
  />

</div>

          <p className="text-center text-gray-600 text-sm">

            Don't have an account?

            <Link
              to="/signup"
              className="underline text-green-500 ml-1 font-semibold"
            >
              Signup Now
            </Link>

          </p>

        </form>

        <Link to="/">
          <div className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">
            ✕
          </div>
        </Link>

        <div className="flex justify-center gap-4 mt-5">

          <button
            onClick={handleRegister}
            className="btn btn-circle border hover:bg-green-500 hover:text-white"
          >
            <FaGoogle/>
          </button>

          <button className="btn btn-circle border hover:bg-green-500 hover:text-white">
            <FaFacebookF/>
          </button>

          <button className="btn btn-circle border hover:bg-green-500 hover:text-white">
            <FaGithub/>
          </button>

        </div>

      </div>

    </div>

  );

};

export default Login;