import React, { Component } from 'react'
import MyMessages_Panel from './MyMessages_panel'
//import Manage_History_Modal from './Manage_History_modal'
// These two lines are for IE compatablity and the fetch library.
require('es6-promise').polyfill();
require('isomorphic-fetch');


class EnterpriseMessagingPlugin extends Component {
	constructor(props) {
		super(props) 
		this.state = {
			ackMsgKeys:[],	// flex localMessageData
			messageList:[]	// messages to be displayed - flex detailsWidget.messageList			
		}		
	}
	
	componentDidMount(){
		console.log("in ComponentDidMount"); 
		var ackMessageKeys = [];
		
		// var base_url = "https://www8.my.af.mil";
		// Set the base for the dev proxy server to rewite
		
		// will get from redux by isobar
		var base_url = 'xxx' 
		var applicationName = 'LIMS-EV%20SCM%20View'
		
		// local vars
		var em_url1 = '/emsg/emsg-services/cxf/'
		var em_url2 = '/emsg/emsg-services/'
		var aem_url1 = '/aem-rest/aem-rest/'
		
		
		var endpoint_ackMessages = 'getMessagesAcknowledged'
		var endpoint_actMessages = 'getActiveMessages?applicationName=' 
		var endpoint_msg_register = 'messaging-register?applicationName='     
		var endpoint_unReadNotifications = 'notifications?&unread=true'
		
		var clientSession = '&clientSessionID=4'
		
		var url_ackMessages = base_url + em_url1 + endpoint_ackMessages
		var url_actMessages = base_url + em_url1 + endpoint_actMessages + applicationName 		
		var url_msgRegister = 	base_url + em_url2 + endpoint_msg_register + applicationName + clientSession
		
		var url_unreadAEM = base_url + aem_url1 + endpoint_unReadNotifications
		
		//https://www8.my.af.mil/aem-rest/aem-rest/notifications?&unread=true

		
		
		// for debug	
		console.log("url_unreadAEM" + url_unreadAEM)
		console.log("url_ackMessages" + url_ackMessages)		
		console.log("url_actMessages" + url_actMessages)
		console.log("url_msgRegister" + url_msgRegister)
				
		//let endpoint = '/emsg/emsg-services/messaging-register?applicationName=LIMS-EV%20SCM%20View&cleintSessionID=4';
		 
		//this.getAckMessages(url_ackMessages);
		//this.getActMessages(url_actMessages);
		
        this.getAEMUnReadNotificationMessages(url_unreadAEM,url_ackMessages,url_actMessages,url_msgRegister);
	}

	render(){
	 	let component;
		if(this.state.messageList != null ) {
			console.log("EM plugin - not null");
			component = <MyMessages_Panel messageList={ this.state.messageList } />
		} else {
			console.log("EM plugin - null");
			component = null;
		} 				 
		return	component 
	}	
	
    getAEMUnReadNotificationMessages(url_unreadAEM,ack_url,act_url,msgReg_url) {
	
		fetch(url_unreadAEM)
			.then((response) => {
				return response.json() 
			})
			.then((responseData) => {
				console.log("Unread notification messages found: "+ responseData.length );
				
				console.log(responseData.length)
				console.log(responseData);
				
				this.getAEMUnReadNotificationsHandler(responseData);	// call to the getAEMUnReadNotificationMessagesHandler
				this.getAckMessages(ack_url,act_url,msgReg_url);  
			})	
	}
	
    getAckMessages(ack_url,act_url,msgReg_url) {	
	// Call to get acknowledged messages
	
	/*	acknowledge message properties
		{messageID:number,
		userID:String,
		messageKey:String,
		acknowledgedDateTime:String,  
		showMessageAgain:boolean} 
		-------------------------
		messageKey format:"AEM|LEADERSHIP ENGINE ANALYSIS \u0026 CHARTING 2|11 Oct 2016 18:27 Z",
		acknowledgedDateTime format: "2016-10-12T14:21:59.480Z"
	*/		
		fetch(ack_url)
			.then((response) => {
				return response.json() 
			})
			.then((responseData) => {
				console.log("Acknowledged messages found: "+ responseData.length );
				
				// get list of keys
				let ackMsgKeys = this.getAcknowledgedMessagesHandler(responseData);
				//console.log("ackMsgKeys found here: "+ ackMsgKeys.length );	
				this.setState({ ackMsgKeys: ackMsgKeys });
				
				console.log("ackMsgKeys saved in: this.state.ackMsgKeys");
				console.log(this.state.ackMsgKeys);
				// Call getActiveMessages from service
				this.getActMessages(act_url,msgReg_url)
			})
	}
	
 	getActMessages(act_url,msgReg_url) {
		fetch(act_url)
			.then((response) => {
				return response.json();
			})
			.then((responseData) => {
				console.log("Active messages found: "+ responseData.length );
				console.log(responseData);
				this.getActiveMessagesHandler(responseData);	// call to the getActiveMessageHandler
				console.log("Starting the message-register loop ");
				this.getMessagingRegister(msgReg_url);  
			})	
	}
	
	getMessagingRegister(msgReg_url){
		console.log("Checking for new messages")	

		fetch(msgReg_url)
			.then((response) => {
				return response.json();
			})
			.then((responseData) => {				
				this.checkResponse(responseData, msgReg_url);
			})		
	}
	
	/////////////////////////////////////////////////////////////////////////////////
	
	getAEMUnReadNotificationsHandler(responseData){	
		console.log("AEMUnReadNotification: " + responseData)
		responseData.map(unreadNotification  => {
			console.log("getAEMUnReadNotificationHandler: ");
			this.handleAEMUnReadNotification(unreadNotification);
		});				
	}
	
	getAcknowledgedMessagesHandler(responseData){	
		///////////////////////////////////////////////////////////////////////// 
		//
		// getAcknowledgedMessagesHandler - flex handleGetAcknowlededMessageKeys
		//
		// handles the messages returned:
		//	by client call: getAckMessages
		//	from back end service: getMessagesAcknowledged
		//
		// Each message is used to create a new object containing messageKey and 
		// showMeAgain values, this object is added to the this.setState.ackMsgKeys
		//
		/////////////////////////////////////////////////////////////////////////
		console.log("getAcknowledgedMessagesHandler-start" + responseData.length);
		let ackMessageKeys = responseData.map(ackMessage  => {
				let {messageKey,showMessageAgain} = ackMessage;		// pull out key values				
				let ackMessageKey = {messageKey,showMessageAgain}	// put back key values together in object
				console.log(ackMessageKey.messageKey );
				return ackMessageKey								// return new object ackMessageKey
			});
			
		return ackMessageKeys;
	}	
	
	getActiveMessagesHandler(responseData){
		///////////////////////////////////////////////////////////////////////// 
		//
		// getActiveMessagesHandler - flex handleGetMessages
		//
		// handles the messages returned:
		//	by client call: getActMessages
		//	from back end service: getActiveMessages?applicationName=xxx
		//
		// loop through messages retrieved from service, processing one message at a time.
		//
		/////////////////////////////////////////////////////////////////////////
		console.log("getActiveMessagesHandler-start")	
		
		responseData.map(actMessage  => {
				console.log("getActiveMessagesHandler: single message processing starting");
				this.handleMessageForUserMessage(actMessage);
			});				
	}

	checkResponse(responseData, msgReg_url){
		let newMessages = [];
		console.log("Checking for TIME-OUT or new message")
		if(responseData != "TIMED-OUT"){
			console.log("************************")
			console.log("New message found...")			
			console.log(responseData)
			console.log("************************")			
			newMessages.push(responseData);
			this.getActiveMessagesHandler(newMessages);
			console.log("new message completed")
			this.getMessagingRegister(msgReg_url)			
		}
		this.getMessagingRegister(msgReg_url)
	}	
	
	formatDateUTC(dateIn){
		console.log("formatDateUTC");
		let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		let dateIn_utc = new Date(dateIn.getUTCFullYear(), dateIn.getUTCMonth(), dateIn.getUTCDate(),  dateIn.getUTCHours(), dateIn.getUTCMinutes(), dateIn.getUTCSeconds());
		let day = ("0"+dateIn_utc.getUTCDate()).slice(-2);
		let monthIndex = dateIn_utc.getUTCMonth();
		let year = dateIn_utc.getUTCFullYear();
		let hour = ("0"+dateIn_utc.getUTCHours()).slice(-2);
		let min = ("0"+dateIn_utc.getUTCMinutes()).slice(-2);
		return `${day} ${monthNames[monthIndex]} ${year} ${hour}:${min} Z`	;	
	}
	
	formatDateAEMToEM(dateIn) {
		console.log("formatDateAEMToEM-start");
		console.log("dateIn: "+ dateIn);
		let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		let dateIn_utc = new Date(dateIn.getUTCFullYear(), dateIn.getUTCMonth(), dateIn.getUTCDate(),  dateIn.getUTCHours(), dateIn.getUTCMinutes(), dateIn.getUTCSeconds());
		console.log("dateIn_utc: "+ dateIn_utc);
		let day = ("0"+dateIn_utc.getDate()).slice(-2);
		let monthIndex = dateIn_utc.getMonth();
		let year = dateIn_utc.getFullYear();
		let hour = ("0"+dateIn_utc.getHours()).slice(-2);
		let min = ("0"+dateIn_utc.getMinutes()).slice(-2);
		
		console.log("formatDateAEMToEM-end");
		return `${day} ${monthNames[monthIndex]} ${year} ${hour}:${min} Z`	;
	}
	
	buildKey(receivedDateIn){
		console.log("buildKey");
		if(!receivedDateIn){
			return `${this.title}`;
		} else {
			return `${this.type}|${this.title}|${this.receivedDate}`;
		}
	}	

	buildAction(){	
		
	}

	addMessageProperties(message){
		console.log("addMessageProperties - start");
		const receivedDate = this.formatDateUTC(new Date(message.createDateTime));			
		const title = message.messageTitle;
		const type = "ADMIN_MESSAGE_PUSH";			
		const ackKey = (!receivedDate) ? title : type+"|"+title+"|"+receivedDate; 
		//const actions = <Link  onClick={this.showUserMessage}>View</Link>
		 
		message.receivedDate = receivedDate;
		message.title = title;
		message.type = type;
		message.ackKey = ackKey;
		message.actions = "VIEW"
		console.log("addMessageProperties - end");
		return message;
	}	

	addMessageByType(type, list){
		console.log("addMessageByType - start");
		let tempList = [];	
		
		list.map(m =>{
			switch(m.type){ 
				case "ADMIN_MESSAGE_PUSH":
					m.typeLabel = 'System Message';
					break;
				case "AEM":
					m.typeLabel = "Scheduled Reports/Alerts";
					break;
				case "Engines":
					m.typeLabel = "Scheduled Reports/Alerts";
					break;
				case "FAS":
					m.typeLabel = "Scheduled Reports/Alerts";
					break;
				case "WSV":
					m.typeLabel = "Scheduled Reports/Alerts";
					break;
				case "SEV":
					m.typeLabel = "Scheduled Reports/Alerts";
					break;
				case "PDF-READY":
					m.typeLabel = "SCM File Repository";
					break;
			}	
		})	// list still holds incoming messages	
		
		// create a clean list without any duplicates by filtering out			
		// messages of the same type coming in from this.state.messageList
		if(this.state.messageList.length > 0){
			this.state.messageList.map(m =>{				
				if(m.type != type){
					tempList.push(m);
				}
			})
		} 
		
		//Combine templist and list arrays
		let combine = [...tempList, ...list] ;
		tempList = combine;
		
		// Put the tempList back into this.state.messageList
		let temp2 = this.state.messageList;		
		let tempMsgList = [...temp2, ...tempList];

		//let unacknowledged = 0;
		let msgKeyList = this.state.ackMsgKeys;
		
		//check the message list and count how many un-ack messages we have
		tempMsgList.map(message=> {			
			let found = false;
			for(let i=0; i < msgKeyList.length; i++){
				if(msgKeyList[i].messageKey === message.ackKey){
					found = true;
					break;
				}
			}
			
			if(found) {
				message.acknowledged = true;
			} else {
				message.acknowledged = false;
				//unacknowledged++;
			}
		});
		
		// Simple sort change the order of (a,b) to change sort direction
		// Sort by recieved date descending order
		tempMsgList.sort((b, a) => a.receivedDate.localeCompare(b.receivedDate));
		
		// ascending order
		//tempMsgList.sort((a, b) => a.receivedDate.localeCompare(b.receivedDate));
		
		this.setState({ messageList: tempMsgList });
		console.log(this.state.messageList);
		
		
		this.updateAcknowledgedCount(tempMsgList)			// Go count and update unacknowledged messages		
		console.log("addMessage-end");		
	}
	
	updateAcknowledgedCount(tempMsgList){
		let unacknowledged=0;
		
		tempMsgList.map(message=> {
			if(!message.acknowledged)
				unacknowledged++;
		})
				
		// Update button with unacknowledged count		
		let x = document.getElementById('messageLength');   // Get the element we want to fill in
		x.innerHTML = "("+unacknowledged+")";    			// Set the innerHTML of the element	
		console.log("unacknowledged: "+ unacknowledged);
	}

	handleAEMUnReadNotification(unReadnotification){
		console.log("handleAEMUnReadNotification");
		let list = [];
		
		let message = this.convertNotificationToMessageProperties(unReadnotification);
		list.push(message);	
		console.log("list:")
		console.log(list)
		this.addMessageByType("AEM", list);
	}
	
	convertNotificationToMessageProperties(unReadnotification){		
		console.log("convertNotificationToMessageProperties - start");
		
		
		let notificationDateIn = new Date(unReadnotification.reportDate);		
		const receivedDate = this.formatDateAEMToEM(notificationDateIn);
		
		console.log("notificationDateIn: "+ notificationDateIn)
		console.log("receivedDate: "+receivedDate);
		
		
		const title = unReadnotification.subscription.reportTitle;
		const type = "AEM";			
		const applicationName = unReadnotification.subscription.reportDefinition.applicationName;
		
		
		//const actions = <Link  onClick={this.showUserMessage}>View</Link> 
		
		let message={};					// Make new message object
		message.receivedDate = receivedDate;
		message.title = title;
		message.type = type;
		message.applicationName = applicationName;		
		message.actions = "OPEN DOWNLOAD"
		
		console.log(message);
		console.log("convertNotificationToMessageProperties - end");
		
		return message;	
	}	
		
	handleMessageForUserMessage(message){
		console.log("handleMessageForUserMessage");
		
		let list = [];
		
		message = this.addMessageProperties(message);
		list.push(message);
		
		this.addMessageByType(message.event, list); 
		
		console.log("checking for urgent")		
		if(message.urgent){
			let msgKeyList = this.state.ackMsgKeys;
			
			let found = false;
			for(let i=0; i < msgKeyList.length; i++){
				if(msgKeyList[i].messageKey === message.ackKey){
					found = true;
					break;
				}
			}
						
			if(found) {
				message.showMessageAgain = this.key.messageKey;
			} else {
				message.showMessageAgain = true;
			}
			
			if(!message.acknowledged){						//if urgent, and the message has not been ack, then we must show
				//showUserMessage(message, "Acknowledge");
				alert("Acknowledge");
			}else if(this.localMessageData[message.ackKey]){		//if urgent, and acknowldege, only show if "show again" is not selected
				//showUserMessage(message, "OK");
				alert("OK");
			}			
		}			
	}	
	
	handleMessageForUserMessage_DELETE(deletedMessage){
		this.addMessageProperties(deletedMessage);							// update deletedMessage properties
		let tempMsgList = [];
		let messageList = this.state.messageList();						// pull current messageList from state
		messageList.map(message => {			
			if(message.ackKey != deletedMessage.ackKey){
				tempMsgList.push(message);
			}	
		})
		
		this.setState({ messageList: tempMsgList });					// Update current messageList state
		this.updateAcknowledgedCount(tempMsgList);						// Go count and update unacknowledged messages
	}
	
	handleMessageForUserMessage_UPDATE(updatedMessage){
	
		if(new Date(this.message.expireDateTime).getTime() > (new Date()).getTime()){		// Time is calculated in Eastern Time not UTC

			this.addMessageProperties(updatedMessage);						// update updatedMessage properties
			updatedMessage.typeLabel = "System Message";				// need to match the existing key 
	
			let tempMsgList = [];									
			let messageList = this.state.messageList();					// pull current messageList from state
			let updateActiveRecord = false;
			
			messageList.map(message => {								// replace the updated message
				if(message.ackKey != updatedMessage.ackKey){
					tempMsgList.push(message);
				}else{
					updateActiveRecord=true;
					updatedMessage.acknowledged = message.acknowledged;
					updatedMessage.showMessageAgain = message.showMessageAgain;
					tempMsgList.push(updatedMessage);	
				}
			})		
	
			if(updateActiveRecord){
				this.setState({ messageList: tempMsgList });		 	// update current messageList state ONLY IF A MATCH IS FOUND
				this.updateAcknowledgedCount(tempMsgList);				// Go count and update unacknowledged messages
			}else{
				this.handleMessageForUserMessage(updatedMessage);	 	// didn't find a match...must have been expired before, so treat it as a new message			
			}	
		}else{
			this.handleMessageForUserMessage_DELETE(updatedMessage); 	// message is now expired, treat it as a delete			
		} 	
	}	
	
	removeExpiredMessages(){
		
		let tempMsgList = [];
		let messageList = this.state.messageList();						// pull current messageList from state			
		
		
		if(messageList.length > 0){
			let currentDateTime = new Date();							// Eastern local time NOT UTC
			
			messageList.map(message => {
				let expireDayTime = new Date(message.expireDateTime)	// Eastern local time NOT UTC
				
				if(expireDayTime != null && expireDayTime < currentDateTime){	//filter out the expired messages
					console.log("Expired message- messageID: "+ message.messageID +" message.title: "+message.title+" expireDate: "+ message.expireDateTime)
				}else{
					tempMsgList.push(message)							// Keep non-expired messages
				}
			})
			
			this.setState({ messageList: tempMsgList });		 		// Update current messageList
			
			this.updateAcknowledgedCount(tempMsgList);					// Go count and update unacknowledged messages
			
			// Call filter messageList based on Type selection in "Type" dropdown 
			//	detailsWidget.filterDetailsWidgetList();
				
					
		}	
	}


	/*
	
	///////////////////////////////////////////////////////////////////////// 
	//
	//	startExpireTimer
	//
	/////////////////////////////////////////////////////////////////////////			
			
	private function startExpireTimer():void{
		var timer:Timer = new Timer(1000 * 20);
		timer.addEventListener(TimerEvent.TIMER, removeExpiredMessages);
		timer.start();
	}		

	
	///////////////////////////////////////////////////////////////////////// 
	//
	//	showUserMessage
	//
	/////////////////////////////////////////////////////////////////////////			
	
	public function showUserMessage(message:Object, label:String="OK"):void{
		trace(">EM> EnterpriseMessagingPlugin.showUserMessage");
		this.messagePopUp.addMessage(message);			
		
		if(!message.acknowledged){				//if the message has not been ack 
			label = "Acknowledge";
		}
		this.messagePopUp.buttonLabel = label;
		
		PopUpManager.removePopUp(this.messagePopUp);
		PopUpManager.addPopUp(this.messagePopUp, this.displayObject, true);
		PopUpManager.centerPopUp(this.messagePopUp);
	}		
	
	
	///////////////////////////////////////////////////////////////////////// 
	//
	//	updateAcknowledgedMessage
	//
	// 	- send update ack message to service
	//
	/////////////////////////////////////////////////////////////////////////	
	
	public function updateAcknowledgedMessage(message:Object, showMessageAgain:Boolean=false):void{
		trace(">EM> EnterpriseMessagingPlugin.updateAcknowledgedMessage");
		
		var ack:Object = new Object();
		ack.messageKey = message.ackKey;			
		ack.showMessageAgain = showMessageAgain;
		
		var event:CairngormEvent = new CairngormEvent(MessageController.UPDATE_ACKNOWLEDGED);
		event.data = ack;	
		
		trace(">EM> EnterpriseMessagingPlugin.updateAcknowledgedMessage dispatchEvent -> MessageController.UPDATE_ACKNOWLEDGED");
		
		CairngormEventDispatcher.getInstance().dispatchEvent(event);
	}		

	
	///////////////////////////////////////////////////////////////////////// 
	//
	//	acknowledgedMessage
	//
	//  - Button on message popup pressed
	//
	/////////////////////////////////////////////////////////////////////////	
	public function acknowledgedMessage(message:Object, showMessageAgain:Boolean=false):void{
		trace(">EM> EnterpriseMessagingPlugin.acknowledgedMessage");
		
		message.acknowledged = true;
		localMessageData[message.ackKey] = new Date();
		
		//send ack message to service
		var ack:Object = new Object();
		ack.messageKey = message.ackKey;			
		ack.showMessageAgain = showMessageAgain;
		
		//create the ackknowledged event
		var event:CairngormEvent = new CairngormEvent(MessageController.CREATE_ACKNOWLEDGED);
		event.data = ack;		
		
		trace(">EM> EnterpriseMessagingPlugin.acknowledgedMessage dispatchEvent -> MessageController.CREATE_ACKNOWLEDGED");
		CairngormEventDispatcher.getInstance().dispatchEvent(event);
		
		
		
		// take one away from the count
		updateNewMessageCount();	
	}
	*/
	
}

export default EnterpriseMessagingPlugin;