import React from 'react'
import { MainView } from '../components/MainView'

export class Main extends React.Component  {
	render (  )  {
		return  (
			<main>
				<MainView children =  { this.props.children } />
			</main>
			)
	}
}