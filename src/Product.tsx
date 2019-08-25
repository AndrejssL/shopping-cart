import React from "react";
import "./App.css";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  Typography,
  CardContent,
  CardActionArea,
  CardMedia,
  Card,
  CardActions
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    image: {
      width: 150,
      height: 150
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%"
    },
    button: {
      margin: theme.spacing(1)
    },
    input: {
      display: "none"
    },
    card: {
      maxWidth: 345
    }
  })
);

interface ProductProps {
  name: string;
  price: number;
  img: string;
  quantity: string;
  available: number;
  description: string;
  onSelect(): void;
}

const Product: React.FC<ProductProps> = ({
  name,
  description,
  price,
  img,
  quantity,
  onSelect,
  available
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={name}
          height="500"
          width="500"
          image={img}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Quantity: {parseInt(quantity)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price: $ {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "center", background: "rgb:" }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onSelect}
          style={{
            background: "secondary",
            border: 1,
            borderRadius: 3,
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
            color: "white",
            height: 48,
            padding: "0 30px"
          }}
        >
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
