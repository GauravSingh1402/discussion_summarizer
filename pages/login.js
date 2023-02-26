import React from "react";
import Login from "../components/Login";
import Layout from "../components/Layout";
import { GoogleOAuthProvider } from "@react-oauth/google";

const login = () => {
	return (
		<Layout>
				<Login />
		</Layout>
	);
};

export default login;
