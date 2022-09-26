import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/reducers/handlerReducer";
import { Avatar, TextField } from "@mui/material";
import { useState } from "react";
import FileBase64 from "react-file-base64";
import userApi from "../api/userApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  gap: 5,
};

export default function Profile() {
  const open = useSelector((state) => state.handler.openProfile);
  const user = useSelector((state) => state.user.data);
  const GGL = localStorage.getItem("GGL");

  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setProfile(false));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      username: user.username,
      fullname: formData.get("fullname") || user.fullname,
      password: formData.get("password") || user.password,
      confirmPassword: formData.get("confirmPassword") || user.confirmPassword,
    };

    if (data.fullname === "") {
      alert("ivalid fullname");
      return;
    }

    if (data.password.length < 8) {
      alert("password must be at 8 characters");
      return;
    }
    if (data.password !== data.confirmPassword) {
      alert("password not match");
      return;
    }

    try {
      await userApi.update(data);
      setDisabled(true);
      alert("update successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAvatar = async (e) => {
    const check = e.base64.split(":")[1].split("/")[0];
    if (check !== "image") {
      alert("Invalid image");
      return;
    }
    await userApi.update({ username: user.username, avatar: e.base64 });
    dispatch(setProfile(false));
    window.location.reload();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Avatar
            src={user.avatar}
            sx={{ width: 80, height: 80, m: "0 auto" }}
          />
          <FileBase64 multiple={false} onDone={handleChangeAvatar} />
          <TextField
            name="fullname"
            defaultValue={user.fullname}
            disabled={disabled}
            label="fullname"
          />
          {!GGL && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                gap: 5,
              }}
            >
              <TextField
                name="username"
                defaultValue={user.username}
                disabled={true}
                label="username"
              />
              <TextField
                name="password"
                defaultValue={user.password}
                disabled={disabled}
                label="password"
                type={"password"}
              />
              {!disabled && (
                <TextField
                  name="confirmPassword"
                  defaultValue={user.password}
                  disabled={disabled}
                  label="confirmPassword"
                  type={"password"}
                />
              )}
            </Box>
          )}
          {disabled && (
            <Button onClick={() => setDisabled(false)} variant="outlined">
              Edit
            </Button>
          )}

          {!disabled && (
            <Button type="submit" variant="outlined">
              Update
            </Button>
          )}

          <Button
            onClick={() => setDisabled(true)}
            variant="outlined"
            color="warning"
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
