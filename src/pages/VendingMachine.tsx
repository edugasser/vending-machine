import { FC } from "react";
import { Navigate } from "react-router";
import { Products } from "../components/product";
import { Grid } from "@mui/material";
import { Cash } from "../components/cash";

export const VendingMachinePage: FC = () => {
  const user = true; // TODO connect to the redux store and retrieve the user name

  // if no user, redirect to login
  if (!user) {
    return <Navigate to="/" />;
  }

  // user is logged in
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="vendor-machine">
      <Grid item xs={7} className="products" >
        <Products />
      </Grid>
      <Grid item xs={4} className="cash">
        <Cash />
      </Grid>
    </Grid>
  );
};
