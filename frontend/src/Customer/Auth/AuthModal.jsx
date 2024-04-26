import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import Registration from "./Registration";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import Sellerlogin from "../../Seller/SellerComponents/Sellerlogin";
import SellerRegistration from "../../Seller/SellerComponents/SellerRegistration";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const AuthModal = ({ handleClose, open, modalType, setModalType }) => {
  const location = useLocation();
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modalType === "register" && (
            <Registration setModalType={setModalType} />
          )}
          {modalType === "login" && (
            <LoginForm handleClose={handleClose} setModalType={setModalType} />
          )}
          {modalType === "SellerRegister" && (
            <SellerRegistration
              handleClose={handleClose}
              setModalType={setModalType}
            />
          )}
          {modalType === "SellerLogin" && (
            <Sellerlogin
              handleClose={handleClose}
              setModalType={setModalType}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
