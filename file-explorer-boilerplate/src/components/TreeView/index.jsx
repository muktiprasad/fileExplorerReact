import React from 'react'
import  ArrowDown  from '../../assets/icons/arrowDown';
import  ArrowUp  from '../../assets/icons/arrowUp';
import { Parent, Node, Children, Icon } from './styles';
import api from './../../api';

const TreeView = ({ data, onSelection, onToggle }) => {
	if (data.length === 0) {
		return <div>No Folders!</div>
	}
	const handleDelete = async (e,id) => {
		e.stopPropagation();
		const directoryTree = await api.deleteById(data, id);
		console.log("directoryTree ",directoryTree);
		console.log('getDirectoryTree',await api.getDirectoryTree())
		alert(`${id} need to be deleted`)
	}
	return data.map(node => {
		return (
			node.name && (
				<Parent key={node.name}>
					<Node
						isOpen={node.isOpen}
						onClick={() => {
							onSelection(node)
							
						}}
					>
						{node.children && node.children.length > 0 && (
							
							<Icon
								isOpen={node.isOpen}
								onClick={e => {
									e.stopPropagation()
									onToggle(node.name)
								}}
							>
								{node.isOpen ? <ArrowUp /> : <ArrowDown />}
							</Icon>
						)}
						<span>{node.name}</span>
						<span onClick={(e) =>handleDelete(e,node.id)}>x</span>
						
					</Node>
					{node.isOpen && (
						<Children>
							{node.children.length > 0 && (
								<TreeView
									data={node.children}
									onSelection={onSelection}
									onToggle={onToggle}
								/>
							)}
						</Children>
					)}
				</Parent>
			)
		)
	})
}

export default TreeView
