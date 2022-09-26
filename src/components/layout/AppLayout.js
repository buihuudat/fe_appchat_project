import React, { useEffect, useState, useRef } from "react";
import authUtils from "../../utils/authUtils";
import { useNavigate, Outlet } from "react-router-dom";
import Loading from "../common/Loading";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { setAllUser, setUser } from "../../redux/reducers/userReducer";
import Navbar from "../common/Navbar";
import userApi from "../../api/userApi";

const AppLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleLogin = localStorage.getItem("ggl");

  useEffect(() => {
    const checkAuth = async () => {
      if (!googleLogin) {
        const auth = await authUtils.isAuthenticated();
        const users = await userApi.get_all();
        if (!auth) {
          navigate("/signin");
        } else {
          dispatch(setUser(auth));
          dispatch(setAllUser(users));
          setLoading(false);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);
  return loading ? (
    <Loading />
  ) : (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Navbar />
      <Box flexGrow={1} component="main">
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
