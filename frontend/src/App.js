import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/pages/Landing';

const App = () => {
  return (
		<Router>
				<div>
					<Switch>
						<Route exact path='/' component={Landing} />
					</Switch>
				</div>
		</Router>
  );
}

export default App;
