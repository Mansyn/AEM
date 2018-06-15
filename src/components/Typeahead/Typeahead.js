// React
import React, { Component } from 'react';
// Utils
import PropTypes from 'prop-types';
import classNames from 'classnames';
// this will be replaced w/ Axios or some Core Util for Async
import { makeApiCall } from './_mock-service';
// Components
import { TextInput } from '../';
// SCSS
import '../Input/text-input.scss';
import './typeahead.scss';


/**
 *  Typeahead
 *
 *  This is the base level core typeahead component.
 *
 *  @param {object} props
 *    @property {bool}    [customTheme=false]     - This flag allows `<TextInput />` to be swapped
 *                                                  for an `<input type="text" />`. The reason for
 *                                                  this being that customTheme allows the
 *                                                  parent component using this component to
 *                                                  change the aesthetic of the input.
 *    @property {string}  [initialValue='']       - Optionally set a value to prefill the typeahead
 *                                                  field.
 *    @property {number}  [minChars=3]            - An integer representing the minimum number of
 *                                                  characters that need to be entered before a
 *                                                  query is run on the input's value
 *    @property {string}  [noResultsMessage=null] - A custom message to show when no results are
 *                                                  found/returned.
 *    @property {number}  [numResults=5]          - An integer representing the number of results
 *                                                  that should be shown in the dropdown menu.
 *    @property {func}    [onFocus=null]          - This function will be called when the
 *                                                  components input is focused on.
 *    @property {func}    onOptionSelected        - This function is called when a value has been
 *                                                  selected (by click or hitting "enter") to allow
 *                                                  the change to bubble up or affect global state.
 *    @property {string}  [placeholder='']        - This is the text that will be seen as the
 *                                                  input's `placeholder` text.
 *    @property {number}  [queryDelay=500]        - This integer represents the time in
 *                                                  milliseconds that should be waited between the
 *                                                  last keypress and firing off the a query for
 *                                                  results based off of the user's entry.
 *    @property {func}    [renderMenuItem=null]   - This function is intended to allow for custom
 *                                                  menu list item rendering.
 */
class Typeahead extends Component {
  // --------------------------------------------
  // Constructor
  // --------------------------------------------
  constructor(props) {
    super(props);

    // Local props/variables
    // track the typed value _independent of state
    this.value = null;
    // since the request for results is Promise based, this flag allows use to prevent a request
    // from updating the UI
    this.blockRequest = false;
    // track if the window Event Listener is bound for the "click off" behavior
    this.windowIsListening = false;
    // track the time out to allow for clearing timeout later
    this.typingTimeout = null;
    // the lowest number of characters needed before a request for results is fired off
    this.minChars = this.props.minChars;
    // how long to defer query between key presses - offers enhanced performance.
    this.queryDelay = this.props.queryDelay;


    // Initiate the Typeahead's state
    this.state = this.getInitialState();
    // Text string in the input
    this.state.value = this.props.initialValue;

    // Alter `this` pointer to reference the react class
    this.onClickOutside = this.onClickOutside.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onKeydown = this._onKeydown.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onMouseOver = this._onMouseOver.bind(this);
    this._onComponentMouseDown = this._onComponentMouseDown.bind(this);
    this._onComponentMouseUp = this._onComponentMouseUp.bind(this);
  }


  // --------------------------------------------
  // HELPER FUNCTIONS
  // --------------------------------------------
  /*
   *  getInitialState
   *
   *  This function stores the initial state "settings" for the Typeahead component.
   *  The idea here is that there will be lots of times that we need to reset state
   *  or portions of it, so this makes that easer to do.
   *
   *  @return {obj} an object of settings
   */
  getInitialState() {
    return {
      // The "selected" index within the menu/result data (uses indexOf pattern)
      activeIndex: -1,
      // The "selected" object within the menu/result data
      activeResultObject: null,
      // Loading indicator flag
      isLoading: false,
      // Most recent data set
      results: null,
      // Menu Flag
      showMenu: false
    };
  }

  /*
   *  onClickOutside
   *
   *  This function is called when a click is experienced "outside" of the component
   *  and will trigger the menu to close. The class' `internalClick` property is meant to
   *  protect against internal clicks being considered "clicking off".
   */
  onClickOutside() {
    // If the click is "internal" (within the component) it is not really a "click off"...
    if (this.internalClick) return;

    this.setState({
      showMenu: false,
      isLoading: false
    });

    // prevent any placed requests from revealing the menu
    this.blockRequest = true;

    // remove the window events
    this.windowRemoveEventListener();
  }

  /*
   *  getCleanValue
   *
   *  This function strips out leading spaces and converts one or more of any space characters
   *  into a single space.
   *
   *  @param {string} [value=state.value] - a string to clean, defaults to value in state...
   *  @return {string} a string with the unwanted spaces cleared out
   */
  getCleanValue(value = false) {
    const val = value !== false ? value : this.state.value;

    return val.replace(/^\s*/, '')
              .replace(/\s+/g, ' ');
  }

  /*
   *  selectValue
   *
   *  This function is fired when a selection is made (either by click or hitting "enter"). It
   *  will fire off the `onOptionSelected` prop which should return a boolean to indicate if the
   *  field's value should be reset/cleared after selection.
   *
   *  @param {int|bool} [index=false] a reference to an index from the `results` in state
   */
  selectValue(index = false) {
    let newState = {};
    // Result to be added to the state
    const result = index === false ? this.state.activeResultObject : this.state.results[index];

    // Fire off the `onOptionSelected` prop & store returned value
    this.props.onOptionSelected(
      result.value,
      result
    );
    // reset initial state
    newState = this.getInitialState();
    // clear out the  value
    newState.value = '';

    // Close the menu
    newState.showMenu = false;

    // Update state
    this.setState(newState);

    // Remove "click off" event listener
    this.windowRemoveEventListener();
  }

  /*
   *  fetchResults
   *
   *  This function creates the request for new data based off of a passed string. The function
   *  uses a Promise to request the data (`makeApiCall`)  and then pass the data to the
   *  `_onResultsFetched` method.
   *
   *  @todo remove mock-service `makeApiCall` and implement Redux
   *
   *  @param {string} val - a string to clean, defaults to value in state...
   *  @return {string} a string with the unwanted spaces cleared out
   */
  fetchResults(val) {
    // Enable loading indicator
    this.setState({ isLoading: true });

    // Make a call to our fake API
    new Promise((resolve) => {
      resolve(makeApiCall(this.props.endpoint));
    }).then((data) => {
      this._onResultsFetched(data, val);
    });
  }

  /*
   *  windowAddEventListener
   *
   *  This function is used to *add* the component's event listeners to the Window
   *  (for the click off behavior)
   */
  windowAddEventListener() {
    if (!this.windowIsListening) {
      this.internalClick = false;
      this.windowIsListening = true;
      window.addEventListener('mousedown', this.onClickOutside, false);
      window.addEventListener('mouseup', this._onComponentMouseUp, false);
    }
  }

  /*
   *  windowRemoveEventListener
   *
   *  This function is used to *remove* the component's event listeners to the Window
   *  (for the click off behavior)
   */
  windowRemoveEventListener() {
    if (this.windowIsListening) {
      this.windowIsListening = false;
      window.removeEventListener('mousedown', this.onClickOutside, false);
      window.removeEventListener('mouseup', this._onComponentMouseUp, false);
    }
  }

  /*
   *  _onResultsFetched
   *
   *  This function should be called by a successful AJAX request for the query's results.
   *
   *  @param {array} data - an array of result objects.
   *  @param {string} val - a required string representing the value that was queried for
   */
  _onResultsFetched(data, val) {
    // make sure that the value has not changed since the Promise was initially set...
    if (this.value !== val) return;

    const cleanValue = this.getCleanValue(val);
    const newState = this.getInitialState();

    // Check if a bad value some how got through and shut it down!
    if (val.length < this.minChars || !cleanValue) {
      newState.showMenu = false;
      newState.isLoading = false;

      // Remove "click off" event listener
      this.windowRemoveEventListener();
    }
    // Since it is a good value, update state with new JSON
    else {
      // Set activeIndex (to the first one...)
      newState.activeIndex = 0;
      // Set the active result item to the first item in the results array
      newState.activeResultObject = data[0];
      // Store the data to state
      newState.results = data;
      // Show the menu
      if (!this.blockRequest) newState.showMenu = true;

      // Add event listener to Window Object
      this.windowAddEventListener();
    }

    // Update the state
    this.setState(newState);
  }


  // --------------------------------------------
  // EVENTS
  // --------------------------------------------
  /*
   *  _onClick
   *
   *  This is a click handler that will be called when a menu item is clicked. This behavior
   *  is _very_ similar to the "enter" functionality.
   *
   *  @param {event object} e - synthetic React event
   */
  _onClick(e) {
    const val = parseInt(e.currentTarget.value, 10);

    // prevent button's default action
    e.preventDefault();

    // update state with the new index.
    this.selectValue(val);
  }

  /*
   *  _onMouseOver
   *
   *  This function handles the React `onMouseOver` event and will update sate with the correct
   *  active index when user mouses over one of the `button`s.
   */
  _onMouseOver(e) {
    // Update state with activeIndex from element being hovered over
    this.setState({ activeIndex: parseInt(e.currentTarget.value, 10) });
  }

  /*
   *  _onComponentMouseDown
   *
   *  This function handles the React `onMouseDown` event for the entire component. This is to
   *  allow tracking a "click off". This function turns the internal click flag on.
   */
  _onComponentMouseDown() {
    this.internalClick = true;
  }

  /*
   *  _onComponentMouseUp
   *
   *  This function handles the React `onMouseUp` event for the entire component. This is to
   *  allow tracking a "click off". Specifically this will restore the internal click flag to
   *  false.
   */
  _onComponentMouseUp() {
    this.internalClick = false;
  }

  /*
   *  _onFocus
   *
   *  This function handles the typeahead's `onFocus` event. When the field regains focus this
   *  will trigger the menu to be relieved if the appropriate number of chars are in place and
   *  the state has a result object in it.
   */
  _onFocus(e) {
    this.blockRequest = false;

    if (this.props.onFocus) this.props.onFocus(e);
    if (this.state.value.length >= this.minChars && this.state.activeResultObject) {
      // update state
      this.setState({ showMenu: true });

      // Add event listener to Window Object
      this.windowAddEventListener();
    }
  }

  /*
   *  _onKeydown
   *
   *  This function is intended to capture non-entry key strokes like Tab, Escape, Enter, and
   *  the up/down arrows. For actual value changes see _onChange.
   */
  _onKeydown(e) {
    // KEY CODES
    const KEY_UP = 38;
    const KEY_DOWN = 40;
    const KEY_ENTER = 13;
    const KEY_ESCAPE = 27;
    const KEY_TAB = 9;
    // other local vars
    const showMenu = this.state.showMenu;
    const numResults = this.props.numResults - 1;
    const key = e.keyCode;
    const newState = {};
    let activeIndex = this.state.activeIndex;
    let stateChange = true;

    // for escape and tab emulate "clicking off" behavior
    if (key === KEY_ESCAPE || key === KEY_TAB) this.onClickOutside();

    // Make sure that the menu is open and that something is selected.
    if (activeIndex < 0 || !showMenu) return;

    // Trigger functionality based of key being pressed
    switch (key) {
      // Up/Down - arrow through the menu list
      case KEY_UP :
      case KEY_DOWN : {
        e.preventDefault();

        // DOWN - add 1 to active index or loop back to 0
        if (key === KEY_DOWN) {
          activeIndex = (activeIndex + 1) <= numResults ? activeIndex + 1 : 0;
        }
        // UP - subtract 1 from active index of jump to end...
        else activeIndex = (activeIndex - 1) >= 0 ? activeIndex -= 1 : numResults;

        // Update state with activeIndex and corresponding Result Object
        newState.activeIndex = activeIndex;
        newState.activeResultObject = this.state.results[activeIndex];
        break;
      }
      // Enter - same as a clicking the activeIndex
      case KEY_ENTER : {
        this.selectValue(activeIndex);
        break;
      }
      // Tab/Escape to exit out of the dropdown
      case KEY_ESCAPE :
      case KEY_TAB : {
        // prevent default tab behavior (only when the menu is open of course)
        if (key === KEY_TAB) e.preventDefault();

        newState.showMenu = false;
        break;
      }
      // For all other key strokes there is no state change...
      default :
        stateChange = false;
        break;
    }

    // Update state
    if (stateChange) this.setState(newState);
  }

  /*
   *  _onChange
   *
   *  This function fires whenever the input's value changes. This will then update state,
   *  hide/show the loader/menu and if appropriate trigger the `fetchResults` function.
   *
   *  @param {event object} e - the input's synthetic "change" event fired by React
   */
  _onChange(e) {
    // Reset the activeIndex and activeItem
    const value = e.currentTarget.value;
    const cleanValue = this.getCleanValue(value);
    const newState = {};

    // Store value one the local object
    this.value = value;
    this.blockRequest = false;

    // Bind click off
    this.windowAddEventListener();

    // Clear any existing timeout
    if (this.typingTimeout) window.clearTimeout(this.typingTimeout);

    // If the value is not long enough, close the menu and hide loading indicator
    if (cleanValue.length < this.minChars) {
      newState.isLoading = false;
      newState.showMenu = false;
    }

    // update state with the value
    newState.value = value;
    this.setState(newState);

    // delay the change of state/ AJAX look up, but enqueue it...
    this.typingTimeout = window.setTimeout(() => {
      // Make sure that there are at least `minChar` clean characters
      if (cleanValue.length >= this.minChars) this.fetchResults(value);
      // If we dont have enough clean characters, hide loader and menu
      else if (this.state.showMenu || this.state.isLoading) this.setState(this.getInitialState());
    }, this.queryDelay);
  }


  // --------------------------------------------
  // RENDERERS
  // --------------------------------------------
  /*
   *  renderMenu
   *
   *  This function will render a new dropdown menu for the typeahead
   *  based off of the current `results` in state.
   *
   *  @return JSX array of nodes to be rendered
   */
  renderMenu() {
    const results = this.state.results;

    return (
      <ul className="usaf-typeahead__menu">
        {
          results && results.length
            // if there are results render the first `props.numResults` of them
            ? results.slice(0, this.props.numResults).map((result, i) => {
              const key = result.value;

              return this.renderMenuItem(result, key, i);
            })
            // other wise show a no results found item
            : this.renderNoResultsFound()
        }
      </ul>
    );
  }

  /*
   *  renderMenuItem
   *
   *  This function renders the JSX for the dropdown menu item when results _are_ found.
   *
   *  @param {obj}    data  - The data to render in the menu
   *  @param {string} key   - The React `key` be used within the loop
   *  @param {number} index - The numeric index of the data item.
   *
   *  @return JSX array of nodes to be rendered
   */
  renderMenuItem(data, key, index) {
    return (
      <li
        key={key}
        className={
          classNames(
            'usaf-typeahead__menu-item',
            {
              'usaf-typeahead__menu-item--active-item': this.state.activeIndex === index
            }
          )
        }
      >
        {
          this.props.renderMenuItem
            ? this.props.renderMenuItem(data, index, this._onClick, this._onMouseOver)
            : <button
              onClick={this._onClick}
              onMouseOver={this._onMouseOver}
              value={index}
              className="usaf-typeahead__menu-item-btn"
            >
              {data.displayValue}
            </button>
        }
      </li>
    );
  }

  /*
   *  renderNoResultsFound
   *
   *  This function renders the JSX for the dropdown/menu item when no results
   *  are found.
   *
   *  @return JSX array of nodes to be rendered
   */
  renderNoResultsFound() {
    return (
      <li className="usaf-typeahead__menu-item usaf-typeahead__menu-item--no-results">
        {
          this.props.noResultsMessage
            ? this.props.noResultsMessage
            : <h2>No results</h2>
        }
      </li>
    );
  }


  // Return/render the HTML for the `Typeahead`
  render() {
    const InputType = this.props.customTheme ? 'input' : TextInput;

    return (
      <div
        onMouseDown={this._onComponentMouseDown}
        className={classNames(
          'usaf-typeahead',
          {
            'usaf-typeahead--has-value': this.state.value,
            'usaf-typeahead--menu-open': this.state.showMenu
          }
        )}
      >
        <InputType
          className="usaf-typeahead__input"
          onChange={this._onChange}
          onFocus={this._onFocus}
          onKeyDown={this._onKeydown}
          placeholder={this.props.placeholder}
          type="text"
          value={this.state.value}
        />

        {
          // Loading indicator
          this.state.isLoading &&
          <div className="usaf-typeahead__loading" />
        }

        {
          // Loading indicator
          this.state.showMenu &&
          this.renderMenu()
        }
      </div>
    );
  }
}


// PropType definitions
Typeahead.propTypes = {
  customTheme: PropTypes.bool,
  endpoint: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
  minChars: PropTypes.number,
  noResultsMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  numResults: PropTypes.number,
  onFocus: PropTypes.func,
  onOptionSelected: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  queryDelay: PropTypes.number,
  renderMenuItem: PropTypes.func
};

// Default PropTypes
Typeahead.defaultProps = {
  customTheme: false,
  initialValue: '',
  minChars: 3,
  noResultsMessage: null,
  numResults: 5,
  onFocus: null,
  placeholder: '',
  queryDelay: 500,
  renderMenuItem: null
};


export default Typeahead;
