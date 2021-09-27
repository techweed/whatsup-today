import { lazy } from 'react';
const Home = lazy(() => import('./pages/home/home'));
const Weather = lazy(() => import('./pages/weather/weather'));

const routes = [
	{
		exact: true,
		name: 'Home',
		path: '/home',
		component: Home,
	},
	{
		exact: true,
		name: 'Weather',
		path: '/weather',
		component: Weather,
	},
];

export default routes;
