import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';

import './dropdown-menu.scss';

/*
 *  DropdownMenu
 *
 *  This component takes two children, a DropdownTrigger component and a DropdownContent component
 *  @example
 *    Basic usage:
 *    <DropdownMenu
 *      trigger={<button id="dropdown-trigger1">Dropdown Trigger</button>}
 *      onOpen={doSomethingOnOpen}
 *      onClose={doSomethingOnClose}
 *    >
 *      <div>
 *        <h3>Dropdown menu</h3>
 *        <div>This is some content within the dropdown menu</div>
 *        <button>Click me</button>
 *      </div>
 *    </DropdownMenu>
 *
 */
class DropdownMenu extends Component {
  /**
   * constructor
   * @param {object} props
   *
   * @memberof DropdownMenu
   */
  constructor(props) {
    super(props);

    /**
     * @type {object}
     * @property {boolean} open determines is the dropdown is rendered
     */
    this.state = {
      open: false
    };

    this.portalTarget = null;

    this._addEvents = this._addEvents.bind(this);
    this._removeEvents = this._removeEvents.bind(this);

    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
  }

  // --------------------------------------------
  // React lifecycle methods
  // --------------------------------------------
  /*
   *
   */
  componentDidMount() {
    // Update the Portal Target
    if (this.props.portalTarget) {
      this.portalTarget = document.getElementById(this.props.portalTarget);
    }
  }

  /**
   * componentDidUpdate
   *
   * Add or remove eventHandlers based on the open state
   */
  componentDidUpdate(_, prevState) {
    if (this.state.open !== prevState.open) {
      if (this.state.open) {
        this._addEvents();
      }
      else {
        this._removeEvents();
      }
    }
  }

  /**
   * componentWillUnmount
   *
   * Remove any eventHandlers
   */
  componentWillUnmount() {
    this._removeEvents();
  }

  // --------------------------------------------
  // Custom Methods
  // --------------------------------------------
  // Add private event handlers
  _addEvents() {
    document.addEventListener('click', this.handleDocumentClick, true);
  }

  _removeEvents() {
    document.removeEventListener('click', this.handleDocumentClick, true);
  }

  /**
   * handleDocumentClick
   *
   * Check to see where the click originated. If within the DropdownContent, leave content open.
   * @param {object} event
   */
  handleDocumentClick(event) {
    const container = this._node;
    const portalTarget = this.portalTarget;

    // Ignore clicks inside the toggled dropdown
    if (
      // if the click is inside the container but _not_ the toggle btn
      (container.contains(event.target) && container !== event.target) ||
      // if the click is on the transported child element...
      (portalTarget && portalTarget.contains(event.target))
    ) {
      return;
    }

    this.toggle(event);
  }

  /**
   * toggle
   *
   * runs the passed in onOpen or onClose methods, then toggles the open state
   *
   * @param {object} event
   */
  toggle(event) {
    const open = !this.state.open;

    if (open) {
      this.props.onOpen(event);
    }

    if (!open) {
      this.props.onClose(event);
    }

    this.setState({ open });
  }

  /**
   * handleTriggerClick
   *
   * used to open the dropdown when the trigger is clicked
   *
   * @param {object} event
   */
  handleTriggerClick(event) {
    event.preventDefault();

    this.toggle(event);
  }

  /**
   * renderTrigger
   *
   * Renders the trigger element adding className and onClick handler
   *
   * @param {node} trigger
   */
  renderTrigger(trigger) {
    const triggerClassName = trigger.props.className || '';

    return cloneElement(trigger, {
      className: `usaf-dropdown-menu__trigger ${triggerClassName}`,
      onClick: this.handleTriggerClick
    });
  }

  // --------------------------------------------
  // Render
  // --------------------------------------------
  render() {
    return (
      <div
        ref={(node) => {
          this._node = node;
        }}
        className="usaf-dropdown-menu"
      >
        {this.renderTrigger(this.props.trigger)}

        {
          // If the state is set to open, show the modal
          this.state.open &&
          (
            // Is a portal being used?
            this.props.portalTarget
            // If it is, dont wrap the children...
            ? this.props.children
            // Otherwise wrap them up!
            : <div className="usaf-dropdown-menu__dropdown">{ this.props.children }</div>
          )
        }
      </div>
    );
  }
}


/**
 * property types
 * @type {object}
 * @property {function} onOpen callback for when the dropdown is opened
 * @property {function} onClose callback for when the dropdown is closed
 * @property {node} trigger element that triggers opening of the dropdown menu
 * @property {node} children dropdown component
 */
DropdownMenu.propTypes = {
  /**
   * Called when the dropdown is opened
   */
  onOpen: PropTypes.func,

  /**
   * Called when the dropdown is closed
   */
  onClose: PropTypes.func,

  /**
   * Element that triggers opening of the dropdown
   */
  trigger: PropTypes.node,

  /**
   * The dropdown component
   */
  children: PropTypes.node,
  portalTarget: PropTypes.string
};

// Default PropTypes
DropdownMenu.defaultProps = {
  onOpen: () => {},
  onClose: () => {}
};

export default DropdownMenu;
