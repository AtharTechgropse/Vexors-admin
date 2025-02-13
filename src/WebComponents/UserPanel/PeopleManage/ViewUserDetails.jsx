import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import { GetUser } from "../../../apiServices/UserHttpService/UserMainHttp";
import { useNavigate, useParams } from "react-router-dom";

const ViewUserDetails = () => {
  const [user, setUser] = useState();
  let { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    GetApiData();
  }, []);

  const GetApiData = async (type) => {
    try {
      const { data, error } = await GetUser(id);
      if (!error && data?.results) {
        setUser(data.results.user);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="main-wrapper">
        <Sidebar />
        <main className="content-part-wrapper ">
          <div className="animate__animated animate__fadeInUp animate__faster">
            <div className="">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">
                    <i className="fa fa-home" />
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="Users.html">User Management</a>
                </li>
                <li className="breadcrumb-item active">
                  User Management Details
                </li>
              </ol>
              <div className="mt-4 d-flex justify-content-between">
                <div className="">
                  <h1 className="main-heading m-0">User Details</h1>
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
              <div className="comman-tabs mt-4">
                <div className="row">
                  <div className="col-md-5"></div>
                  <div className="col-md-7">
                    <div className="w-100 d-flex justify-content-end">
                      <ul
                        className="nav nav-pills"
                        id="userTabs"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="user-info-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#user-info"
                            type="button"
                            role="tab"
                            aria-controls="user-info"
                            aria-selected="true"
                          >
                            User Information
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="user-business-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#user-business"
                            type="button"
                            role="tab"
                            aria-controls="user-business"
                            aria-selected="false"
                          >
                            User Business Profile
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="user-subscription-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#user-subscription"
                            type="button"
                            role="tab"
                            aria-controls="user-subscription"
                            aria-selected="false"
                          >
                            User Subscription Plan
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="tab-content mt-3" id="userTabsContent">
                  <div
                    className="tab-pane fade show active"
                    id="user-info"
                    role="tabpanel"
                    aria-labelledby="user-info-tab"
                  >
                    <div className="comman-design">
                      <div className="row">
                        <div className="col-auto">
                          <div className="user-view-img2 overflow-hidden">
                            <img
                              src={
                                user?.profileImage ??
                                "assets/img/user/user-3.png"
                              }
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="row">
                            <div className="col-md-4">
                              <p className="m-0 fs-6 text-dark-light fw-medium">
                                <span>
                                  {" "}
                                  <i className="fa-solid fa-user fs-6" />{" "}
                                </span>
                                Name
                              </p>
                              <p className="fs-6 text-dark-light">
                                {user?.fullName}
                              </p>
                            </div>
                            <div className="col-md-4">
                              <p className="m-0 fs-6 text-dark-light fw-medium">
                                <span>
                                  {" "}
                                  <i className="fa-solid fa-envelope" />{" "}
                                </span>
                                Email
                              </p>
                              <p className="fs-6 text-dark-light">
                                {user?.email}
                              </p>
                            </div>
                            <div className="col-md-4">
                              <p className="m-0 fs-6 text-dark-light fw-medium">
                                <span>
                                  {" "}
                                  <i className="fa-solid fa-phone-volume fs-6" />{" "}
                                </span>
                                Mobile No.
                              </p>
                              <p className="fs-6 text-dark-light">
                                {user?.phoneNumber}
                              </p>
                            </div>
                            <div className="col-md-4">
                              <p className="m-0 fs-6 text-dark-light fw-medium">
                                <span>
                                  {" "}
                                  <i className="fa-solid fa-birthday-cake" />{" "}
                                </span>
                                Date of Birth
                              </p>
                              <p className="fs-6 text-dark-light">
                                {user?.dob?.slice(0, 10)}
                              </p>
                            </div>
                            <div className="col-md-4">
                              <p className="m-0 fs-6 text-dark-light fw-medium">
                                <span>
                                  {" "}
                                  <i className="fa-solid fa-transgender fs-6" />{" "}
                                </span>
                                Gender
                              </p>
                              <p className="fs-6 text-dark-light">
                                {user?.gender}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* User Business Profile Tab */}
                  <div
                    className="tab-pane fade"
                    id="user-business"
                    role="tabpanel"
                    aria-labelledby="user-business-tab"
                  >
                    <div className="">
                      <div className="comman-design">
                        <div className="comman-table shadow-none">
                          <div className="mb-4">
                            <div className="row">
                              <div className="col-md-3 mb-4">
                                <p className="m-0 fs-6 text-dark-light fw-medium">
                                  Number of Employees
                                </p>
                                <p className="fs-6 text-dark-light">
                                  1001 - 5,000
                                </p>
                              </div>
                              <div className="col-md-3 mb-4">
                                <p className="m-0 fs-6 text-dark-light fw-medium">
                                  Annual Turnover
                                </p>
                                <p className="fs-6 text-dark-light">
                                  $51k - $100k
                                </p>
                              </div>
                              <div className="col-md-3 mb-4">
                                <p className="m-0 fs-6 text-dark-light fw-medium">
                                  Establishment Date
                                </p>
                                <p className="fs-6 text-dark-light">
                                  20/05/1980
                                </p>
                              </div>
                              <div className="col-md-3 mb-4">
                                <p className="m-0 fs-6 text-dark-light fw-medium">
                                  Postal code
                                </p>
                                <p className="fs-6 text-dark-light">234567</p>
                              </div>
                              <div className="col-md-3 mb-4">
                                <p className="m-0 fs-6 text-dark-light fw-medium">
                                  Linkedin URL
                                </p>
                                <p className="fs-6 text-dark-light">
                                  www.dunedream.com
                                </p>
                              </div>
                              <div className="col-md-3 mb-4">
                                <p className="m-0 fs-6 text-dark-light fw-medium">
                                  Website
                                </p>
                                <p className="fs-6 text-dark-light">
                                  www.dunedream.com
                                </p>
                              </div>
                              <div className="col-md-3 mb-4">
                                <p className="m-0 fs-6 text-dark-light fw-medium">
                                  Tax ID
                                </p>
                                <p className="fs-6 text-dark-light">
                                  5690-8976-8777
                                </p>
                              </div>
                              <div className="col-md-12 mb-4">
                                <p className="m-0 fs-6 text-dark-light fw-medium">
                                  About Business
                                </p>
                                <p className="fs-6 text-dark-light">
                                  The amount needed depends on the type of
                                  trading you want to do. For Forex trading, you
                                  can start with as little as $100 with some
                                  brokers. For stock trading, the minimum
                                  depends on the broker and the stock prices.
                                  However, it’s recommended to have a sufficient
                                  balance to manage risk properly.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="border-top pt-3 border-primary">
                            <h3 className="main-heading m-0 w-fit border-bottom border-primary">
                              <i className="fa fa-map-marker-alt" /> Location
                            </h3>
                            <div className="row mt-4">
                              <div className="col-md-8">
                                <div className="">
                                  <h6 className="fs-6 text-dark-light-light">
                                    Where We Supply
                                  </h6>
                                  <p className="fs-6 text-dark-light">
                                    Sri Lanka, United States of America, Saudi
                                    Arabia, India, China, South Korea
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="border-top pt-3 border-primary">
                            <h3 className="main-heading m-0 w-fit border-bottom border-primary">
                              <i className="fa fa-trademark" /> Trade License
                            </h3>
                            <div className="row mt-4">
                              <div className="col-auto ps-0">
                                <div className="comman-document">
                                  <img src="assets/img/pdf.png" alt="" />
                                  <a href="">
                                    <i className="fa fa-download" />
                                  </a>
                                </div>
                              </div>
                              <div className="col-auto ps-0">
                                <div className="comman-document">
                                  <img src="assets/img/pdf.png" alt="" />
                                  <a href="">
                                    <i className="fa fa-download" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="border-top pt-3 border-primary mt-4">
                            <h3 className="main-heading m-0 w-fit border-bottom border-primary">
                              <i className="fa fa-certificate" /> Business
                              Registration Certificate
                            </h3>
                            <div className="row mt-4">
                              <div className="col-auto ps-0">
                                <div className="comman-document">
                                  <img src="assets/img/pdf.png" alt="" />
                                  <a href="">
                                    <i className="fa fa-download" />
                                  </a>
                                </div>
                              </div>
                              <div className="col-auto ps-0">
                                <div className="comman-document">
                                  <img src="assets/img/pdf.png" alt="" />
                                  <a href="">
                                    <i className="fa fa-download" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* User Subscription Plan Tab */}
                  <div
                    className="tab-pane fade"
                    id="user-subscription"
                    role="tabpanel"
                    aria-labelledby="user-subscription-tab"
                  >
                    <div className="comman-design">
                      <div className="comman-table shadow-none">
                        <div className="">
                          <div className="row">
                            <div className="col-md-3">
                              <p className="m-0 fs-6 text-dark-light fw-medium">
                                Current Plan
                              </p>
                              <p className="fs-6 text-dark-light">Free Plan</p>
                            </div>
                            <div className="col-md-3">
                              <p className="m-0 fs-6 text-dark-light fw-medium">
                                Monthly Plan
                              </p>
                              <p className="fs-6 text-dark-light">50/Monthly</p>
                            </div>
                            <div className="col-md-3">
                              <p className="m-0 fs-6 text-dark-light fw-medium">
                                Status
                              </p>
                              <p className="fs-6 text-dark-light">
                                <span className="badge bg-light-success text-success">
                                  Active
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* <div class="border-top pt-3 border-primary">
                                    <h3 class="main-heading m-0 w-fit border-bottom border-primary">
                                        Available Plan
                                    </h3>
                                    <div class="row mt-4">
                                        <div class="col-md-8">
                                            <div class="">
                                                <h6 class="fs-6 text-dark-light-light">Free Plan</h6>
                                                <p class="fs-6 text-dark-light">Browse vendors and services, Access to limited vendor reviews, Basic customer support.</p>
                                            </div>
                                            <div class="">
                                                <h6 class="fs-6 text-dark-light-light">Premium Plan</h6>
                                                <p class="fs-6 text-dark-light">Browse vendors and services, Access to limited vendor reviews, Basic customer support.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                        <div className="border-top pt-3 border-primary">
                          <h3 className="main-heading m-0 w-fit border-bottom border-primary">
                            Payment Mothed
                          </h3>
                          <div className="row mt-4">
                            <div className="col-md-12">
                              <div className="row">
                                <div className="col-md-3 mb-4">
                                  <p className="m-0 fs-6 text-dark-light fw-medium">
                                    Credit Card
                                  </p>
                                  <p className="fs-6 text-dark-light">
                                    **** **** **** 6789
                                  </p>
                                </div>
                                <div className="col-md-3 mb-4">
                                  <p className="m-0 fs-6 text-dark-light fw-medium">
                                    Date
                                  </p>
                                  <p className="fs-6 text-dark-light">
                                    Dec 27, 2024
                                  </p>
                                </div>
                                <div className="col-md-3 mb-4">
                                  <p className="m-0 fs-6 text-dark-light fw-medium">
                                    Amount
                                  </p>
                                  <p className="fs-6 text-dark-light">600</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewUserDetails;
