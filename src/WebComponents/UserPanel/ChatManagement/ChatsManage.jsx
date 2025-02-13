import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import { GetAllUsers, GetUser } from "../../../apiServices/UserHttpService/UserMainHttp";
import { useNavigate, useParams } from "react-router-dom";
import "animate.css"; // Import Animate.css

const ChatsManage = () => {
  const [user, setUser] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allChats, setAllChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    GetApiData();
  }, [searchQuery, currentPage]);

  const GetApiData = async (type) => {
    let payload = {
      search: searchQuery,
      page: currentPage,
      per_page: 10,
    };

    setLoading(true);

    try {
      const { data, error } = await GetAllUsers(payload);
      if (!error && data?.results) {
        setAllChats(data.results.user);
        setTotalPages(Math.ceil(data.results.totalPages));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    console.log("Form Submitted:", formData);
    try {
      const { data, error } = await GetUser(id);
      if (!error && data?.results) {
      }
    } catch (error) {
      console.error("Error fetching users:", error);
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
                <a href="#">Chats Management</a>
              </li>
            </ol>

            <div className="comman-design">
              <div className="row">
                <div className="col-md-4 border-end border-start">
                  <div className="left-chats-wrapper">
                    <div className="left-chat-header">
                      <div className="d-flex justify-content-between align-items-center">
                        <h2 className="m-0">All Messages</h2>
                        <div
                          className="add-user"
                          data-bs-toggle="modal"
                          data-bs-target="#myModal"
                        >
                          <i className="fa fa-plus" />
                        </div>
                      </div>
                      <div className="search-wrapper mt-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search...."
                        />
                        <i className="fa fa-search search-icon" />
                      </div>
                      <div className="mt-4">
                        <ul
                          className="nav nav-pills w-100"
                          id="myTab"
                          role="tablist"
                        >
                          <li
                            className="nav-item w-50 pe-2"
                            role="presentation"
                          >
                            <button
                              className="nav-link w-100 active"
                              id="all-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#all"
                              type="button"
                              role="tab"
                            >
                              All
                            </button>
                          </li>
                          <li
                            className="nav-item w-50 ps-2"
                            role="presentation"
                          >
                            <button
                              className="nav-link w-100"
                              id="group-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#group"
                              type="button"
                              role="tab"
                            >
                              Group
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="left-chat-body">
                      <div className="tab-content mt-3" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="all"
                          role="tabpanel"
                        >
                          <div className="chats-box active">
                            <div className="row">
                              <div className="col-auto">
                                <div className="user-img">
                                  <img src="assets/img/user/user3.jpg" alt="" />
                                </div>
                              </div>
                              <div className="col-7 ps-0">
                                <h2 className="comman-heading m-0">
                                  Shelby Goode
                                </h2>
                                <p className="comman-p m-0">
                                  Lorem Ipsum is simply dummy text of the
                                  printing
                                </p>
                              </div>
                              <div className="col-2 px-0 text-end">
                                <p className="date-text m-0">1 min ago</p>
                              </div>
                            </div>
                          </div>
                          <div className="chats-box">
                            <div className="row">
                              <div className="col-auto">
                                <div className="user-img">
                                  <img src="assets/img/user/user4.jpg" alt="" />
                                </div>
                              </div>
                              <div className="col-7 ps-0">
                                <h2 className="comman-heading m-0">
                                  Shelby Goode
                                </h2>
                                <p className="comman-p m-0">
                                  Lorem Ipsum is simply dummy text of the
                                  printing
                                </p>
                              </div>
                              <div className="col-2 px-0 text-end">
                                <p className="date-text m-0">1 min ago</p>
                              </div>
                            </div>
                          </div>
                          <div className="chats-box">
                            <div className="row">
                              <div className="col-auto">
                                <div className="user-img">
                                  <img
                                    src="assets/img/user/user-3.png"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="col-7 ps-0">
                                <h2 className="comman-heading m-0">
                                  Shelby Goode
                                </h2>
                                <p className="comman-p m-0">
                                  Lorem Ipsum is simply dummy text of the
                                  printing
                                </p>
                              </div>
                              <div className="col-2 px-0 text-end">
                                <p className="date-text m-0">1 min ago</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="group"
                          role="tabpanel"
                        >
                          <div className="chats-box">
                            <div className="row">
                              <div className="col-auto">
                                <div className="user-img">
                                  <img src="assets/img/user/user3.jpg" alt="" />
                                </div>
                              </div>
                              <div className="col-7 ps-0">
                                <h2 className="comman-heading m-0">
                                  Shelby Goode
                                </h2>
                                <p className="comman-p m-0">
                                  Lorem Ipsum is simply dummy text of the
                                  printing
                                </p>
                              </div>
                              <div className="col-2 px-0 text-end">
                                <p className="date-text m-0">1 min ago</p>
                              </div>
                            </div>
                          </div>
                          <div className="chats-box">
                            <div className="row">
                              <div className="col-auto">
                                <div className="user-img">
                                  <img src="assets/img/user/user4.jpg" alt="" />
                                </div>
                              </div>
                              <div className="col-7 ps-0">
                                <h2 className="comman-heading m-0">
                                  Shelby Goode
                                </h2>
                                <p className="comman-p m-0">
                                  Lorem Ipsum is simply dummy text of the
                                  printing
                                </p>
                              </div>
                              <div className="col-2 px-0 text-end">
                                <p className="date-text m-0">1 min ago</p>
                              </div>
                            </div>
                          </div>
                          <div className="chats-box">
                            <div className="row">
                              <div className="col-auto">
                                <div className="user-img">
                                  <img
                                    src="assets/img/user/user-3.png"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="col-7 ps-0">
                                <h2 className="comman-heading m-0">
                                  Shelby Goode
                                </h2>
                                <p className="comman-p m-0">
                                  Lorem Ipsum is simply dummy text of the
                                  printing
                                </p>
                              </div>
                              <div className="col-2 px-0 text-end">
                                <p className="date-text m-0">1 min ago</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8 border-end border-start">
                  <div className="right-chats-wrapper">
                    <div className="right-chats-header">
                      <div className="d-flex gap-2 align-items-center">
                        <div className="user-img">
                          <img src="assets/img/user/user3.jpg" alt="" />
                        </div>
                        <h2 className="comman-heading fw-bold">John Carlio</h2>
                      </div>
                    </div>
                    <div className="right-chats-body">
                      <div className="user-message">
                        <div className="row">
                          <div className="col-auto pe-0">
                            <div className="user-img">
                              <img src="assets/img/user/user3.jpg" alt="" />
                            </div>
                          </div>
                          <div className="col-10">
                            <div className="meassage-text">
                              It is a long established fact that a reader will
                              be distracted by the readable content of a page
                              when looking at its layout. The point of using
                              Lorem Ipsum is that it has a more-or-less normal
                              distribution of letters.
                              <p className="date-text m-0 text-end">6.30 pm</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="user-message">
                        <div className="row">
                          <div className="col-auto pe-0">
                            <div className="user-img">
                              <img src="assets/img/user/user3.jpg" alt="" />
                            </div>
                          </div>
                          <div className="col-10">
                            <div className="meassage-text">
                              The point of using Lorem Ipsum is that it has a
                              more-or-less normal distribution of letters.
                              <p className="date-text m-0 text-end">6.30 pm</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="my-message">
                        <div className="row justify-content-end">
                          <div className="col-10">
                            <div className="meassage-text">
                              It is a long established fact that a reader will
                              be distracted by the readable content of a page
                              when looking at its layout. The point of using
                              Lorem Ipsum is that it has a more-or-less normal
                              distribution of letters.
                              <p className="date-text m-0 text-end">6.30 pm</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="my-message">
                        <div className="row justify-content-end">
                          <div className="col-10">
                            <div className="meassage-text">
                              {" "}
                              The point of using Lorem Ipsum is that it has a
                              more-or-less normal distribution of letters.
                              <p className="date-text m-0 text-end">6.30 pm</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="right-chats-footer">
                      <div className="position-relative">
                        <input type="text" className="send-message" />
                        <div className="dropdown add-file">
                          <div
                            className=""
                            id="fileDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className=" fa fa-paperclip" />
                          </div>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="fileDropdown"
                          >
                            <li>
                              <label
                                className="dropdown-item"
                                htmlFor="fileUpload"
                              >
                                <i className="fa fa-file-export" /> Upload File
                              </label>
                              <input
                                type="file"
                                id="fileUpload"
                                className="d-none"
                              />
                            </li>
                            <li>
                              <label
                                className="dropdown-item"
                                htmlFor="fileUpload"
                              >
                                <i className="fa fa-images" /> Upload Image
                              </label>
                              <input
                                type="file"
                                id="image"
                                className="d-none"
                              />
                            </li>
                          </ul>
                        </div>
                        <div className="send-file">
                          <i className=" fa fa-paper-plane" />
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

export default ChatsManage;
