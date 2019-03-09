// Import react
import React from 'react'

// Define a menu rendering component that takes props
export const PanelView = ( { children, visible, toggle, name, logo, action } ) => {
	// Fill the <nav><ul> element with the above <li>'s
	return (
		<span>
			<button id = "menu-btn"
					onClick = { toggle }
					className = { "hamburger hamburger--squeeze " +  ( visible ? "is-active" : "" )  }
					type = "button">
  				<span className = "hamburger-box">
			    <span className = "hamburger-inner"></span>
			  </span>
			</button>
			<nav className = { visible ? 'full absolute-show' : 'full absolute-out-right' } >
				<h3 className = "depth" id = "menutitle" >{ action }</h3>
				{ children }
			</nav>
		</span>
	)
}

// Menu items
export const MenuView = ( { links, register, login } )  =>  {
	// Generate menu list from items array
	let menuitems = links.map ( ( item, index ) => {
		return (
			<a className = "depth menuitem" key = { index } href = { item.link }  >
				<li> {item.name} </li>
			</a>
		)
	} )
	return (
		<ul>
			{menuitems}
		</ul>
	)
}

export const HeaderView =  ( { id, title, subtitle, name, logo } )  => (
	<div id = { id } className = "valign" >
		<a href = "/" className = "depth" id = "identity">
			<img
				id = "logo"
				src= { logo }
				className = { logo ? "" : "hide" } />
			 { name }
		</a>
		<h1 id = "title" className="depth nomar" >
			 { title }
		</h1>
		<p id = "subtitle" className="depth" >
			 { subtitle }
		</p>
	</div>
)