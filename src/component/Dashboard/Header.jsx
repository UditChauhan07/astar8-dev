import React, { useContext, useEffect, useRef, useState } from "react";
import "../../styles/Style.css";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  faFile,
  faHouse,
  faChevronDown,
  faChevronUp,
  faPencilAlt,
  faDesktop,
  faList,
  faUser,
  faBook,
  faBox,
  faComment,
  faTimes,
  faClock,
  faSitemap,
  faVideo,
  faWallet,
  faStethoscope,
  faFileAlt,
  faGlobe,
  faChartLine,
  faRecycle,
  faHeart,
  faHandshake,
  faMoneyBill,
  faChartBar,
  faCog,
  faDollarSign,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import AppContext from "../../ContextApi/userContext";
export default function Dashboard() {
  const { data, setData } = useContext(AppContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const Name = localStorage.getItem("name");
  const img = localStorage.getItem("profilePic");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({
    health: false,
    personal: false,
    systems: false,
    universal: false,
    fav: false,
    parenting: false,
  });

  const [userRole, setUserRole] = useState(localStorage.getItem("Role") || "");

  const toggleDropdowns = (dropdownName) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const toggleDropdown = () => {
  //   setDropdownOpen(!isDropdownOpen);
  // };

  const onHandleLogout = () => {
    localStorage.removeItem("Role");
    localStorage.removeItem("UserToken");
    localStorage.removeItem("name");
    localStorage.removeItem("profilePic");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("user_Detailed_id");
    localStorage.removeItem("editData");
    localStorage.removeItem("showData");


    navigate("/");
  };
  const onSideClose = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("UserToken");

    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const expTime = decoded.exp * 1000;

      if (Date.now() > expTime) {
        localStorage.removeItem("UserToken");
        localStorage.removeItem("Role");
        localStorage.removeItem("name");
        localStorage.removeItem("profilePic");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userId");
        localStorage.removeItem("editData");
        localStorage.removeItem("showData");

        Swal.fire({
          icon: "error",
          title: "Session expired",
          text: "Session expired. Please log in again.",
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          navigate("/");
        });
      }
    }
  }, [navigate]);

  //
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="header">
        <div className="header-left" onClick={toggleSidebar}>
          <div className="menu-icon">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
        <div className="header-right">
          <div className="user-notification">
            <div className="dropdown">
              <div className="dropdown-menu dropdown-menu-right">
                <div className="notification-list mx-h-350 customscroll mCustomScrollbar _mCS_1 mCS_no_scrollbar">
                  <div
                    id="mCSB_1"
                    className="mCustomScrollBox mCS-dark-2 mCSB_vertical mCSB_inside"
                    style={{ maxHeight: 0 }}
                    tabIndex={0}
                  >
                    <div
                      id="mCSB_1_container"
                      className="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
                      style={{ position: "relative", top: 0, left: 0 }}
                      dir="ltr"
                    >
                      <ul>
                        <li>
                          <a href="#">
                            <img
                              src="https://be.astar8.com/img/img.jpg"
                              alt=""
                              className="mCS_img_loaded"
                            />
                            <h3>John Doe</h3>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed...
                            </p>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img
                              src="https://be.astar8.com/img/photo1.jpg"
                              alt=""
                              className="mCS_img_loaded"
                            />
                            <h3>Lea R. Frith</h3>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed...
                            </p>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div
                      id="mCSB_1_scrollbar_vertical"
                      className="mCSB_scrollTools mCSB_1_scrollbar mCS-dark-2 mCSB_scrollTools_vertical mCSB_scrollTools_onDrag_expand"
                      style={{ display: "none" }}
                    >
                      <div className="mCSB_draggerContainer">
                        <div
                          id="mCSB_1_dragger_vertical"
                          className="mCSB_dragger"
                          style={{
                            position: "absolute",
                            minHeight: 30,
                            top: 0,
                          }}
                        >
                          <div
                            className="mCSB_dragger_bar"
                            style={{ lineHeight: 30 }}
                          />
                        </div>
                        <div className="mCSB_draggerRail" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="user-info-dropdown" ref={dropdownRef}>
            <div className="dropdown">
              <a
                className="dropdown-toggle"
                role="button"
                aria-expanded={isDropdownOpen ? "true" : "false"}
                onClick={toggleDropdown}
                style={{ cursor: "pointer" }}
              >
                <span className="user-icon">
                  <img
                    style={{ height: "44px" }}
                    src={
                      img
                        ? img
                        : "https://be.astar8.com/img/default-profile-img.png"
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://be.astar8.com/img/default-profile-img.png";
                    }}
                    alt=""
                  />
                </span>
                <span className="user-name">
                  {Name?.split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </span>
                <i
                  className={`fa ${
                    isDropdownOpen ? "fa-chevron-up" : "fa-chevron-down"
                  } ml-2`}
                ></i>
              </a>
              <div
                className={`dropdown-menu dropdown-menu-right dropdown-menu-icon-list ${
                  isDropdownOpen ? "show animated-dropdown" : "hide"
                }`}
              >
                <NavLink className="dropdown-item" to="/profile">
                  <i className="fa fa-user-circle mr-2" /> Profile
                </NavLink>
                <NavLink className="dropdown-item" to="/reset">
                  <i className="fa fa-cogs mr-2" /> Reset Password
                </NavLink>
                <a
                  className="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={onHandleLogout}
                >
                  <i className="fa fa-sign-out mr-2" />
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`left-side-bar ${isSidebarOpen ? "open" : ""}`}>
        <div className="brand-logo" style={{ marginTop: "24px" }}>
          <a>
            <img
              src="https://be.astar8.com/img/Logo.png"
              alt=""
              className="light-logo"
            />
          </a>
          <div className="close-sidebar" data-toggle="left-sidebar-close">
            <FontAwesomeIcon icon={faTimes} onClick={onSideClose} />
          </div>
        </div>
        <div className="menu-block customscroll mCustomScrollbar _mCS_2">
          <div
            id="mCSB_2"
            className="mCustomScrollBox mCS-dark-2 mCSB_vertical mCSB_inside"
            tabIndex={0}
            style={{ maxHeight: "none" }}
          >
            <div
              id="mCSB_2_container"
              className="mCSB_container"
              style={{ position: "relative", top: 0, left: 0 }}
              dir="ltr"
            >
              <div className="sidebar-menu">
                {userRole === "1" ? (
                  <ul id="accordion-menu">
                    <NavLink to="/dashboard" className="dropdown-toggle no-arrow">
                      <span>
                        {" "}
                        <FontAwesomeIcon icon={faHouse} style={{height:"20px"}}/>
                      </span>
                      <span className="mtext">Home</span>
                    </NavLink>

                    <li className="dropdown">
                      <NavLink
                        to="/usermessages"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faComment} style={{height:"20px"}} />
                        </span>
                        <span className="mtext">User Messages</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/DailyForecast"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faBook} style={{height:"20px"}} />
                        </span>
                        <span className="mtext">Daily Forecast</span>
                      </NavLink>
                    </li>

                    <li className="dropdown">
                      <NavLink
                        to="/general-settings"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faCog} style={{height:"20px"}} />
                        </span>
                        <span className="mtext">General Setting</span>
                      </NavLink>
                    </li>

                    <li className="dropdown">
                      <NavLink to="/payment" className="dropdown-toggle no-arrow">
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faDollarSign} style={{height:"22px",paddingLeft:"3px"}} />
                        </span>
                        <span className="mtext">Payment Setting</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink to="/users" className="dropdown-toggle no-arrow">
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faUser} style={{height:"20px",paddingLeft:"1px"}} />
                        </span>
                        <span className="mtext">Users</span>
                      </NavLink>
                    </li>
                  </ul>
                ) : (
                  <ul id="accordion-menu">
                    <NavLink to="/dashboard" className="dropdown-toggle no-arrow">
                      <span>
                        {" "}
                        <FontAwesomeIcon icon={faHouse} />
                      </span>
                      <span className="mtext">Home</span>
                    </NavLink>
                    <li className="dropdown">
                      <NavLink to="/roles" className="dropdown-toggle no-arrow">
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                        <span className="mtext">Roles</span>
                      </NavLink>
                    </li>
                    {/* dropdown */}
                    <li
                      className="dropdown"
                      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                    >
                      <a
                        className="dropdown-toggle"
                        data-option="off"
                        onClick={() => toggleDropdowns("systems")}
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faDesktop} />
                        </span>
                        <div className="d-flex justify-content-between w-100">
                          <span className="mtext">Systems</span>
                          <span className="ml-2">
                            <FontAwesomeIcon
                              icon={
                                dropdownStates.systems
                                  ? faChevronUp
                                  : faChevronDown
                              }
                            />
                          </span>
                        </div>
                      </a>
                      <ul
                        className="submenu "
                        style={{
                          maxHeight: dropdownStates.systems ? "200px" : "0",
                          overflow: "hidden",
                          transition: "max-height 0.4s ease",
                          display: "block",
                        }}
                      >
                        <li className="header-dropdown">
                          <NavLink
                            to="/systemtype"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              System Types
                            </span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="header-dropdown"
                            to="/modules"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Module Types
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </li>

                    <li className="dropdown">
                      <NavLink to="/Master" className="dropdown-toggle no-arrow">
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faList} />
                        </span>
                        <span className="mtext">Master Numbers</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/namereading"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                        <span className="mtext">Name Reading</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/dobreading"
                        className="dropdown-toggle no-arrow"
                      >
                        <span>
                          {" "}
                          <FontAwesomeIcon icon={faBook} />
                        </span>
                        <span className="mtext">DOB Reading</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/luckiest_parameters"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faDesktop} />
                        </span>
                        <span className="mtext">Luckiest Parameter</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/primaryno_types"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faList} />
                        </span>
                        <span className="mtext">Primary Number</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink to="/magicbox" className="dropdown-toggle no-arrow">
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faBox} />
                        </span>
                        <span className="mtext">Magic Box</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/usermessages"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faComment} />
                        </span>
                        <span className="mtext">User Messages</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/DailyForecast"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faBook} />
                        </span>
                        <span className="mtext">Daily Forecast</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/elementalno"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faClock} />
                        </span>
                        <span className="mtext">Elemental Numbers</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/destinyno"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faSitemap} />
                        </span>
                        <span className="mtext">Destiny Numbers</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink to="/videos" className="dropdown-toggle no-arrow">
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faVideo} />
                        </span>
                        <span className="mtext">Videos</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/lifecoach_descriptions"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faFile} />
                        </span>
                        <span className="mtext">Lifecoach Descriptions</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/subscription_price"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faWallet} />
                        </span>
                        <span className="mtext">Subscription Prices</span>
                      </NavLink>
                    </li>
                    {/* Helath */}

                    <li
                      className="dropdown"
                      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                    >
                      <a
                        className="dropdown-toggle"
                        data-option="off"
                        onClick={() => toggleDropdowns("health")}
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faStethoscope} />
                        </span>
                        <div className="d-flex justify-content-between w-100">
                          <span className="mtext">Health</span>
                          <span className="ml-2">
                            <FontAwesomeIcon
                              icon={
                                dropdownStates.health
                                  ? faChevronUp
                                  : faChevronDown
                              }
                            />
                          </span>
                        </div>
                      </a>
                      <ul
                        className="submenu"
                        style={{
                          maxHeight: dropdownStates.health ? "250px" : "0",
                          overflow: "hidden",
                          transition: "max-height 0.4s ease",
                          display: "block",
                        }}
                      >
                        <li className="header-dropdown">
                          <NavLink
                            to="/healthreading"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Health Reading
                            </span>
                          </NavLink>
                        </li>
                        <li className="header-dropdown">
                          <NavLink
                            to="/healthprecaution"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Health Precautions
                            </span>
                          </NavLink>
                        </li>
                        <li className="header-dropdown">
                          <NavLink
                            to="/healthsuggestion"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Health Suggestion
                            </span>
                          </NavLink>
                        </li>
                        <li className="header-dropdown">
                          <NavLink
                            to="/healthcycle"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Health Cycle
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </li>

                    {/* Personal */}

                    <li
                      className="dropdown"
                      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                    >
                      <a
                        className="dropdown-toggle"
                        data-option="off"
                        onClick={() => toggleDropdowns("personal")}
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faFileAlt} />
                        </span>
                        <div className="d-flex justify-content-between w-100">
                          <span className="mtext">Personal</span>
                          <span className="ml-2">
                            <FontAwesomeIcon
                              icon={
                                dropdownStates.personal
                                  ? faChevronUp
                                  : faChevronDown
                              }
                            />
                          </span>
                        </div>
                      </a>
                      <ul
                        className="submenu"
                        style={{
                          maxHeight: dropdownStates.personal ? "250px" : "0",
                          overflow: "hidden",
                          transition: "max-height 0.4s ease",
                          display: "block",
                        }}
                      >
                        <li className="header-dropdown">
                          <NavLink
                            to="/personalyear"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Personal Year
                            </span>
                          </NavLink>
                        </li>
                        <li className="header-dropdown">
                          <NavLink
                            to="/personalmonth"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Personal Month
                            </span>
                          </NavLink>
                        </li>
                        <li className="header-dropdown">
                          <NavLink
                            to="/personalweek"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Personal Week
                            </span>
                          </NavLink>
                        </li>
                        <li className="header-dropdown">
                          <NavLink
                            to="/personalday"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Personal Day
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </li>

                    {/* Universal */}

                    <li
                      className="dropdown"
                      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                    >
                      <a
                        className="dropdown-toggle"
                        data-option="off"
                        onClick={() => toggleDropdowns("universal")}
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faGlobe} />
                        </span>
                        <div className="d-flex justify-content-between w-100">
                          <span className="mtext">Universal</span>
                          <span className="ml-2">
                            <FontAwesomeIcon
                              icon={
                                dropdownStates.universal
                                  ? faChevronUp
                                  : faChevronDown
                              }
                            />
                          </span>
                        </div>
                      </a>
                      <ul
                        className="submenu"
                        style={{
                          maxHeight: dropdownStates.universal ? "250px" : "0",
                          overflow: "hidden",
                          transition: "max-height 0.4s ease",
                          display: "block",
                        }}
                      >
                        <li className="header-dropdown">
                          <NavLink
                            to="/universalyear"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Universal Year
                            </span>
                          </NavLink>
                        </li>
                        <li className="header-dropdown">
                          <NavLink
                            to="/universalmonth"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Universal Month
                            </span>
                          </NavLink>
                        </li>
                        <li className="header-dropdown">
                          <NavLink
                            to="/universalday"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Universal Day
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </li>

                    {/* Fav unfav */}

                    <li
                      className="dropdown"
                      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                    >
                      <a
                        className="dropdown-toggle"
                        data-option="off"
                        onClick={() => toggleDropdowns("fav")}
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faDesktop} />
                        </span>
                        <div className="d-flex justify-content-between w-100">
                          <span className="mtext">Fav Unfav</span>
                          <span className="ml-2">
                            <FontAwesomeIcon
                              icon={
                                dropdownStates.fav ? faChevronUp : faChevronDown
                              }
                            />
                          </span>
                        </div>
                      </a>
                      <ul
                        className="submenu"
                        style={{
                          maxHeight: dropdownStates.fav ? "250px" : "0",
                          overflow: "hidden",
                          transition: "max-height 0.5s ease",
                          display: "block",
                        }}
                      >
                        <li className="header-dropdown">
                          <NavLink
                            to="/fav_parameters"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Fav Parameters
                            </span>
                          </NavLink>
                        </li>
                        <li className="header-dropdown">
                          <NavLink
                            to="/unfav_parameters"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Unfav Parameters
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </li>

                    <li className="dropdown">
                      <NavLink
                        to="/zodic_signs"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faChartLine} />
                        </span>
                        <span className="mtext">Zodiac Signs</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/planet_numbers"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faGlobe} />
                        </span>
                        <span className="mtext">Planet Number</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/life_cycles"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faRecycle} />
                        </span>
                        <span className="mtext">Life Cycle</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/life_changes"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faRecycle} />
                        </span>
                        <span className="mtext">Life Changes</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/compatible_partners"
                        className="dropdown-toggle no-arrow"
                      >
                        <span>
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                        <span className="mtext">Compatible Partner</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/partner_relationships"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faHeart} />
                        </span>
                        <span className="mtext">Partner Relationship</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/childrens"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faUser} />
                        </span>

                        <span className="mtext">Children</span>
                      </NavLink>
                    </li>
                    {/* Parenting */}

                    <li
                      className="dropdown"
                      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                    >
                      <a
                        className="dropdown-toggle"
                        data-option="off"
                        onClick={() => toggleDropdowns("parenting")}
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faHandshake} />
                        </span>
                        <div className="d-flex justify-content-between w-100">
                          <span className="mtext">Parenting</span>
                          <span className="ml-2">
                            <FontAwesomeIcon
                              icon={
                                dropdownStates.parenting
                                  ? faChevronUp
                                  : faChevronDown
                              }
                            />
                          </span>
                        </div>
                      </a>
                      <ul
                        className="submenu"
                        style={{
                          maxHeight: dropdownStates.parenting ? "250px" : "0",
                          overflow: "hidden",
                          transition: "max-height 0.5s ease",
                          display: "block",
                        }}
                      >
                        <li className="header-dropdown">
                          <NavLink
                            to="/basicparenting"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Basic Parenting
                            </span>
                          </NavLink>
                        </li>
                        <li className="header-dropdown">
                          <NavLink
                            to="/detailparenting"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Detailed Parenting
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </li>

                    {/* Money Matters */}

                    <li
                      className="dropdown"
                      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                    >
                      <a
                        className="dropdown-toggle"
                        data-option="off"
                        onClick={() => toggleDropdowns("money")}
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faMoneyBill} />
                        </span>
                        <div className="d-flex justify-content-between w-100">
                          <span className="mtext">Money Matters</span>
                          <span className="ml-2">
                            <FontAwesomeIcon
                              icon={
                                dropdownStates.money
                                  ? faChevronUp
                                  : faChevronDown
                              }
                            />
                          </span>
                        </div>
                      </a>
                      <ul
                        className="submenu"
                        style={{
                          maxHeight: dropdownStates.money ? "250px" : "0",
                          overflow: "hidden",
                          transition: "max-height 0.5s ease",
                          display: "block",
                        }}
                      >
                        <li className="header-dropdown">
                          <NavLink
                            to="/basicmoney"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Basic Money Matters
                            </span>
                          </NavLink>
                        </li>
                        <li className="header-dropdown">
                          <NavLink
                            to="/detailedmoney"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                className="hover-minus"
                                icon={faMinus}
                                style={{
                                  position: "absolute",
                                  left: "28px",
                                  top: "38%",
                                }}
                              />{" "}
                              Detailed Money Matters
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </li>

                    <li className="dropdown">
                      <NavLink
                        to="/compatibility_percentage"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faChartBar} />
                        </span>
                        <span className="mtext">Compatibility Scale</span>
                      </NavLink>
                    </li>
                    {/* <li class="dropdown">
              <a href="https://be.astar8.com/commons" class="dropdown-toggle no-arrow">
                  <span class="micon dw dw-library"></span><span class="mtext">common</span>
              </a>
          </li> */}
                    <li className="dropdown">
                      <NavLink
                        to="/compatibility_description"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faBook} />
                        </span>
                        <span className="mtext">Compatibility Description</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink
                        to="/general-settings"
                        className="dropdown-toggle no-arrow"
                      >
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faCog} />
                        </span>
                        <span className="mtext">General Setting</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink to="/payment" className="dropdown-toggle no-arrow">
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faDollarSign} />
                        </span>
                        <span className="mtext">Payment Setting</span>
                      </NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink to="/users" className="dropdown-toggle no-arrow">
                        <span className="sideBarIcon">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                        <span className="mtext">Users</span>
                      </NavLink>
                    </li>
                    {/* <li class="dropdown">
              <a href="https://be.astar8.com/versions" class="dropdown-toggle no-arrow">
                  <span class="micon dw dw-analytics-8"></span><span class="mtext">Version</span>

              </a>
          </li> */}
                    {/*  */}
                    {/* <li class="dropdown">
              <a href="https://be.astar8.com/import" class="dropdown-toggle no-arrow">
                  <span class="micon dw dw-library"></span><span class="mtext">Import</span>
              </a>
          </li> */}
                  </ul>
                )}
              </div>
            </div>
            <div
              id="mCSB_2_scrollbar_vertical"
              className="mCSB_scrollTools mCSB_2_scrollbar mCS-dark-2 mCSB_scrollTools_vertical mCSB_scrollTools_onDrag_expand"
              style={{ display: "block" }}
            >
              <div className="mCSB_draggerContainer">
                <div
                  id="mCSB_2_dragger_vertical"
                  className="mCSB_dragger"
                  style={{
                    position: "absolute",
                    minHeight: 30,
                    display: "block",
                    height: 27,
                    maxHeight: 218,
                    top: 0,
                  }}
                >
                  <div
                    className="mCSB_dragger_bar"
                    style={{ lineHeight: 30 }}
                  />
                </div>
                <div className="mCSB_draggerRail" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
