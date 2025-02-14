import React, { useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import Loader from "../Loader/Loader";

const ChatList = ({ users, onSelectUser }) => {
  console.log("userrer",users)
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  console.log("loading", loading);
  useEffect(() => {
    if (users) {
      setLoading(false);
    }
    else if (users === undefined){
      setLoading(false)
    }
  }, [users]);

  const filteredUsers = users?.filter((user) =>
    user.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-list bg-light-gray">
      <div className="chat-search">
        <span className="ti-search" />
        <input
          type="text"
          placeholder="Search Contact"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="notification-list">
        {loading ? (
          <Loader />
        ) : users === undefined ? (
          <div>
            <p style={{textAlign:"center"}}>No user found</p>
          </div>
        ) : filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <ChatItem
              key={user.user_id}
              user={user}
              onSelectUser={onSelectUser}
            />
          ))
        ) : (
          <p>No user found</p>
        )}
      </div>
    </div>
  );
};

export default ChatList;
