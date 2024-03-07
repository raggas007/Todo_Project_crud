import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteDialogBox from "./DeleteDialogBox";

const TodoDetailCard = (props) => {
  console.log(props);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "800px",
        marginLeft: "25rem",
        padding: "1rem",
        background: "purple",
        boxShadow:
          " rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
      }}
    >
      <TableContainer
        sx={{
          boxShadow:
            " rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
        }}
      >
        <Table sx={{ background: "green" }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Course Name
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Student Name
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6">{props.courseName}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">{props.studentName}</Typography>
              </TableCell>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => {
                  navigate("/editTodo");
                }}
              >
                <Typography variant="subtitile1">Edit</Typography>
              </Button>
              <DeleteDialogBox />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TodoDetailCard;
