import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from './Radio';
import './radio-group.scss';


/**
 *  Radio Group
 *
 *  This is a base level component that renders a basic `<input type="radio" />`
 *
 *  @param {object} props
 *    @property {object} children     - JSX/DOM node that represents the label text
 *    @property {bool}   disabled     - should this radio group be disabled?
 *    @property {str}    display      - either inline or block, this will add a class the effects
 *                                      RadioGroup > Radio (default is `inline`)
 *    @property {bool}   isControlled - should Radio used `checked` or `defaultChecked` prop?
 *    @property {str}    name         - the name attribute that will be shared across the Radio
 *                                      instances
 *    @property {func}   onChange     - a function to call when the RadioGroup's "value" changes
 *                                      this function is passed current and new values
 *    @property {str}    size         - (optional) must be small, medium or large
 *                                      (defaults to small)
 *
 *  @example
 *    <RadioGroup
 *      children={node}
 *      disabled={bool}
 *      display="inline|block"
 *      name="str"
 *      onChange={func}
 *      size="small|medium|large"
 *      value="str"
 *    >
 *      <Radio {...} />
 *      ...
 *    </RadioGroup>
 *
 *  @see ./Radio.js
 */
class RadioGroup extends Component {

  /*
   *  handleRadioChange
   *
   *  This function is intended to handle the onChange event for a child
   *  `Radio` component. All we really want to do is pass the updated value
   *  along from the onChange of the `Radio` to the onChange of `the RadioGroup`
   *
   *  @param {str|number} val - the updated value
   *  @calls props.onChange and passes it `currentVal` and `newVal`
   */
  handleRadioChange(newVal) {
    // Store the "old" (pre toggle) value
    const currentVal = this.props.value;

    // If onChange prop is set for RadioGroup (it should be), fire that function with the new value
    if (this.props.onChange) this.props.onChange(currentVal, newVal);
  }


  /*
   *  rerenderChildNodes
   *
   *  This function filters through the `RadioGroup` children pulling out
   *  the `Radio` nodes and augmenting them with props from the parent
   *  component (RadioGroup). This allows for an instance of `RadioGroup`
   *  to have any HTML/CSS needed to render the UI and offers a way to
   *  track the "state" of the group as a whole.
   *
   *  @param {nodes} children - the component's child nodes
   *  @return {nodes} this returns the children nodes with enhanced `Radio` nodes
   */
  rerenderChildNodes(children) {
    return (
      // Iterate of props.children
      React.Children.map(
        children,
        (child) => {
          // Container to hold props that are being updated
          let updatedChildProps = {};

          // If the child is a Radio, update the props
          if (child.type === Radio) {
            // Pass props from the `RadioGroup` to the `Radio`
            updatedChildProps = {
              checked: child.props.value === this.props.value,
              disabled: this.props.disabled || child.props.disabled,
              isControlled: this.props.isControlled,
              onChange: this.handleRadioChange.bind(this, child.props.value),
              name: this.props.name,
              size: this.props.size || child.props.size,
            };
          // If the node is *not* a `Radio` and has children, recurse over the children
          }
          else if (child.props.children) {
            updatedChildProps.children = this.rerenderChildNodes(child.props.children);
          // If the node is *not* a `Radio` and does not have children, just return it as is...
          }
          else return child;

          // Return
          return React.cloneElement(child, updatedChildProps);
        }
      )
    );
  }


  // Return/render the HTML after recursing over the `RadioGroup` children
  render() {
    return (
      <div id={this.props.name} className={`usaf-radio-group ${(this.props.display ? `usaf-radio-group--${this.props.display}` : '')}`}>
        {this.rerenderChildNodes(this.props.children)}
      </div>
    );
  }
}


// Radio buttons property list and types
RadioGroup.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  display: PropTypes.oneOf(['inline', 'block']),
  isControlled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

// Radio button's default properties
RadioGroup.defaultProps = {
  display: 'inline',
  isControlled: false
};


export default RadioGroup;
