import React from "react";
import { Paper } from "@material-ui/core";

interface TotalPriceProps {
  price: number;
}

const TotalPrice: React.FC<TotalPriceProps> = ({ price }) => {
  return <Paper> Total price: ${price}</Paper>;
};

export default TotalPrice;
