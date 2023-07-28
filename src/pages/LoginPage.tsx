import { FC } from "react";
import { Navigate } from "react-router";

export const Login = () => <>Welcome to the login page!</>

export const LoginPage: FC = () => {

	const user = true; // TODO connect to the redux store and retrieve the user name
  
	// if user, no need to login again, redirect to vending machine home
  	if (user) {
		return <Navigate to='/vending-machine' />
	}

	return <Login />
}