import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import createUid from '../utils/create-uid';

import Tab from './Tab';


import './tab-group.scss';

/**
 *  Tab Group
 *
 *  This component manages a group of tabs and their content
 *
 *  @param {object} props
 *    @property {array|element} children      - JSX/DOM node that represents the label text
 *    @property {number}        selectedIndex - the selected index
 *    @property {string}        type          - determines visual style (defaults to "pill")
 *    @property {func}          onChange      - a function to call when the "selectedIndex" changes
 *
 *  @example
 *    <TabGroup
 *      type="pill|tab"
 *      onChange={func}
 *    >
 *      <Tab label="tab 1">
 *        <div>This is content within tab 1</div>
 *      </Tab>
 *      <Tab label="tab 2">
 *        <div>This is content within tab 2</div>
 *      </Tab>
 *      ...
 *    </TabGroup>
 *
 *  @see ./Tab.js
 */


class TabGroup extends React.Component {
  constructor(props) {
    super(props);

    // Local Properties
    this.childrenArray = this.getChildrenArray();

    // State
    this.state = { selectedIndex: this.props.selectedIndex };

    // Event Handlers
    this.handleClick = this.handleClick.bind(this);
  }

  // Set up initial selectedIndex
  componentWillMount() {
    this.setSelectedIndex(this.props.selectedIndex);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  /**
   * setSelectedIndex
   *
   * setSelectedIndex is called anytime the selectedIndex needs to change
   * This function will convert a string into an int, so no need to do that conversion elsewhere
   *
   * @param {number|string} newSelectedIndex
   */
  setSelectedIndex(newSelectedIndex) {
    let selectedIndex = isNaN(newSelectedIndex) ? 0 : parseInt(newSelectedIndex, 10);

    if (selectedIndex === this.state.selectedIndex) {
      return;
    }

    if (selectedIndex >= this.childrenArray.length) {
      selectedIndex = 0;
    }

    this.setState({ selectedIndex: parseInt(selectedIndex, 10) });
  }

  /*
   *  getChildrenArray
   *
   *  This function makes sure we are always working with an array of children.
   *  Accounts for instances where only one child element is passed in.
   *
   *  @return {array} childrenArray - children as an array
   */
  getChildrenArray() {
    return React.Children.toArray(this.props.children).filter(child => child.type === Tab);
  }

  /*
   *  handleClick
   *
   *  This function is intended to handle the click event for a child
   *  `Tab` component.
   *
   *  @param {object} event - the event object
   *  @param {number} index - the new selectedIndex
   *  @calls this.setState passing the new selectedIndex
   */
  handleClick(event) {
    event.preventDefault();

    this.setSelectedIndex(event.currentTarget.value);
  }

  /**
   * renderTabBar
   *
   * This function renders the clickable buttons
   *
   * @TODO: We may want to allow passing a custom button renderer (image, dropdown...)
   */
  renderTabBar() {
    return (
      <ul
        className={classNames({
          'usaf-tab-group__tabs': this.props.type === 'tab',
          'usaf-tab-group__pills': this.props.type === 'pill'
        })}
      >
        {
          this.childrenArray.map(
            (child, index) => (
              <li
                key={createUid(10)}
                className={classNames(
                  'usaf-tab-group__tab',
                  { 'usaf-tab-group__tab--active': this.state.selectedIndex === index }
                )}
              >
                <button
                  className={classNames(
                    'usaf-tab-group__btn',
                  )}
                  value={index}
                  onClick={this.handleClick}
                >
                  {child.props.label}
                </button>
              </li>
            )
          )
        }
      </ul>
    );
  }

  /**
   * renderContent
   *
   * This function renders the tab's content
   */
  renderContent() {
    return (
      <div className="usaf-tab-group__content">
        {this.childrenArray[this.state.selectedIndex]}
      </div>
    );
  }

  /**
   * render
   *
   * This function renders the component
   */
  render() {
    // @TODO: Decide whether we want this visual indicator of no children passed to TabGroup
    // This may be useful once we start loading tabs dynamically or adding/removing tabs
    // if (this.childrenArray.length === 0) {
      // return (
        // <div className="usaf-tab-group">This TabGroup does not have any associated tabs.</div>
      // );
    // }
    return (
      <div className="usaf-tab-group">
        {this.renderTabBar()}
        {this.renderContent()}
      </div>
    );
  }
}

  /*
   *  tabTypeValidation
   *
   *  This is a custom propType validator. Validates that all children are of type Tab
   *
   * @TODO: figure how to mark children as required
   *
   *  @param {object} props - TabGroup's props
   *  @param {string} propName - Name of property
   *  @param {string} componentName - Name of component
   *  @return {object} Error|null - If any child is not of type Tab return Error else return null
   */
function tabTypeValidation(props, propName, componentName) {
  const cName = componentName || 'ANONYMOUS';

  if (!props.children) {
    return new Error(
      `Children is a required property to supply to ${cName}. Validation failed.`
    );
  }

  const errors = React.Children.toArray(props.children).filter(child => child.type !== Tab);
  if (errors.length !== 0) {
    return new Error(
      `Invalid children supplied to ${cName}. Children are expected to be of type Tab.
      Validation failed.`
    );
  }

  return null;
}

TabGroup.propTypes = {
  selectedIndex: PropTypes.number,
  type: PropTypes.oneOf(['tab', 'pill']),
  children: tabTypeValidation
};
TabGroup.defaultProps = {
  selectedIndex: 0,
  type: 'pill'
};

export default TabGroup;
