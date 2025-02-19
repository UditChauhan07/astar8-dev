import React, { useState, useEffect } from "react";
import Header from "../../component/Dashboard/Header";
import Loader from "../../component/Loader/Loader";
const default_thumbnail = require("../../../src/Assests/img/video_thumbnail.png");
export default function VideoShow() {
  const [showData, setshowData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("viewData"));
    console.log(data, "data");
    if (data) {
      setshowData(data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <>
      <Header />
      <div className="main-container">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="pd-20 card-box mb-30">
              <div className="row">
                <div className="col-md-6">
                  <div className="">
                    <h2>Video Detail</h2>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="text-right">
                    {/* <a class="btn btn-primary" href="https://be.astar8.com/videos"> Back </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="pd-20 card-box mb-30">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <div className="form-group">
                    <strong>Video Title: </strong>
                    {showData.video_title}
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <div className="form-group">
                    <strong>Video Thumbnail: </strong>
                    <img
                      src={showData.video_thumbnail || default_thumbnail}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = default_thumbnail;
                      }}
                      alt="Video Thumbnail"
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <div className="form-group">
                    <strong>Video link: </strong>
                    {showData.video_link}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
