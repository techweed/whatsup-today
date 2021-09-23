//dummy react project
export const setRestaurants = (restaurants) => ({
	type: 'SET_RESTAURANTS',
	data: restaurants,
});

const initialState = {
	restaurants: [],
};

const homeReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_RESTAURANTS':
			return {
				...state,
				restaurants: action.data,
			};

		default:
			return state;
	}
};

export function getRestaurants(state) {
	return state.homeReducer.restaurants;
}

export default homeReducer;
