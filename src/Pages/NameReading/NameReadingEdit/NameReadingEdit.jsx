import React, { useEffect, useState } from "react";
import Header from "../../../component/Dashboard/Header"
import Swal from "sweetalert2";
import { editMasterNumber, editNameReading } from "../../../lib/Store";

const NameReadingEdit = () => {
  const initialData = JSON.parse(localStorage.getItem("editData")) || {
    id: "",
    number: "",
    description: "",
  };

  const [data, setData] = useState(initialData);
  const [positive, setPositive] = useState("");
  const [negative, setNegative] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("editData"));
    if (storedData) {
      setData(storedData);
    }

    if (storedData && storedData.description.includes("||")) {
      const [positivePart, negativePart] = storedData.description.split("||");
      setPositive(positivePart.trim());
      setNegative(negativePart.trim());
    } else if (storedData) {
      setPositive(storedData.description.trim());
      setNegative("");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const countWords = (text) => {
      return text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
    };

    const MIN_WORDS = 5;
    const MAX_WORDS = 500;

    if (
      countWords(positive) < MIN_WORDS ||
      countWords(positive) > MAX_WORDS ||
      countWords(negative) < MIN_WORDS ||
      countWords(negative) > MAX_WORDS
    ) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: `Each description must have between ${MIN_WORDS} and ${MAX_WORDS} words.`,
      });
      return;
    }

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
            title: "Updating...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          const updatedDescription = `${positive} || ${negative}`;

          const updatedData = {
            id: data.id,
            number: data.number,
            description: updatedDescription,
          };

          const response = await editNameReading(updatedData);

          if (response.status === true) {
            const newData = {
              ...data,
              description: response.updatedFields.description,
            };
            setData(newData);
            localStorage.setItem("editData", JSON.stringify(newData));

            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Module updated successfully!",
            }).then(() => {
              window.close();
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: "Warning!",
              text: response.message || "Unexpected response from the server.",
            });
          }
        } catch (err) {
          console.error("Error executing API:", err);
          Swal.fire({
            icon: "error",
            title: "API Error",
            text:
              err.response?.data?.message ||
              "Failed to execute API. Please check your network or try again later.",
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
      <div className="main-container">
        <div className="pd-20 card-box mb-30">
          <div className="row">
            <div className="col-md-6">
              <div>
                <h2>Edit Number {data.number}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="pd-20 card-box mb-30">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="form-group">
                  <strong>Number:</strong>
                  <input
                    placeholder="Number"
                    className="form-control"
                    disabled
                    name="number"
                    type="number"
                    value={data.number}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="form-group">
                  <strong>Positive Description:</strong>
                  <textarea
                    placeholder="Positive Description"
                    className="form-control description"
                    name="positive"
                    cols={50}
                    rows={5}
                    value={positive}
                    onChange={(e) => setPositive(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <strong>Negative Description:</strong>
                  <textarea
                    placeholder="Negative Description"
                    className="form-control description"
                    name="negative"
                    cols={50}
                    rows={5}
                    value={negative}
                    onChange={(e) => setNegative(e.target.value)}
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
};

export default NameReadingEdit;
