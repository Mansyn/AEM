import React, { Component } from 'react'

import './App.css';

import Modal from 'react-modal';
import ManageHistory from './ManageHistory/ManageHistory'
import Scheduler from './Scheduler/Scheduler'
import EnterpriseMessagingPlugin from './EnterpriseMessagingPlugin/EnterpriseMessagingPlugin'
import HomeView from '../views/home'

const manageModalStyles = {
	overlay: {
		backgroundColor: 'rgba(0,0,0,0.4)'
	},
	content: {
		top: '30px',
		bottom: '0',
		margin: '0 auto',
		maxWidth: '1170px',
		padding: '0',
		borderRadius: '0'
	}
};

const schedulerModalStyles = {
	overlay: {
		backgroundColor: 'rgba(0,0,0,0.4)'
	},
	content: {
		top: '30px',
		bottom: '0',
		margin: '0 auto',
		maxWidth: '1170px',
		padding: '0',
		borderRadius: '0'
	}
};

const messagesModalStyles = {
	overlay: {
		backgroundColor: 'rgba(0,0,0,0.4)'
	},
	content: {
		top: '30px',
		bottom: '0',
		margin: '0 auto',
		maxWidth: '1170px',
		padding: '0',
		borderRadius: '0'
	}
};

class App extends Component {

	constructor() {
		super();
	
		this.state = {
			manageModalIsOpen: false,
			schedulerModalIsOpen: false,
			messagesModalIsOpen: false
		};
	}
	
	openModal = param => e => {
		switch(param) {
			case 'manage':
				this.setState({schedulerModalIsOpen: false});
				this.setState({messagesModalIsOpen: false});
				this.setState({manageModalIsOpen: true});
				break;
			case 'scheduler':
				this.setState({manageModalIsOpen: false});
				this.setState({messagesModalIsOpen: false});
				this.setState({schedulerModalIsOpen: true});
				break;
			case 'messages':
				this.setState({schedulerModalIsOpen: false});
				this.setState({manageModalIsOpen: false});
				this.setState({messagesModalIsOpen: true});
				break;
			default:
				break;
		}
	};
	
	afterOpenModal = () => {
		// references are now sync'd and can be accessed. 
		//this.subtitle.style.color = '#f00';
	}
	
	closeModal = () => {
		this.setState({schedulerModalIsOpen: false});
		this.setState({messagesModalIsOpen: false});
		this.setState({manageModalIsOpen: false});
	}
	
	render() {
		return (
			<div>
				<img id="AFLogo" className="floatLeft" src={require('../images/HeaderBar_v2AFLogo.png')} alt="header logo" />
				<nav>
					<span className="proto-headline">SEV Prototype v2.0</span>
					<button onClick={this.openModal('manage')}>-MDP-</button>		
					<button onClick={this.openModal('scheduler')}>
						<img src={require('../images/Icon_20_addcalendar.png')} alt="add calendar" />
					</button>
					<button onClick={this.openModal('messages')}>
						MY MESSAGES <span className="badge" id="messageLength"></span>
						<i className="material-icons">arrow_drop_down</i>
					</button>
				</nav>

				<Modal
					isOpen={this.state.manageModalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={manageModalStyles}
					contentLabel="Manage History">
					<ManageHistory />
				</Modal>
				<Modal
					isOpen={this.state.schedulerModalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={schedulerModalStyles}
					contentLabel="Scheduler">
					<Scheduler />
				</Modal>
				<Modal
					isOpen={this.state.messagesModalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={messagesModalStyles}
					contentLabel="My Messages">
					<EnterpriseMessagingPlugin />
				</Modal>
				<HomeView />
			</div>
    	);
	  }
}

export default App;