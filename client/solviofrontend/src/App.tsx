console.log('Main js loaded')
import React from 'react'
import ReactDOM from 'react-dom'

// Visual elements
import { Panel, Header } from './state/head'
import { Main } from './state/body'
import { Search } from './components/Search'
import { FooterView as Footer } from './stateless/footer-views'

// Css
import './styles/styles.scss'


class App extends React.Component {

	// Render the main application element
	render( ) {
		return (
			<div className = "flexify">
				<header>
					<Panel id = "menu" />
					<Header
						id 	  = "header"
						title = "Solvio Learn"
					/>
				</header>
				<Main>
					<Search />
				</Main>
				<Footer />
			</div>
		)
	}
}

export default App