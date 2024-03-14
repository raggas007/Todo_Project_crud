import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LogoutIcon from "@mui/icons-material/Logout";
import Slide from "@mui/material/Slide";
import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LogoutConfirmationDialogBox = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ color: "Red" }}
      >
        Logout
        <LogoutIcon />
      </IconButton>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure? You want to logout?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>
            <Typography variant="h6" color="success">
              No
            </Typography>
          </Button>
          <Button
            onClick={() => {
              handleClose();
              localStorage.clear();
              navigate("/login");
            }}
          >
            <Typography variant="h6" color="error">
              Yes
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default LogoutConfirmationDialogBox;
