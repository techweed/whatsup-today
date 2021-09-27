import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
import AppSpinner from './components/spinner';

const AppRoutes = () => {
	return (
		<Router>
			<Switch>
				{routes.map(({ component: Component, path, ...rest }) => (
					<Route {...rest} key={path} path={path}>
						<Suspense fallback={<AppSpinner />}>
							<Component />
						</Suspense>
					</Route>
				))}
			</Switch>
		</Router>
	);
};

export default AppRoutes;
