import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  UserforgotPassword,
  verifyOTP,
} from "../../apiServices/UserHttpService/UserLoginHttpService";
import OtpField from "react-otp-field";
import { toast } from "react-toastify";

function OTPVerify() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [counter, setCounter] = useState(60);
  const [value, setValue] = useState("");
  let location = useLocation();

  const onSubmit = async (info) => {
    setLoader(true);

    setTimeout(() => {
      setLoader(false);
    }, 6000);

    try {
      let formData = {
        email: location?.state?.email,
        otp: value,
      };

      const { data, error } = await verifyOTP(formData);
      if (!error) {
        if (!data.error) {
          setLoader(false);
          navigate("/ResetPass", {
            state: { email: location?.state?.email },
          });
        }
      } else {
        setLoader(false);
      }
    } catch (err) {
      if (err) {
        setLoader(false);
      }
    }
  };

  const ResendOtp = async () => {
    try {
      let formData = {
        email: location?.state?.email,
        // verifyType: "forgot",
      };

      const { data, error } = await UserforgotPassword(formData);
      if (!error) {
        if (!data.error) {
          setCounter(60);
          toast.success(data?.results?.otp);
        }
      } else {
        setLoader(false);
      }
    } catch (err) {
      if (err) {
        setLoader(false);
      }
    }
  };

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (counter > 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [counter]);

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
                              Please enter the OTP received on your Email
                              Address
                            </p>
                          </div>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email Field */}
                        <div className="form-group position-relative">
                          <label htmlFor="email" className="form-label">
                            * OTP
                          </label>
                          <OtpField
                            value={value}
                            onChange={setValue}
                            numInputs={4}
                            id="myInput"
                            onChangeRegex={/^([0-9]{0,})$/}
                            autoFocus
                            isTypeNumber
                            inputProps={{
                              className: "otp-field__input form",
                              disabled: false,
                            }}
                          />
                        </div>

                        <div className="login_footer ">
                          <div className="form-group col-12 text-start mt-2">
                            {counter ? (
                              <span className="count_Sec"> 00:{counter}</span>
                            ) : (
                              <div>
                                <span class="comman-sm-text">
                                  Didn't received the OTP?{" "}
                                </span>
                                <a
                                  onClick={ResendOtp}
                                  style={{ cursor: "pointer" }}
                                  class="text-main text-decoration-underline comman-sm-text"
                                >
                                  Resend OTP
                                </a>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="form-group mt-2">
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
                              "Verify Otp"
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

export default OTPVerify;

