import React, { useEffect, useState } from "react";
import { editLifeCoackDEscription } from "../../lib/Store";
import Swal from "sweetalert2";
import Header from "../../component/Dashboard/Header";
export default function LifeCoachDescriptionEdit() {
  const initialData = JSON.parse(localStorage.getItem("editData")) || {
    id: "",
    number: "",
    star_number: "",
    star_type: "",
    description: "",
    type: "",
  };

  const [data, setData] = useState(initialData);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("editData"));
    console.log(storedData, "storedData");
    if (storedData) {
      setData(storedData);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Description
    if (!data.description.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Description is required.",
      });
      return;
    }

    // Show Confirmation Dialog
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the description?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Updating Description...",
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
          });

          // API Call
          const response = await editLifeCoackDEscription({
            id: data.id,
            description: data.description,
          });

          if (response.status === true) {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Description updated successfully!",
            }).then(() => {
              localStorage.setItem("editData", JSON.stringify(data));
              window.close();
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: "Update Failed",
              text: response.message || "Unexpected error occurred.",
            });
          }
        } catch (err) {
          console.error("Error updating description:", err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update description. Please try again.",
          });
        }
      } else {
        Swal.fire("Cancelled", "No changes were made.", "info");
      }
    });
  };
  if (!data || !data.id) {
    return (
      <>
        <Header />
        <div className="main-container">
          <div className="pd-20 card-box mb-30">
            <h2>No data available to edit.</h2>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="main-container pb-3">
        <div className="pd-20 card-box mb-30">
          <div className="row">
            <div className="col-md-6">
              <div className="">
                <h2>Edit Number {data?.number}</h2>
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-right">
                {/* <a class="btn btn-primary" href="https://be.astar8.com/lifecoach_descriptions"> Back </a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="pd-20 card-box mb-30">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="form-group">
                  <strong>Type:</strong>
                  <input
                    placeholder="Number"
                    className="form-control"
                    disabled
                    name="number"
                    type="text"
                    defaultValue={
                      data?.type == 1
                        ? "Day"
                        : data?.type == 2
                        ? "Week"
                        : "Unknown"
                    }
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="form-group">
                  <strong>Star Type:</strong>

                  <input
                    placeholder="Number"
                    className="form-control"
                    disabled
                    name="number"
                    type="text"
                    defaultValue={
                      data?.star_type == 1
                        ? "Green Star"
                        : data?.star_type == 2
                        ? "Red Star"
                        : data?.star_type == 3
                        ? "Neutral"
                        : "Unknown"
                    }
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="form-group">
                  <strong>Star Count:</strong>

                  <input
                    placeholder="Number"
                    className="form-control"
                    disabled
                    name="number"
                    type="text"
                    defaultValue={
                      data?.star_number === 1
                        ? "One Star"
                        : data?.star_number === 2
                        ? "Two Star"
                        : data?.star_number === 3
                        ? "Three Star"
                        : data?.star_number === 0
                        ? "Neutral"
                        : "Unknown"
                    }
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="form-group">
                  <strong>Number</strong>
                  <input
                    placeholder="Number"
                    className="form-control"
                    disabled
                    name="number"
                    type="text"
                    defaultValue={data?.number}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="form-group">
                  <strong>Description:</strong>
                  <textarea
                    placeholder="Description"
                    className="form-control description"
                    name="description"
                    cols={50}
                    rows={10}
                    value={data.description}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
