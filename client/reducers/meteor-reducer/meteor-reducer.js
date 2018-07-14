const initialState = {
	release: ''
};

export const MeteorReducer = (state = initialState, action) => {
	switch (action['type']) {
		case 'Meteor/RELEASE-FETCH-COMPLETE': {
			return Object.assign({}, state, {
				release: action['payload']
			});
		}
		default: {
			return state;
		}
	}
};
