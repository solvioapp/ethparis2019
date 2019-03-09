import React from 'react'

export const SectionView = props =>  (
		<section>
			{ props.content }
		</section>
	)

export const MainView = props =>  (
		<div className="container">
			{ props.children }
		</div>
	)