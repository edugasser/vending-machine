import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "../styles/products.scss";
import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import data_mock from "../mocks/api_response.json";
import { setBalance } from "../cashSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

export interface ProductProps {
  title: string;
  price: number;
  balance: number;
}

export const Product = ({ title, price, balance }: ProductProps) => {
  const dispatch = useDispatch();

  function canBuyProduct(balance: number, price: number) {
    return balance - price >= 0 ? true : false;
  };


  const buyProduct = useCallback((title: string, price: number) => {
      let new_balance: number = balance - price;
      dispatch(setBalance(new_balance));
      // TODO: save it in BE as well
    },
    [dispatch, balance]
  );

  return (
    <Box className="product">
      <Box>
        <h3>{title}</h3>
      </Box>
      <Box>
        <h4>{price}€</h4>
      </Box>
      <Button disabled={!canBuyProduct(balance, price)} onClick={() => buyProduct(title, price)}>Buy</Button>
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
  ): Promise<{ products: ProductProps[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mock);
      }, 1000);
    });
  };

  const fetchProducts = async () => {
    try {
      //let products_list = await api.getProducts();
      let products_list = await simulateRequest(data_mock);
      setProducts(products_list.products);
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
        products.map((product: ProductProps) => (
          <Grid item xs={4}>
            <Product title={product.title} price={product.price} balance={balance} />
          </Grid>
        ))}
    </Grid>
  );
};
