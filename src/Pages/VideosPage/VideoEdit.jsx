import React, { useEffect, useState } from "react";
import Header from "../../component/Dashboard/Header";
import Swal from "sweetalert2";
import { editVideoList } from "../../lib/Store";
export default function VideoEdit() {
  const initialData = JSON.parse(localStorage.getItem("editData")) || {
    id: "",
    video_title: "",
    video_link: "",
  };

  const [data, setData] = useState(initialData);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("editData"));
    if (storedData) {
      setData(storedData);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate fields
    if (!data.video_title.trim() || !data.video_link.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Video title and link are required.",
      });
      return;
    }
  
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the video details?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Updating Video...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
  
          // Prepare form data
          const formData = new FormData(e.target);
          formData.append("id", data.id);
  
          // API Call
          const response = await editVideoList(formData);
  
          if (response.status === true) {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Video updated successfully!",
            }).then(() => {
              localStorage.setItem(
                "editData",
                JSON.stringify({
                  ...data,
                  video_title: formData.get("video_title"),
                  video_link: formData.get("video_link"),
                })
              );
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
          console.error("Error updating video:", err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update video. Please try again.",
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
      <div className="main-container">
        <div className="pd-20 card-box mb-30">
          <div className="row">
            <div className="col-md-6">
              <div className="">
                <h2>Edit Video</h2>
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
                    defaultValue={data.video_title}
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
                    defaultValue={data.video_link}
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
