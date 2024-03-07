import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, Typography } from "@mui/material";
import { useMutation } from "react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTodo } from "../lib/apis";

const DeleteDialogBox = () => {
  const navigate = useNavigate();
  const params = useParams();
  const todoId = params?.id;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { isLoading, mutate } = useMutation({
    mutationKey: ["delete-todo"],
    mutationFn: async () => {
      return await deleteTodo(todoId);
    },
    onSuccess: (response) => {
      navigate("/home");
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
        sx={{ marginLeft: "2rem" }}
      >
        <Typography variant="subtitile1">Delete</Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {"Are you sure? Do you want to delete this todo?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>
            <Typography>Cancel</Typography>
          </Button>
          <Button
            onClick={() => {
              mutate();
              handleClose();
            }}
            variant="contained"
            color="error"
          >
            <Typography>Yes</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteDialogBox;
