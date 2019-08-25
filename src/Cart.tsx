import React from "react";
import {
  Grid,
  Paper,
  Button,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import SelectedItem from "./SelectedItem";
import TotalPrice from "./TotalPrice";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#165788",
      contrastText: "#fff"
    },
    secondary: {
      main: "#69BE28",
      contrastText: "#fff"
    }
  }
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      // padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    button: {
      margin: theme.spacing(1)
    }
  })
);

/**
 * Returns the new state of the shop, when a specified item has been added
 * @param item
 * @param existingItemsinShop
 */

const calculateTotalSum = (items: CartProps[]): number => {
  return items.reduce((a, b) => (a + b.price) * b.quantity, 0);
};

interface CartProps {
  name: string;
  price: number;
  id: number;
  quantity: number;
}

const Cart: React.FC<{
  items: CartProps[];
  removeItem: (item: number) => void;
}> = ({ items, removeItem }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Grid item xs={12} sm={12}>
        <Paper className={classes.paper}>
          {items.map((item, i) => (
            <SelectedItem
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TotalPrice price={calculateTotalSum(items)} />
        <MuiThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            To checkout!
          </Button>
        </MuiThemeProvider>
      </Grid>
    </Grid>
  );
};

export default Cart;
