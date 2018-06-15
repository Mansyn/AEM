import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import PopperJs from 'popper.js';

import './tooltip.scss';

/**
 *  Tooltip
 *
 *  The Tooltip component shows the popupComponent when the trigger element (as children) is hovered
 *
 *    @property {number} delayShow      -  Delay in ms to wait before showing the popup
 *    @property {number} delayHide      -  Delay in ms to wait before hiding the popup
 *    @property {bool}   showByDefault  -  Determines whether or not to show the popup by default
 *    @property {str}    placement      -  Determines where to place the popup
 *    @property {str}    offsets        -  Used to set up left and top offsets
 *    @property {func}   afterHide      -  A callback that can be called when the popup is removed
 *    @property {elem}   popupComponent -  The element to render in the popup
 *    @property {elem}   children       -  The trigger element
 *
 *  @example
 * <Tooltip
 *   popupComponent={popupContent}
 *   placement="right"
 *   delayShow=500
 * >
 *   <span>
 *     <div>Trigger element</div>
 *   </span>
 * </Tooltip>
 *
 *
 */

class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    // instance properties
    this._popper = null;
    this._tooltipTriggerRef = null;
    this._tooltipPopupRef = null;

    this.state = { data: null, show: this.props.isOpen };

    // Methods to show and hide the popup
    this.showPopup = this.showPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);

    // Handle mouseEnter and mouseLeave of the popup
    this.onPopupMouseEnter = this.onPopupMouseEnter.bind(this);
    this.onPopupMouseLeave = this.onPopupMouseLeave.bind(this);
  }

  // if state.show is true, create a new popper instance
  componentDidMount() {
    if (this.state.show) {
      this.instantiatePopper();
    }
  }

  // if _popper exists, call updatePopper
  componentWillReceiveProps() {
    if (this._popper) {
      this.updatePopper();
    }
  }

  /**
   * componentDidUpdate
   *
   * if updating to show the popup we need to create a new popper instance.
   * we defer instantiating the popper until componentDidUpdate because we need to make sure
   * the popup element has been rendered otherwise the popper will throw an error
   *
   * if updating to hide the popup we need to destroy the popper instance
   *
   * @param {object} prevProps
   * @param {object} prevState
   * @memberof Tooltip
   */
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.show && this.state.show) {
      this.instantiatePopper();
    }
    else if (this._popper && (prevState.show && !this.state.show)) {
      this.props.afterHide();
      this._popper.destroy();
    }
  }

  // when the component is unmounted we need to destroy the popper instance
  componentWillUnmount() {
    if (this._popper) {
      this._popper.destroy();
    }
  }

  /**
   * onPopupMouseEnter
   *
   * this method stops the popup from being hidden when the mouse leaves the trigger
   * and hovers over the popup
   *
   * @memberof Tooltip
   */
  onPopupMouseEnter() {
    this.clearDelayTimer();
  }

  /**
   * onPopupMouseLeave
   *
   * this method hides the popup when the mouse leaves the popup
   *
   * @memberof Tooltip
   */
  onPopupMouseLeave() {
    this.delaySetPopupVisible(false, this.props.delayHide);
  }

  /**
   * getPopperStyle
   *
   * returns the updated position to be applied to the popup
   *
   * @param {object} data
   * @returns {object}
   * @memberof Tooltip
   */
  getPopperStyle(data) {
    if (!data) {
      return {};
    }
    const left = Math.round(data.offsets.popper.left);
    const top = Math.round(data.offsets.popper.top);
    const transform = `translate3d(${left}px, ${top}px, 0)`;
    return {
      position: data.offsets.popper.position,
      transform,
      WebkitTransform: transform,
      top: 0,
      left: 0,
      display: this.state.show ? 'block' : 'none'
    };
  }

  /**
   * setPopupVisible
   *
   * method to show or hide the popup based on the value passed in
   *
   * @param {boolean} popupVisible
   * @memberof Tooltip
   */
  setPopupVisible(popupVisible) {
    this.clearDelayTimer();
    if (this.state.show !== popupVisible) {
      this.setState({
        show: popupVisible
      });
    }
  }

  /**
   * delaySetPopupVisible
   *
   * method to show or hide the popup after the appropriate delay
   *
   * @param {boolean} visible
   * @param {number} delay
   * @memberof Tooltip
   */
  delaySetPopupVisible(visible, delay) {
    this.clearDelayTimer();
    if (delay) {
      this.delayTimer = setTimeout(() => {
        this.setPopupVisible(visible);
        this.clearDelayTimer();
      }, delay);
    }
    else {
      this.setPopupVisible(visible);
    }
  }

  // stop the popup delay timer
  clearDelayTimer() {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
  }

  /**
   * instantiatePopper
   *
   * Creates the instance of a popper and repositions it by calling updating state.data
   * with the new position data returned by the create() and update() callbacks
   *
   * @memberof Tooltip
   */
  instantiatePopper() {
    const modifiers = {
      offset: {
        offset: this.props.offsets
      }
    };
    this._popper = new PopperJs(this._tooltipTriggerRef, this._tooltipPopupRef, {
      placement: this.props.placement,
      modifiers,
      onCreate: data => this.setState({ data }),
      onUpdate: data => this.setState({ data })
    });
    this.updatePopper();
  }

  updatePopper() {
    requestAnimationFrame(() => {
      if (this._popper) {
        this._popper.update();
      }
    });
  }

  /**
   * showPopup
   *
   * method used to show the popup
   *
   * @memberof Tooltip
   */
  showPopup() {
    this.delaySetPopupVisible(true, this.props.delayShow);
  }

  /**
   * hidePopup
   *
   * method used to hide the popup
   *
   * @memberof Tooltip
   */
  hidePopup() {
    this.delaySetPopupVisible(false, this.props.delayHide);
  }

  /**
   * renderTrigger
   *
   * renders the element that the popup is 'attached' to
   *
   * @returns ReactElement
   * @memberof Tooltip
   */
  renderTrigger() {
    return (
      <span
        className="usaf-tooltip__trigger"
        ref={(el) => {
          this._tooltipTriggerRef = el;
        }}
      >
        {cloneElement(this.props.children, {
          onMouseEnter: this.showPopup,
          onMouseLeave: this.hidePopup
        })}
      </span>
    );
  }

  /**
   * renderPopup
   *
   * renders the popup element and gets its styles from the popper's returned data
   *
   * @returns ReactElement
   * @memberof Tooltip
   */
  renderPopup() {
    return (
      <div
        className="usaf-tooltip__popup"
        ref={(el) => {
          this._tooltipPopupRef = el;
        }}
        onMouseEnter={this.onPopupMouseEnter}
        onMouseLeave={this.onPopupMouseLeave}
        style={this.getPopperStyle(this.state.data)}
      >
        {this.props.popupComponent}
      </div>
    );
  }

  /**
   * render
   *
   * only render the popup if state.show is true
   *
   * @returns ReactElement
   * @memberof Tooltip
   */
  render() {
    const { state } = this;
    return (
      <div>
        {this.renderTrigger()}
        {state.show && this.renderPopup()}
      </div>
    );
  }
}

Tooltip.Placements = {
  TOP: 'top',
  TOP_START: 'top-start',
  TOP_END: 'top-end',
  RIGHT: 'right',
  RIGHT_START: 'right-start',
  RIGHT_END: 'right-end',
  BOTTOM: 'bottom',
  BOTTOM_START: 'bottom-start',
  BOTTOM_END: 'bottom-end',
  LEFT: 'left',
  LEFT_START: 'left-start',
  LEFT_END: 'left-end'
};

Tooltip.propTypes = {
  afterHide: PropTypes.func,
  delayHide: PropTypes.number,
  delayShow: PropTypes.number,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  placement: PropTypes.oneOf(Object.values(Tooltip.Placements)),
  popupComponent: PropTypes.node,
  offsets: PropTypes.string
};

Tooltip.defaultProps = {
  afterHide: () => {},
  isOpen: false,
  placement: Tooltip.Placements.LEFT,
  delayHide: 300,
  delayShow: 300,
  offsets: '0px, 0px'
};

export default Tooltip;
