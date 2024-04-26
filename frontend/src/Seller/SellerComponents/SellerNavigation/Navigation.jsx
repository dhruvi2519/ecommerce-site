import { Fragment, useEffect, useState } from "react";

import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import AuthModal from "../../../Customer/Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../State/Auth/Action";

import { fetchCategories } from "../../../State/Product/Action";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation({}) {
  const [OpenAuthModel, setOpenAuthModel] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store.auth);
  const { seller } = useSelector((store) => store.seller);

  const dispatch = useDispatch();
  const location = useLocation();

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlecloseUserMenu = (event) => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpenAuthModel(true);
  };

  const handleClose = () => {
    setOpenAuthModel(false);
  };

  const handleOpenCart = () => {
    setOpenAuthModel(false);
    navigate("/cart");
  };
  //console.log("product.name", product.name);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  let url = window.location.pathname;
  let path = url.split("/");
  let id = null;
  if (path[2]) {
    id = path[2];
  }

  const handleCategoryClick = (id) => {
    handleClose();
    // navigate(`/category/${id}`);
  };

  useEffect(() => {
    console.log("id", id);
  }, [id]);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);

  useEffect(() => {
    console.log("come useEffect");
    if (seller.user) {
      handleClose();
    }
    if (
      location.pathname === "/login" ||
      location.pathname === "/registration"
    ) {
      navigate(-1);
    }
  }, [seller.user, seller.logoutuser]);

  const handleLogout = () => {
    dispatch(logout());
    handlecloseUserMenu();
  };

  return (
    <div className="bg-white z-50 ">
      <header className="relative bg-white position: fixed;">
        <nav
          aria-label="Top"
          className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {console.log("logged in user", seller?.seller?.fullName)}
                  {seller.seller?.fullName ? (
                    <div>
                      <Avatar
                        className="text-white"
                        onClick={handleUserClick}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        sx={{
                          bgcolor: deepPurple[500],
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {seller.user?.fullName[0].toUpperCase()}
                      </Avatar>

                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handlecloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handlecloseUserMenu}>
                          Profile
                        </MenuItem>

                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      onClick={handleOpen}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <AuthModal
        handleClose={handleClose}
        open={OpenAuthModel}
        modalType={modalType}
        setModalType={setModalType}
      />
    </div>
  );
}
