import React from 'react';
import { connect } from 'react-redux';
import { LocaleAction } from "../../redux/actions/locale-action";
import { DemoComponent } from "../../lib/meteor-react-starter/components/demo-component/demo-component";

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
		logs: store['LoggerReducer']['logs']
	};
})(Component);
