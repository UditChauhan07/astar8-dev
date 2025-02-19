import React, { useState, useEffect } from "react";
import Header from "../../component/Dashboard/Header";
import { IoIosEye } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { getDestinyNumbers } from "../../lib/Store";
import Loader from "../../component/Loader/Loader";

const DestinyNumbers = () => {
  const [destinyNumber, showDestinyNumber] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchElementalNumbers = async () => {
    setLoading(true);
    try {
      const response = await getDestinyNumbers();
      console.log("response", response);
      showDestinyNumber(response || []);
    } catch (err) {
      console.error("Error fetching elemental numbers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchElementalNumbers();

    const handleStorageChange = () => {
      fetchElementalNumbers();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle View Click
  const handleViewClick = (item) => {
    const newWindow = window.open("/destinyShow/view", "_blank");
    localStorage.setItem("viewData", JSON.stringify(item));
    newWindow.dataFromParent = item;
    console.log("viewData", item);
  };

  // Handle Edit Click
  const handleEditClick = (item) => {
    const newWindow = window.open("destinyEdit/edit", "_blank");
    localStorage.setItem("editData", JSON.stringify(item));
    newWindow.dataFromParent = item;
    console.log("editData", item);
  };

  return (
    <>
      <Header />
      <div className="main-container pb-3">
        <div className="pd-20 card-box mb-30">
          <div className="row">
            <div className="col-md-6">
              <div className="">
                <h2>Destiny Numbers</h2>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="pd-20 card-box mb-30">
            <div className="card-block table-border-style">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th>Number</th>
                    <th>Description</th>
                    <th width="280px">Action</th>
                  </tr>
                  {destinyNumber?.map((item) => (
                    <tr>
                      <td>{item.number}</td>
                      <td>{item.description}</td>
                      <td>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <a
                            className="btn btn-info"
                            onClick={() => handleViewClick(item)}
                            title="View"
                            target="_blank"
                          >
                            <IoIosEye size={18} />
                          </a>
                          <a
                            className="btn btn-primary"
                            title="Edit"
                            target="_blank"
                            onClick={() => handleEditClick(item)}
                          >
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DestinyNumbers;
