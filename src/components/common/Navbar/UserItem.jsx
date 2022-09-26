import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";

const UserItem = (user) => {
  return (
    <Box>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          gap: 2,
          alignItems: "center",
          p: 1,
        }}
      >
        <Avatar src={user.avatar} alt={user.fullname} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="" h5>
            {user.fullname}
          </Typography>
          {/* <Typography variant='body2'>Text Content</Typography> */}
        </Box>
      </Paper>
    </Box>
  );
};

export default UserItem;
