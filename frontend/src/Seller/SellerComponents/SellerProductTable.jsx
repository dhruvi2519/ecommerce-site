import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct, findProducts } from "../../State/Product/Action";
import {
  Avatar,
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

const SellerProductTable = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store.product);
  const navigate = useNavigate();
  console.log("products...", product);

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  useEffect(() => {
    let data = {
      categoryId: "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 1000000,
      minDiscount: 0,
      sort: "price_low",
      /*  pageNumber: 0,*/
      pageSize: 5,
      stock: " ",
    };

    dispatch(findProducts(data));
  }, [product.deletedproduct]);

  const handleAddProduct = () => {
    navigate("/admin/product/create");
  };

  return (
    <div className="p-5 ">
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
        <CardHeader title="All Products"></CardHeader>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>

                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product?.products?.content?.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <Avatar src={item?.imageUrl}></Avatar>
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
                      onClick={() => handleProductDelete(item._id)}
                      variant="outlined"
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default SellerProductTable;
