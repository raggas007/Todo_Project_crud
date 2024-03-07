import { Box, Stack } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box>
      <Header />
      <Stack>
        <Outlet />
      </Stack>
    </Box>
  );
};

export default MainLayout;
