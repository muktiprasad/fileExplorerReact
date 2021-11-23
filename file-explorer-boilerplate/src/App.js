import React from 'react'

import './styles.scss'

// Components
import { TreeView } from './components'

// Helpers
import { toggleNode } from './../src/components/helpers';

import { directoryTree } from './api';


const App = () => {
	const [data, setData] = React.useState([
		directoryTree
	])

	const onToggle = (node) => {
		const mutated = toggleNode(data, node)
		setData(mutated)
	}

	const onSelection = (node) => {
		if (node.type === 'folder') onToggle(node.name)
	}

	return (
		<div id="wrapper">
			<sidebar>
				<main>
					<TreeView
            data={data}
						onSelection={onSelection}
						onToggle={onToggle}
					/>
				</main>
			</sidebar>
		</div>
	)
}

export default App

