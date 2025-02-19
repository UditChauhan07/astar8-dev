import React, { useEffect, useState } from "react";
import Header from "../../component/Dashboard/Header";
import { IoIosEye } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Videos } from "../../lib/Store";
import { useNavigate } from "react-router-dom";
import Loader from "../../component/Loader/Loader";

const default_thumbnail = require("../../../src/Assests/img/video_thumbnail.png");

const VideosPage = () => {
  const navigate = useNavigate();
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 7; 

  const getAllVideoList = async () => {
    try {
      setLoading(true);
      const response = await Videos();
      setVideo(response.video_list);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllVideoList();
    const handleStorageChange = () => {
      getAllVideoList();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleViewClick = (item) => {
    const newWindow = window.open("/video_page/show", "_blank");
    localStorage.setItem("viewData", JSON.stringify(item));
    newWindow.dataFromParent = item;
  };

  const handleEditClick = (item) => {
    const newWindow = window.open("/video_page/edit", "_blank");
    localStorage.setItem("editData", JSON.stringify(item));
    newWindow.dataFromParent = item;
  };

  const goNewAddVideo = () => {
    navigate(`/Add_video`);
  };

  // Pagination logic
  const totalPages = Math.ceil(video.length / itemsPerPage);
  const paginatedVideos = video.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Header />
      <div className="main-container pb-3">
        <div className="pd-20 card-box mb-30">
          <div className="row">
            <div className="col-md-6">
              <h2>Video List</h2>
            </div>
            <div className="col-md-6 text-right">
              <a className="btn btn-primary" onClick={goNewAddVideo}>
                Add Video
              </a>
            </div>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="pd-20 card-box mb-30">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Title</th>
                  <th>Thumbnail</th>
                  <th>Link</th>
                  <th width="280px">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedVideos.map((item, index) => (
                  <tr key={item.id || index}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{item?.video_title}</td>
                    <td>
                      <img
                        src={item?.video_thumbnail || default_thumbnail}
                        alt="Video Thumbnail"
                        width="100%"
                        height="100%"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = default_thumbnail;
                        }}
                      />
                    </td>
                    <td>{item?.video_link}</td>
                    <td>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <a
                          className="btn btn-info"
                          title="View"
                          target="_blank"
                          onClick={() => handleViewClick(item)}
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
            {/* Pagination */}
            <div className="custom-pagination">
              <nav>
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <span className="page-link">‹</span>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      <span className="page-link">{i + 1}</span>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <span className="page-link">›</span>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VideosPage;
