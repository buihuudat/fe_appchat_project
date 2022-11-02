import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../common/Loading";
import authUtils from "../../utils/authUtils";

const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await authUtils.isAuthenticated();
      if (!auth) {
        setLoading(false);
      } else {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  return loading ? (
    <Loading />
  ) : (
    <Box>
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
