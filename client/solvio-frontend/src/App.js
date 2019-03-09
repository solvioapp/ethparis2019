import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

// Visual elements
import { Panel } from './containers/Panel'
import { HeaderView } from './components/header-views'
import { SearchView } from './containers/SearchView'
import { Dropdown } from './components/Dropdown'
import { FooterView  } from './components/FooterView'
import { AddReview } from './components/AddReview'
import { Path } from './components/Path'
import { Reviews } from './components/Reviews'
import { Topic } from './components/Topic'
import axios from 'axios'


// Css
import './styles/styles.scss'

class App extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			query: ""
		}
	}

	updateQuery(query){
		if(query !== undefined){
			this.setState({query:query})
			this.searchRequest(query)
		}
	}

	searchRequest(query){
		// Make a request for a user with a given ID
		axios.get('http://localhost:8090/topics')
		  .catch(function (error) {
		    console.log(error);
		  })
		  .then(function (data) {
				console.log(data)
		  });

	}

	// Render the main application element
	render( ) {
		return (
			<div className = "flexify">
				<header>
					<Panel />
					<HeaderView
						id 	  = "header"
						title = "Solvio Learn"
					/>
				</header>
				<Router>
					<div className="container">
						<Route path="/" exact render={props => <SearchView updateQuery={(query) => this.updateQuery(query)} />} />
						<Route path="/resource/:cid/addReview" component={AddReview} />
						<Route path="/resource/:cid/reviews" component={Reviews} />
						<Route path="/topic/:cid" component={Topic} />
						<Route path="/path" render={(learningPaths) => (
							<Path {...learningPaths} />
						)} />
					</div>
				</Router>

				{/* <MainView>
					<Search updateQuery={(query) => this.updateQuery(query)}/>
					<Dropdown />
				</MainView> */}

				<FooterView />
			</div>
		)
	}
}

export default App
