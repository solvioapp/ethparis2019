import React from 'react'
import ReactDOM from 'react-dom'

// Visual elements
import { Panel } from './containers/Panel'
import { HeaderView } from './components/header-views'
import { MainView } from './components/MainView'
import { Search } from './containers/Search'
import { Dropdown } from './components/Dropdown'
import { FooterView as Footer } from './components/FooterView'

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
					<Panel />
					<HeaderView
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
