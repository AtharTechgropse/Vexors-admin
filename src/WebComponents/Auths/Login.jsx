import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../../apiServices/UserHttpService/UserLoginHttpService";

function Login() {
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

      const { data, error } = await UserLogin(formData);

      if (!error) {
        if (!data.error) {
          setLoader(false);
          navigate("/", { state: { from: "login" } });
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

  function togglePassword() {
    var x = document.getElementById("password-input");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

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
                        <div class="d-flex gap-3 align-items-center">
                          <span class="circle-info">
                            <i class="fa fa-info-circle text-main"></i>
                          </span>
                          <div>
                            <p class="m-0 comman-sm-text">
                              Email: example@vexors.co
                            </p>
                            <p class="m-0 comman-sm-text">Password: password</p>
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

                        {/* Password Field */}
                        <div className="form-group position-relative">
                          <label htmlFor="password" className="form-label">
                            * Password
                          </label>
                          <input
                            type="password"
                            id="password-input"
                            className={`form-control ${
                              errors.password
                                ? "error-boundary animate__animated animate__headShake"
                                : ""
                            }`}
                            placeholder="******"
                            {...register("password", {
                              required: "Password is required!",
                              minLength: {
                                value: 6,
                                message:
                                  "Password must be at least 6 characters",
                              },
                            })}
                          />
                          {/* Green Check Icon for Valid Input */}
                          {password && !errors.password && (
                            <i className="fa fa-check-circle text-success success-icon"></i>
                          )}
                          {errors.password && (
                            <p className="text-danger animate__animated animate__headShake small-text">
                              *{errors.password.message}
                            </p>
                          )}
                        </div>
                        <div className="mt-2 mb-1 text-center">
                          <input
                            style={{
                              width: "14px",
                              height: "14px",
                              marginRight: "4px",
                              position: "relative",
                              top: "2px",
                            }}
                            type="checkbox"
                            onClick={togglePassword}
                            className="showPassCheck"
                          />
                          <small className="showPass">Show Password</small>
                        </div>

                        <Link
                          to="/forgot-password"
                          className="text-main comman-sm-text text-decoration-none"
                        >
                          Forgot Password?
                        </Link>

                        <div className="form-group mt-2">
                          <button
                            type="submit"
                            className="comman-btn"
                            disabled={loader}
                          >
                            {loader ? (
                              <span>
                                <i className="fa fa-spinner fa-spin"></i>{" "}
                                Logging in...
                              </span>
                            ) : (
                              "Login"
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

export default Login;

