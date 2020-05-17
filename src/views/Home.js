import React, { Component } from "react";
import Posts from "../components/Posts/Posts";
import Header from "../components/Header/Header";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./Home.css";
// import pusher module
import Pusher from "pusher-js";

const client = new ApolloClient({
	uri:
		"https://laughing-mclean-3cdade.netlify.app/.netlify/functions/graphql",
});

export default class Home extends Component {
	constructor() {
		super();
		// connect to pusher
		this.pusher = new Pusher("8b0cd6bf11e07b911db7", {
			cluster: "eu",
			encrypted: true,
		});
	}

	componentDidMount() {
		// if ("actions" in Notification.prototype) {
		// 	alert("You can enjoy the notification feature");
		// } else {
		// 	alert("Sorry notifications are NOT supported on your browser");
		// }
	}

	render() {
		return (
			<ApolloProvider client={client}>
				<Header />
				<div className="Page-content-container">
					<Posts pusher={this.pusher} apollo_client={client} />
				</div>
			</ApolloProvider>
		);
	}
}
