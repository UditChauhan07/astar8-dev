import React, { useState, useEffect } from "react";
import "../../styles/Style.css";
import { addDailyForecast } from "../../lib/Store";
import Swal from "sweetalert2";

export default function AddDailyForcast() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to current date
  const [prediction, setPrediction] = useState("");
  const [user_id] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("UserToken");
    setToken(storedToken);
  }, []);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const wordCount = prediction.trim().split(/\s+/).length; // Calculate word count
    const totalCharacters = prediction.trim().length;
    console.log("totall ",totalCharacters)
    

    if (!prediction.trim()) {
      Swal.fire("Oops!", "Prediction cannot be empty.!", "warning");
      return;
    }
    if (totalCharacters > 5000) {
      Swal.fire("Oops!", "Prediction cannot exceed 5000 words!", "warning");
      return;
    }

    setLoading(true);

    try {
      const formattedDate = new Date(date).toISOString().split("T")[0]; // Use user-selected date
      const trimmedPrediction = prediction.trim().replace(/\n/g, " "); // Replace newlines with spaces

      // console.log("details", token, formattedDate, trimmedPrediction, user_id);

      const response = await addDailyForecast(
        token,
        formattedDate,
        trimmedPrediction,
        user_id
      );

      if (response.status === "success") {
        setPrediction("");
        // setDate(new Date().toISOString().split("T")[0]);
        setDate("")
        await Swal.fire({
          title: "Success!",
          text: response.message,
          icon: "success",
          showConfirmButton: false, // Hide the confirm button
          timer: 2000, // Auto-close after 2 seconds (2000ms)
        });
      } else {
        setMessage(response.error);
        Swal.fire("Already Exist!", response.response.data.message, "warning");
        setDate(new Date().toISOString().split("T")[0]);
        setPrediction("");
      }

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error: " + error);
    } finally {
      setLoading(false);
    }
  };

  const closeMessage = () => {
    setMessage("");
  };

  return (
    <>
      <div className="row mt-4">
        <div className="col-xs-2 col-sm-2 col-md-2" />
        <div className="col-xs-8 col-sm-8 col-md-8 mb-2">
          <form method="POST" onSubmit={onHandleSubmit}>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="form-group">
                  <strong>Date:</strong>
                  <input
                    placeholder="Date"
                    className="form-control mt-1 pred_Date"
                    name="prediction_date"
                    type="date"
                    value={date}
                    min={new Date().toISOString().split("T")[0]} // Restrict to current date or later
                    onChange={(e) => setDate(e.target.value)} // Update date state
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="form-group">
                  <strong>Daily Forecast:</strong>
                  <textarea
                    placeholder="Prediction"
                    className="form-control prediction mt-1"
                    style={{ height: "150px" }}
                    name="prediction"
                    value={prediction}
                    onChange={(e) => setPrediction(e.target.value)} // Update prediction state
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 text-center submitBtn mt-2">
                <button type="submit" className="btn btn-primary alert-publish">
                  {loading
                    ? "Loading..."
                    : date === new Date().toISOString().split("T")[0]
                    ? "Publish"
                    : "Schedule"}
                </button>
              </div>
            </div>
          </form>

          {message && (
            <div className="alert alert-info mt-3">
              <span>{message}</span>
              <button
                className="close-btn"
                onClick={closeMessage}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  background: "transparent",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>
          )}
        </div>
        <div className="col-xs-2 col-sm-2 col-md-2" />
      </div>
    </>
  );
}
