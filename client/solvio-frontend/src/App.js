import React from 'react'
import ReactDOM from 'react-dom'

// Visual elements
import { Panel } from './containers/Panel'
import { HeaderView } from './components/header-views'
import { MainView } from './components/MainView'
import { Search } from './containers/Search'
import { FooterView as Footer } from './components/FooterView'

// Css
import './styles/styles.scss'


class App extends React.Component {

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
				<MainView>
					<Search />
				</MainView>
				<Footer />
			</div>
		)
	}
}

export default App