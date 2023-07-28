import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "../styles/products.scss";
import { Grid, Input } from "@mui/material";
import "../styles/products.scss";
import { setBalance, setUserName } from "../cashSlice";
import data_mock from "../mocks/login.json";
import { useCallback, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [userNameValue, setUserNameValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setUserNameValue(event.target.value);
  };

  const simulateRequest = (
    mock: any
  ): Promise<{ exists: boolean; balance: number }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mock);
      }, 1000);
    });
  };

  const login = useCallback(async () => {
    if (userNameValue) {
      try {
        //let products_list = await api.getProducts();
        let user_response = await simulateRequest(data_mock);
       
        if (!user_response.exists) {
          setError("No exists");
        } else {
          dispatch(setUserName(userNameValue));
          dispatch(setBalance(user_response.balance));
          navigate('/vending-machine'); 
        }
      } catch (error) {
        setError(`An error occurred: ${error}`);
      }
    }
  }, [dispatch, navigate, userNameValue]);

  if (error) {
    console.log("ERRORAZO", error);
  }

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      className="login"
    >
      <Grid item xs={12} className="inputs">
        <h1>Vending Machine</h1>
      </Grid>
      <Grid item xs={10} className="inputs">
        <Input required onChange={handleChange} placeholder="Username" />
      </Grid>
      <Grid item xs={2} className="inputs">
        <Button variant="contained" onClick={login}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};
