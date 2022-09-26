import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import { Button, IconButton } from "@mui/material";
import Tabbar from "./Tabbar";
import { useDispatch, useSelector } from "react-redux";
import {
  set1n,
  setAddChat,
  setProfile,
} from "../../../redux/reducers/handlerReducer";
import { setMessage } from "../../../redux/reducers/messageReduce";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const drawerWidth = 285;

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.handler.n1).data;

  const handleAddChat = () => {
    dispatch(setAddChat(true));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("GGL");
    navigate("/signin");
    dispatch(setMessage({}));
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {chat.fullname}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Chat</Typography>
            <IconButton onClick={handleAddChat}>
              <MapsUgcIcon color="primary" />
            </IconButton>
          </Box>
        </Toolbar>
        <Divider />
        <Tabbar />
        <Divider />
        <Box mt="auto">
          <Button
            size="large"
            fullWidth
            color="success"
            onClick={() => dispatch(setProfile(true))}
          >
            <AccountBoxIcon /> profile
          </Button>
          <Divider />
          <Button onClick={handleLogout} size="large" fullWidth>
            LogOut
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
