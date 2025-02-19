import React, { useEffect, useState } from "react";
import Header from "../Dashboard/Header";
import { useLocation, Link } from "react-router-dom";
import { userDetailedData } from "../../lib/Store";
import "./User.css";
import Loader from "../Loader/Loader";
import DashBoardLoader from "../Loader/DashBoardLoader";
export default function UserDetailedData() {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(null);
  console.log("userDetailss", userDetails);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const fetchUserDetailed = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("UserToken");
      const user_id = localStorage.getItem("user_Detailed_id");
      const response = await userDetailedData(user_id, token);
      console.log(response, "sjaidjeiofjhoushnaudnhsajcnjnjuSNAUSnahs");
      if (response?.userdetails?.created_at?._seconds) {
        const formatted = formatTimestamp(
          response.userdetails.created_at._seconds
        );
        setFormattedDate(formatted);
      }
      if (!response || !response.userdetails) {
        setError("No user details found for this user");
      } else {
        setUserDetails(response);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const user_ids = localStorage.getItem("user_Detailed_id");
    if (user_ids) fetchUserDetailed();
  }, []);

  // if (loading) {
  //   return <Loader />;
  // }

  // if (error) {
  //   return (
  //     <h1 className="error-user">
  //       {error}
  //       <br></br> <Link to="/users"> Go Back</Link>
  //     </h1>
  //   );
  // }

  // if (!userDetails) {
  //   return <p>No user details available.</p>;
  // }

  return (
    <>
      
      {loading ? (
        <div>
          <DashBoardLoader />
        </div>
      ) : error ? (
        <h1 className="error-user text-center">
          {error}
          <br />
          <Link to="/users" className="btn btn-primary mt-2">Go Back</Link>
        </h1>
      ) : !userDetails ? (
        <p className="text-center">No user details available.</p>
      ) : (
        
        <>
        <Header />
          <div className="main-container" style={{ paddingBottom: "40px" }}>
            <div className="pd-ltr-20 xs-pd-20-10">
              <div className="min-height-200px">
                <div className="pd-20 card-box mb-30">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="">
                        <h2>Name: {userDetails.userdetails.name || "N/A"}</h2>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text-right">
                        {/* <a class="btn btn-primary" href="https://be.astar8.com/users"> Back </a> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-30">
                    <div className="pd-20 card-box height-100-p">
                      <div className="profile-photo profile_photo">
                        <img
                          src={
                            userDetails.userdetails.profile_pic
                              ? userDetails.userdetails.profile_pic
                              : "https://be.astar8.com/img/default-profile-img.png"
                          }
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = "https://be.astar8.com/img/default-profile-img.png"; 
                          }}
                          height="100%"
                          width="100%"
                        />
                      </div>
                      <h5 className="text-center h5 mb-0">
                        {userDetails.userdetails.name || "N/A"}
                      </h5>
                      <p className="text-center text-muted font-14">
                        DOB: {userDetails.userdetails.dob || "N/A"}
                      </p>
                      <div className="profile-info">
                        <h5 className="mb-20 h5 text-blue">
                          Personal Information
                        </h5>
                        <ul>
                          <li>
                            <span>Gender:</span>
                            {userDetails.userdetails.gender || "N/A"}
                          </li>
                          <li>
                            <span>Email Address:</span>
                            {userDetails.userdetails.email || "N/A"}
                          </li>
                          <li>
                            <span>Relationship:</span>
                            {userDetails.userdetails.relationship || "N/A"}
                          </li>
                          <li>
                            <span>Occupation:</span>
                            {userDetails.userdetails.occupation || "N/A"}
                          </li>
                          <li>
                            <span>Joining Date:</span>
                            {formattedDate || "N/A"}
                          </li>
                          <li>
                            <span>Subscription Status</span>
                            {userDetails.userdetails.subscription_status ||
                              "N/A"}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 mb-30">
                    <div className="card-box height-100-p overflow-hidden">
                      <div className="profile-tab height-100-p">
                        <div className="tab height-100-p">
                          <div className="tab-content">
                            <div
                              className="tab-pane fade show active"
                              id="timeline"
                              role="tabpanel"
                            >
                              <div className="pd-20">
                                <div className="profile-timeline">
                                  <h5 className="mb-20 h5 text-blue">
                                    Other Information
                                  </h5>
                                  <div className="profile-timeline-list">
                                    <div className="row">
                                      <div className="col-xs-12 col-sm-12 col-md-12">
                                        <div className="form-group">
                                          <strong>Name Reading:</strong>
                                          <p>
                                            <b>Positive:</b>{" "}
                                            {userDetails.otherdetails
                                              .positive || "N/A"}
                                          </p>
                                          <p>
                                            <b>Negative:</b>{" "}
                                            {userDetails.otherdetails
                                              .negative || "N/A"}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-xs-12 col-sm-12 col-md-12">
                                        <div className="form-group">
                                          <strong>Destiny Number: </strong>
                                          {userDetails.otherdetails
                                            .destiny_no || "N/A"}
                                        </div>
                                      </div>
                                      <div className="col-xs-12 col-sm-12 col-md-12">
                                        <div className="form-group">
                                          <strong>Destiny Description: </strong>
                                          <p>
                                            <b>Learn To Be: </b>{" "}
                                            {userDetails.otherdetails
                                              .Learn_to_be || "N/A"}
                                          </p>
                                          <p>
                                            <b>Learn Not To Be: </b>{" "}
                                            {userDetails.otherdetails
                                              .Learn_not_to_be || "N/A"}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-xs-6 col-sm-6 col-md-6">
                                        <div className="form-group">
                                          <strong>Fav Numbers: </strong>
                                          {userDetails.otherdetails
                                            .fav_number || "N/A"}
                                        </div>
                                      </div>
                                      <div className="col-xs-6 col-sm-6 col-md-6">
                                        <div className="form-group">
                                          <strong>Unfav Numbers: </strong>
                                          {userDetails.otherdetails
                                            .unfav_number || "N/A"}
                                        </div>
                                      </div>
                                      <div className="col-xs-6 col-sm-6 col-md-6">
                                        <div className="form-group">
                                          <strong>Fav Months: </strong>
                                          {userDetails.otherdetails
                                            .fav_months || "N/A"}
                                        </div>
                                      </div>
                                      <div className="col-xs-6 col-sm-6 col-md-6">
                                        <div className="form-group">
                                          <strong>Unfav Months: </strong>
                                          {userDetails.otherdetails
                                            .unfav_months || "N/A"}
                                        </div>
                                      </div>
                                      <div className="col-xs-6 col-sm-6 col-md-6">
                                        <div className="form-group">
                                          <strong>Fav Days: </strong>
                                          {userDetails.otherdetails.fav_days ||
                                            "N/A"}
                                        </div>
                                      </div>
                                      <div className="col-xs-6 col-sm-6 col-md-6">
                                        <div className="form-group">
                                          <strong>Unfav Days: </strong>
                                          {userDetails.otherdetails
                                            .unfav_days || "N/A"}
                                        </div>
                                      </div>
                                      <div className="col-xs-6 col-sm-6 col-md-6">
                                        <div className="form-group">
                                          <strong>Lucky Colors: </strong>
                                          {userDetails.otherdetails
                                            .lucky_colors || "N/A"}
                                        </div>
                                      </div>
                                      <div className="col-xs-6 col-sm-6 col-md-6">
                                        <div className="form-group">
                                          <strong>Lucky Metals: </strong>
                                          {userDetails.otherdetails
                                            .lucky_metals || "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-xs-6 col-sm-6 col-md-6">
                                        <div className="form-group">
                                          <strong>Zodiac sign: </strong>
                                          {userDetails.otherdetails
                                            .zodiac_sign || "N/A"}
                                        </div>
                                      </div>
                                      <div className="col-xs-6 col-sm-6 col-md-6">
                                        <div className="form-group">
                                          <strong>Planet Name: </strong>
                                          {userDetails.otherdetails
                                            .Planet_name || "N/A"}
                                        </div>
                                      </div>
                                      <div className="col-xs-12 col-sm-12 col-md-12">
                                        <div className="form-group">
                                          <strong>Planet Description: </strong>
                                          {userDetails.otherdetails
                                            .Planet_description || "N/A"}
                                        </div>
                                      </div>
                                      <div className="col-xs-12 col-sm-12 col-md-12">
                                        <div className="form-group">
                                          <strong>Parenting: </strong>
                                          {userDetails.otherdetails
                                            .basic_parent_reading || "N/A"}
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
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
