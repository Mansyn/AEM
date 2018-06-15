import React from 'react'
import ReactDOM from 'react-dom'
import Frequency_Selector from './Scheduler_frequency_selector'
import FetchUserName from './FetchUNameExample'
import Checkbox from './src/Checkbox/Checkbox'
import Radio from './src/Radio/Radio'
import RadioGroup from './src/Radio/RadioGroup'
import Button from './src/Button/Button'
import Select from './src/Select/Select'
// import NumericInput from './src/Input/NumericInput'

var toggler = false;
var priority = "regular";
var currentHour = 12;
var currentMinute = 30;
var frequencySelector;

const frequencyData = [
{
    label: 'Specific Date',
    value: 'specificDate'
  },
  {
    label: 'Daily',
    value: 'daily'
  },
  {
    label: 'Weekly',
    value: 'weekly'
  },
  {
    label: 'Monthly',
    value: 'monthly'
  },
  {
    label: 'Quarterly',
    value: 'quarterly'
  },
  {
    label: 'Annually',
    value: 'annually'
  }
];


class Scheduler extends React.Component {

  // Placeholder for the schedule button
  handleScheduleButton(e) {
    document.getElementById('scheduler').style.display = 'none'
  }

  // Hide scheduler modal
  handleCancelButton(e) {
    document.getElementById('scheduler').style.display = 'none'
  }

  // Toggle priority (regular/high)
   handleRegularHigh(){
     var reg = document.getElementById('priorityRegular');
     var hig = document.getElementById('priorityHigh');
     if(hig.checked){
       priority = "high";
       reg.checked = false;
       hig.changed = false;
     }
     else{
       priority = "regular";
       hig.checked = false;
       reg.changed = false;
     }
     console.log("============================ Priority = "+priority)
   }

  // Toggle end/no end date
  handleEnableDailyEndDate(){
    var dailyEndDate = document.getElementById('schedEndRecur');
    if(dailyEndDate.disabled){
      dailyEndDate.disabled = false;
    }
    else{
      dailyEndDate.disabled = true;
    }
  }

  // Title box remaining characters length
  handleTitleBoxChange() {
    var currentLength = new String (document.getElementById('titleTextBox').value);
    var remainingLength = document.getElementById('schedTitleCharsLeft');
    var number = (150 - currentLength.length);
    remainingLength.innerHTML = number + " characters left";
  }

  // Allow only one choice (XLS or XLSX) to be checked at a time
  handleFormatChangeXLSX() {
    document.getElementById('XLSchkbx').checked = false;
  }
  handleFormatChangeXLS() {
    document.getElementById('XLSXchkbx').checked = false;
  }

  // Toggle report/alert panels
  handleReportAlertToggle(){
    var div = document.getElementById('reportalert');
    if(toggler == false){
      this.handleAlertType();
    }
    else{
      this.handleReportType();
    }
  }

  // Show report panel
  handleReportType() {
    console.log("in handleReportType");
    document.getElementById('reportContainer').className = 'sched-report-container nopad';
    document.getElementById('alertContainer').className = 'hidden';
    document.getElementById('alertTriggers').className = 'hidden';
    
    document.getElementById('reportTypeAlert').checked = false; //╔══These are necessary to allow toggling functions
    document.getElementById('reportTypeReport').changed = false;//╨
    toggler = false;
  }

  // Show alert panel
  handleAlertType() {
    console.log("in handleAlertType");
    document.getElementById('alertContainer').className = 'sched-alert-container nopad';
    document.getElementById('reportContainer').className = 'hidden';
    document.getElementById('alertTriggers').className = 'nopad';
    document.getElementById('reportTypeReport').checked = false; //╔══These are necessary to allow toggling functions
    document.getElementById('reportTypeReport').changed = false; //╨
    toggler = true;
  }
  handleQuarterly(){
    var allPanels = document.getElementsByClassName('smd-selectedOptions');
    for (var i = 0; i < allPanels.length; i++) {
      allPanels[i].className = "smd-selectedOptions hidden";
      console.log(allPanels[i]);
    }
    document.getElementById('quarterly').className = "smd-selectedOptions nopad"
  }


  setSelectValue(e){
    var val = e;
    var cal = document.getElementById('schedCalendar');
    cal.innerHTML = val
  }
  // Display selected frequency panel
  handleFrequencyChange() {
    var currentvalue = '';
    var selector = document.getElementById('selectionValue');
    var button = document.getElementsByClassName('select__text');
    var li = document.getElementsByClassName('select__option--selected');
    // var selected = selector.attributes.name
    // var sdButton = document.getElementById('buttonsd');
    // var dayButton = document.getElementById('buttonday');
    // var weekButton = document.getElementById('buttonweek');
    // var monthButton = document.getElementById('buttonmonth');
    // var qrButton = document.getElementById('buttonqr');
    // var annButton = document.getElementById('buttonann');

    if(selector == null){
      console.log("=============selector is null=====================")
    }
    else{
      console.log("=============selector is NOT null=====================")
      console.log("=====selector=====")
      console.log(selector.innerText)
      console.log("=====selector=====\n\n")
      console.log("=====selector.attributes=====")
      console.log(selector.attributes)
      console.log("=====selector.attributes=====\n\n")
      console.log("=====selector.attributes.[1]=====")
      console.log(selector.attributes[1])
      console.log("=====selector.attributes.name=====\n\n")
      // console.log("=====selected=====\n")
      // console.log(selected.val)
      // console.log("\n=====selected.value=====\n")
      // console.log(selected.value)
      // console.log("\n=====selected.toString=====\n")
      // console.log(selected.toString)
      // console.log("\n=====String(selected)=====\n")
      // console.log(String(selected))
      // console.log("\n=====li=====\n")
      // console.log(li)
    }
    // var currentVal = Select.val;
    // var cal = document.getElementById('schedCalendar');
    // cal.innerHTML = window.val
    var allPanels = document.getElementsByClassName('smd-selectedOptions');

    currentvalue = selector.innerText;

    console.log(currentvalue);

    for (var i = 0; i < allPanels.length; i++) {
      allPanels[i].className = "smd-selectedOptions hidden";
      console.log(allPanels[i]);
    }

    document.getElementById(currentvalue).className = "smd-selectedOptions nopad"
  }

  // Toggle Daily Frequency
  handleDailyFrequencyToggle(){
    var days = document.getElementById('dailyEvery');
    var weekdays = document.getElementById('dailyWeekdays');
    if(days.checked){
      document.getElementById('frequencyEveryXDays').className = "sched-days-box";
      document.getElementById('frequencyEveryXDays').disabled = false;
      days.changed = false;
      weekdays.checked = false;
    }
    else{
      document.getElementById('frequencyEveryXDays').className = "sched-days-box-disabled";
      document.getElementById('frequencyEveryXDays').disabled = true;
      weekdays.changed = false;
      days.checked = false;
    }
  }

  // Toggle weekly end/no end date
  handleWeeklyNoEndDate() {
    var weeklyEnd = document.getElementById('schedWeeklyEndRecur');
    if(weeklyEnd.disabled){
      weeklyEnd.disabled = false;
    }
    else{
      weeklyEnd.disabled = true;
    }
  }

  // Toggle monthly end/no end date
  handleMonthlyNoEndDate(){
    var monthlyEnd = document.getElementById('schedMonthlyEndRecur');
    if(monthlyEnd.disabled){
      monthlyEnd.disabled = false
    }
    else{
      monthlyEnd.disabled = true
    }
  }

  // Toggle quarterly end/no end date
  handleQuarterlyNoEndDate(){
    var quarterlyEnd = document.getElementById('schedQuarterlyEndRecur');
    if(quarterlyEnd.disabled){
      quarterlyEnd.disabled = false
    }
    else{
      quarterlyEnd.disabled = true
    }
  }

  // Toggle annual end/no end date
  handleAnnualNoEndDate(){
    this.schedAnnualEndRecur
    var annualEnd = document.getElementById('schedAnnualEndRecur');
    if(annualEnd.disabled){
      annualEnd.disabled = false
    }
    else{
      annualEnd.disabled = true
    }
  }

  // Set monthly on 'day' elements to enabled and on 'the' elements to disabled
  handleMonthlyOnDay() {
    document.getElementById('onTheNumberedValueSelect').disabled = true;
    document.getElementById('onTheDayValueSelect').disabled = true;
    document.getElementById('monthlyNumberOfMonths').disabled = true;
    document.getElementById('onDayDateValue').disabled = false;
    document.getElementById('onTheMonthValue').disabled = false;

    document.getElementById('monthlyOnTheRadio').checked = false; //╔══These are necessary to allow toggling functions
    document.getElementById('monthlyOnDayRadio').change = false;  //╨
  }

  // Set monthly on 'the' elements to endabled and on 'day' elements to disabled
  handleMonthlyOnThe() {
    document.getElementById('onTheNumberedValueSelect').disabled = false;
    document.getElementById('onTheDayValueSelect').disabled = false;
    document.getElementById('monthlyNumberOfMonths').disabled = false;
    document.getElementById('onDayDateValue').disabled = true;
    document.getElementById('onTheMonthValue').disabled = true;

    document.getElementById('monthlyOnDayRadio').checked = false; //╔══These are necessary to allow toggling functions
    document.getElementById('monthlyOnTheRadio').change = false;  //╨
  }

  // Determine quarters
  handleQuarterlyQuarters(){
    var first = document.getElementById('quarterlyFirstQuarter');
    var second = document.getElementById('quarterlySecondQuarter');
    var third = document.getElementById('quarterlyThirdQuarter');
    var fourth = document.getElementById('quarterlyFourthQuarter');
    var quarters = [];  // Clear array
    if(first.checked){
      quarters.push("first");
    }
    if(second.checked){
      quarters.push("second");
    }
    if(third.checked){
      quarters.push("third");
    }
    if(fourth.checked){
      quarters.push("fourth");
    }
    var trace = quarters;
    if(trace == ""){
      trace = "none";
    }
    console.log("Quarters Selcted: "+trace)
  }

  // Quarterly toggle function
  handleQuarterlyOnChange(){
    var quarter = document.getElementById('quarterlyOnQuarter');
    var numbered = document.getElementById('quarterlyOnNumberdDay');
    var firstBox = document.getElementById('quarterlyFirstQuarter');
    var secondBox = document.getElementById('quarterlySecondQuarter');
    var thirdBox = document.getElementById('quarterlyThirdQuarter');
    var fourthBox = document.getElementById('quarterlyFourthQuarter');
    var dayOfMonth = document.getElementById('qDayOfMonth');
    var dayOfWeek = document.getElementById('qDayOfWeek');
    var everyQuarters = document.getElementById('qQuarters');
    if(numbered.checked){
      firstBox.disabled = true;
      firstBox.checked = false;
      secondBox.disabled = true;
      secondBox.checked = false;
      thirdBox.disabled = true;
      thirdBox.checked = false;
      fourthBox.disabled = true;
      fourthBox.checked = false;
      dayOfMonth.disabled = false;
      dayOfWeek.disabled = false;
      everyQuarters.disabled = false;
      numbered.change = false;
      quarter.checked = false;
    }
    else{
      firstBox.disabled = false;
      secondBox.disabled = false;
      thirdBox.disabled = false;
      fourthBox.disabled = false;
      dayOfMonth.disabled = true;
      dayOfWeek.disabled = true;
      everyQuarters.disabled = true;
      quarter.change = false;
      numbered.checked = false;
    }
  }

  // Annual toggle function
  handleAnnualOnChange(){
    var aEvery = document.getElementById('annuallyMonth');
    var aThe = document.getElementById('annuallyThe');
    var everyMonth = document.getElementById('aMonthsSelect');
    var dayText = document.getElementById('aDaysText');
    var numbered = document.getElementById('aDayOfMonth');
    var week = document.getElementById('aDayOfWeek');
    var month = document.getElementById('aOfMonthSelect');
    if(aThe.checked){
      everyMonth.disabled = true;
      dayText.disabled = true;
      numbered.disabled = false;
      week.disabled = false;
      month.disabled = false;
      aThe.change = false;
      aEvery.checked = false;
    }
    else{
      everyMonth.disabled = false;
      dayText.disabled = false;
      numbered.disabled = true;
      week.disabled = true;
      month.disabled = true;
      aEvery.change = false;
      aThe.checked = false;
    }
  }

  // Placeholder function for progressing through prototyping phase
  fakeFunction(){
    console.log("=================this function is a placeholder=================")
  }

  render() {

    return (
      <div id="scheduler" className="sched-modal">
        <div className="sched-modal-content">
          <div className="sched-Wrapper">

            {/* Header */}
            <div className="sched-header">
              Scheduler
            </div>

            {/* Schedule Report or Alert Panel */}
            <div id="schedulerBodyContainer">
              <div className="row sched-body">

                {/* Title */}
                <div className="col-sm-12 sched-body-header">
                  SCHEDULE REPORT OR ALERT
                </div>

                {/* Left Column */}
                <div className="col-sm-4 sched-left-section">
                  <div id="leftContainer">


                    {/* Title and Priority Section*/}
                    <div className="col-sm-2">
                      <br />
                      Title:<br />
                    </div>
                    <div className="col-sm-10">
                      
                      <br />
                      <input id="titleTextBox" onChange={this.handleTitleBoxChange.bind(this)} className="sched-titleBox" type="textbox" defaultValue="Put Default Value Here"></input>
                      <br />
                      <span className="right" id="schedTitleCharsLeft"> characters left</span>
                      <br />
                    </div>
                    <div className="col-sm-2">Priority</div>
                    <div className="col-sm-10">
                      <RadioGroup
                        name="priority"
                        size="large"
                        value="regular"
                        display="inline"
                        onChange={this.handleRegularHigh}
                      >
                        <Radio id="priorityRegular" value="regular">Regular</Radio>
                        <Radio id="priorityHigh" value="high">High</Radio>
                      </RadioGroup>
                      {/*<form id="schedPriorityLevel"  className="sched-blue-text">
                        <input id="radioRegular" type="radio" name="priority" value="regular" defaultChecked />
                        <label htmlFor="radioRegular" className="sched-blue-text">&nbsp;Regular  &nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input id="radioHigh" type="radio" name="priority" value="high" />
                        <label htmlFor="radioHigh" className="sched-blue-text">&nbsp;High</label>
                      </form>*/}
                    </div>

                    {/* Notifications Section */}
                    <div className="col-sm-12">
                      <hr className="sched-hr" />
                      Notifications
                      <br />
                      Email: &nbsp;<FetchUserName />@dummyEmail.com <span id="edit" className="sched-edit-email-link">Edit</span>
                      <br />
                    </div>
                    <div className="col-sm-2"><br />CC:</div>
                    <div className="col-sm-10">
                      <br />
                      <input className="sched-cc-input" type="textarea" />
                      <Checkbox
                        listbox
                        value="example1"
                        name="example1"
                        onChange = {this.fakeFunction.bind(this)}
                      >
                         Notify me in LIMS-EV apps
                      </Checkbox>
                      <Checkbox
                        listbox
                        value="example1"
                        name="example1"
                        onChange = {this.fakeFunction.bind(this)}
                      >
                          Notify me even if there are no results
                      </Checkbox>
                      {/*<input id="inApps" type="checkbox" />
                      <label htmlFor="inApps"><span></span> Notify me in LIMS-EV apps</label>
                      <input id="noResults" type="checkbox" />
                      <label htmlFor="noResults"><span></span> Notify me even if there are no results</label>*/}
                    </div>
                    <div className="col-sm-12">
                      <hr className="sched-hr" />
                    </div>

                    {/* Download Formats Section */}
                    <div className="col-sm-5">
                      Download Formats:
                    </div>
                    <div className=" col-sm-7">
                      <Checkbox
                        id="XLSXchkbx"
                        checked
                        listbox
                        value="example1"
                        name="example1"
                        onChange = {this.handleFormatChangeXLSX}
                      >
                           XLSX
                      </Checkbox><br />
                      <Checkbox
                        id="XLSchkbx"
                        listbox
                        value="example1"
                        name="example1"
                        onChange = {this.handleFormatChangeXLS}
                      >
                           XLS
                      </Checkbox>
                      {/*<input onClick={this.handleFormatChangeXLSX} type="checkbox" name="formats" value="XLSX" id="XLSXchkbx" defaultChecked />
                      <label htmlFor="XLSXchkbx"><span></span> XLSX</label><br />
                      <input onClick={this.handleFormatChangeXLS} type="checkbox" name="formats" value="XLS" id="XLSchkbx" />
                      <label htmlFor="XLSchkbx"><span></span> XLS</label>*/}
                      <img onLoad={this.handleTitleBoxChange.bind(this)} src="../app/img/pixel.png" />
                    </div>
                  </div>
                </div>
                {/* End Left Column */}

                {/* Right Column */}
                <div className="col-sm-8 sched-right-section">

                  {/* Type Section */}
                  <div>
                    <br />
                    <RadioGroup
                        id = "typeOfReport"
                        name="reportalert"
                        value="report"
                        size="large"
                        display="inline"
                        onChange={this.handleReportAlertToggle.bind(this)}
                      > 
                        <Radio id="reportTypeReport" value="report">Report</Radio>
                        <Radio id="reportTypeAlert" value="alert">Alert</Radio>
                      </RadioGroup>
                  </div>
                  <div><hr className="sched-hr" /></div>

                  {/* Start Report Container/Section */}
                  <div id="reportContainer" className="sched-report-container nopad">
                    <div className="row">

                      {/* Start Frequency Section */}
                      <div className="col-sm-3 sched-first-right-div">
                          Frequency:
                          {/*<select id="frequencySelector" onChange={this.handleFrequencyChange}>
                            <option name="SpecificDate" value="specificDate">Specific Date</option>
                            <option name="Daily" value="daily">Daily</option>
                            <option name="Weekly" value="weekly">Weekly</option>
                            <option name="Monthly" value="monthly">Monthly</option>
                            <option name="Quarterly" value="quarterly">Quarterly</option>
                            <option name="Annually" value="annually">Annually</option>
                          </select>*/}

                           <Select id="frequencySelector" value="specificDate" name="frequencySelector" options={frequencyData} onChange={this.handleFrequencyChange}/>
                           <div id="selectionValue" className="hidden">specificDate</div>
                      </div>

                      {/* Start Frequency-SpecificDate Section */}
                      <div id="specificDate" className="smd-selectedOptions nopad">
                        <div className=" col-sm-9 nopad">
                          <span className="floatLeft">on </span>
                          <div id="schedCalendar" className="calendarPlaceHolder">Calendar Placeholder</div>
                        </div>
                        <br />
                        <div className="col-sm-12">
                          <br />
                          <span className="inline">
                            <div className="sched-time-holder">
                              Time (Hours/Minutes GMT):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <input className="sched-time-picker" type="number" />
                              <input className="sched-time-picker" type="number" />
                            </div>
                            {/*<div className="timePickerPlaceholder nopad">TimePicker Placeholder</div>*/}
                          </span>
                        </div>
                        <div className="col-sm-12">
                          <hr className="sched-hr" />
                        </div>
                      </div>

                      {/* Start Freqency-Daily Section */}
                      <div id="daily" className="smd-selectedOptions hidden">
                        <div className=" col-sm-9 nopad">
                          <RadioGroup
                            name="dailyRadio"
                            size="medium"
                            value="weekdays"
                            display="inline"
                            onChange={this.handleDailyFrequencyToggle}
                          >
                            <Radio id="dailyEvery" value="every"><span className="sched-black-text">Every</span><input className="sched-days-box-disabled" id="frequencyEveryXDays" type="textbox" defaultValue="1" disabled/><span className="sched-black-text"> Days(s) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></Radio>
                            <Radio id="dailyWeekdays" value="weekdays"><span className="sched-black-text">Weekdays</span></Radio>
                          </RadioGroup>
                          {/*<form>
                            <input type="radio" id="dailyEveryRadio" name="everyORweekday" value="every" onClick={this.} />
                            <label htmlFor="dailyEveryRadio">Every </label>
                            <input className="sched-days-box-disabled" id="frequencyEveryXDays" type="textbox" defaultValue="1" disabled/> Days(s) &nbsp;
                            <input type="radio" id="dailyWeekdaysRadio" name="everyORweekday" value="weekdays" onClick={this.handleWeekdays} defaultChecked />
                            <label htmlFor="dailyWeekdaysRadio"> Weekdays</label>
                          </form>*/}
                          <br />
                        </div>
                        <div className = "col-sm-12">
                          <form>
                            Recurrence &nbsp;
                            <input type="date" id="schedStartRecur" defaultValue="12/30/2017" /> <input disabled type="date" id="schedEndRecur" defaultValue="01/15/2018" />
                            &nbsp;
                            <Checkbox
                              listbox
                              checked
                              value="example1"
                              name="example1"
                              onChange = {this.handleEnableDailyEndDate}
                            >
                                No End Date
                            </Checkbox>
                            {/*<input id="dailyNoEndDate" type="checkbox" defaultChecked />
                            <label htmlFor="dailyNoEndDate"><span></span> No End Date</label>*/}
                          </form>
                        </div>
                        <div className = "col-sm-12 dailyBottomDiv">
                          <form>
                            Time (Hours/Minutes GMT): &nbsp;
                            <input type="textbox" className="timeBox" defaultValue="18" />
                            <label><img src="./app/img/upDown.png" className="img-responsive tempScroller" width="14px"/></label>
                            <input type="textbox" className="timeBox" defaultValue="9"/>
                            <label><img src="./app/img/upDown.png" className="img-responsive tempScroller" width="14px"/></label>
                          </form>
                          <br />
                        </div>
                        <div className="col-sm-12">
                          <hr className="sched-hr" />
                        </div>
                      </div>

                      {/* Start Frequency-Weekly Section */}
                      <div id="weekly" className="smd-selectedOptions hidden">
                        <div className="col-sm-9 nopad">
                          <div>
                            Every
                            <input className="sched-days-box" id="frequencyEveryXDays" type="textbox" defaultValue="1"/> Weeks(s) on&nbsp;&nbsp;&nbsp;&nbsp;
                            
                            <Checkbox
                              listbox
                              value="example1"
                              name="example1"
                              onChange = {this.fakeFunction}
                            >
                                M
                            </Checkbox>
                            &nbsp;&nbsp;
                            <Checkbox
                              listbox
                              value="example1"
                              name="example1"
                              onChange = {this.fakeFunction}
                            >
                                T
                            </Checkbox>
                            &nbsp;&nbsp;
                            <Checkbox
                              listbox
                              value="example1"
                              name="example1"
                              onChange = {this.fakeFunction}
                            >
                                W
                            </Checkbox>
                            &nbsp;&nbsp;
                            <Checkbox
                              listbox
                              value="example1"
                              name="example1"
                              onChange = {this.fakeFunction}
                            >
                                Th
                            </Checkbox>
                            &nbsp;&nbsp;
                            <Checkbox
                              listbox
                              value="example1"
                              name="example1"
                              onChange = {this.fakeFunction}
                            >
                                F
                            </Checkbox>
                            &nbsp;&nbsp;
                            <Checkbox
                              listbox
                              value="example1"
                              name="example1"
                              onChange = {this.fakeFunction}
                            >
                                S
                            </Checkbox>
                            &nbsp;&nbsp;
                            <Checkbox
                              listbox
                              value="example1"
                              name="example1"
                              onChange = {this.fakeFunction}
                            >
                                Su
                            </Checkbox>
                            {/*<input id="WeeklyMChkBx" type="checkbox" />
                            <label htmlFor="WeeklyMChkBx"><span></span><strong>M</strong> &nbsp;</label>
                            <input id="WeeklyTChkBx" type="checkbox" />
                            <label htmlFor="WeeklyTChkBx"><span></span><strong>T</strong> &nbsp;</label>
                            <input id="WeeklyWChkBx" type="checkbox" />
                            <label htmlFor="WeeklyWChkBx"><span></span><strong>W</strong> &nbsp;</label>
                            <input id="WeeklyThChkBx" type="checkbox" />
                            <label htmlFor="WeeklyThChkBx"><span></span><strong>Th</strong> &nbsp;</label>
                            <input id="WeeklyFChkBx" type="checkbox" />
                            <label htmlFor="WeeklyFChkBx"><span></span><strong>F</strong> &nbsp;</label>
                            <input id="WeeklySChkBx" type="checkbox" />
                            <label htmlFor="WeeklySChkBx"><span></span><strong>S</strong> &nbsp;</label>
                            <input id="WeeklySuChkBx" type="checkbox" />
                            <label htmlFor="WeeklySuChkBx"><span></span><strong>Su</strong> &nbsp;</label>*/}
                          </div>
                          <br />
                        </div>
                        <div className = "col-sm-12">
                          <form>
                            Recurrence &nbsp;
                            <input type="date" id="schedStartRecur" defaultValue="12/30/2017" /> <input type="date" id="schedWeeklyEndRecur" disabled defaultValue="01/15/2018" />
                            &nbsp;
                            <Checkbox
                              listbox
                              checked
                              value="example1"
                              name="example1"
                              onChange = {this.handleWeeklyNoEndDate.bind(this)}
                            >
                                No End Date
                            </Checkbox>
                            {/*<input id="weeklyNoEndDate" type="checkbox" defaultChecked />
                            <label htmlFor="weeklyNoEndDate"><span></span> No End Date</label>*/}
                          </form>
                        </div>
                        <div className = "col-sm-12 dailyBottomDiv">
                          <form>
                            Time (Hours/Minutes GMT): &nbsp;
                            <input type="textbox" className="timeBox" defaultValue="18" />
                            <label><img src="./app/img/upDown.png" className="img-responsive tempScroller" width="14px"/></label>
                            <input type="textbox" className="timeBox" defaultValue="9"/>
                            <label><img src="./app/img/upDown.png" className="img-responsive tempScroller" width="14px"/></label>
                          </form>
                          <br />
                        </div>
                        <div className="col-sm-12">
                          <hr className="sched-hr" />
                        </div>
                      </div>

                      {/* Start Frequency-monthly Section */}
                      <div id="monthly" className="smd-selectedOptions hidden">
                        <div className=" col-sm-9 nopad">
                          <form>
                            <Radio id="monthlyOnDayRadio" value="onDay" name="monthlyOn" checked onChange={this.handleMonthlyOnDay}>
                            <span className="sched-black-text">Day &nbsp;</span>
                            </Radio>
                            <input id="onDayDateValue" type="textBox" className="sched-days-box" defaultValue="14" /> of every &nbsp;
                            <input id="onTheMonthValue" type="textBox" className="sched-days-box" defaultValue="1" /> Month(s)
                            <br />
                            <Radio id="monthlyOnTheRadio" value="onThe" name="monthlyOn" onChange={this.handleMonthlyOnThe}>
                            <span className="sched-black-text">The &nbsp;</span>
                            </Radio>
                            <select id="onTheNumberedValueSelect" className="dayOfMonthPlaceholder" disabled>
                              <option name="numbered" value="first">First</option>
                              <option name="numbered" value="second">Second</option>
                              <option name="numbered" value="third">Third</option>
                              <option name="numbered" value="fourth">Fourth</option>
                              <option name="numbered" value="last">Last</option>
                            </select>&nbsp;
                            <select id="onTheDayValueSelect" className="dayOfMonthPlaceholder" disabled>
                              <option name="dayValue" value="day">Day</option>
                              <option name="dayValue" value="monday">Monday</option>
                              <option name="dayValue" value="tuesday">Tuesday</option>
                              <option name="dayValue" value="wednesday">Wednesday</option>
                              <option name="dayValue" value="thursday">Thursday</option>
                              <option name="dayValue" value="friday">Friday</option>
                              <option name="dayValue" value="saturday">Saturday</option>
                              <option name="dayValue" value="sunday">Sunday</option>
                            </select>
                            &nbsp; of every &nbsp;
                            <input id="monthlyNumberOfMonths" disabled type="textbox" className="sched-days-box" defaultValue="1" /> Month(s)
                          </form>
                          <br />
                        </div>
                        <div className = "col-sm-12">
                          <form>
                            Recurrence &nbsp;
                            <input type="date" id="schedStartRecur" defaultValue="12/30/2017" /> <input disabled type="date" id="schedMonthlyEndRecur" defaultValue="01/15/2018" />
                            &nbsp;
                            <Checkbox
                              listbox
                              checked
                              value="example1"
                              name="example1"
                              onChange = {this.handleMonthlyNoEndDate.bind(this)}
                            >
                                No End Date
                            </Checkbox>
                            {/*<input id="monthlyNoEndDate" type="checkbox" defaultChecked />
                            <label htmlFor="monthlyNoEndDate"><span></span> No End Date</label>*/}
                          </form>
                        </div>
                        <div className = "col-sm-12 dailyBottomDiv">
                          <form>
                            Time (Hours/Minutes GMT): &nbsp;
                            <input type="textbox" className="timeBox" defaultValue="18" />
                            <label><img src="./app/img/upDown.png" className="img-responsive tempScroller" width="14px"/></label>
                            <input type="textbox" className="timeBox" defaultValue="9"/>
                            <label><img src="./app/img/upDown.png" className="img-responsive tempScroller" width="14px"/></label>
                          </form>
                          <br />
                        </div>
                        <div className="col-sm-12">
                          <hr className="sched-hr" />
                        </div>
                      </div>

                      {/* Start Frequency-Quarterly Section */}
                      <div id="quarterly" className="smd-selectedOptions hidden">
                        <div className=" col-sm-9 nopad">
                          <form>
                            <Radio id="quarterlyOnQuarter" value="qEvery" name="onDay" type="radio" onChange={this.handleQuarterlyOnChange} checked>
                            <span className="sched-black-text">Every &nbsp;</span></Radio>
                            <Checkbox listbox value="1st" name="qFirst" onChange={this.handleQuarterlyQuarters} id="quarterlyFirstQuarter" type="checkbox">
                            <span className="sched-black-text">1st &nbsp;</span></Checkbox>
                            <Checkbox listbox value="2nd" name="qSecond"onChange={this.handleQuarterlyQuarters} id="quarterlySecondQuarter" type="checkbox">
                            <span className="sched-black-text">2nd &nbsp;</span></Checkbox>
                            <Checkbox listbox value="3rd" name="qThird" onChange={this.handleQuarterlyQuarters} id="quarterlyThirdQuarter" type="checkbox">
                            <span className="sched-black-text">3rd &nbsp;</span></Checkbox>
                            <Checkbox listbox value="4th" name="qFourth" onChange={this.handleQuarterlyQuarters} id="quarterlyFourthQuarter" type="checkbox">
                            <span className="sched-black-text">4th &nbsp;&nbsp; </span></Checkbox>
                            Quarter(s)
                            <br />
                            <Radio id="quarterlyOnNumberdDay" value="qNumbered" name="onDay" type="radio" onChange={this.handleQuarterlyOnChange}>
                              <span className="sched-black-text"> The &nbsp;</span></Radio>
                            <select id="qDayOfMonth" className="dayOfMonthPlaceholder" disabled>
                              <option name="numbered" value="first">First</option>
                              <option name="numbered" value="second">Second</option>
                              <option name="numbered" value="third">Third</option>
                              <option name="numbered" value="fourth">Fourth</option>
                              <option name="numbered" value="last">Last</option>
                            </select>&nbsp;
                            <select id="qDayOfWeek" className="dayOfMonthPlaceholder" disabled>
                              <option name="dayValue" value="day">Day</option>
                              <option name="dayValue" value="monday">Monday</option>
                              <option name="dayValue" value="tuesday">Tuesday</option>
                              <option name="dayValue" value="wednesday">Wednesday</option>
                              <option name="dayValue" value="thursday">Thursday</option>
                              <option name="dayValue" value="friday">Friday</option>
                              <option name="dayValue" value="saturday">Saturday</option>
                              <option name="dayValue" value="sunday">Sunday</option>
                            </select>
                            &nbsp; of every &nbsp;
                            <input id="qQuarters" type="textbox" className="sched-days-box" defaultValue="1" /> Quarter(s)
                          </form>
                          <br />
                        </div>
                        <div className = "col-sm-12">
                          <form>
                            Recurrence &nbsp;
                            <input type="date" id="schedStartRecur" defaultValue="12/30/2017" /> <input disabled type="date" id="schedQuarterlyEndRecur" defaultValue="01/15/2018" />
                            &nbsp;
                            <Checkbox name="qNoEndDate" value="noEnd" listbox onChange={this.handleQuarterlyNoEndDate} type="checkbox" checked>
                            <span className="sched-black-text">No End Date</span></Checkbox>
                          </form>
                        </div>
                        <div className = "col-sm-12 dailyBottomDiv">
                          <form>
                            Time (Hours/Minutes GMT): &nbsp;
                            <input type="textbox" className="timeBox" defaultValue="18" />
                            <label><img src="./app/img/upDown.png" className="img-responsive tempScroller" width="14px"/></label>
                            <input type="textbox" className="timeBox" defaultValue="9"/>
                            <label><img src="./app/img/upDown.png" className="img-responsive tempScroller" width="14px"/></label>
                          </form>
                          <br />
                        </div>
                        <div className="col-sm-12">
                          <hr className="sched-hr" />
                        </div>
                      </div>

                      {/* Start Frequency-Annually Section */}
                      <div id="annually" className="smd-selectedOptions hidden ">
                          <div className=" col-sm-9 nopad">
                          <form>
                            <Radio id="annuallyMonth" value="every" name="onDay" type="radio" onChange={this.handleAnnualOnChange} checked>
                            <span className = "sched-black-text">Every &nbsp;</span></Radio>
                            <select id="aMonthsSelect" className="months">
                              <option value='Janaury'>Janaury</option>
                              <option value='February'>February</option>
                              <option value='March'>March</option>
                              <option value='April'>April</option>
                              <option value='May'>May</option>
                              <option value='June'>June</option>
                              <option value='July'>July</option>
                              <option value='August'>August</option>
                              <option value='September'>September</option>
                              <option value='October'>October</option>
                              <option value='November'>November</option>
                              <option value='December'>December</option>
                            </select>&nbsp;
                            <input id="aDaysText" type="textbox" className="sched-days-box" defaultValue="14" />
                            <br />
                            <Radio id="annuallyThe" value="the" name="onDay" type="radio" onChange={this.handleAnnualOnChange}>
                            <span className="sched-black-text"> The &nbsp;</span></Radio>
                            <select id="aDayOfMonth" className="dayOfMonthPlaceholder" disabled>
                              <option name="numbered" value="first">First</option>
                              <option name="numbered" value="second">Second</option>
                              <option name="numbered" value="third">Third</option>
                              <option name="numbered" value="fourth">Fourth</option>
                              <option name="numbered" value="last">Last</option>
                            </select>&nbsp;
                            <select id="aDayOfWeek" className="dayOfMonthPlaceholder" disabled>
                              <option name="dayValue" value="day">Day</option>
                              <option name="dayValue" value="monday">Monday</option>
                              <option name="dayValue" value="tuesday">Tuesday</option>
                              <option name="dayValue" value="wednesday">Wednesday</option>
                              <option name="dayValue" value="thursday">Thursday</option>
                              <option name="dayValue" value="friday">Friday</option>
                              <option name="dayValue" value="saturday">Saturday</option>
                              <option name="dayValue" value="sunday">Sunday</option>
                            </select>
                            &nbsp; of &nbsp;
                            <select id="aOfMonthSelect" className="months2" disabled>
                              <option defaultValue value='Janaury'>Janaury</option>
                              <option value='February'>February</option>
                              <option value='March'>March</option>
                              <option value='April'>April</option>
                              <option value='May'>May</option>
                              <option value='June'>June</option>
                              <option value='July'>July</option>
                              <option value='August'>August</option>
                              <option value='September'>September</option>
                              <option value='October'>October</option>
                              <option value='November'>November</option>
                              <option value='December'>December</option>
                            </select>&nbsp;
                          </form>
                          <br />
                        </div>
                        <div className = "col-sm-12">
                          <form>
                            Recurrence &nbsp;
                            <input type="date" id="schedStartRecur" defaultValue="12/30/2017" /> <input type="date" id="schedAnnualEndRecur" defaultValue="01/15/2018" disabled />
                            &nbsp;
                            <Checkbox listbox name="annualNoEnd" value="aNoEnd" id="annuallyNoEndDate" type="checkbox" checked onChange={this.handleAnnualNoEndDate}>
                            <span className="sched-black-text">No End Date</span></Checkbox>
                          </form>
                        </div>
                        <div className = "col-sm-12 dailyBottomDiv">
                          <form>
                            Time (Hours/Minutes GMT): &nbsp;
                            <input type="textbox" className="timeBox" defaultValue="18" />
                            <label><img src="./app/img/upDown.png" className="img-responsive tempScroller" width="14px"/></label>
                            <input type="textbox" className="timeBox" defaultValue="9"/>
                            <label><img src="./app/img/upDown.png" className="img-responsive tempScroller" width="14px"/></label>
                          </form>
                          <br />
                        </div>
                        <div className="col-sm-12">
                          <hr className="sched-hr" />
                        </div>
                      </div>

                    </div>
                  </div> {/* End Frequency Section */}

                  {/* Start Alert Container/Section */}
                  <div id="alertContainer" className="sched-alert-container hidden">
                    <div className="row sched-recurrence-container">
                      <div className="col-sm-2"> Recurrence: </div>
                      
                      <div className="col-sm-2 timePickerPlaceholder nopad"><input className="timePickerPlaceholder" type="number" /></div>
                      <div className="col-sm-2 timePickerPlaceholder nopad"><input className="timePickerPlaceholder" type="number" /></div>
                      <div className="col-sm-5">
                        <input id="recurrenceNoEndDate" type="checkbox" defaultChecked />
                        <label htmlFor="recurrenceNoEndDate"><span></span> No End Date</label>
                      </div>
                      <div className="sched-recurrence-spacer" />
                      <div className="col-sm-12">
                        <hr className="sched-hr" />
                      </div>
                    </div>
                  </div>

                  <div className="sched-alert-triggers">
                    <div id="alertTriggers" className="sched-alert-trigger-container row nopad hidden">
                      Alert Triggers<br />
                      <Button theme="tertiary" onClick={this.fakeFunction.bind(this)} className="sched-Add-Triggers-btn">Add</Button>
                    </div>
                    <span className="sched-note">
                      Note: Your report will be delivered based on the time increment and the parameters/filters you selected
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/*Save Close*/}
            <div className="sched-header-spacer" />
            <div className="sched-saveClose">
              {/*<button onClick={this.handleScheduleButton.bind(this)}>Schedule Report</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={this.handleCancelButton.bind(this)}>Cancel</button>*/}
              <Button className="sched-Cancel-btn" onClick={this.handleCancelButton.bind(this)}>Cancel</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button theme="tertiary" className="sched-ScheduleReport-btn" onClick={this.handleScheduleButton.bind(this)}>Schedule Report</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Scheduler;	