import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import Loader from "../Loader/Loader";
import {
  subscription1Action,
  cancel1Action,
  cancel3Action,
  subscription3Action,
  getAllUsers,
} from "../../lib/Store";
import { toast, Toaster } from "react-hot-toast";

export default function UserData({ user, currentPage, usersPerPage, loading }) {
  const onHandleNextPage = (id) => {
    localStorage.setItem("user_Detailed_id", id);
    window.open(`/userDetailedData`, "_blank");
  };

  const subscriptionspecialMonth = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to activate a subscription!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0199FE",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Activate!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Processing...",
            text: "Please wait while we activate your subscription.",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
          });
          const token = localStorage.getItem("UserToken");
          const response = await subscription1Action(id, token);

          Swal.close();
          Swal.fire({
            title: "Activated!",
            text: "Subscription has been activated successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 0);
          });
        } catch (error) {
          Swal.close();
          Swal.fire("Error!", "Failed to activate subscription.", "error");
          console.error("Error activating 1-month subscription:", error);
        }
      }
    });
  };

  const subscription3Month = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to activate a 3-month subscription?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0199FE",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Activate!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Processing...",
            text: "Please wait while we activate your subscription.",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
          });
          const token = localStorage.getItem("UserToken");
          const response = await subscription3Action(id, token);

          Swal.close();
          Swal.fire({
            title: "Activated!",
            text: "3 Month Subscription has been activated successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 0);
          });
        } catch (error) {
          Swal.close();
          Swal.fire("Error!", "Failed to activate subscription.", "error");
          console.error("Error activating 3-month subscription:", error);
        }
      }
    });
  };

  const CancelsubscriptionspecialMonth = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel the subscription?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0199FE",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Processing...",
            text: "Please wait while we cancel your subscription.",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
          });
          const token = localStorage.getItem("UserToken");
          const response = await cancel1Action(id, token);
          Swal.close();
          Swal.fire({
            title: "Canceled!",
            text: "Subscription has been canceled successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 0);
          });
        } catch (error) {
          Swal.close();
          Swal.fire("Error!", "Failed to cancel subscription.", "error");
          console.error("Error canceling 1-month subscription:", error);
        }
      }
    });
  };

  const cancel3Actions = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel the 3-month subscription?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0199FE",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Processing...",
            text: "Please wait while we cancel your subscription.",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
          });
          const token = localStorage.getItem("UserToken");
          const response = await cancel3Action(id, token);
          Swal.close();
          Swal.fire({
            title: "Canceled!",
            text: "3 Month Subscription has been canceled successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 0);
          });
        } catch (error) {
          Swal.close();
          Swal.fire("Error!", "Failed to cancel subscription.", "error");
          console.error("Error canceling 3-month subscription:", error);
        }
      }
    });
  };

  return (
    <>
      <Toaster />
      <table className="table table-bordered" id="allDataTable">
        <tbody>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subscription Status</th>
            <th>Payment Platform</th>
            <th>Subscription Action</th>
            <th>3 Month Subscription Action</th>
            <th>Action</th>
          </tr>
          {loading ? (
            <tr>
              <td
                colSpan="8"
                style={{ textAlign: "center", padding: "15px 0" }}
              >
                <Loader />
              </td>
            </tr>
          ) : user && user.length > 0 ? (
            user.map((data, index) => {
              const rowNumber = (currentPage - 1) * usersPerPage + index + 1;
              return (
                <tr key={data.id}>
                  <td>{rowNumber}</td>
                  <td>{data.name}</td>
                  <td>{data.email || data.username}</td>
                  <td style={{ textAlign: "center" }}>
                    {data.subscription_status === 0 ? "Free" : "Paid"}
                  </td>
                  <td>{data.platform || "N/A"}</td>

                  {/* 1- month subscription button */}
                  {/* <td style={{ textAlign: "center" }}>
                    {data.subscription_status === 9 || data.total_days <= 31 ? (
                      <button
                        type="submit"
                        name="subscribe"
                        className="btn btn-danger alert-subscribe"
                        title="Click to Inactivate Subscription"
                        onClick={() => CancelsubscriptionspecialMonth(data.id)}
                        disabled={data.total_days > 0 && data.total_days >= 31} 
                      >
                        InActive
                      </button>
                    ) : (
                      <button
                        type="submit"
                        name="subscribe"
                        className="btn alert-subscribe"
                        style={{ backgroundColor: "#0199FE", color: "white" }}
                        title="Click to Activate Subscription"
                        onClick={() => subscriptionspecialMonth(data.id)}
                        disabled={data.subscription_status === 0}
                      >
                        Active
                      </button>
                    )}
                  </td> */}

                  {/* 3-month subscription button */}
                  {/* <td style={{ textAlign: "center" }}>
                    {data.subscription_status === 9 || data.total_days > 31 ? (
                      <button
                        type="submit"
                        name="subscribe"
                        className="btn btn-danger alert-subscribe"
                        title="Click to InActivate subscription"
                        onClick={() => cancel3Actions(data.id)}
                      >
                        InActive
                      </button>
                    ) : (
                      <button
                        type="submit"
                        name="subscribe"
                        className="btn alert-subscribe"
                        style={{ backgroundColor: "#0199FE", color: "white" }}
                        title="Click to Activate Subscription"
                        onClick={() => subscription3Month(data.id)}
                        disabled={data.subscription_status === 0}
                      >
                        Active
                      </button>
                    )}
                  </td> */}

                  {/* 1-Month Subscription Button */}
                  <td style={{ textAlign: "center" }}>
                    {data.total_days > 0 && data.total_days <= 31 ? (
                      <button
                        type="submit"
                        name="subscribe"
                        className="btn btn-danger alert-subscribe"
                        title="Click to Inactivate Subscription"
                        onClick={() => CancelsubscriptionspecialMonth(data.id)}
                      >
                        InActive
                      </button>
                    ) : (
                      <button
                        type="submit"
                        name="subscribe"
                        className="btn alert-subscribe"
                        style={{ backgroundColor: "#0199FE", color: "white" }}
                        title="Click to Activate Subscription"
                        onClick={() => subscriptionspecialMonth(data.id)}
                        disabled={data.total_days > 31} // 👈 3-month user ke liye disabled
                      >
                        Active
                      </button>
                    )}
                  </td>

                  {/* 3-Month Subscription Button */}
                  <td style={{ textAlign: "center" }}>
                    {data.total_days > 31 ? (
                      <button
                        type="submit"
                        name="subscribe"
                        className="btn btn-danger alert-subscribe"
                        title="Click to Inactivate Subscription"
                        onClick={() => cancel3Actions(data.id)}
                      >
                        InActive
                      </button>
                    ) : (
                      <button
                        type="submit"
                        name="subscribe"
                        className="btn alert-subscribe"
                        style={{ backgroundColor: "#0199FE", color: "white" }}
                        title="Click to Activate Subscription"
                        onClick={() => subscription3Month(data.id)}
                        disabled={data.total_days > 0 && data.total_days <= 31} // 👈 1-month user ke liye disabled
                      >
                        Active
                      </button>
                    )}
                  </td>

                  <td className="userTableTd">
                    <a
                      className="btn btn-info btnButton"
                      style={{ padding: "2px 12px" }}
                      title="View"
                      onClick={() => onHandleNextPage(data.id)}
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        style={{ fontSize: "11px" }}
                      />
                    </a>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
