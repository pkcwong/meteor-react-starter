import React from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';
import { LocaleAction } from "../../redux/actions/locale-action";
import "antd/dist/antd.css";

class Component extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<Typography.Title
					level={2}
				>
					{this.props.LocaleReducer.strings["welcome"]}
				</Typography.Title>
			</React.Fragment>
		);
	}

	componentDidMount() {
		this.props.dispatch(LocaleAction.set("en"));
		this.props.dispatch(LocaleAction.load("en", require("./locale-en")));
	}

}

export const IndexPage = connect((store) => {
	return {
		AuthReducer: {
			status: store.AuthReducer.status,
			message: store.AuthReducer.message
		},
		LocaleReducer: {
			strings: store.LocaleReducer.strings
		}
	};
})(Component);
