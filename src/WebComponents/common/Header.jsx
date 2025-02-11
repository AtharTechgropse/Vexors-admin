import React, { useEffect, useState } from "react";
import { getAdminData } from "../../apiServices/UserHttpService/UserMainHttp";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [adminData, setAdminData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    GetApiData();
  }, []);

  const GetApiData = async (type) => {
    try {
      const { data, error } = await getAdminData();

      if (!error && data?.results) {
        setAdminData(data.results.admin);
      }
    } catch (error) {
      console.error("Error fetching Admin:", error);
    }
  };

  return (
    <header>
      <div class="header">
        <div class="d-flex flex-wrap">
          <div class="w-18">
            <span class="bars">
              {/* <i class="fa-solid fa-bars-staggered"></i> */}
              <i class="fa-solid fa-bars"></i>
            </span>
            <span class="logo-text">VEXORS</span>
            <span class="logo-text-small">Admin</span>
          </div>
          <div class="w-82">
            <div class="d-flex justify-content-end position-relative">
              <a  onClick={() => navigate("/Profile")}>
                <div class="profile mt-3">
                  <div class="user mt-3">
                    <h3>{adminData?.fullName} </h3>
                    <p>{adminData?.email}</p>
                  </div>
                  <div class="img-box">
                    <img
                      src="res/assets/img/user/user1.jpg"
                      alt="some user image"
                    />
                  </div>
                </div>
              </a>
              <div class="menu">
                <ul>
                  <li>
                    <a href="#">
                      <i class="fa-solid fa-user text-main"></i>
                      &nbsp;Profile
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa-solid fa-gear text-main"></i>
                      &nbsp;Settings
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa-brands fa-hire-a-helper text-main"></i>
                      &nbsp;Help
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa-solid fa-right-from-bracket text-main"></i>
                      &nbsp;Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
