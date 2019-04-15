import React from 'react';
import { connect } from 'react-redux';
import { DemoComponent } from "./demo-component/demo-component";
import { LocaleAction } from "../../redux/actions/locale-action";

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

	componentDidMount() {
		this.props.dispatch(LocaleAction.set('en'));
	}

}

export const IndexPage = connect((store) => {
	return {
		LoggerReducer: store.LoggerReducer
	};
})(Component);
