import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

/**
 * A basic button component, use the the theme property to set a styling theme.
 * Theme defaults to "primary", other options are "secondary" and "tertiary".
 *
 * @example
 * <Button onClick={handleButtonClick} theme="secondary">Label for the button</Button>
 *
 * @type {function} button component as pure function
 * @param {object} props
 * @return {ReactElement} markup
 */
const Button = ({ theme, className, disabled, onClick, children }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`usaf-btn usaf-btn--${theme} ${className}`}
  >
    {children}
  </button>
);

/**
 * default properties
 * @type {object}
 * @property {string} default styling theme
 * @property {boolean} default to a non disabled button
 * @property {string} default extra passed className to empty string
 */
Button.defaultProps = {
  theme: 'primary',
  disabled: false,
  className: ''
};

/**
 * property types
 * @type {object}
 * @property {string} styling theme
 * @property {string} any additional CSS classes can be added as a standard space delimited string
 * @property {function} click event handler
 * @property {boolean} whether button tag has disabled property
 * @property {ReactElement} child elements of the button (label, etc.)
 */
Button.propTypes = {
  theme: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'icon']),
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default Button;
