import Button from "@mui/material/Button";
import "../styles/products.scss";
import { Grid, Input } from "@mui/material";
import "../styles/products.scss";
import { setBalance, setUserName, setFullName } from "../cashSlice";
import data_mock from "../mocks/login.json";
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { api } from "../api";



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
  ): Promise<{ full_name: string; balance: number }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mock);
      }, 1000);
    });
  };

  const login = useCallback(async () => {
    if (userNameValue) {
      try {
        let user_response = await api.login(userNameValue);
        //let user_response = await simulateRequest(data_mock);

        dispatch(setUserName(userNameValue));
        dispatch(setFullName(user_response.full_name));
        dispatch(setBalance(user_response.balance));
        navigate('/vending-machine'); 

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
