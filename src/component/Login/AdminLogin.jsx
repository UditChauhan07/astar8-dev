import React, { useContext, useState } from "react";
import "../../styles/Style.css";
import logo from "../../Assests/img/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { LoginApi } from "../../lib/Store";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AppContext from "../../ContextApi/userContext";
export default function AdminLogin() {
  const { data, setData } = useContext(AppContext);
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  console.log("adssa", error);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailInvalid, setEmailInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordInvalid, setPasswordInvalid] = useState(false);
  const [errorEmail, setErrorEmail] = useState(""); // For email-related error messages
  const [errorPassword, setErrorPassword] = useState(""); // For password-related error messages

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleInputChange = () => {
    setEmailInvalid(false);
    setPasswordInvalid(false);
    setError("");
    setErrorEmail("");
    setErrorPassword("");

    if (validateEmail(email) && password.trim() !== "") {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset errors
    setEmailInvalid(false);
    setPasswordInvalid(false);

    if (!validateEmail(email)) {
      setErrorEmail("Please include an '@' in the email address.");
      setEmailInvalid(true);
      setLoading(false);
      return;
    }

    if (password.trim() === "") {
      setErrorPassword("Password cannot be empty.");
      setPasswordInvalid(true);
      setLoading(false);
      return;
    }

    try {
      const response = await LoginApi(email, password);

      if (response.status === true) {
        // Save user details in localStorage
        localStorage.setItem("UserToken", response.token);
        localStorage.setItem("userId", response.user_id);
        localStorage.setItem("Role", response.role);
        localStorage.setItem("userEmail", response.email);
        localStorage.setItem("profilePic", response.profile_pic);
        localStorage.setItem("name", response.name);

        // Save data to context
        const savedData = {
          role: response.role,
          userToken: response.token,
          name: response.name,
          profilePic: response.profile_pic,
          userEmail: response.email,
          userId: response.user_id,
        };
        setData(savedData);

        Navigate("/dashboard");
      } else if (response.status === 1) {
        setErrorEmail(response.error || "Invalid email address.");
        setEmailInvalid(true);
      } else if (response.status === 2) {
        setErrorPassword(response.error || "Incorrect password.");
        setPasswordInvalid(true);
      } else {
        setError(response.error || "An error occurred. Please try again.");
      }
    } catch (apiError) {
      console.error("Login API Error:", apiError.message);
      setError("A server error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center loginPage">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 col-lg-6 imgCon">
            <img src={logo} alt="Logo" height="70%" width="70%" />
          </div>
          <div className="col-md-6 col-lg-6" style={{display:"flex",justifyContent:"center"}}>
            <div className="login-box bg-white box-shadow border-radius-10">
              <div className="login-title">
                <h2 className="text-center text-primary">Login</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div
                  className={`input-group custom ${
                    isEmailInvalid ? "error-border" : ""
                  }`}
                >
                  <input
                    id="email"
                    type="email"
                    placeholder="Username"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      handleInputChange();
                    }}
                    required
                  />
                  {isEmailInvalid && (
                    <div className="input-group-append">
                      <span className="input-group-text text-danger">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                      </span>
                    </div>
                  )}
                </div>
                {errorEmail && (
                  <div className="error-message text-danger mb-3">
                    {errorEmail}
                  </div>
                )}

                <div
                  className={`input-group custom ${
                    isPasswordInvalid ? "error-border" : ""
                  }`}
                  style={{ position: "relative" }}
                >
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="**********"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      handleInputChange();
                    }}
                    required
                    style={{ paddingRight: "35px" }} // Add space for the eye icon
                  />
                  {password && (
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        zIndex: "10",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </span>
                  )}
                </div>

                {errorPassword && (
                  <div className="error-message text-danger mb-3">
                    {errorPassword}
                  </div>
                )}

                <div className="row">
                  <div className="col-sm-12">
                    <div className="input-group mb-0">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                        // disabled={isButtonDisabled}
                      >
                        {loading ? "Loading..." : "Login"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
