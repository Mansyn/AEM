import React from 'react'
import PropTypes from 'prop-types'
import radiostyle from './radio.scss'


/**
 *  Radio
 *
 *  This is a base level component that renders a basic `<input type="radio" />`
 *
 *  @param {object} props
 *    @property {str}         name          - (required) the name attribute
 *    @property {str}         id            - a unique ID
 *    @property {str|number}  value         - (required) the value associated with the radio
 *    @property {bool}        checked       - should this radio be selected
 *    @property {bool}        disabled      - is this element intractable
 *    @property {bool}        isControlled  - should Radio used `checked` or `defaultChecked` prop?
 *    @property {str}         size          - if set this must be either small, medium or large
 *                                            (defaults to small)
 *    @property {func}        onChange      - function to call when the radio's state changes
 *    @property {object}      children      - JSX/DOM node that represents the label text
 *
 *  @example
 *    <Radio
 *      name="str"
 *      id="str"
 *      value="str"
 *      onChange={func}
 *      checked={bool}
 *      disabled={bool}
 *      size="small|medium|large"
 *    >
 *      Label Text
 *    </Radio>
 */
const Radio = ({ id, name, checked, disabled, size, value, onChange, isControlled, children }) => {
  // If an id is not set, create one to join the label and the input together.
  const uid = id || `${name}-${value}`;
  // form elements can be controlled (using `value`) or uncontrolled (using `defaultValue`), this
  // toggles between the two props as needed.
  const checkedProp = {};
  checkedProp[isControlled ? 'checked' : 'defaultChecked'] = checked;

  // Return/render the HTML
  return (
    <label className={`usaf-radio usaf-radio--${size}`} htmlFor={uid}>
      <input
        {...checkedProp}
        type="radio"
        name={name}
        id={uid}
        value={value}
        disabled={disabled}
        aria-disabled={disabled}
        onChange={onChange}
        className="usaf-radio__input"
      />

      <svg className="usaf-radio__icon" viewBox="0 0 56 56">
        <circle className="usaf-radio__stroke" cx="28" cy="28" r="28" />
        <circle className="usaf-radio__fill" cx="28" cy="28" r="22" />
        <circle className="usaf-radio__dot" cx="28" cy="28" r="12" />
      </svg>

      <span className="usaf-radio__input-text">{children}</span>
    </label>
  );
};


// Radio button's default properties
Radio.defaultProps = {
  size: 'small',
  isControlled: false
};


// Radio buttons property list and types
Radio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  isControlled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onChange: PropTypes.func,
  children: PropTypes.node.isRequired
};


// Export the Radio object (this is what is available to other files that `import` this one)
export default Radio;

