import React, { Component } from "react";
import "./Posts.css";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Post from "../Post/Post";
import Notifier from "../Notifier/Notifier";
import { NoFragmentCyclesRule } from "graphql/validation";
import axios from "axios";

export default class Posts extends Component {
	constructor() {
		super();
		this.state = {
			posts: [],
		};
		this.offline = !navigator.onLine;
	}

	componentDidMount() {
		// Request permission to display notifications
		Notification.requestPermission();

		// 2. Fetch the initial posts
		if (!navigator.onLine) {
			this.setState({ posts: JSON.parse(localStorage.getItem("posts")) });
		} else {
			// this.props.apollo_client
			// 	.query({
			// 		query: gql`
			// 			{
			// 				posts(user_id: "a") {
			// 					id
			// 					user {
			// 						nickname
			// 						avatar
			// 					}
			// 					image
			// 					caption
			// 				}
			// 			}
			// 		`,
			// 	})
			// 	.then((response) => {
			// 		this.setState({ posts: response.data.posts });
			// 		localStorage.setItem(
			// 			"posts",
			// 			JSON.stringify(response.data.posts)
			// 		);
			// 	});

			axios
				.get(
					"https://laughing-mclean-3cdade.netlify.app/.netlify/functions/getposts"
				)
				.then((response) => {
					this.setState({ posts: response.data.posts });
					localStorage.setItem(
						"posts",
						JSON.stringify(response.data.posts)
					);
				})
				.catch(function (e) {
					console.log(e);
				});

			//  subscribe to posts channel
			this.posts_channel = this.props.pusher.subscribe("posts-channel");

			// listen for a new post
			this.posts_channel.bind(
				"new-post",
				(data) => {
					// Update state
					this.setState({
						posts: Array.prototype.concat(
							data.post,
							this.state.posts
						),
					});
					// Check if notifications are allowed
					if (Notification.permission === "granted") {
						try {
							// Notify user of new post
							let notification = new Notification(
								"Instagram Clone",
								{
									body: `New post from ${data.post.user.nickname}`,
									icon:
										"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png",
									image: `${data.post.image}`,
								}
							);
							// Open website on notification click
							notification.onclick = function (event) {
								window.open("http://localhost:3000", "_blank");
							};
						} catch (e) {
							console.log("Error displaying notification");
						}
					}
				},
				this
			);
		}

		console.log(this.state.posts);
	}

	render() {
		// Render notifier if in offline mode
		const notifier = this.offline ? (
			<Notifier displaytext="Using Offline Mode" />
		) : (
			<span />
		);
		return (
			<div className="Posts">
				{notifier}
				{this.state.posts.map((post) => (
					<div className="Post-container">
						<Post
							username={post.user.nickname}
							useravatar={post.user.avatar}
							image={post.image}
							caption={post.caption}
							key={post.id}
						/>
					</div>
				))}
			</div>
		);
	}
}
