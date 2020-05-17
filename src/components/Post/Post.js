import React, { Component, Text } from "react";
import "./Post.css";
import { BsHeart } from "react-icons/bs";
import { BsChat } from "react-icons/bs";
import { BsCursor } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export default class Post extends Component {
	render() {
		return (
			<article className="Post">
				<header>
					<div className="Post-user-avatar">
						<img src={this.props.useravatar}></img>
					</div>
					<div className="Post-user-name">
						<span>{this.props.username}</span>
					</div>
					<BsThreeDots className="Post-more-icon" />
				</header>
				<div className="Post-image">
					<img src={this.props.image}></img>
				</div>
				<div className="Post-actionbar">
					<div className="Post-actionbar-like">
						<BsHeart size={22} />
					</div>
					<div className="Post-actionbar-comment">
						<BsChat size={22} />
					</div>
					<div className="Post-actionbar-share">
						<BsCursor size={22} />
					</div>
				</div>
				<div className="Post-likes">
					<div className="Post-likes-user-avatar">
						<img src={this.props.useravatar}></img>
					</div>
					<span className="Post-likes-text">
						Gefällt{" "}
						<span className="Post-likes-user-name">
							{this.props.username}
						</span>{" "}
						und{" "}
						<span className="Post-likes-additional-persons">
							27.670 weitere Personen
						</span>
					</span>
				</div>
				<div className="Post-comments">
					<div className="Post-comment">
						<span className="Post-comment-user-name">
							orangutan
						</span>{" "}
						<span>thanks sister</span>
					</div>
				</div>
				<div className="Post-add-comment">
					<span className="Post-add-comment-text">
						Kommentar hinzufügen ...
					</span>
				</div>
			</article>
		);
	}
}
