import React, { useEffect, useState } from "react";
import "../../styles/Style.css";
import Header from "../Dashboard/Header";
import { getAllUsers } from "../../lib/Store";
import UserData from "./UserData";
import { toast, Toaster } from "react-hot-toast";
export default function User() {
  const [user, setUser] = useState([]);
  console.log("userrrr111", user);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("all");
  const [totalPages, setTotalPages] = useState(0);
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterSubscription, setFilterSubscription] = useState("");
  console.log("filterr", filterSubscription);
  const [filterPlatform, setFilterPlatform] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (status = null) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("UserToken");
      if (!token) {
        throw new Error("User token not found");
      }
      const response = await getAllUsers(token, status);
      // console.log("resss.........", response);
      if (response && response.Users) {
        setUser(response.Users);
        setTotalPages(Math.ceil(response.Users.length / usersPerPage));
      } else {
        throw new Error("Failed to fetch users or no users found.");
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = user.filter(
    (u) =>
      u.name &&
      u.name.toLowerCase().includes(filterName.toLowerCase()) &&
      ((u.email && u.email.toLowerCase().includes(filterEmail.toLowerCase())) ||
        (u.username &&
          u.username.toLowerCase().includes(filterEmail.toLowerCase()))) &&
      (filterSubscription === "" ||
        u.subscription_status == filterSubscription ||
        (u.subscription_status === 4 && filterSubscription == 0)) && // Handle null == 0 case
      (filterPlatform === "" ||
        (u.platform &&
          u.platform.toLowerCase().includes(filterPlatform.toLowerCase())))
  );

  useEffect(() => {
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
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredUsers.length / usersPerPage));
  }, [filteredUsers, usersPerPage]);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
                    style={{ float: "right", display: "flex", gap:"10px",width:"54%" }}
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
                      style={{width:"78%"}}
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
                      style={{width:"84%"}}
                      value={filterPlatform}
                      onChange={(e) => setFilterPlatform(e.target.value)}
                    >
                      <option value="">Select Platform</option>
                      <option value="iOS">iOS</option>
                      <option value="Android">Android</option>
                    </select>
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
                                  aria-hidden="true"
                                  onClick={() =>
                                    currentPage > 1 && paginate(currentPage - 1)
                                  }
                                >
                                  ‹
                                </span>
                              </li>

                              {/* Pagination Numbers */}
                              {[...Array(totalPages).keys()]
                                .map((number) => number + 1)
                                .filter((pageNumber) => {
                                  // Display the first 10 pages
                                  if (pageNumber <= 10) return true;
                                  // Display the last 2 pages
                                  if (pageNumber > totalPages - 2) return true;
                                  // Display the current page and its neighbors
                                  if (
                                    pageNumber >= currentPage - 1 &&
                                    pageNumber <= currentPage + 1
                                  )
                                    return true;
                                  return false;
                                })
                                .map((pageNumber, index, filteredPages) => {
                                  // Add ellipsis logic
                                  const previousPage = filteredPages[index - 1];
                                  if (
                                    previousPage &&
                                    pageNumber > previousPage + 1
                                  ) {
                                    return (
                                      <li
                                        className="page-item disabled"
                                        key={`ellipsis-${index}`}
                                      >
                                        <span className="page-link">...</span>
                                      </li>
                                    );
                                  }

                                  // Render page number
                                  return (
                                    <li
                                      className={`page-item ${
                                        currentPage === pageNumber
                                          ? "active"
                                          : ""
                                      }`}
                                      key={pageNumber}
                                    >
                                      <span
                                        className="page-link"
                                        onClick={() => paginate(pageNumber)}
                                      >
                                        {pageNumber}
                                      </span>
                                    </li>
                                  );
                                })}

                              {/* Next Button */}
                              <li
                                className={`page-item ${
                                  currentPage === totalPages ? "disabled" : ""
                                }`}
                              >
                                <span
                                  className="page-link"
                                  onClick={() =>
                                    currentPage < totalPages &&
                                    paginate(currentPage + 1)
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
                                  aria-hidden="true"
                                  onClick={() =>
                                    currentPage > 1 && paginate(currentPage - 1)
                                  }
                                >
                                  ‹
                                </span>
                              </li>

                              {/* Pagination Numbers */}
                              {[...Array(totalPages).keys()]
                                .map((number) => number + 1)
                                .filter((pageNumber) => {
                                  // Display the first 10 pages
                                  if (pageNumber <= 10) return true;
                                  // Display the last 2 pages
                                  if (pageNumber > totalPages - 2) return true;
                                  // Display the current page and its neighbors
                                  if (
                                    pageNumber >= currentPage - 1 &&
                                    pageNumber <= currentPage + 1
                                  )
                                    return true;
                                  return false;
                                })
                                .map((pageNumber, index, filteredPages) => {
                                  // Add ellipsis logic
                                  const previousPage = filteredPages[index - 1];
                                  if (
                                    previousPage &&
                                    pageNumber > previousPage + 1
                                  ) {
                                    return (
                                      <li
                                        className="page-item disabled"
                                        key={`ellipsis-${index}`}
                                      >
                                        <span className="page-link">...</span>
                                      </li>
                                    );
                                  }

                                  // Render page number
                                  return (
                                    <li
                                      className={`page-item ${
                                        currentPage === pageNumber
                                          ? "active"
                                          : ""
                                      }`}
                                      key={pageNumber}
                                    >
                                      <span
                                        className="page-link"
                                        onClick={() => paginate(pageNumber)}
                                      >
                                        {pageNumber}
                                      </span>
                                    </li>
                                  );
                                })}

                              {/* Next Button */}
                              <li
                                className={`page-item ${
                                  currentPage === totalPages ? "disabled" : ""
                                }`}
                              >
                                <span
                                  className="page-link"
                                  onClick={() =>
                                    currentPage < totalPages &&
                                    paginate(currentPage + 1)
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
                                  aria-hidden="true"
                                  onClick={() =>
                                    currentPage > 1 && paginate(currentPage - 1)
                                  }
                                >
                                  ‹
                                </span>
                              </li>

                              {/* Pagination Numbers */}
                              {[...Array(totalPages).keys()]
                                .map((number) => number + 1)
                                .filter((pageNumber) => {
                                  // Display the first 10 pages
                                  if (pageNumber <= 10) return true;
                                  // Display the last 2 pages
                                  if (pageNumber > totalPages - 2) return true;
                                  // Display the current page and its neighbors
                                  if (
                                    pageNumber >= currentPage - 1 &&
                                    pageNumber <= currentPage + 1
                                  )
                                    return true;
                                  return false;
                                })
                                .map((pageNumber, index, filteredPages) => {
                                  // Add ellipsis logic
                                  const previousPage = filteredPages[index - 1];
                                  if (
                                    previousPage &&
                                    pageNumber > previousPage + 1
                                  ) {
                                    return (
                                      <li
                                        className="page-item disabled"
                                        key={`ellipsis-${index}`}
                                      >
                                        <span className="page-link">...</span>
                                      </li>
                                    );
                                  }

                                  // Render page number
                                  return (
                                    <li
                                      className={`page-item ${
                                        currentPage === pageNumber
                                          ? "active"
                                          : ""
                                      }`}
                                      key={pageNumber}
                                    >
                                      <span
                                        className="page-link"
                                        onClick={() => paginate(pageNumber)}
                                      >
                                        {pageNumber}
                                      </span>
                                    </li>
                                  );
                                })}

                              {/* Next Button */}
                              <li
                                className={`page-item ${
                                  currentPage === totalPages ? "disabled" : ""
                                }`}
                              >
                                <span
                                  className="page-link"
                                  onClick={() =>
                                    currentPage < totalPages &&
                                    paginate(currentPage + 1)
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
