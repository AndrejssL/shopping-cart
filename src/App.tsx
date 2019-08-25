import React, { useState, useEffect } from "react";
import "./App.css";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Product from "./Product";
import Cart from "./Cart";
import PrimarySearchAppBar from "./AppBar";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { calculateItemPrice } from "./requests";
import { ShopItem, ShopItemProps } from "./Interfaces";

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
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center"
    },
    button: {
      margin: theme.spacing(1)
    }
  })
);

const App: React.FC = () => {
  const [product, setProducts] = useState<ShopItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<ShopItem[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    calculateItemPrice("1", 1).then(item => console.log(item));

    fetch("/alpha/items")
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const promise = (json.items as any[])
        .map(item => {
          return {
            id: item.id,
            name: item.title,
            price: item.price,
              img: item.image,
              quantity: parseInt(item.quantity),
              description: item.description,
              // tillFree: 0,
              stock: 0
            } as ShopItem;
          }).map(item => {
            return calculateItemPrice(item.id, 1).then(price => {
              return {...item, price: price}
            })
          })
        Promise.all(promise).then(recievedProducts => {
          setProducts(recievedProducts);
          setLoading(false);
        })
      });
  }, []);

  function removeItem(id: number): void {
    setSelectedItems([...selectedItems].slice(1));
  }

  function addItem(
    item: ShopItem,
    existingItemsinShop: ShopItem[]
  ): ShopItem[] {
    const existingItem = existingItemsinShop.find(i => i.id === item.id);
    if (!existingItem) {
      existingItemsinShop.push(item);
      return [...existingItemsinShop];
    } else {
      existingItem.quantity++;
      existingItem.stock--;
      if (existingItem.stock === 0) {
        alert("Sorry! Stock of this item is no more!");
      }
      return [...existingItemsinShop];
    }
  }
  const classes = useStyles();
  return (
    <div className="App">
      <PrimarySearchAppBar />
      <div className={classes.root}>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={6}>
            <Grid container>
              {product.map(item => (
                <Grid item xs={4}>
                  <Product
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    img={item.img}
                    available={item.stock}
                    quantity={item.quantity}
                    onSelect={() => {
                      setSelectedItems(addItem(item, selectedItems));
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <MuiThemeProvider theme={theme}>
              <Paper className={classes.paper}>
                <Typography color="primary" variant="h6">
                  Your shopping cart!
                </Typography>
              </Paper>
            </MuiThemeProvider>
            {/* <Cart items={selectedItems} removeItem={removeItem} /> */}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default App;
