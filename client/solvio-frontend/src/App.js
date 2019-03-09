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

const r1 = {
	name: "K Tutorial",
	topic: "K",
	url: "https://github.com/kframework/k/tree/master/k-distribution/tutorial/",
	duration: "500",
	quality: "82",
}

const r2 = {
	name: "Formal Verification Workshop 1",
	topic: "K-EVM",
	url: "https://www.youtube.com/watch?v=d6qHxDIeFw0",
	duration: "75",
	quality: "78"
}

const r3 = {
	name: "Formal Verification Workshop 2",
	topic: "Formal verification of smart contracts using K",
	url: "https://www.youtube.com/watch?v=n6AgBIkHlhg",
	duration: "75",
	quality: "88"
}

const defaultPaths = [[r1, r2, r3], [r3, r1], [r3, r3, r2, r1]]

class App extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			learningPaths: defaultPaths,
			pathIndex: 0,
			query: "",
			results: "",
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
		const self = this
		axios.get('http://localhost:8090/topics')
		  .catch(function (error) {
		    console.log(error);
		  })
		  .then(function (res) {
				var results = res.data.filter(topic => topic.title.trim().includes(query.trim()))
				console.log(results)
				self.setState({results: results})
		  });

	}

	updatePathIndex(pathIndex) {
		this.setState({pathIndex})
	}

	// Render the main application element
	render( ) {
		console.log(this.state)
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
						<Route path="/" exact render={props => <SearchView results={this.state.results} updateQuery={(query) => this.updateQuery(query)} />} />
						<Route path="/resource/:cid/addReview" component={AddReview} />
						<Route path="/resource/:cid/reviews" component={Reviews} />
						<Route path="/topic/:cid" component={Topic} />
						<Route path="/paths" render={() => (
							<Path
								path={this.state.learningPaths[this.state.pathIndex]}
								updatePathIndex={this.updatePathIndex}
							/>
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
