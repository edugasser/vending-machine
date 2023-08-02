import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "../styles/products.scss";
import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import add_data_mock from "../mocks/add_balance.json";
import products_data_mock from "../mocks/api_response.json";

import { setBalance } from "../cashSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

export interface ProductProps {
  id: string;
  coordinates: number[];
  quantity: number;
  product: {
    name: string,
    price: number
  }
}

export interface ProductComponentProps {
  id: string;
  balance: number;
  title: string;
  price: number;
  quantity: number;
}

export const Product = ({ id, balance, title, price, quantity }: ProductComponentProps) => {
  const dispatch = useDispatch();

  const username = useSelector(
    (state: RootState) => state.cashReducer.username
  );

  function canBuyProduct(balance: number, price: number, quantity: number) {
    return (balance - price >= 0 && quantity > 0) ? true : false;
  };


  const simulateRequest = (
    mock: any
  ): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mock);
      }, 1000);
    });
  };


  const buyProduct = useCallback(async (id: string) => {
    try {
      let response = await api.buy(username, id);
      //let response = await simulateRequest(add_data_mock);
      console.log("BUY; ", response);
      dispatch(setBalance(response.balance));
    } catch (error) {
      console.log("ERROR");
    }
  },
    [dispatch, username]
  );

  return (
    <Box className="product">
      <Box>
        <h3>{title}</h3>
      </Box>
      <Box>
        <h4>{price}€</h4>
      </Box>
      <Button disabled={!canBuyProduct(balance, price, quantity)} onClick={() => buyProduct(id)}>Buy</Button>
    </Box>
  );
};

export const Products = () => {
  const [products, setProducts] = useState<ProductProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  let balance = useSelector(
    (state: RootState) => state.cashReducer.balance
  ) as number;

  const simulateRequest = (
    mock: any
  ): Promise<ProductProps[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mock);
      }, 1000);
    });
  };

  const fetchProducts = async () => {
    try {
      let products_list = await api.getProducts();
      //let products_list = await simulateRequest(products_data_mock);
      setProducts(products_list);
    } catch (error) {
      setError(`An error occurred: ${error}`);
    }
  };

  useEffect(() => {
    if (products === null) {
      fetchProducts();
    }
  });

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {products &&
        products.map((data: ProductProps) => (
          <Grid item xs={4}>
            <Product quantity={data.quantity} id={data.id} title={data.product.name} price={data.product.price} balance={balance} />
          </Grid>
        ))}
    </Grid>
  );
};
