import React from 'react'
import { MainView, SectionView } from '../stateless/body-views.js'

export class Main extends React.Component  {
	render (  )  {
		return  (
			<main>
				<MainView children =  { this.props.children } />
			</main>
			)
	}
}

export class Section extends React.Component  {
	render (  )  {
		return <SectionView content = { this.props.content } />
	}
}