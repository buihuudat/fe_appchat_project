import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteAccount } from "../../../redux/reducers/modalReduccer";
import userApi from "../../../api/userApi";
import { useNavigate } from "react-router-dom";

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
};

export default function BasicModal() {
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { deleteAccount } = useSelector((state) => state.modal.deleteAccount);
  const open = deleteAccount;
  const handleClose = () =>
    dispatch(setDeleteAccount({ deleteAccount: false }));

  const handleDelete = async () => {
    try {
      await userApi.delete({ _id: user._id });
      localStorage.removeItem("token");
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Are you sure want to delete your account?
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"} mt={5}>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Yes, please
            </Button>
            <Button variant="contained" color="warning" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
