import React from 'react';
import { connect } from 'react-redux';
import { DemoComponent } from "./demo-component/demo-component";

class Component extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<DemoComponent/>
			</React.Fragment>
		);
	}

}

export const IndexPage = connect((store) => {
	return {
		LoggerReducer: store.LoggerReducer
	};
})(Component);
