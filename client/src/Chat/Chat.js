import React from "react";
import { ChatEngine } from "react-chat-engine";
import { PeopleSettings } from "react-chat-engine";
export const Chat = () => {
  const username = sessionStorage.getItem("msv");
  return (
    <div style={{ overflow: "hidden" }}>
      <ChatEngine
        height="100vh"
        projectID="458c42a0-f2ff-4ffa-bafa-b0f1066903ee"
        userName={username}
        userSecret={username}
        onNewMessage={() =>
          new Audio(
            "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
          ).play()
        }
      />
    </div>
  );
};
