import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "../styles/products.scss";
import { Grid } from "@mui/material";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setBalance } from "../cashSlice";
import { useCallback, useEffect } from "react";

export interface UserProps {
  full_name: string;
  balance: number;
}

export interface NameProps {
  full_name: string;
}

export interface BalanceProps {
  balance: number;
}

export const Name = ({ full_name }: NameProps) => {
  return (
    <Box className="name">
      <Box>
        <h3>{full_name}</h3>
      </Box>
    </Box>
  );
};

export const Money = ({ balance }: BalanceProps) => {
  const dispatch = useDispatch();

  const updateBalance = useCallback(
    (amount: number) => {
      let new_balance: number = balance + amount;
      dispatch(setBalance(new_balance));
      // TODO: save it in BE as well
    },
    [dispatch, balance]
  );

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      className="money"
    >
      <Grid item xs={12}>
        <h3>Add money</h3>
      </Grid>
      <Grid item xs={4}>
        <Button onClick={() => updateBalance(0.1)}>0.10€</Button>
      </Grid>
      <Grid item xs={4}>
        <Button onClick={() => updateBalance(0.2)}>0.20€</Button>
      </Grid>
      <Grid item xs={4}>
        <Button onClick={() => updateBalance(0.5)}>0.50€</Button>
      </Grid>
      <Grid item xs={4}>
        <Button onClick={() => updateBalance(1)}>1€</Button>
      </Grid>
      <Grid item xs={4}>
        <Button onClick={() => updateBalance(2)}>2€</Button>
      </Grid>
      <Grid item xs={4}>
        <Button onClick={() => updateBalance(5)}>5€</Button>
      </Grid>
    </Grid>
  );
};

export const Balance = ({ balance }: BalanceProps) => {
  const dispatch = useDispatch();

  const refundMoney = useCallback(() => {
    dispatch(setBalance(0));
    // TODO: save it in BE as well
  }, [dispatch]);

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      className="balance"
    >
      <Grid item xs={12}>
        <h3>My balance: {balance} €</h3>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={() => refundMoney()}>Refund money</Button>
      </Grid>
    </Grid>
  );
};

export const Cash = () => {
  let balance = useSelector(
    (state: RootState) => state.cashReducer.balance
  ) as number;

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12}>
        <Name full_name="Edu Gasser" />
      </Grid>
      <Grid item xs={12}>
        <Money balance={balance} />
      </Grid>
      <Grid item xs={12}>
        <Balance balance={balance} />
      </Grid>
    </Grid>
  );
};
