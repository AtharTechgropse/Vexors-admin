import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminData, GetUser } from "../../apiServices/UserHttpService/UserMainHttp";
import { UserEditProfile } from "../../apiServices/UserHttpService/UserLoginHttpService";

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    GetApiData();
  }, []);

  const GetApiData = async () => {
    try {
      const { data, error } = await getAdminData();
      if (!error && data?.results) {
        setUser(data.results.user);
        setImagePreview(data.results.user.profileImage || "res/assets/img/user/user1.jpg");
        reset({
          name: data.results.user.name || "",
          email: data.results.user.email || "",
          mobile: data.results.user.mobile || "",
          address: data.results.user.address || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const response = await UserEditProfile(id, formData);
      if (response?.success) {
        alert("Profile updated successfully!");
        GetApiData(); // Refresh data after update
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="profile-img-container text-center mb-4">
                    <label htmlFor="profileImage" className="profile-img-wrapper">
                      <input
                        type="file"
                        id="profileImage"
                        className="d-none"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <img
                        src={imagePreview ?? "res/assets/img/user/user1.jpg"}
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
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <span className="error-boundary">{errors.name.message}</span>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                          })}
                        />
                        {errors.email && <span className="error-boundary">{errors.email.message}</span>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Mobile no.</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("mobile", { required: "Mobile number is required" })}
                        />
                        {errors.mobile && <span className="error-boundary">{errors.mobile.message}</span>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("address", { required: "Address is required" })}
                        />
                        {errors.address && <span className="error-boundary">{errors.address.message}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 border-top">
                    <div className="row mt-4">
                      <div className="col-md-4 position-relative">
                        <label className="form-label">Password</label>
                        <input type="password" placeholder="*******" className="form-control" {...register("password")} />
                        <i className="fa fa-eye-slash password-hide" />
                      </div>
                      <div className="col-md-4 position-relative">
                        <label className="form-label">Change Password</label>
                        <input type="password" placeholder="*******" className="form-control" {...register("newPassword")} />
                        <i className="fa fa-eye-slash password-hide" />
                      </div>
                      <div className="col-md-4 position-relative">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" placeholder="*******" className="form-control" {...register("confirmPassword")} />
                        <i className="fa fa-eye-slash password-hide" />
                      </div>
                      <div className="col-12 mt-4">
                        <button type="submit" className="comman-btn">Save Changes</button>
                      </div>
                    </div>
                  </div>
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
