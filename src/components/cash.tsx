import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "../styles/products.scss";
import { Grid } from "@mui/material";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setBalance } from "../cashSlice";
import { useCallback, useEffect } from "react";
import add_data_mock from "../mocks/add_balance.json";
import refund_data_mock from "../mocks/refund_balance.json";
import { api } from "../api";


export interface UserProps {
  full_name: string;
  username: string;
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

  const username = useSelector(
    (state: RootState) => state.cashReducer.username
  );

  const simulateRequest = (
    mock: any
  ): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mock);
      }, 1000);
    });
  };

  const addBalance = useCallback(
    async (amount: number) => {
      try {
        let response = await api.add(username, amount);
        //let response = await simulateRequest(add_data_mock);
        dispatch(setBalance(response.balance));
      } catch (error) {
        console.log("ERROR");
      }

    },
    [dispatch, username]
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
        <Button onClick={() => addBalance(0.1)}>0.10€</Button>
      </Grid>
      <Grid item xs={4}>
        <Button onClick={() => addBalance(0.2)}>0.20€</Button>
      </Grid>
      <Grid item xs={4}>
        <Button onClick={() => addBalance(0.5)}>0.50€</Button>
      </Grid>
      <Grid item xs={4}>
        <Button onClick={() => addBalance(1)}>1€</Button>
      </Grid>
      <Grid item xs={4}>
        <Button onClick={() => addBalance(2)}>2€</Button>
      </Grid>
      <Grid item xs={4}>
        <Button onClick={() => addBalance(5)}>5€</Button>
      </Grid>
    </Grid>
  );
};

export const Balance = ({ balance }: BalanceProps) => {
  const dispatch = useDispatch();

  const username = useSelector(
    (state: RootState) => state.cashReducer.username
  );

  const simulateRequest = (
    mock: any
  ): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mock);
      }, 1000);
    });
  };

  
  const refundMoney = useCallback(async () => {
    try {
      let response = await api.refund(username);
      //let response = await simulateRequest(refund_data_mock);
      console.log("REFUND", response);

      dispatch(setBalance(response.balance));
    } catch (error) {
      console.log("ERROR");
    }
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

  let user_name = useSelector(
    (state: RootState) => state.cashReducer.full_name
  )

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12}>
        <Name full_name={user_name} />
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
