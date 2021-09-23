import { createStore, combineReducers } from 'redux';
import homeReducer from './pages/home/dux';

const rootReducer = combineReducers({
	homeReducer: homeReducer,
});

const Store = createStore(rootReducer);

export default Store;
