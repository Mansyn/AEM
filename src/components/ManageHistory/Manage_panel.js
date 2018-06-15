import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Manage_Table from './Manage_table'

class Manage_Panel extends Component {

	handleMenuCollapse(e) {
		var mannageLeftMenu = document.getElementById('manage-leftMenu');
		var manageMenuContent = document.getElementById('manage-collapsible');
		var mannageIcon = document.getElementById('manage-collapseIcon');
		mannageLeftMenu.style.width = mannageLeftMenu.style.width == "35px" ? "" : "35px";
		manageMenuContent.style.display = manageMenuContent.style.display == "none" ? "block" : "none";
		mannageIcon.innerHTML = mannageIcon.innerHTML == "◄" ? "►" : "◄";
		this.manageBody.style.width = this.manageBody.style.width == "1135px" ? "" : "1135px";
	}
	handleApplicationCollapse(e) {
		var manage1 = document.getElementById('manage-manageMenu');
		var manageBody = document.getElementById('manageContent');
		manage1.style.display = manage1.style.display == "none" ? "block" : "none";
	}

	handleCategoriesCollapse(e) {
	var cat1 = document.getElementById('manage-categoriesMenu');
	cat1.style.display = cat1.style.display == "none" ? "block" : "none";
  }

  handleSelectAll(e) {
		var share = document.getElementById('manageShareButton');
		share.style.display = share.style.display == "none" ? "" : "none";
		// add select all function to select generated checkboxes
	}

	render() {

		return (
			<div className="row manage-history-contianer">
				<div id="manage-leftMenu" className="col-md-2 col-sm-2 manage-menu">
					<button onClick={this.handleMenuCollapse} className="m_h_menuCollapseButton"><span id="manage-collapseIcon">◄</span></button>
					<div id="manage-collapsible">
						<div className="manage-menu-body">
							<p>MANAGE</p>
							<br />
							<p onClick={this.handleApplicationCollapse} className="m_h_menu-head">APPLICATIONS</p>
							<div className="manage-menu-content" id="manage-manageMenu">
								<br />
								<p className="highlight"><strong>ALL APPLICATIONS<span id="A1" className="right menu-rightpad">(5)</span></strong></p>
								<hr />
								<p className="highlight">EV<span id="A2" className="right menu-rightpad">(1)</span></p>
								<hr />
								<p className="highlight">Engines<span id="A3" className="right menu-rightpad">(1)</span></p>
								<hr />
								<p className="highlight">SCM<span id="A4" className="right menu-rightpad">(3)</span></p>
								<hr />
								<br />
							</div>
						</div>
						<div className="manage-menu-body">
							<p onClick={this.handleCategoriesCollapse} className="m_h_menu-head">CATEGORIES</p>
							<div className="manage-menu-content" id="manage-categoriesMenu">
								<br />
								<p className="highlight"><strong>ALL CATEGORIES<span id="C1" className="right menu-rightpad">(5)</span></strong></p>
								<hr />
								<p className="highlight">WSV<span id="C2" className="right menu-rightpad">(2)</span></p>
								<hr />
								<p className="highlight">None<span id="C3" className="right menu-rightpad">(3)</span></p>
								<hr />
							</div>
						</div>
					</div>
				</div>
				<div id="manageContent" className="col-md-10 col-sm-10 manage-content">
					<div className="manage-table-head-container">
						<table className="manage-table">
							<thead className="manage-table-head">
								<tr>
									<th>&nbsp;</th>
									<th><input id="manageSelectAll" onClick={this.handleSelectAll} type="checkbox" /></th>
									<th>Report or Alert Name</th>
									<th>Type</th>
									<th>Created</th>
									<th>Last Updated</th>
									<th>Last Delivery</th>
									<th>CC: List</th>
									<th>App</th>
									<th></th>
								</tr>
							</thead>
						</table>
					</div>
					<div className="manage-table-wrapper">
						<table className="manage-table">

							<Manage_Table />

						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default Manage_Panel;	