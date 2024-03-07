import React from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

const MinimumLayout = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default MinimumLayout;
