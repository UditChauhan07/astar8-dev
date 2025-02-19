import React, { useEffect, useState } from "react";
import "../../styles/Style.css";
import Header from "../Dashboard/Header";
import { getAllUsers, filterUsers } from "../../lib/Store";
import UserData from "./UserData";
import { toast, Toaster } from "react-hot-toast";
export default function User() {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("all");
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterSubscription, setFilterSubscription] = useState("");
  const [filterPlatform, setFilterPlatform] = useState("");
  const [filterloading,setfilterloading]=useState(false)

  // 🔹 Handle Search Button Click
  const handleSearch = async () => {
    try {
      setfilterloading(true);
      const isFilterEmpty =
        !filterName && !filterEmail && !filterSubscription && !filterPlatform;
      if (isFilterEmpty) {
        fetchUsers();
      } else {
        const data = await filterUsers(
          filterName,
          filterEmail,
          filterSubscription,
          filterPlatform
        );
        setUser(data);
      }

      setCurrentPage(1);
      setfilterloading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setfilterloading(false);
    }
  };
  const handleClear = () => {
    setFilterName("");
    setFilterEmail("");
    setFilterSubscription("");
    setFilterPlatform("");
    fetchUsers();
  };

  const fetchUsers = async (
    status = null,
    pageNumber = 1,
    pageToken = null
  ) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("UserToken");
      if (!token) {
        throw new Error("User token not found");
      }

      // Determine `is_active` based on `activeTab`
      let isActiveValue = null;
      if (activeTab === "active") isActiveValue = 1;
      else if (activeTab === "inactive") isActiveValue = 0;

      // Construct API URL
      let url = `/usr123erd6?page=${pageNumber}`;
      if (isActiveValue !== null) url += `&is_active=${isActiveValue}`;
      if (pageToken) url += `&pageToken=${pageToken}`;

      console.log("Fetching users with:", {
        pageNumber,
        pageToken,
        isActiveValue,
      });

      const response = await getAllUsers(token, url);

      if (response && response.Users) {
        setUser((prevUsers) =>
          pageNumber === 1 ? response.Users : [...prevUsers, ...response.Users]
        );

        // ✅ Only update `nextPageToken` if a new one is available
        setNextPageToken(response.nextPageToken || null);

        setCurrentPage(pageNumber);
      } else {
        throw new Error("Failed to fetch users or no users found.");
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const paginate = (pageNumber) => {
    let tokenToSend = pageNumber === 1 ? null : nextPageToken;

    console.log(
      `Paginating to page: ${pageNumber}, Sending token:`,
      tokenToSend
    );

    fetchUsers(
      activeTab === "all" ? null : activeTab === "active" ? 1 : 0,
      pageNumber,
      tokenToSend
    );
  };

  useEffect(() => {
    setUser([]);
    setNextPageToken(null);
    if (activeTab === "all") {
      fetchUsers();
    } else if (activeTab === "active") {
      fetchUsers(1);
    } else if (activeTab === "inactive") {
      fetchUsers(0);
    }
    setCurrentPage(1);
  }, [activeTab]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = user.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    setTotalPages(Math.ceil(user.length / usersPerPage));
  }, [user, usersPerPage]);
  return (
    <>
      <Header />
      <Toaster />

      <div className="main-container pb-5">
        <div className=" xs-pd-20-10">
          <div className="min-height-200px">
            <div className="page-header">
              <div className="row">
                <div className="col-md-6">
                  <h2
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    Users Management
                  </h2>
                </div>
                <div className="col-md-6"></div>
              </div>
            </div>

            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12 mb-30 ">
                <div className="pd-20 card-box ">
                  <div className="usertable">
                    <div
                      style={{
                        float: "right",
                        display: "flex",
                        gap: "10px",
                        width: "65%",
                      }}
                      className="form-group filterInput"
                    >
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: 140 }}
                        name="username"
                        id="username"
                        placeholder="Enter Name"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: 140 }}
                        name="useremail"
                        id="useremail"
                        placeholder="Enter Email"
                        value={filterEmail}
                        onChange={(e) => setFilterEmail(e.target.value)}
                      />
                      <select
                        name="usersubscription"
                        className="form-control SelectBoxHeight"
                        style={{ width: "78%" }}
                        id="usersubscription"
                        value={filterSubscription}
                        onChange={(e) => setFilterSubscription(e.target.value)}
                      >
                        <option value="">Subscription</option>
                        <option value={0}>Free</option>
                        <option value={1}>Paid</option>
                        <option value={9}>Special offer</option>
                      </select>
                      <select
                        name="subscriptionPlatform"
                        className="form-control SelectBoxHeight1"
                        id="subscriptionPlatform"
                        style={{ width: "84%" }}
                        value={filterPlatform}
                        onChange={(e) => setFilterPlatform(e.target.value)}
                      >
                        <option value="">Select Platform</option>
                        <option value="iOS">iOS</option>
                        <option value="Android">Android</option>
                      </select>
                      {/* 🔹 Search Button */}
                      <button
                        className="btn btn-primary"
                        style={{ height: "40px" }}
                        onClick={handleSearch}
                      >
                        {filterloading ? "Searching..." : "Search"}
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ height: "40px", marginLeft: "5px" }}
                        onClick={handleClear}
                      >
                        Reset
                      </button>
                    </div>

                    <div className="tab">
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                          <a
                            className={`nav-link text-blue ${
                              activeTab === "all" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("all")}
                          >
                            All
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link text-blue ${
                              activeTab === "active" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("active")}
                          >
                            Active
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link text-blue ${
                              activeTab === "inactive" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("inactive")}
                          >
                            Inactive
                          </a>
                        </li>
                      </ul>

                      <div className="tab-content">
                        {/* All Users */}
                        <div
                          className={`tab-pane fade show ${
                            activeTab === "all" ? "active" : ""
                          }`}
                          id="all"
                          role="tabpanel"
                        >
                          <div className="card-block table-border-style alluserlist">
                            <UserData
                              user={currentUsers}
                              currentPage={currentPage}
                              usersPerPage={usersPerPage}
                              loading={loading}
                            />
                          </div>
                          <div className="custom-pagination">
                            <nav>
                              <ul className="pagination">
                                {/* Previous Button */}
                                <li
                                  className={`page-item ${
                                    currentPage === 1 ? "disabled" : ""
                                  }`}
                                >
                                  <span
                                    className="page-link"
                                    onClick={() =>
                                      currentPage > 1 &&
                                      paginate(currentPage - 1)
                                    }
                                  >
                                    ‹
                                  </span>
                                </li>

                                {/* Current Page Number */}
                                <li className="page-item active">
                                  <span className="page-link">
                                    {currentPage}
                                  </span>
                                </li>

                                {/* Next Button */}
                                <li
                                  className={`page-item ${
                                    !nextPageToken ? "disabled" : ""
                                  }`}
                                >
                                  <span
                                    className="page-link"
                                    onClick={() =>
                                      nextPageToken && paginate(currentPage + 1)
                                    }
                                  >
                                    ›
                                  </span>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "active" ? "show active" : ""
                          }`}
                          id="activeUser"
                          role="tabpanel"
                        >
                          <div className="card-block table-border-style">
                            <UserData
                              user={currentUsers}
                              currentPage={currentPage}
                              usersPerPage={usersPerPage}
                            />
                          </div>
                          <div className="custom-pagination">
                            <nav>
                              <ul className="pagination">
                                {/* Previous Button */}
                                <li
                                  className={`page-item ${
                                    currentPage === 1 ? "disabled" : ""
                                  }`}
                                >
                                  <span
                                    className="page-link"
                                    onClick={() =>
                                      currentPage > 1 &&
                                      paginate(currentPage - 1)
                                    }
                                  >
                                    ‹
                                  </span>
                                </li>

                                {/* Current Page Number */}
                                <li className="page-item active">
                                  <span className="page-link">
                                    {currentPage}
                                  </span>
                                </li>

                                {/* Next Button */}
                                <li
                                  className={`page-item ${
                                    !nextPageToken ? "disabled" : ""
                                  }`}
                                >
                                  <span
                                    className="page-link"
                                    onClick={() =>
                                      nextPageToken && paginate(currentPage + 1)
                                    }
                                  >
                                    ›
                                  </span>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "inactive" ? "show active" : ""
                          }`}
                          id="inactiveUser"
                          role="tabpanel"
                        >
                          <div className="card-block table-border-style">
                            <UserData
                              user={currentUsers}
                              currentPage={currentPage}
                              usersPerPage={usersPerPage}
                            />
                          </div>
                          <div className="custom-pagination">
                            <nav>
                              <ul className="pagination">
                                {/* Previous Button */}
                                <li
                                  className={`page-item ${
                                    currentPage === 1 ? "disabled" : ""
                                  }`}
                                >
                                  <span
                                    className="page-link"
                                    onClick={() =>
                                      currentPage > 1 &&
                                      paginate(currentPage - 1)
                                    }
                                  >
                                    ‹
                                  </span>
                                </li>

                                {/* Current Page Number */}
                                <li className="page-item active">
                                  <span className="page-link">
                                    {currentPage}
                                  </span>
                                </li>

                                {/* Next Button */}
                                <li
                                  className={`page-item ${
                                    !nextPageToken ? "disabled" : ""
                                  }`}
                                >
                                  <span
                                    className="page-link"
                                    onClick={() =>
                                      nextPageToken && paginate(currentPage + 1)
                                    }
                                  >
                                    ›
                                  </span>
                                </li>
                              </ul>
                            </nav>
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
    </>
  );
}
