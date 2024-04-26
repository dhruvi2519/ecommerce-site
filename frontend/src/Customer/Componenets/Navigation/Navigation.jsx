import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { navigation } from "./navigationdata";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthModal from "../../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../State/Auth/Action";
import { fetchCategories, findProducts } from "../../../State/Product/Action";
import { api } from "../../../config/apiConfig";
import { getOrdersByUserID } from "../../../State/Order/Action";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [OpenAuthModel, setOpenAuthModel] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);
  const product = useSelector((store) => store.product);

  const dispatch = useDispatch();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

  const [cartItemCount, setCartItemCount] = useState(0);
  const [id, setId] = useState(null);

  useEffect(() => {
    const itemCount = parseInt(localStorage.getItem("CartItems")) || 0;
    setCartItemCount(itemCount);
  }, []);

  const callsearchProducts = async (searchTerm) => {
    try {
      const response = await api.get(`/user/products/search?q=${searchTerm}`);
      setSearchResults(response.data);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
      console.error(error);
    }
  };

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

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = async (categoryId) => {
    console.log("Clicked category ID:", categoryId);
    navigate(`/products`);
  };

  const handlemyorders = async () => {
    const userId = localStorage.getItem("userId");

    dispatch(getOrdersByUserID(userId));
    navigate(`/myorders`);
  };

  useEffect(() => {
    const path = location.pathname;
    // console.log("Path:", path);
    const categoryId = path.split("/")[2];
    // console.log("Category ID:", categoryId);
    setId(categoryId);
  }, [location]);

  useEffect(() => {
    // console.log("iddddddddd", id);
    if (id) {
      dispatch(findProducts({ categoryId: id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  useEffect(() => {
    //console.log("come useEffect");
    if (auth.user) {
      handleClose();
    }
    if (
      location.pathname === "/login" ||
      location.pathname === "/registration"
    ) {
      navigate(-1);
    }
  }, [auth.user, auth.logoutuser]);

  const handleLogout = () => {
    dispatch(logout());
    handlecloseUserMenu();
  };

  return (
    <div className="bg-white z-50 ">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex items-center">
                  <AccountCircleIcon className="h-6 w-6 text-pink-600 mr-2" />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white position: fixed;">
        <nav
          aria-label="Top"
          className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div
                onClick={() => navigate(`/products`)}
                className="ml-6 flex lg:ml-20 w-50"
              >
                <span className="sr-only">Your company</span>
                <img
                  src="https://www.ethnicplus.in/media/logo/stores/1/Ethnic-Plus_r2a2b_Final1.png"
                  alt=""
                  className="h-10 w-40 mr-2 cursor-pointer" // Added cursor-pointer class
                />
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                <div className="flex h-full space-x-8">
                  {/* {console.log("category.name", product?.categories)} */}
                  {product?.categories &&
                    product?.categories
                      ?.filter((category) => category.level === 1)
                      .map((category) => (
                        <Popover key={category._id} className="flex">
                          {({ open }) => (
                            <>
                              <div className="relative flex">
                                <Popover.Button
                                  onClick={() =>
                                    handleCategoryClick(category._id)
                                  }
                                  className={classNames(
                                    open
                                      ? "border-indigo-600 text-indigo-600"
                                      : "border-transparent text-gray-700 hover:text-gray-800",
                                    "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                  )}
                                >
                                  {category.name}
                                </Popover.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                  <div
                                    className="absolute inset-0 top-1/2 bg-white shadow"
                                    aria-hidden="true"
                                  />
                                  <div className="relative bg-white">
                                    <div className="mx-auto max-w-7xl px-8">
                                      <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                        <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                          {/* Filter level 2 categories */}
                                          {product?.categories
                                            ?.filter(
                                              (cat) =>
                                                cat.level === 2 &&
                                                cat.parentCategory ===
                                                  category._id
                                            )
                                            .map((level2Cat) => (
                                              <div key={level2Cat._id}>
                                                <p
                                                  id={`${level2Cat.name}-heading`}
                                                  className="font-medium text-gray-900"
                                                >
                                                  {level2Cat.name}
                                                </p>
                                                <ul>
                                                  {/* Filter level 3 categories */}
                                                  {product?.categories
                                                    ?.filter(
                                                      (cat) =>
                                                        cat.level === 3 &&
                                                        cat.parentCategory ===
                                                          level2Cat._id
                                                    )
                                                    .map((level3Cat) => (
                                                      <li key={level3Cat._id}>
                                                        <p
                                                          onClick={() => {
                                                            handleCategoryClick(
                                                              level3Cat._id
                                                            );
                                                            navigate(
                                                              `/product/${level3Cat._id}`
                                                            );
                                                          }}
                                                          className="cursor-pointer hover:text-gray-800"
                                                        >
                                                          {level3Cat.name}
                                                        </p>
                                                      </li>
                                                    ))}
                                                </ul>
                                              </div>
                                            ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>{" "}
                            </>
                          )}
                        </Popover>
                      ))}

                  {/* {console.log("navigation.page", navigation?.pages)} */}
                  {navigation?.pages?.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {/*         {console.log("logged in user", auth.user.data.fullName)} */}
                  {auth.user?.fullName ? (
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
                        {auth.user?.fullName[0].toUpperCase()}
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
                          <Link to="/profile" className="profile-link">
                            Profile
                          </Link>
                        </MenuItem>

                        <MenuItem onClick={handlemyorders}>My Orders</MenuItem>
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
                  {/* Search */}
                  {/* <div
                    className="flex lg:ml-6"
                    style={{ position: "relative" }}
                  >
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        callsearchProducts();
                      }}
                      onFocus={() => setShowResults(true)}
                      placeholder="Search products..."
                      className="p-2 text-gray-400 hover:text-gray-500"
                    />
                    <button
                      onClick={handleSearch}
                      style={{ marginLeft: "8px" }}
                    >
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                    {/* Render the search results menu only if showResults is true 
                    {/* {showResults && searchResults.length > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "0",
                          zIndex: "999",
                          backgroundColor: "#fff",
                          border: "1px solid #ccc",
                          borderTop: "none",
                          maxHeight: "200px",
                          overflowY: "auto",
                          width: "100%",
                          marginTop: "4px",
                        }}
                      >
                        {searchResults.map((product) => (
                          <div
                            key={product._id}
                            style={{
                              padding: "8px",
                              cursor: "pointer",
                              borderBottom: "1px solid #ccc",
                            }}
                          >
                            <span
                              onClick={() => {
                                navigate(
                                  `/products?search=${product.parentCategory}`
                                );
                                setShowResults(false);
                              }}
                            >
                              {product.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    )} 
                  </div> */}

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <Button
                      className="group -m-2 flex items-center p-2"
                      onClick={handleOpenCart}
                    >
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      {/* <Cart /> */}
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        {cartItemCount}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </Button>
                  </div>
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
