import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { UserResetPass } from "../../apiServices/UserHttpService/UserLoginHttpService";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (password && password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }

    if (confirmPassword && confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  }, [password, confirmPassword]);

  const onSubmit = async (info) => {
    setLoader(true);

    setTimeout(() => {
      setLoader(false);
    }, 4000);

    try {
      let formData = {
        password: info?.password,
        email: location?.state?.email,
      };

      const { data, error } = await UserResetPass(formData);

      if (!error) {
        if (!data.error) {
          setLoader(false);
          navigate("/login");
        } else {
          setLoader(false);
        }
      }
    } catch (err) {
      setLoader(false);
    }
  };

  function togglePassword() {
    var x = document.getElementById("password-input");
    var y = document.getElementById("password-input2");
    if (x.type === "password" && y.type === "password") {
      x.type = "text";
      y.type = "text";
    } else {
      x.type = "password";
      y.type = "password";
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
                      <form onSubmit={handleSubmit(onSubmit)}>
                        {/* New Password Field */}
                        <div className="form-group position-relative">
                          <label htmlFor="password" className="form-label">
                            * New Password
                          </label>
                          <input
                            type="password"
                            className={`form-control ${
                              passwordError || errors.password
                                ? "error-boundary animate__animated animate__headShake"
                                : ""
                            }`}
                            id="password-input"
                            placeholder="Enter new password"
                            {...register("password", {
                              required: "Password is required!",
                              minLength: {
                                value: 6,
                                message:
                                  "Password must be at least 6 characters",
                              },
                            })}
                          />
                          {password && !passwordError && (
                            <i className="fa fa-check-circle text-success success-icon"></i>
                          )}
                          {passwordError && (
                            <p className="text-danger animate__animated animate__headShake small-text">
                              *{passwordError}
                            </p>
                          )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="form-group position-relative">
                          <label
                            htmlFor="confirmPassword"
                            className="form-label"
                          >
                            * Confirm Password
                          </label>
                          <input
                            type="password"
                            id="password-input2"
                            className={`form-control ${
                              confirmPasswordError || errors.confirmPassword
                                ? "error-boundary animate__animated animate__headShake"
                                : ""
                            }`}
                            placeholder="Confirm your password"
                            {...register("confirmPassword", {
                              required: "Confirm Password is required!",
                              validate: (value) =>
                                value === password || "Passwords do not match",
                            })}
                          />
                          {confirmPassword && !confirmPasswordError && (
                            <i className="fa fa-check-circle text-success success-icon"></i>
                          )}
                          {confirmPasswordError && (
                            <p className="text-danger animate__animated animate__headShake small-text">
                              *{confirmPasswordError}
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

                        <div className="form-group mt-4">
                          <button
                            type="submit"
                            className="comman-btn"
                            disabled={loader}
                          >
                            {loader ? (
                              <span>
                                <i className="fa fa-spinner fa-spin"></i>{" "}
                                Resetting...
                              </span>
                            ) : (
                              "Reset Password"
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

export default ResetPassword;
