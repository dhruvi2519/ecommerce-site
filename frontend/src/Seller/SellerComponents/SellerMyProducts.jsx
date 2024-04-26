import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { fetchSellerProducts } from "../../State/Seller/Products/Action";
import { deleteProduct } from "../../State/Product/Action";

const SellerMyProducts = () => {
  const dispatch = useDispatch();
  const { sellerproduct } = useSelector((store) => store);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5); // Number of products per page

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(fetchSellerProducts(userId, page, perPage));
  }, [dispatch, page, perPage]);

  const handleProductDelete = (productId, event) => {
    event.preventDefault();
    dispatch(deleteProduct(productId));
  };

  const handleAddProduct = () => {
    navigate("/seller/product/create");
  };

  const handleProductUpdate = (productId) => {
    navigate("/seller/update/");
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="p-5">
      <Button
        variant="contained"
        sx={{ p: 1.8 }}
        className="py-20"
        size="large"
        type="submit"
        onClick={handleAddProduct}
      >
        Add Product
      </Button>
      <Card className="mt-2">
        <CardHeader title="MY PRODUCTS" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sellerproduct?.products?.data?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell align="left" scope="row">
                    <img
                      src={item.imageUrl}
                      alt="Product Image"
                      style={{ maxWidth: "90px", maxHeight: "90px" }}
                    />
                  </TableCell>
                  <TableCell align="left" scope="row">
                    {item.title}
                  </TableCell>
                  <TableCell align="left">{item?.category?.name}</TableCell>
                  <TableCell align="left">
                    {item?.price?.$numberDecimal}
                  </TableCell>
                  <TableCell align="left">{item?.quantity}</TableCell>
                  <TableCell>
                    <Button
                      onClick={(event) => handleProductUpdate(item._id, event)}
                      variant="outlined"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={(event) => handleProductDelete(item._id, event)}
                      variant="outlined"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pagination">
          <Button onClick={handlePrevPage} disabled={page === 1}>
            Previous
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={sellerproduct?.products?.pagination?.totalPages === page}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SellerMyProducts;
