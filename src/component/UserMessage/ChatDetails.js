import React, { useEffect, useState, useRef } from "react";
import { TfiEmail } from "react-icons/tfi";
import { SiMinutemailer } from "react-icons/si";
import { getUserChatMessages, setSeenMessages } from "../../lib/Store";
import { io } from "socket.io-client";
import { BeatLoader } from "react-spinners";
import Loader from "../Loader/Loader";

const ChatDetails = ({ user, onMessageSent }) => {
  const url = "https://dev.astar8.com"
  // const url = "http://localhost:5234";
  const [userChatMessages, setUserChatMessages] = useState([]);
  console.log("userrr", user);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [adminId, setadminId] = useState(localStorage.getItem("userId" || ""));
  const [adminProfile, setadminProfile] = useState(
    localStorage.getItem("profilePic" || "")
  );
  const [userRole, setuserRole] = useState(localStorage.getItem("Role") || "");
  console.log("userROleee", userRole);
  const llyadId = "5mywqbuSYUPveHLmD0Df";
  const llyodProfilePic = "https://dev.astar8.com/uploads/1737091948321.png";
  const [handleSocketError, sethandleSocketError] = useState();

  const messagesEndRef = useRef(null);

  const fetchUserChats = async () => {
    setLoading(true);
    const senderrid = userRole === "1" ? adminId : llyadId;
    const finalData = {
      senderId: senderrid,
      receiverId: user?.user_id,
    };
    const response = await getUserChatMessages(finalData);
    setUserChatMessages(response.messages);
    setLoading(false);
  };

  const setSeenMessage = async (id) => {
    const finalDate = {
      userId: id,
      isSeen: 1,
    };
    const response = await setSeenMessages(finalDate);
    // console.log("ress",response)
  };

  useEffect(() => {
    if (user) fetchUserChats();
  }, [user]);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(url); // Replace with your backend URL
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("register", { userId: adminId });
    });

    // Listen for real-time messages
    newSocket.on("receive-message", (data) => {
      console.log("Received message:", data);

      // Add message only if it's from the current chat
      if (data.userId === user?.user_id || data.recipientId === user?.user_id) {
        const formattedMessage = {
          created: data.timestamp,
          message: data.message,
          messageId: data.messageId,
          receiverId: data.recipientId,
          senderId: data.userId,
          updated: data.timestamp,
          dailyprediction_id: null,
        };

        setUserChatMessages((prevMessages) => [
          ...prevMessages,
          formattedMessage,
        ]);
        // console.log("asdsadadsd",user?.user_id)
        setSeenMessage(user?.user_id);
      }
      onMessageSent();
    });

    newSocket.on("error-message", (data) => {
      console.log("Socket messsage error", data);
      sethandleSocketError(data);
    });

    return () => newSocket.disconnect();
  }, [user]);

  // Send a message to the server
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const messageData = {
      userId: adminId,
      recipientId: user?.user_id,
      message: messageInput,
    };

    socket.emit("send-message", messageData);
    setMessageInput("");
    onMessageSent();
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (timeString) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", options);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [userChatMessages]);

  useEffect(() => {
    const setSeenMessage = async () => {
      if (user) {
        // console.log("checkUserrr---------0", user.user_id);
        const finalDate = {
          userId: user.user_id,
          isSeen: 1,
        };

        try {
          const response = await setSeenMessages(finalDate);
          // console.log("Message seen response:", response);
        } catch (error) {
          console.error("Error setting message as seen:", error);
        }
      }
    };

    setSeenMessage();
  }, [userChatMessages]);

  const onHandleNextPage = (id) => {
    localStorage.setItem("user_Detailed_id", id);
    window.open(`/userDetailedData`, "_blank");
  };

  return (
    <div className="" style={{ flex: 2, height: "72vh" }}>
      {user ? (
        <>
          <div
            className="d-flex flex-column h-100"
            style={{
              overflow: "hidden",
            }}
          >
            {/* Upper Div with Dark Blue Background */}
            <div
              className="d-flex align-items-center justify-content-center pb-2 pt-2"
              style={{ background: "#0b132b" }}
            >
              {/* User Photo and Details */}
              <div className="text-center">
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto", // Centers the image horizontally if needed
                  }}
                >
                  <img
                    src={
                      user.user_profile_pic
                        ? user.user_profile_pic
                        : "https://be.astar8.com/img/default-profile-img.png"
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://be.astar8.com/img/default-profile-img.png";
                    }}
                    alt=""
                    className="rounded-circle"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <h5
                  className="mb-1 mt-1"
                  style={{ color: "#44aeff" }}
                  onClick={() => onHandleNextPage(user.user_id)}
                >
                  {user.user_name}
                </h5>
                <p className="mb-0 small" style={{ color: "#a4a4a4" }}>
                  DOB: {formatDate(user.user_dob)}
                </p>
                <p className="mb-0 small" style={{ color: "#a4a4a4" }}>
                  EMAIL: {user.user_username || "Pending!"}
                </p>
                <p className="mb-0 small" style={{ color: "#a4a4a4" }}>
                  Joining Date: {formatDate(user.user_created_at)}
                </p>
              </div>
            </div>

            {/* Messages Section */}
            <div
              className="flex-grow-1 p-4"
              style={{
                overflowY: "auto",
                maxHeight: "calc(100vh - 250px)",
                background: "#f7f8fa",
              }}
            >
              {loading ? (
                <div className="text-center">
                  <Loader />
                </div> // Loading indicator
              ) : (
                <div>
                  {userChatMessages
                    ?.filter((message) => message.dailyprediction_id === null)
                    .map((message) => (
                      <div
                        key={message.messageId}
                        style={{ gap: "15px" }}
                        className={`d-flex mb-3 ${
                          message.senderId === user?.user_id
                            ? "justify-content-start"
                            : "justify-content-end"
                        }`}
                      >
                        {message.senderId === user?.user_id && (
                          <img
                            src={
                              user.user_profile_pic
                                ? user.user_profile_pic
                                : "https://be.astar8.com/img/default-profile-img.png"
                            }
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://be.astar8.com/img/default-profile-img.png";
                            }}
                            alt="User profile"
                            className="rounded-circle me-2"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                        <div
                          className="p-3 rounded"
                          style={{
                            background:
                              message.senderId === user?.user_id
                                ? "#ecf0f4"
                                : "#d1e7dd",
                            wordWrap: "break-word",
                            maxWidth: "70%",
                          }}
                        >
                          {message.message}
                          <p
                            className="small mb-0 mt-1"
                            style={{ color: "#a4a4a4", textAlign: "right" }}
                          >
                            {formatDate(message.updated || message.timestamp)}{" "}
                            at{" "}
                            {formatTime(message.updated || message.timestamp)}
                          </p>
                        </div>
                        {message.senderId !== user?.user_id && (
                          <img
                            src={
                              userRole === "2"
                                ? llyodProfilePic
                                : user.user_profile_pic
                                ? user.user_profile_pic
                                : "https://be.astar8.com/img/default-profile-img.png"
                            }
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://be.astar8.com/img/default-profile-img.png";
                            }}
                            alt="User profile"
                            className="rounded-circle me-2"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </div>
                    ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Field Section */}
            {userRole !== "2" && (
              <div
                className="p-3 border-top"
                style={{
                  background: "#fff",
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="pr-2">
                    <TfiEmail size={25} />
                  </div>

                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="w-100 border-0 me-2"
                    placeholder="Type your message..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage(); // Trigger message send on Enter key press
                      }
                    }}
                    style={{
                      outline: "none",
                      background: "#f7f8fa",
                      borderRadius: "4px",
                      padding: "8px",
                    }}
                  />
                  <div
                    className="pl-1"
                    style={{ cursor: "pointer" }}
                    onClick={handleSendMessage}
                  >
                    <SiMinutemailer size={25} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="default-message text-center p-4 font-weight-bold">
          No Message Found
        </div>
      )}
    </div>
  );
};

export default ChatDetails;
