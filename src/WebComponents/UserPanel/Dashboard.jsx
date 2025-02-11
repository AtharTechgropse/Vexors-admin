import React, { useEffect, useState } from "react";
import { Bot, Users, UsersRound } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import { GetDashboardStats } from "../../apiServices/UserHttpService/UserMainHttp";

const performanceData = [
  { date: "Jan", 2023: 100, 2024: 300 },
  { date: "Feb", 2023: 400, 2024: 500 },
  { date: "Mar", 2023: 300, 2024: 600 },
  { date: "Apr", 2023: 500, 2024: 700 },
  { date: "May", 2023: 700, 2024: 800 },
  { date: "Jun", 2023: 650, 2024: 400 },
  { date: "Jul", 2023: 500, 2024: 300 },
  { date: "Aug", 2023: 450, 2024: 250 },
  { date: "Sep", 2023: 400, 2024: 200 },
  { date: "Oct", 2023: 500, 2024: 150 },
  { date: "Nov", 2023: 600, 2024: 50 },
  { date: "Dec", 2023: 700, 2024: 0 },
];

const Dashboard = () => {
  const [adminStats, setAdminStats] = useState();

  useEffect(() => {
    GetApiData();
  }, []);

  const GetApiData = async (type) => {
    try {
      const { data, error } = await GetDashboardStats();
      if (!error && data?.results) {
        setAdminStats(data.results);
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
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="bg-success opacity-75 comman-card rounded-3 statics-card">
                  <div className="comman-card-body">
                    <div className="d-flex justify-content-between">
                      <div className="">
                        <h1 className="card-heading-bold text-white">
                          {adminStats?.totalUsers}
                        </h1>
                        <p className="m-0 text-white fw-medium">Total Users</p>
                      </div>
                      <div className="dash-card-icon">
                        <i className="fa-solid fa-users" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="bg-main opacity-75 comman-card rounded-3 statics-card">
                  <div className="comman-card-body">
                    <div className="d-flex justify-content-between">
                      <div className="">
                        <h1 className="card-heading-bold text-white">
                          {adminStats?.totalSubUsers}
                        </h1>
                        <p className="m-0 text-white fw-medium">
                          Total Sub-Users
                        </p>
                      </div>
                      <div className="dash-card-icon">
                        <i className="fa-solid fa-user-plus" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="bg-danger opacity-75 comman-card rounded-3 statics-card">
                  <div className="comman-card-body">
                    <div className="d-flex justify-content-between">
                      <div className="">
                        <h1 className="card-heading-bold text-white">
                          {adminStats?.totalVendors}
                        </h1>
                        <p className="m-0 text-white fw-medium">
                          Total Vendors
                        </p>
                      </div>
                      <div className="dash-card-icon">
                        <i className="fa-solid fa-user-cog" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="bg-danger opacity-75 comman-card rounded-3 statics-card">
                  <div className="comman-card-body">
                    <div className="d-flex justify-content-between">
                      <div className="">
                        <h1 className="card-heading-bold text-white">
                          {adminStats?.totalSubVendors}
                        </h1>
                        <p className="m-0 text-white fw-medium">
                          Total Sub-Vendors
                        </p>
                      </div>
                      <div className="dash-card-icon">
                        <i className="fa-solid fa-user-circle" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="bg-success opacity-75 comman-card rounded-3 statics-card">
                  <div className="comman-card-body">
                    <div className="d-flex justify-content-between">
                      <div className="">
                        <h1 className="card-heading-bold text-white">
                          {adminStats?.totalRFPs}
                        </h1>
                        <p className="m-0 text-white fw-medium">
                          Total RFPs/RFQs
                        </p>
                      </div>
                      <div className="dash-card-icon">
                        <i className="fa-solid fa-pie-chart" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="bg-main opacity-75 comman-card rounded-3 statics-card">
                  <div className="comman-card-body">
                    <div className="d-flex justify-content-between">
                      <div className="">
                        <h1 className="card-heading-bold text-white">
                          {adminStats?.totalRevenue}
                        </h1>
                        <p className="m-0 text-white fw-medium">
                          Total Revenue
                        </p>
                      </div>
                      <div className="dash-card-icon">
                        <i className="fa-solid fa-hand-holding-dollar" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="comman-card">
              <div className="comman-card-header">
                <h5 className="comman-card-heading">Sales Overview</h5>
                <div className="col-auto">
                  <div className="dropdown">
                    <button
                      className="comman-btn px-3 py-2"
                      type="button"
                      id="filterDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa fa-filter" />
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="filterDropdown"
                    >
                      <li className="dropdown-item">
                        <input type="datetime-local" className="form-control" />
                      </li>
                      <li className="dropdown-item">
                        <hr className="dropdown-divider" />
                      </li>
                      <li className="dropdown-item">
                        <div className="form-design border p-2">
                          <p className="m-0">Filter by Date Range</p>
                          <div className="form-group">
                            <label className="form-label">Start Date</label>
                            <input type="date" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label className="form-label">End Date</label>
                            <input type="date" className="form-control" />
                          </div>
                          <div className="mt-2">
                            <button className="comman-btn w-100">
                              Filter by Date Range
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="comman-card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="d-flex gap-3 align-items-center">
                      <h1 className="comman-heading">$2,830,775</h1>
                      <div className="sale-down-btn">
                        <i className="fa-solid fa-arrow-down-long text-danger" />
                      </div>
                      <p className="comman-text-xs text-danger mb-0">-21.3%</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex gap-2 justify-content-end">
                      <p className="sale-text-year">2023</p>
                      <p className="sale-text-year">Current Year (2024)</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart
                      data={performanceData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <defs>
                        {/* Gradient for 2023 */}
                        <linearGradient
                          id="color2023"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#6b5bff"
                            stopOpacity={0.8}
                          />{" "}
                          {/* Increased opacity */}
                          <stop
                            offset="95%"
                            stopColor="#6b5bff"
                            stopOpacity={0.3}
                          />
                        </linearGradient>

                        {/* Gradient for 2024 */}
                        <linearGradient
                          id="color2024"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#00c9a7"
                            stopOpacity={0.8}
                          />{" "}
                          {/* Increased opacity */}
                          <stop
                            offset="95%"
                            stopColor="#00c9a7"
                            stopOpacity={0.3}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />

                      {/* 2024 Data - Plotted First to be Below */}
                      <Area
                        type="monotone"
                        dataKey="2024"
                        stroke="#00c9a7"
                        fill="url(#color2024)"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        fillOpacity={0.8} // Ensure opacity is set
                      />

                      {/* 2023 Data - Plotted on Top */}
                      <Area
                        type="monotone"
                        dataKey="2023"
                        stroke="#6b5bff"
                        fill="url(#color2023)"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        fillOpacity={0.8} // Ensure opacity is set
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-6">
                <div className="comman-card">
                  <div className="comman-card-header">
                    <h2 className="comman-card-heading">Recent Users</h2>
                  </div>
                  <div className="comman-card-body">
                    <div className="d-flex gap-3 my-2 align-items-center">
                      <div className="dash-product-img">
                        <img src="res/assets/img/user/user-3.png" alt="" />
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <div className="">
                          <p className="m-0 comman-sm-text fw-medium">
                            Jhon Doe
                          </p>
                          <p className="m-0 comman-text-xs fw-light">
                            20-20-2024
                          </p>
                        </div>
                        <p className="comman-sm-text fw-semibold">
                          jhondoe@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-3 my-2 align-items-center">
                      <div className="dash-product-img">
                        <img src="res/assets/img/user/user9.jpg" alt="" />
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <div className="">
                          <p className="m-0 comman-sm-text fw-medium">
                            Peter Doe
                          </p>
                          <p className="m-0 comman-text-xs fw-light">
                            20-20-2024
                          </p>
                        </div>
                        <p className="comman-sm-text fw-semibold">
                          Peter@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-3 my-2 align-items-center">
                      <div className="dash-product-img">
                        <img src="res/assets/img/user/user-3.png" alt="" />
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <div className="">
                          <p className="m-0 comman-sm-text fw-medium">
                            Peter Doe
                          </p>
                          <p className="m-0 comman-text-xs fw-light">
                            20-20-2024
                          </p>
                        </div>
                        <p className="comman-sm-text fw-semibold">
                          Peter@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-3 my-2 align-items-center">
                      <div className="dash-product-img">
                        <img src="res/assets/img/user/user-5.png" alt="" />
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <div className="">
                          <p className="m-0 comman-sm-text fw-medium">
                            Peter Doe
                          </p>
                          <p className="m-0 comman-text-xs fw-light">
                            20-20-2024
                          </p>
                        </div>
                        <p className="comman-sm-text fw-semibold">
                          Peter@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-3 my-2 align-items-center">
                      <div className="dash-product-img">
                        <img src="res/assets/img/user/user-4.png" alt="" />
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <div className="">
                          <p className="m-0 comman-sm-text fw-medium">
                            @Vibhu Shrivastav
                          </p>
                          <p className="m-0 comman-text-xs fw-light">
                            20-20-2024
                          </p>
                        </div>
                        <p className="comman-sm-text fw-semibold">
                          vibhushrivastav@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-3 my-2 align-items-center">
                      <div className="dash-product-img">
                        <img src="res/assets/img/user/user9.jpg" alt="" />
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <div className="">
                          <p className="m-0 comman-sm-text fw-medium">
                            @Vibhu Shrivastav
                          </p>
                          <p className="m-0 comman-text-xs fw-light">
                            20-20-2024
                          </p>
                        </div>
                        <p className="comman-sm-text fw-semibold">
                          vibhushrivastav@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="comman-card">
                  <div className="comman-card-header">
                    <h2 className="comman-card-heading">Recent Staff</h2>
                  </div>
                  <div className="comman-card-body">
                    <div className="d-flex gap-3 my-2 align-items-center">
                      <div className="dash-product-img">
                        <img src="res/assets/img/user/user1.jpg" alt="" />
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <div className="">
                          <p className="m-0 comman-sm-text fw-medium">
                            Jhon Doe
                          </p>
                          <p className="m-0 comman-text-xs fw-light">
                            20-20-2024
                          </p>
                        </div>
                        <p className="comman-sm-text fw-semibold">
                          jhondoe@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-3 my-2 align-items-center">
                      <div className="dash-product-img">
                        <img src="res/assets/img/user/user-3.png" alt="" />
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <div className="">
                          <p className="m-0 comman-sm-text fw-medium">
                            Peter Doe
                          </p>
                          <p className="m-0 comman-text-xs fw-light">
                            20-20-2024
                          </p>
                        </div>
                        <p className="comman-sm-text fw-semibold">
                          Peter@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-3 my-2 align-items-center">
                      <div className="dash-product-img">
                        <img src="res/assets/img/user/user-5.png" alt="" />
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <div className="">
                          <p className="m-0 comman-sm-text fw-medium">
                            Peter Doe
                          </p>
                          <p className="m-0 comman-text-xs fw-light">
                            20-20-2024
                          </p>
                        </div>
                        <p className="comman-sm-text fw-semibold">
                          Peter@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-3 my-2 align-items-center">
                      <div className="dash-product-img">
                        <img src="res/assets/img/user/user9.jpg" alt="" />
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <div className="">
                          <p className="m-0 comman-sm-text fw-medium">
                            Peter Doe
                          </p>
                          <p className="m-0 comman-text-xs fw-light">
                            20-20-2024
                          </p>
                        </div>
                        <p className="comman-sm-text fw-semibold">
                          Peter@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-3 my-2 align-items-center">
                      <div className="dash-product-img">
                        <img src="res/assets/img/user/user-3.png" alt="" />
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <div className="">
                          <p className="m-0 comman-sm-text fw-medium">
                            @Vibhu Shrivastav
                          </p>
                          <p className="m-0 comman-text-xs fw-light">
                            20-20-2024
                          </p>
                        </div>
                        <p className="comman-sm-text fw-semibold">
                          vibhushrivastav@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-3 my-2 align-items-center">
                      <div className="dash-product-img">
                        <img src="res/assets/img/user/user-5.png" alt="" />
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <div className="">
                          <p className="m-0 comman-sm-text fw-medium">
                            @Vibhu Shrivastav
                          </p>
                          <p className="m-0 comman-text-xs fw-light">
                            20-20-2024
                          </p>
                        </div>
                        <p className="comman-sm-text fw-semibold">
                          vibhushrivastav@gmail.com
                        </p>
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

export default Dashboard;

