import React from 'react';
import './App.css';
import Registrant from './components/Registrant';
import { Route, Switch, Link } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<nav>
					<Link to={'/registrants'}>Registrant</Link>
				</nav>
				<Switch>
					<Route path={'/registrants'}>
						<Registrant />
					</Route>
				</Switch>
			</header>
		</div>
	);
}

export default App;
