import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Manage_Panel from './Manage_panel'
import History_Panel from './History_panel'
//import Hold_Notifications_Modal from './Hold_Notifications_modal'

import './ManageHistory.css';

class ManageHistory extends Component {

	handleCloseClick() {
		this.showManagePanel();
		document.getElementById('manage').style.display = 'none';
		document.getElementById('body').className = '';
	}
	showManagePanel() {
		document.getElementById('manageTab').className = 'manage-body';
		document.getElementById('historyTab').className= 'history-body hidden';
		document.getElementById('manageTabButton').className = 'm_h_nav-btn m_h_nav-btn-active';
		document.getElementById('historyTabButton').className = 'm_h_nav-btn';
		document.getElementById('body').className = 'modal-open';
		document.getElementById('manageOptionsButtons').className = 'manage_options-btns';
		document.getElementById('historyOptionsButtons').className = 'history_options-btns hidden';
	}
	showHistoryPanel() {
		document.getElementById('historyTab').className= 'history-body';
		document.getElementById('manageTab').className = 'manage-body hidden';
		document.getElementById('historyTabButton').className = 'm_h_nav-btn m_h_nav-btn-active';
		document.getElementById('manageTabButton').className = 'm_h_nav-btn';
		document.getElementById('manageOptionsButtons').className = 'manage_options-btns hidden';
		document.getElementById('historyOptionsButtons').className = 'history_options-btns';
	}
	showNotificationsModal() {
		document.getElementById('holdNotificationsModal').style.display = 'block';
		console.log("show hold notifications");
	}

	render() {

		return (

			<div id="manage" className="m_h_modal">
				<div className="m_h_modal-content">
				<div className="m_h_header">
					<span>
						&nbsp;&nbsp; MANAGE/HISTORY
					</span>
					<button onClick={this.handleCloseClick.bind(this)} className="m_h_close-button" style={{ marginRight: 16 }}>X</button>
					<div className="m_h_header-spacer">&nbsp;</div>
					<div className="m_h_nav">
						&nbsp;&nbsp;
						<button id="manageTabButton" onClick={this.showManagePanel} className="m_h_nav-btn m_h_nav-btn-active" style={{ margin: 0 }}>Manage</button>
						<button id="historyTabButton" onClick={this.showHistoryPanel} className="m_h_nav-btn" style={{ margin: 0 }}>History</button>
						<span id="manageOptionsButtons" className = "manage_options-btns">
							<button id="manageEditButton" className="m_h_optionButton">Edit</button>
							<button id="manageShareButton" className="m_h_optionButton share">Share</button>
							<button id="manageManageCategoriesButton" className="m_h_optionButton">Manage Categories</button>
							<button id="manageDeleteButton" className="m_h_optionButton">Delete</button>
							<button id="manageExecuteButton" className="m_h_optionButton">Execute</button>
						</span>
						<span id="historyOptionsButtons" className = "history_options-btns hidden">
							<button id="historyMarkReadButton" className="m_h_optionButton">Mark Read</button>
							<button id="historyMarkUnReadButton" className="m_h_optionButton share">Mark Unread</button>
							<button id="historyDeleteButton" className="m_h_optionButton">Delete</button>
						</span>
						<span className="right">
							HOLD NOTIFICATIONS &nbsp;&nbsp;
							<button id="holdNotificationsButton" className="m_h_holdNotifications-btn" onClick={this.showNotificationsModal.bind(this)}>
								Off
							</button>
						</span>
					</div>
					
				</div>
						<div id="manageTab" className="manage-body">
							<Manage_Panel />
						</div>
						<div id="historyTab" className="history-body hidden">
							<History_Panel />
						</div>
					</div>
			</div>
		);
	}
}

export default ManageHistory;	