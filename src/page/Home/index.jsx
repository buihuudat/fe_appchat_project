import { Box, Toolbar } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import AddChat from "../../components/common/Modals/AddChat";
import DeleteAccount from "../../components/common/Modals/DeleteAccount";
import BoxChat from "./BoxChat";
import FormChat from "./FormChat";
import { io } from "socket.io-client";
import Profile from "../Profile";

const Home = () => {
  const user = useSelector((state) => state.user.data);
  const chat = useSelector((state) => state.handler.n1);

  const host = "https://appchat-buihuudat.vercel.app";
  const socket = useRef();

  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("user", user._id);
    }
  }, [user]);

  return (
    <Box
      flexGrow={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Toolbar />
      {chat.data._id && (
        <BoxChat props={{ user, chat: chat.data }} socket={socket} />
      )}
      <Box sx={{ mt: "auto" }}>
        {chat.data._id && (
          <FormChat
            props={{ from: user._id, to: chat.data._id }}
            socket={socket}
          />
        )}
      </Box>
      <AddChat />
      <Profile />
      <DeleteAccount />
    </Box>
  );
};

export default Home;
