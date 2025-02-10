import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserforgotPassword } from "../../apiServices/UserHttpService/UserLoginHttpService";
import { toast } from "react-toastify";

function ForgotPassoword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  let userToken = localStorage?.getItem("token-vexors-admin");

  const onSubmit = async (info) => {
    setLoader(true);

    setTimeout(() => {
      setLoader(false);
    }, [4000]);

    try {
      let formData = {
        email: info?.email,
        password: info?.password,
      };

      const { data, error } = await UserforgotPassword(formData);

      if (!error) {
        if (!data.error) {
          setLoader(false);
          toast.success(data?.results?.otp);
          navigate("/VerifyOtp", { state: { email: info?.email } });
        } else {
          setLoader(false);
        }
      }
    } catch (err) {
      setLoader(false);
    }
  };

  // useEffect(() => {
  //   if (userToken?.length > 4) {
  //     navigate("/");
  //   }
  // }, [userToken]);

  const email = watch("email");
  const password = watch("password");

  return (
    <div className="centerd-body bg-light">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-md-8 col-11 mx-auto">
            <div className="signup">
              <div className="row">
                {/* Left Side */}
                <div className="col-md-6 px-0">
                  <div className="right-side bg-main">
                    <h1 className="text-white signup-heading">Welcome</h1>
                    <div className="login-img">
                      <img src="res/assets/img/login-img.png" alt="" />
                    </div>
                  </div>
                </div>

                {/* Right Side (Form) */}
                <div className="col-md-6 px-0 bg-white">
                  <div className="left-side">
                    <h1 className="signup-heading fw-bold text-main">
                      Vexors<span className="fw-light text-dark">Admin</span>
                    </h1>
                    <div className="form-design">
                      <div class="bg-main-light box-info">
                        <div class="d-flex gap-2 align-items-center">
                          <span class="circle-info">
                            <i class="fa fa-info-circle text-main"></i>
                          </span>
                          <div>
                            <p class="m-0 comman-sm-text">
                              Please enter your registered Email Address to
                              receive the OTP
                            </p>
                            <p class="m-0 comman-sm-text">
                              Email: <b>example@vexors.co</b>
                            </p>
                          </div>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email Field */}
                        <div className="form-group position-relative">
                          <label htmlFor="email" className="form-label">
                            * Email
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              errors.email
                                ? "error-boundary animate__animated animate__headShake"
                                : ""
                            }`}
                            placeholder="example@vexors.co"
                            {...register("email", {
                              required: "Email is required!",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                              },
                            })}
                          />
                          {/* Green Check Icon for Valid Input */}
                          {email && !errors.email && (
                            <i className="fa fa-check-circle text-success success-icon"></i>
                          )}
                          {errors.email && (
                            <p className="text-danger animate__animated animate__headShake small-text">
                              *{errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group mt-4">
                          <button
                            type="submit"
                            className="comman-btn"
                            disabled={loader}
                          >
                            {loader ? (
                              <span>
                                <i className="fa fa-spinner fa-spin"></i>{" "}
                                Loading...
                              </span>
                            ) : (
                              "Send Otp"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* Right Side Ends */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassoword;

