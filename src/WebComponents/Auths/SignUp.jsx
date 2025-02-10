import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserSignUp } from "../../apiServices/UserHttpService/UserLoginHttpService";
import { toast } from "react-toastify";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (info) => {
    setLoader(true);

    setTimeout(() => {
      setLoader(false);
    }, 6000);

    try {
      let formData = {
        firstName: info?.firstName,
        lastName: info?.lastName,
        email: info?.email,
        password: info?.password,
        industry: info?.industry,
      };
      console.log({ formData });

      const { data, error } = await UserSignUp(formData);
      if (!error) {
        if (!data.error) {
          setLoader(false);
          navigate("/VerifyOtp", {
            state: { from: "signup", email: info?.email },
          });
        }
      } else {
        setLoader(false);
        toast.success(data.message, { autoClose: 1500 });
      }
    } catch (err) {
      if (err) {
        setLoader(false);
      }
    }
  };

  return (
    <div className="flex flex-wrap h-screen">
      <div className="animate__animated animate__slideInLeft w-full md:w-1/2 bg-black text-white flex flex-col justify-center items-center relative overflow-hidden py-8 md:py-0 ">
        <div className="absolute top-5 right-5 flex space-x-4">
          <Link
            to={"/Login"}
            className="py-2 px-4 rounded-md border border-white hover:bg-white hover:text-black"
          >
            Login
          </Link>
          <button className="py-2 px-4 rounded-md bg-white text-black hover:bg-gray-200">
            Join Us
          </button>
        </div>

        <div className="text-center px-4 md:px-10">
          <p className="text-gray-400 text-sm uppercase mb-2">AI Community</p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Join NXAI and explore the power of voice!
          </h2>
        </div>

        <div className="absolute bottom-5 flex space-x-2">
          <span className="w-3 h-3 bg-white rounded-full"></span>
          <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
        </div>
      </div>

      <div className="animate__animated animate__fadeIn w-full md:w-1/2 bg-white flex flex-col justify-center items-center px-6 md:px-10 py-8 md:py-0">
        <div className="text-left w-full max-w-sm">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <img
              src="/resources/imgs/logo1.svg"
              className="w-20 h-20 relative right-2"
            />
            Register Now!
          </h1>
          <p className="text-gray-600 mb-8">
            Enter the required details to create your{" "}
            <span className="font-semibold text-gray-900">NXAI</span> account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className={`w-full border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-md py-2 px-3 focus:outline-none ${
                    errors.firstName
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  className={`w-full border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-md py-2 px-3 focus:outline-none ${
                    errors.lastName
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <select
                className={`w-full border ${
                  errors.industry ? "border-red-500" : "border-gray-300"
                } rounded-md py-2 px-3 focus:outline-none ${
                  errors.industry ? "focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                {...register("industry", {
                  required: "Please select an industry",
                })}
              >
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
                <option value="healthcare">Healthcare</option>
                <option value="other">Other</option>
              </select>
              {errors.industry && (
                <p className="text-red-500 text-sm">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your email"
                className={`w-full border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md py-2 px-3 focus:outline-none ${
                  errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Password */}
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md py-2 px-3 focus:outline-none ${
                    errors.password
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`w-full border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md py-2 px-3 focus:outline-none ${
                    errors.confirmPassword
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {!loader ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 h-10"
              >
                Sign Up
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 h-10 relative text-center"
              >
                <span class="loader"></span>
              </button>
            )}
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center animate__animated animate__fadeInUp">
            Already have an account?{" "}
            <Link
              to={"/Login"}
              className="text-blue-800 font-medium hover:underline"
            >
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

