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
import * as statfunctions from './staticfunctions'

import sha256 from 'js-sha256'

// Css
import './styles/styles.scss'

import { defaultPaths, defaultResources, defaultResource } from './defaults'

const MIN_SEARCH_CHARS = 2


class App extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			learningPaths: defaultPaths,
			pathIndex: 0,
			query: "",
			results: "",
			// for topic
			resources: defaultResources,
			// For resource
			resource: defaultResource,
		}

		this.setResource = this.setResource.bind(this)
	}

	updateQuery(query){
		if(query !== undefined){
			this.setState({query:query})
			this.searchRequest(query)
		}
	}

	searchRequest(query){
		const requestIsUrl = statfunctions.validURL(query)
		const self = this

		if(requestIsUrl) {
		axios.get('http://localhost:8090/resources/'+sha256(query))
			.catch(function (error) {
				self.setState({results: "empty"})
			})
			.then(function (res) {
				if(res.status !== undefined
					 && res.status == 200
					 && res.data !== undefined){
					const results = res.data
					self.setState({results: results})
				} else {
					self.setState({results: "empty"})
				}
				//var results = res.data.filter(topic => topic.title.trim().includes(query.trim()))
			});
		} else if(query.length > MIN_SEARCH_CHARS) {
			// Make a request for a user with a given ID
			axios.get('http://localhost:8090/search?q='+query)
			  .catch(function (error) {
			    console.log(error);
			  })
			  .then(function (res) {
					if(res.data !== undefined) {
						const results = res.data
						self.setState({results: results})
					}
			  });
			} else {
				self.setState({results: ""})
			}

	}

	decPathIndex() {
		if (this.state.pathIndex !== 0) {
			this.setState({pathIndex: this.state.pathIndex - 1})
		}
	}

	incPathIndex() {
		if (this.state.pathIndex !== this.state.learningPaths.length - 1) {
			this.setState({pathIndex: this.state.pathIndex + 1})
		}
	}

	setResource(resource) {
		this.setState({ resource })
	}

	// Render the main application element
	render( ) {
		console.log(this.state)
		return (
			<div className = "flexify">
				<Router>
					<div>
						<header>
							<Panel />
							<HeaderView
								id="header"
								title="Solvio Learn"
							/>
						</header>
						<div className="container">
							<Route path="/" exact render={props => <SearchView results={this.state.results} updateQuery={(query) => this.updateQuery(query)} />} />
							<Route path="/resource/addReview" render={() => (
								<AddReview
									resourceID={this.state.resource.id}
								/>
							)} />
							<Route path="/resource/reviews" render={() => (
								<Reviews
									reviews={this.state.resource.reviews}
								/>
							)} />
							<Route path="/topic" render={() => (
								<Topic
									setResource={this.setResource}
									resources={this.state.resources}
								/>
							)} />
							<Route path="/paths" render={() => (
								<Path
									setResource={this.setResource}
									path={this.state.learningPaths[this.state.pathIndex]}
									decPathIndex={this.decPathIndex.bind(this)}
									incPathIndex={this.incPathIndex.bind(this)}
								/>
							)} />
						</div>
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
