import React from 'react'
import ReactDOM from 'react-dom'

class Frequency_Selector extends React.Component {

  
  handleFreqSpecificDate() {
    document.getElementById('specificDate').className = 'row nopad';
    document.getElementById('daily').className = 'hidden';
    document.getElementById('weekly').className = 'hidden';
    document.getElementById('monthly').className = 'hidden';
    document.getElementById('quarterly').className = 'hidden';
    document.getElementById('annually').className = 'hidden';
  }
  handleFreqDaily() {
    document.getElementById('specificDate').className = 'hidden';
    document.getElementById('daily').className = 'row nopad';
    document.getElementById('weekly').className = 'hidden';
    document.getElementById('monthly').className = 'hidden';
    document.getElementById('quarterly').className = 'hidden';
    document.getElementById('annually').className = 'hidden';
  }
  handleFreqWeekly() {
    document.getElementById('specificDate').className = 'hidden';
    document.getElementById('daily').className = 'hidden';
    document.getElementById('weekly').className = 'row nopad';
    document.getElementById('monthly').className = 'hidden';
    document.getElementById('quarterly').className = 'hidden';
    document.getElementById('annually').className = 'hidden';
  }
  handleFreqMonthly() {
    document.getElementById('specificDate').className = 'hidden';
    document.getElementById('daily').className = 'hidden';
    document.getElementById('weekly').className = 'hidden';
    document.getElementById('monthly').className = 'row nopad';
    document.getElementById('quarterly').className = 'hidden';
    document.getElementById('annually').className = 'hidden';
  }
  handleFreqQuarterly() {
    document.getElementById('specificDate').className = 'hidden';
    document.getElementById('daily').className = 'hidden';
    document.getElementById('weekly').className = 'hidden';
    document.getElementById('monthly').className = 'hidden';
    document.getElementById('quarterly').className = 'row nopad';
    document.getElementById('annually').className = 'hidden';
  }
  handleFreqAnnually() {
    document.getElementById('specificDate').className = 'hidden';
    document.getElementById('daily').className = 'hidden';
    document.getElementById('weekly').className = 'hidden';
    document.getElementById('monthly').className = 'hidden';
    document.getElementById('quarterly').className = 'hidden';
    document.getElementById('annually').className = 'row nopad';
  }

// move this back so we only have one frequency selector

  handleFrequencyChange() {
    var currentvalue = '';
    var selector = document.getElementById('frequencySelector');
    var allPanels =  document.getElementsByClassName('smd-selectedOptions');
    
    currentvalue = selector.options[selector.selectedIndex].value;

    console.log(currentvalue);

    for(var i = 0; i < allPanels.length; i++) {
      allPanels[i].className = "smd-selectedOptions hidden";
      console.log(allPanels[i]);
    }

    document.getElementById(currentvalue).className = "row smd-selectedOptions nopad"
  }

  render() {
    return (

      <div>
        <select id="frequencySelector" onChange={this.handleFrequencyChange}>
          <option name="SpecificDate" value="specificDate">Specific Date</option>
          <option name="Daily" value="daily">Daily</option>
          <option name="Weekly" value="weekly">Weekly</option>
          <option name="Monthly" value="monthly">Monthly</option>
          <option name="Quarterly" value="quarterly">Quarterly</option>
          <option name="Annually" value="annually">Annually</option>
        </select>
      </div>
    );
  }
}

module.exports = Frequency_Selector;