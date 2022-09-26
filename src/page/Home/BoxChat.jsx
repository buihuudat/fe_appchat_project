import { Avatar, Box, Container, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import messageApi from "../../api/messageApi";
import { setMessage } from "../../redux/reducers/messageReduce";

const BoxChat = ({ props, socket }) => {
  const messages = useSelector((state) => state.message.data);
  const scrollRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", async () => {
        const mess = await messageApi.get({
          from: props.user._id,
          to: props.chat._id,
        });
        dispatch(setMessage(mess));
      });
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const CheckFile = ({ mess }) => {
    const type = mess.split("/")[0];
    if (type === "data:image") {
      return (
        <img
          src={mess}
          alt="image"
          style={{
            height: 50,
            objectFit: "cover",
          }}
        />
      );
    } else if (type === "data:application") {
      return (
        <a href={mess} download="download file">
          Download {mess.split(":")[1].split("/")[1].split(";")[0]}
        </a>
      );
    } else {
      return (
        <Typography
          sx={{
            maxWidth: 200,
            overflowWrap: "break-word",
          }}
        >
          {mess}
        </Typography>
      );
    }
  };

  const MessLeft = (mess) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mb: 2,
          gap: 2,
        }}
        ref={scrollRef}
      >
        <Avatar src={props.chat.avatar} alt={props.chat.fullname} />
        <Paper
          sx={{
            p: 1,
          }}
        >
          <CheckFile mess={mess.messages} />
        </Paper>
      </Box>
    );
  };

  const MessRight = (mess) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "end",
          gap: 2,
          mb: 2,
        }}
        ref={scrollRef}
      >
        <Paper
          sx={{
            p: 1,
          }}
        >
          <CheckFile mess={mess.messages} />
        </Paper>
        <Avatar src={props.user.avatar} alt={props.user.fullname} />
      </Box>
    );
  };

  return (
    <Box sx={{ m: "0 auto" }}>
      <Container
        sx={{
          mt: 5,
          p: 3,
          background: "#333",
          width: 500,
          height: 700,
          overflowY: "auto",
          bottom: 0,
        }}
      >
        {!messages.length && <Typography align="center">No message</Typography>}
        {messages?.map((mess, index) => {
          if (mess.fromSelf) {
            return <MessRight key={index} {...mess} ref={scrollRef} />;
          }
          return <MessLeft key={index} {...mess} />;
        })}
      </Container>
    </Box>
  );
};

export default BoxChat;
