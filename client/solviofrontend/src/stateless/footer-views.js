import React from 'react'

const FooterView = props =>  (
		<footer>
			<div id = "copyright">
				© Copyright { new Date().getFullYear() + " " + props.owner }
			</div>
		</footer>
	)

export default FooterView