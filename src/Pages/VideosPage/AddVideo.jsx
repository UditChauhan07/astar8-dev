import React, { useEffect, useState } from "react";
import Header from "../../component/Dashboard/Header";
import Swal from "sweetalert2";
import { addVideo } from "../../lib/Store";
export default function AddVideo() {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoTitle.trim() || !videoLink.trim() || !videoThumbnail) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Video title, link, and thumbnail are required.",
      });
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this video?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Adding Video...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          const formData = new FormData();
          formData.append("video_title", videoTitle);
          formData.append("video_link", videoLink);
          formData.append("video_thumbnail", videoThumbnail);
          const response = await addVideo(formData);
          if (response.status === true) {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Video added successfully!",
            }).then(() => {
                window.location.href = "/videos"; 
              });
          } else {
            Swal.fire({
              icon: "warning",
              title: "Error",
              text: response.message || "Unexpected error occurred.",
            });
          }
        } catch (err) {
          console.error("Error adding video:", err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to add video. Please try again.",
          });
        }
      } else {
        Swal.fire("Cancelled", "No changes were made.", "info");
      }
    });
  };

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="pd-20 card-box mb-30">
          <div className="row">
            <div className="col-md-6">
              <div className="">
                <h2>Add New Video</h2>
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
          <form
            method="POST"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <input name="_method" type="hidden" defaultValue="PATCH" />
            <input
              name="_token"
              type="hidden"
              defaultValue="MmAsBzgahiTlHja6MmAs2dbV1YDT8mS5UrvN0yjS"
            />
            <input
              type="hidden"
              name="_token"
              defaultValue="MmAsBzgahiTlHja6MmAs2dbV1YDT8mS5UrvN0yjS"
            />{" "}
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="form-group">
                  <strong>Video Title:</strong>
                  <input
                    placeholder="Video Title"
                    className="form-control"
                    name="video_title"
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="form-group">
                  <strong>Video Thumbnail</strong>
                  <input
                    type="file"
                    name="video_thumbnail"
                    className="form-control-file form-control height-auto"
                    onChange={(e) => setVideoThumbnail(e.target.files[0])}
                    required
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="form-group">
                  <strong>Video Link:</strong>
                  <input
                    placeholder="Video Link"
                    className="form-control"
                    name="video_link"
                    type="text"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    required
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
