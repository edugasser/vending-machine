import { FC } from "react";
import { NotFound } from "./NotFound";
import { Login } from "../components/login";


export const LoginPage: FC = () => {

	const user = true; // TODO connect to the redux store and retrieve the user name
  
	// if user, no need to login again, redirect to vending machine home
  	if (!user) {
		return <NotFound />
	}

	return <Login />
}