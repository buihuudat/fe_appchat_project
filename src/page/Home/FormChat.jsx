import { Box, Divider, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import messageApi from "../../api/messageApi";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { setMessage } from "../../redux/reducers/messageReduce";
import imageUpload from "../../handler/ImageUpload";

const FormChat = ({ props, socket }) => {
  const [hidden, setHidden] = useState(true);
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");

  const dispatch = useDispatch();

  const handleSetFile = async (e) => {
    const type = e.type.split("/")[0];
    if (type === "image") {
      const img = await imageUpload(e.base64);
      setImage(`image|${img.data.url}`);
    } else {
      setFile(e.base64);
    }
  };
  const submitMess = async () => {
    if (!image && !file && !value) return;

    const data = {
      from: props.from,
      to: props.to,
      message: {
        text: value,
        image,
        file,
      },
    };

    try {
      await messageApi.add(data);
      const messageData = await messageApi.get({
        from: data.from,
        to: data.to,
      });
      dispatch(setMessage(messageData));
      socket.current.emit("send-msg", data);
      setValue("");
      setFile("");
      setImage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmoji = (e) => {
    let message = value;
    message += e.native;
    setValue(message);
    setHidden(true);
  };

  return (
    <Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <IconButton>
          <FileBase64 multiple={false} onDone={(e) => handleSetFile(e)} />
        </IconButton>
        <Box
          sx={{
            position: "absolute",
            bottom: 60,
            display: hidden ? "none" : "default",
          }}
        >
          <Picker data={data} onEmojiSelect={handleEmoji} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <IconButton onClick={() => setHidden(false)}>
            <EmojiEmotionsIcon sx={{ width: 40 }} />
          </IconButton>
          <TextField
            name="message"
            placeholder="Message"
            sx={{ width: 400 }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <IconButton onClick={submitMess}>
            <SendIcon sx={{ width: 40 }} color="primary" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default FormChat;
