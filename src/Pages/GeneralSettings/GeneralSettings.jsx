import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert
import Header from "../../component/Dashboard/Header";
import { subscriptionsUpdateUser } from "../../lib/Store";

const GeneralSettings = () => {
  const [formData, setFormData] = useState({
    number_of_user: null,
    _token: localStorage.getItem("userId"),
  });

  // Handle changes in form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "number_of_user" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation for the form
    if (!formData.number_of_user || isNaN(formData.number_of_user)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a valid number of users!",
      });
      return;
    }
  
    // Show loading SweetAlert while API is executing
    Swal.fire({
      title: "Processing...",
      text: "Please wait while we update the subscription.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); 
      },
    });
  
    // Prepare final data for the API
    const finalData = {
      userId: formData._token,
      number_of_users: formData.number_of_user,
    };
  
    try {
      // Simulate or execute the API call
      const response = await subscriptionsUpdateUser(finalData);
      // Handle success
      if (response.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Operation Successful",
          text: `You have successfully selected ${formData.number_of_user} users.`,
        }).then(() => {
          setFormData((prevData) => ({
            ...prevData,
            number_of_user: null,
          }));
        });
      } else {
        // Handle failure response
        Swal.fire({
          icon: "error",
          title: "Operation Failed",
          text: response.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      // Handle API errors
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to process your request. Please try again later.",
      });
    }
  };
  

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="pd-20 card-box mb-30">
          <div className="row">
            <div className="col-md-6">
              <div>
                <h2 style={{ fontWeight: "600" }}>General Setting</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="pd-20 card-box mb-30">
          <form
            method="POST"
            action=""
            acceptCharset="UTF-8"
            id="form1"
            onSubmit={handleSubmit}
          >
            <input name="_token" type="hidden" value={formData._token} />
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="form-group">
                  <strong>Number of New Users:</strong>
                  <select
                    name="number_of_user"
                    id="number_of_user"
                    className="form-control"
                    value={formData.number_of_user || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select...</option>{" "}
                    <option value="2">2</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="150">150</option>
                    <option value="200">200</option>
                    <option value="250">250</option>
                    <option value="300">300</option>
                    <option value="350">350</option>
                    <option value="400">400</option>
                    <option value="450">450</option>
                    <option value="500">500</option>
                  </select>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                <button
                  type="submit"
                  className="btn btn-primary free-subscribe"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default GeneralSettings;
