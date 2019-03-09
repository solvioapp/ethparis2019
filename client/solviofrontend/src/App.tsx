console.log('Main js loaded')
import React from 'react'
import ReactDOM from 'react-dom'

// Visual elements
import { Panel, Header } from './containers/head'
import { Main } from './containers/body'
import { Search } from './components/Search'
import { Dropdown } from './components/Dropdown'
import { FooterView as Footer } from './components/footer-views'

// Css
import './styles/styles.scss'

class App extends React.Component<any,any> {

	constructor(props: any){
		super(props)
	}

	updateQuery(query: any){
		console.log(query)

	}

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
					<Search updateQuery={(query: any) => this.updateQuery(query)}/>
					<Dropdown />
				</Main>
				<Footer />
			</div>
		)
	}
}

export default App
