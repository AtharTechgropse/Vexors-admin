import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import {
  CreateSubAdmin,
  GetUser,
} from "../../../apiServices/UserHttpService/UserMainHttp";
import { useNavigate, useParams } from "react-router-dom";
import "animate.css"; // Import Animate.css

const AddSubAdmin = () => {
  const [user, setUser] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      image: null,
      permissions: [],
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Generate image preview URL
    }
  };

  const onSubmit = async (info) => {
    console.log(info);

    const formDataObj = new FormData();

    formDataObj.append("name", info?.name);
    formDataObj.append("email", info?.email);
    // formDataObj.append("countryCode", "+91");
    formDataObj.append("mobileNumber", info?.mobile);
    formDataObj.append(`permissions`, JSON.stringify(info?.permissions));

    if (info?.image) {
      formDataObj.append("image", info?.image);
    }

    try {
      const { data, error } = await CreateSubAdmin(formDataObj);
      if (!error && data?.results) {
        console.log("Sub-admin created successfully!");
        navigate("/vendor_management");
      }
    } catch (error) {
      console.error("Error creating sub-admin:", error);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <Header />
      <div className="main-wrapper">
        <Sidebar />
        <main className="content-part-wrapper">
          <div className="animate__animated animate__fadeInUp animate__faster">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">
                  <i className="fa fa-home" />
                </a>
              </li>
              <li className="breadcrumb-item active">
                <a href="#">Staff Management</a>
              </li>
              <li className="breadcrumb-item active">Add Sub-User</li>
            </ol>

            <div className="mt-4 d-flex justify-content-between">
              <div className="">
                <h1 className="main-heading m-0">Add Sub-User</h1>
              </div>
              <div className="d-flex gap-2">
                <div className="d-flex gap-2">
                  <a href="user_sub.html" className="comman-border-btn">
                    <div className="d-flex gap-2 align-items-center">
                      <i className="fa-solid fa-user" />
                      Sub User
                    </div>
                  </a>
                </div>
                <div className="d-flex gap-2">
                  <a className="comman-border-btn">
                    <div
                      onClick={() => navigate(-1)}
                      className="d-flex gap-2 align-items-center"
                    >
                      <i className="fa-solid fa-arrow-left" />
                      Go Back
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-3 comman-design animate__animated animate__zoomIn">
              <form className="form-design" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  {/* Image Upload */}
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label">Image</label>
                      <div className="profile-img-container text-center mb-4">
                        <label
                          htmlFor="profileImage"
                          className="profile-img-wrapper"
                        >
                          <input
                            type="file"
                            id="profileImage"
                            className="d-none"
                            accept="image/*"
                            {...register("image", {
                              required: "Image is required",
                              onChange: (e) => {
                                handleImageChange(e);
                              },
                            })}
                          />
                          {preview ? (
                            <img
                              src={preview}
                              className="profile-img"
                              alt="Profile"
                            />
                          ) : (
                            <div
                              style={{
                                width: "120px",
                                height: "120px",
                                background: "gray",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              Upload Image
                            </div>
                          )}
                          <div className="upload-icon">
                            <i className="fa fa-upload"></i>
                          </div>
                        </label>
                      </div>
                      {errors.image && (
                        <p className="error-boundary animate__animated animate__headShake">
                          {errors.image.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Name Field */}
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 3,
                            message: "Minimum 3 characters required",
                          },
                        })}
                      />
                      {errors.name && (
                        <p className="error-boundary animate__animated animate__headShake">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="error-boundary animate__animated animate__headShake">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Mobile Number Field */}
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label className="form-label">Mobile No.</label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("mobile", {
                          required: "Mobile number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Mobile number must be 10 digits",
                          },
                        })}
                      />
                      {errors.mobile && (
                        <p className="error-boundary animate__animated animate__headShake">
                          {errors.mobile.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label">Permission</label>
                      <div className="row">
                        <div className="col-3">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input pe-3"
                              {...register("permissions", {
                                validate: (value) =>
                                  value.length > 0 ||
                                  "At least one permission must be selected",
                              })}
                              value="Dashboard"
                            />
                            <span className="form-label pt-2 fw-bold ">
                              Dashboard
                            </span>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              {...register("permissions")}
                              value="Category Management"
                            />
                            <span className="form-label pt-2 fw-bold">
                              Category Management
                            </span>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              {...register("permissions")}
                              value="Products Management"
                            />
                            <span className="form-label pt-2 fw-bold">
                              Products Management
                            </span>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              {...register("permissions")}
                              value="Documents Templete Management"
                            />
                            <span className="form-label pt-2 fw-bold">
                              Documents Templete Management
                            </span>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              {...register("permissions")}
                              value="Task Activity Management"
                            />
                            <span className="form-label pt-2 fw-bold">
                              Task Activity Management
                            </span>
                          </div>
                        </div>
                        <div className="col-3">
                          {/* <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input pe-3"
                              {...register("permissions", {
                                validate: (value) =>
                                  value.length > 0 ||
                                  "At least one permission must be selected",
                              })}
                              value="People Management"
                            />
                            <span className="form-label pt-2 fw-bold ">
                              People Management
                            </span>
                          </div> */}
                          <div style={{ marginLeft: "12px" }}>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                {...register("permissions")}
                                value="User's Management"
                              />
                              <span className="form-label pt-2 fw-bold">
                                User's Management
                              </span>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                {...register("permissions")}
                                value="Staff Management"
                              />
                              <span className="form-label pt-2 fw-bold">
                                Staff Management
                              </span>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                {...register("permissions")}
                                value="Query Management"
                              />
                              <span className="form-label pt-2 fw-bold">
                                Query Management
                              </span>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                {...register("permissions")}
                                value="Push Management"
                              />
                              <span className="form-label pt-2 fw-bold">
                                Push Management
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="col-3">
                          {/* <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input pe-3"
                              {...register("permissions", {
                                validate: (value) =>
                                  value.length > 0 ||
                                  "At least one permission must be selected",
                              })}
                              value="Chats Management"
                            />
                            <span className="form-label pt-2 fw-bold ">
                              Chats Management
                            </span>
                          </div> */}
                          <div style={{ marginLeft: "12px" }}>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                {...register("permissions")}
                                value="About us Management"
                              />
                              <span className="form-label pt-2 fw-bold">
                                About us Management
                              </span>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                {...register("permissions")}
                                value="Staff Management"
                              />
                              <span className="form-label pt-2 fw-bold">
                                Staff Management
                              </span>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                {...register("permissions")}
                                value="Terms and Condition Management"
                              />
                              <span className="form-label pt-2 fw-bold">
                                Terms and Condition Management
                              </span>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                {...register("permissions")}
                                value="FAQ Management"
                              />
                              <span className="form-label pt-2 fw-bold">
                                FAQ Management
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="col-3">
                          {/* <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input pe-3"
                              {...register("permissions", {
                                validate: (value) =>
                                  value.length > 0 ||
                                  "At least one permission must be selected",
                              })}
                              value="Payment Managamnent"
                            />
                            <span className="form-label pt-2 fw-bold ">
                              Payment Managamnent
                            </span>
                          </div> */}
                          <div style={{ marginLeft: "12px" }}>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                {...register("permissions")}
                                value="Subscription Plan Management"
                              />
                              <span className="form-label pt-2 fw-bold">
                                Subscription Plan Management
                              </span>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                {...register("permissions")}
                                value="Transaction Management"
                              />
                              <span className="form-label pt-2 fw-bold">
                                Transaction Management
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {errors.permissions && (
                        <p className="error-boundary animate__animated animate__headShake">
                          {errors.permissions.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group text-center">
                      <button
                        className="comman-btn animate__animated animate__bounceIn"
                        type="submit"
                      >
                        ADD SUB-USER
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddSubAdmin;
