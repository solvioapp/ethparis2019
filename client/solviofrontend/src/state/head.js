import React from 'react'
import { PanelView, HeaderView, MenuView, AccountView } from '../stateless/head-views'

// The menu logic

export class Panel extends React.Component {
	// Constructor setting default state
	constructor ( props ) {
		super ( props )
		// Set the state objects
		this.state = {
			visible: false,
			menuLinks: [
				{ name: 'Home', link: '/' }
			]
		}

		// Bind the functions for use in the render
		this.toggle = this.toggle.bind( this )
	}
	// Panel visibility toggle
	toggle(  ) {
		if ( this.state.visible ) {
			this.setState ( { visible: false } )
		} else {
			this.setState ( { visible: true } )
		}
	}
	// Rendering of panel
	render(  ) {
		// Display the panel
		return (
			<div id = { this.props.id }>
				<PanelView
					toggle 	= { this.toggle }
					visible = { this.state.visible }
				 >
				 	<MenuView
						links 	 = { this.state.menuLinks }
					/>
				 </PanelView>
			</div>
		)
	}
}


// The header logic
export class Header extends React.Component {
	render(  ) {
		return  (
			<HeaderView
				id 	  = { this.props.id }
				title = { this.props.title }
		 	/>
		 )
	}
}