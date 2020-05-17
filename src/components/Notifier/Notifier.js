import React, { Component } from "react";
import "./Notifier.css";

export default class Notifier extends Component {
	render() {
		return (
			<div className="Notifier">
				<p>
					<em>{this.props.displaytext}</em>
				</p>
			</div>
		);
	}
}
