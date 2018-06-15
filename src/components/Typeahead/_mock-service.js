// Example of null response
export const nullData = [];

// Simple response data - ALL repsonses are expected to have `value` and `displayValue`...
export const basicData = [
  {
    value: 'opt1',
    displayValue: 'Option 1'
  },
  {
    value: 'opt2',
    displayValue: 'Option 2'
  },
  {
    value: 'opt3',
    displayValue: 'Option 3'
  },
  {
    value: 'opt4',
    displayValue: 'Option 4'
  },
  {
    value: 'opt5',
    displayValue: 'Option 5'
  },
  {
    value: 'opt6',
    displayValue: 'Option 6'
  },
  {
    value: 'opt7',
    displayValue: 'Option 7'
  },
  {
    value: 'opt8',
    displayValue: 'Option 8'
  },
  {
    value: 'opt9',
    displayValue: 'Option 9'
  },
  {
    value: 'opt10',
    displayValue: 'Option 10'
  }
];

// This is a shell that illustrates what I was thinking about for the SEV JSON.
// Since this whole file is going to be removed at some point I was thinking I would
// leave this here for now...
const typeaheadResults = [
  {
    value: '',
    displayValue: {
      value: '',
      details: '',
      tooltip: {
        details: ''
      }
    }
  },
  {
    value: '',
    displayValue: {
      value: '',
      details: '',
      tooltip: {
        details: ''
      }
    }
  }
];

// Delay function - to allow us to emulate "loading"
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Mock API function
export const makeApiCall = endpoint => delay(2000).then(
  () => {
    switch (endpoint) {
      case 'nullData':
        return nullData;

      case 'typeaheadResults':
        return typeaheadResults;

      case 'basicData':
      default:
        return basicData;
    }
  }
);
