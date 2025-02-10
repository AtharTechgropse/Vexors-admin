import React, { useEffect, useState } from "react";
import {
  DeleteUser,
  GetAllUsers,
  UpdateUserStatus,
} from "../../../apiServices/UserHttpService/UserMainHttp";
import {
  MenuIcon,
  UserCircle,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import { Link } from "react-router-dom";

const CategoryManage = () => {
  const [usersListing, setUsersListing] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const perPage = 10;
  const [userType, setUserType] = useState("Approved");
  useEffect(() => {
    GetApiData();
  }, [searchQuery, currentPage, startDate, endDate]);

  const GetApiData = async () => {
    let payload = {
      search: searchQuery,
      page: currentPage,
      per_page: perPage,
      type: "sub-user",
    };

    if (startDate) payload.start_date = startDate;
    if (endDate) payload.end_date = endDate;

    setLoading(true);
    try {
      const { data, error } = await GetAllUsers(payload);
      if (!error && data?.results) {
        setUsersListing(data.results.user);
        setTotalPages(Math.ceil(data.results.totalPages));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDateFilter = () => {
    if (startDate && endDate) {
      setCurrentPage(1);
      GetApiData();
    } else {
      alert("Please select both start and end dates!");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await DeleteUser(userId);
        GetApiData();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const ApproveUser = async (userId, status) => {
    try {
      const { data, error } = await UpdateUserStatus(userId, {
        activeStatus: status,
      });
      if (!error && data?.results) {
        GetApiData();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleStatusChange = async (userId, isActive) => {
    try {
      await UpdateUserStatus(userId, { is_active: !isActive });
      GetApiData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const Pagination = () => (
    <nav aria-label="Page navigation" className="mt-3 mb-3">
      <ul className="pagination justify-content-center gap-3">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link rounded-3"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            «
          </button>
        </li>
        {[...Array(totalPages).keys()].map((page) => (
          <li
            key={page + 1}
            className={`page-item ${currentPage === page + 1 ? "active" : ""}`}
          >
            <button
              className="page-link rounded-3"
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link rounded-3"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            »
          </button>
        </li>
      </ul>
    </nav>
  );

  return (
    <div>
      <Header />
      <div className="main-wrapper">
        <Sidebar />
        <main className="content-part-wrapper ">
          <div className="animate__animated animate__fadeInUp animate__faster">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">
                  <i className="fa fa-home"></i>
                </a>
              </li>
              <li className="breadcrumb-item active">
                Category Management
              </li>
            </ol>
            <div className="mt-4 d-flex justify-content-between">
              <div className="">
                <h1 className="main-heading m-0">Categories</h1>
              </div>
              <div className="d-flex gap-2">
                <div className="search-wrapper position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search...."
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <i className="fa fa-search search-icon" />
                </div>

                <Link to="/Users/Add-SubUsers" class="comman-border-btn">
                  <div class="d-flex gap-2 align-items-center">
                    <i class="fa-solid fa-plus"></i>
                    Create new
                  </div>
                </Link>

                <div class="col-auto">
                  <div class="dropdown">
                    <button
                      class="comman-btn px-3 py-2"
                      type="button"
                      id="filterDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="fa fa-filter"></i>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="filterDropdown">
                      <li class="dropdown-item">
                        <input
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          type="date"
                          class="form-control"
                        />
                      </li>
                      <li class="dropdown-item">
                        <hr class="dropdown-divider" />
                      </li>
                      <li class="dropdown-item">
                        <div class="form-design border p-2">
                          <p class="m-0">Filter by Date Range</p>
                          <div class="form-group">
                            <label class="form-label">Start Date</label>
                            <input
                              type="date"
                              class="form-control"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                            />
                          </div>
                          <div class="form-group">
                            <label class="form-label">End Date</label>
                            <input
                              type="date"
                              class="form-control"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                            />
                          </div>
                          <div class="mt-2">
                            <button
                              class="comman-btn w-100"
                              onClick={handleDateFilter}
                            >
                              Filter by Date Range
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="comman-table mt-4 pb-1">
              <div className="table-responsive">
                {loading ? (
                  <div
                    className="w-100"
                    style={{
                      height: "100vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="loader"></div>
                  </div>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Sr.No.</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Business Name</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersListing?.map((user, index) => (
                        <tr key={user.id}>
                          <td>{(currentPage - 1) * perPage + index + 1}</td>
                          <td>
                            <div className="table-user d-flex justify-content-center align-items-center">
                              {user?.profileImage?.length > 0 ? (
                                <img src={user.profileImage} alt={user.name} />
                              ) : (
                                <UserCircle color="#fff" />
                              )}
                            </div>
                          </td>
                          <td>{user.fullName}</td>
                          <td>{user.businessName}</td>
                          <td>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <div
                              className={`badge ${
                                user.status ? "bg-success" : "bg-light-danger"
                              }`}
                            >
                              {user.status ? "Active" : "Inactive"}
                            </div>
                          </td>
                          <td>
                            <div className="dropdown table-btn-dropdown">
                              <MenuIcon style={{ cursor: "pointer" }} />
                              <ul
                                style={{ zIndex: "" }}
                                className="table-dropdown-content dropdown-menu p-0"
                              >
                                {userType === "Pending" && (
                                  <>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() =>
                                          ApproveUser(user?._id, "Approved")
                                        }
                                      >
                                        <UserRoundCheck
                                          size={16}
                                          className="pe-1"
                                        />{" "}
                                        Approve
                                      </button>
                                    </li>

                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() =>
                                          ApproveUser(user?._id, "Declined")
                                        }
                                      >
                                        <UserRoundX
                                          size={16}
                                          className="pe-1"
                                        />{" "}
                                        Decline
                                      </button>
                                    </li>
                                  </>
                                )}

                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => setSelectedUser(user)}
                                  >
                                    <i className="fa-solid fa-desktop pe-2" />{" "}
                                    View
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item text-danger"
                                    onClick={() => handleDeleteUser(user.id)}
                                  >
                                    <i className="fa-solid fa-trash pe-2 text-danger" />{" "}
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              {usersListing?.length !== 0 && <Pagination />}
            </div>

            {/* User Detail Modal */}
            {selectedUser && (
              <div className="custom-modal shadow-right">
                <div className="custom-modal-content">
                  {/* Modal Header */}
                  <div className="custom-modal-header">
                    <button
                      className="close-btn"
                      onClick={() => setSelectedUser(null)}
                    >
                      <i className="fa-solid fa-close" />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="custom-modal-body">
                    <div className="modal-img-wrapper">
                      <img
                        src={
                          selectedUser.image || "assets/img/default-user.webp"
                        }
                        alt={selectedUser.name}
                      />
                    </div>
                    {/* User Details */}
                    <div className="mt-3">
                      <p className="comman-sm-text text-light m-0">Status</p>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectedUser.is_active}
                          onChange={() =>
                            handleStatusChange(
                              selectedUser.id,
                              selectedUser.is_active
                            )
                          }
                        />
                      </div>
                    </div>
                    {/* ... other user details ... */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryManage;

