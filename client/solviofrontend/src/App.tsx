console.log('Main js loaded')
import React from 'react'
import ReactDOM from 'react-dom'

// Visual elements
import { Panel, Header } from './state/head'
import { Main, Section } from './state/body'
import Search from './components/Search'
import Footer from './stateless/footer-views'

// Css
import './styles/styles.scss'

// Placeholder text
import Lorem from './stateless/lorem-ipsum-view'

class App extends React.Component {

	// Render the main application element
	render( ) {
		return (
			<div className = "flexify">
				<header>
					<Panel id= "menu" />
					<Header
						id 		 = "header"
						title 	 = "Home"
						subtitle = "Welcome stranger"
						name	 = "Identity"
						logo	 = ""
					/>
				</header>
				<Main>
					<Search />
					<Section content = { <Lorem /> } />
				</Main>
				<Footer
					owner = "Mentor Palokaj"
				 />
			</div>
		)
	}
}

export default App