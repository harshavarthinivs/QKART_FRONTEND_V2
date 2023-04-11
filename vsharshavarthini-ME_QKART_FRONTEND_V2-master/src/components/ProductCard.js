import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";


const ProductCard = ({ product, handleAddToCart }) => {
  // console.log("product", product);
  // console.log("img", product.image);
  // const withStyles=makeStyles(
  // {card:
  //   {
  //     makeWidth:345,
  //   },
  //   media:
  //   {
  //     height:100,
  //   },
  // });
  // const classes=withStyles();
  return (
    <Card className="card">
      {/* <CardMedia image={product.image}  /> */}
      <CardMedia component="img" style={{ height: "150px" }} image={product.image} alt={product._id}/>
      <CardContent>
        <Typography color="textSecondary" variant="h6">
          {product.name}
        </Typography>
        <Typography color="textSecondary" variant="h6">
          ${product.cost}
        </Typography>
        <Rating name="read-only" value={product.rating} readOnly />
      </CardContent>
      <CardActions className="card-actions">
        <Button
          variant="contained"
          startIcon={<AddShoppingCartOutlined />}
          className="card-button"
          fullWidth
          onClick={handleAddToCart}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
