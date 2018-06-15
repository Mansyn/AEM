import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import History_Table from './History_table'

class History_Panel extends Component {

	handleMenuCollapse(e) {
		var historyLeftMenu = document.getElementById('history-leftMenu');
		var historyMenuContent = document.getElementById('history-collapsible');
		var historyIcon = document.getElementById('history-collapseIcon');
		historyLeftMenu.style.width = historyLeftMenu.style.width == "35px" ? "" : "35px";
		historyMenuContent.style.display = historyMenuContent.style.display == "none" ? "block" : "none";
		historyIcon.innerHTML = historyIcon.innerHTML == "◄" ? "►" : "◄";
	}
	handleSummaryCollapse(e) {
		var summ = document.getElementById('history-summaryMenu');
		summ.style.display = summ.style.display == "none" ? "block" : "none";
	}
	handleApplicationCollapse(e) {
		var manage2 = document.getElementById('history-manageMenu');
		manage2.style.display = manage2.style.display == "none" ? "block" : "none";
	}

	handleCategoriesCollapse(e) {
		var cat2 = document.getElementById('history-categoriesMenu');
		cat2.style.display = cat2.style.display == "none" ? "block" : "none";
	}

	render() {

		return (

			<div className="row">
				<div id="history-leftMenu" className="col-md-2 col-sm-2 manage-menu">
					<button onClick={this.handleMenuCollapse} className="m_h_menuCollapseButton"><span id="history-collapseIcon">◄</span></button>
					<div id="history-collapsible">
						<div className="manage-menu-body">
							<p>History</p>
							<br />
							<p onClick={this.handleSummaryCollapse} className="m_h_menu-head">SUMMARY</p>
							<div className="history-menu-content-summary" id="history-summaryMenu">
								<br />
								<p className="highlight"><strong>ALL NOTIFICATIONS<span id="A1" className="right menu-rightpad">(0)</span></strong></p>
								<hr />
								<p className="highlight">Unread<span id="A2" className="right menu-rightpad">(0)</span></p>
								<hr />
								<p className="highlight">Read<span id="A3" className="right menu-rightpad">(0)</span></p>
								<br />
							</div>
							<p onClick={this.handleApplicationCollapse} className="m_h_menu-head">APPLICATIONS</p>
							<div className="history-menu-content-summary" id="history-manageMenu">
								<br />

								<p className="highlight"><strong>ALL APPLICATIONS<span id="A1" className="right menu-rightpad">(0)</span></strong></p>
								<hr />
								<br />
							</div>
							<p onClick={this.handleCategoriesCollapse} className="m_h_menu-head">CATEGORIES</p>
							<div className="history-menu-content-summary" id="history-categoriesMenu">
								<br />
								<p className="highlight"><strong>ALL CATEGORIES<span id="C1" className="right menu-rightpad">(0)</span></strong></p>
								<hr />
							</div>
						</div>
					</div>
				</div>
				<div id="historyContent" className="col-md-10 col-sm-10 history-content">
					<div className="history-table-head-container">
						<table className="history-table">
							<thead className="history-table-head">
								<tr>
									<th><input id="historySelectAll" type="checkbox" /></th>
									<th>Report or Alert Name</th>
									<th>Type</th>
									<th>Configuration</th>
									<th>Received</th>
									<th>App</th>
								</tr>
							</thead>
						</table>
					</div>
					<div className="history-table-wrapper">
						<table className="history-table">

							<History_Table />

						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default History_Panel;	