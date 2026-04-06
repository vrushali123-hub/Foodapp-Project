/* eslint-disable no-unused-vars */

import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";

const Signup = () => {

  const { signUpWithGmail, createUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    const email = data.email;
    const password = data.password;

    createUser(email, password)
      .then((result) => {

        const user = result.user;
        alert("Signin successful!");
        navigate(from, { replace: true });

      })
      .catch((error) => {
        console.log(error);
      });

  };

  // Google signup

  const handleRegister = () => {

    signUpWithGmail()
      .then((result) => {

        navigate(from, { replace: true });

      })
      .catch((error) => console.log(error));

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="max-w-md bg-white shadow-2xl rounded-2xl p-8 w-full border border-gray-200">

        <form
          className="card-body space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >

          <h3 className="font-bold text-2xl text-center text-gray-700">
            Create Account
          </h3>

          <p className="text-center text-gray-500 text-sm">
            Signup to continue 🍔
          </p>

          {/* name */}

          <div className="form-control">

            <label className="label">
              <span className="label-text font-semibold">
                Name
              </span>
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("name")}
            />

          </div>

          {/* email */}

          <div className="form-control">

            <label className="label">
              <span className="label-text font-semibold">
                Email
              </span>
            </label>

            <input
              type="email"
              placeholder="Enter email"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("email")}
            />

          </div>

          {/* password */}

          <div className="form-control">

            <label className="label">
              <span className="label-text font-semibold">
                Password
              </span>
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("password")}
            />

            <label className="label">

              <a
                href="#"
                className="label-text-alt link link-hover mt-2 text-green-500"
              >
                Forgot password?
              </a>

            </label>

          </div>

          {/* error */}

          <p className="text-red-500 text-sm text-center">
            {errors?.email && "Email required"}
          </p>

          {/* signup button */}

          <div className="form-control mt-4">

            <input
              type="submit"
              className="btn bg-green-500 hover:bg-green-600 text-white border-none w-full"
              value="Sign up"
            />

          </div>

          <p className="text-center text-gray-600 text-sm">

            Have an account?

            <Link
              to="/login"
              className="ml-1 underline text-green-500 font-semibold"
            >
              Login here
            </Link>

          </p>

        </form>

        {/* social buttons */}

        <div className="flex justify-center gap-4 mt-5">

          <button
            onClick={handleRegister}
            className="btn btn-circle border hover:bg-green-500 hover:text-white transition"
          >
            <FaGoogle />
          </button>

          <button className="btn btn-circle border hover:bg-green-500 hover:text-white transition">
            <FaFacebookF />
          </button>

          <button className="btn btn-circle border hover:bg-green-500 hover:text-white transition">
            <FaGithub />
          </button>

        </div>

      </div>

    </div>

  );

};

export default Signup;