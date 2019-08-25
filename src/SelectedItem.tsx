import React from "react";
import { Grid, Paper, Button } from "@material-ui/core";

interface SelectedItemProps {
  name: string;
  price: number;
  quantity: number;
  onRemove(): void;
}

const SelectedItem: React.FC<SelectedItemProps> = ({
  name,
  price,
  quantity,
  onRemove
}) => {
  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid item>
          {name} ${price} {quantity} pcs.
        </Grid>
        <Grid item>
          <Button onClick={onRemove} variant="contained" color="primary">
            Remove All
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SelectedItem;
