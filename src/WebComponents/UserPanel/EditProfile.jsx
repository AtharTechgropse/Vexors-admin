import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminData } from "../../apiServices/UserHttpService/UserMainHttp";
import {
  UserEditProfile,
  changePasswordAdmin,
} from "../../apiServices/UserHttpService/UserLoginHttpService";
import { toast } from "react-toastify";

const EditProfile = () => {
  const {
    register: profileRegister,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    setValue: setProfileValue,
    formState: { errors: profileErrors },
  } = useForm();

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm();

  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data, error } = await getAdminData();
      if (!error && data?.results) {
        const admin = data.results.admin;
        setUser(admin);
        setImagePreview(admin.profileImage || "res/assets/img/user/user1.jpg");

        resetProfile({
          name: admin.fullName || "",
          email: admin.email || "",
          mobile: admin.phoneNumber || "",
          address: admin.address || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const updateProfile = async (formData) => {
    console.log(formData);
    
    try {
      let profilePayload = new FormData();

      profilePayload.append("fullName", formData.name);
      profilePayload.append("address", formData.address);
      profilePayload.append("email", formData.email);
      profilePayload.append("phoneNumber", formData.mobile);
      profilePayload.append("countryCode", "+966");
      if (formData.imageData) {
        profilePayload.append("profileImage", formData.imageData);
      }

      const { data: response } = await UserEditProfile(profilePayload);
      if (!response?.data?.error) {
        toast.success("Profile updated successfully!");
        fetchUserData();
        navigate("/")
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const updatePassword = async (formData) => {
    if (!formData.oldPassword) {
      toast.error("Please enter your old password.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      let passwordPayload = {
        password: formData.oldPassword,
        newPassword: formData.password,
      };

      const { data: passwordResponse } = await changePasswordAdmin(
        passwordPayload
      );
      if (!passwordResponse?.success) {
        toast.error("Error changing password!");
        return;
      }
      toast.success("Password updated successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPG, JPEG, and PNG formats are allowed.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfileValue("imageData", file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Header />
      <div className="main-wrapper">
        <Sidebar />
        <main className="content-part-wrapper">
          <div className="animate__animated animate__fadeInUp animate__faster">
            <div className="comman-design">
              <div className="form-design">
                {/* PROFILE UPDATE FORM */}
                <h3>Update Profile</h3>
                <form onSubmit={handleProfileSubmit(updateProfile)}>
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
                        {...profileRegister("imageData", {
                          onChange: (e) => handleImageUpload(e),
                        })}
                      />
                      <img
                        src={imagePreview}
                        className="profile-img"
                        alt="Profile"
                      />
                      <div className="upload-icon">
                        <i className="fa fa-upload"></i>
                      </div>
                    </label>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          {...profileRegister("name", {
                            required: "Name is required",
                          })}
                        />
                        {profileErrors.name && (
                          <span className="error-boundary">
                            {profileErrors.name.message}
                          </span>
                        )}
                      </div>
                    </div>


                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          disabled
                          type="email"
                          className="form-control"
                          {...profileRegister("email", {
                            required: "Email is required",
                          })}
                        />
                        {profileErrors.email && (
                          <span className="error-boundary">
                            {profileErrors.email.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Mobile No.</label>
                        <input
                          type="text"
                          className="form-control"
                          {...profileRegister("mobile", {
                            required: "Mobile is required",
                          })}
                        />
                        {profileErrors.mobile && (
                          <span className="error-boundary">
                            {profileErrors.mobile.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Address</label>
                        <textarea
                          className="form-control"
                          {...profileRegister("address", {
                            required: "Address is required",
                          })}
                        ></textarea>
                        {profileErrors.address && (
                          <span className="error-boundary">
                            {profileErrors.address.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="comman-btn">
                    Save Changes
                  </button>
                </form>

                <hr className="my-4" />
                <h3>Change Password</h3>
                <form onSubmit={handlePasswordSubmit(updatePassword)}>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Old Password</label>
                      <input
                        type="password"
                        className="form-control"
                        {...passwordRegister("oldPassword")}
                      />
                    </div>

                    <div className="col-md-6">
                      <label>New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        {...passwordRegister("password")}
                      />
                    </div>

                    <div className="col-md-6">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        {...passwordRegister("confirmPassword")}
                      />
                    </div>
                  </div>

                  <button type="submit" className="comman-btn mt-2">
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;
