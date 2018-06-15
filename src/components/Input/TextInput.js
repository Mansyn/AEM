import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './text-input.scss';

/**
 *  TextInput
 *
 *  This is a base level component that renders a basic `<input type="text" />`
 *
 *  @example
 *    Using defaultValue:
 *    <TextInput
 *      defaultValue="Some default value"
 *      placeholder="some placeholder"
 *    />
 *
 *    Using value:
 *    <TextInput
 *      value={props.name}
 *      placeholder="some placeholder"
 *    />
 *
 * @type {function} TextInput component as pure function
 *
 * @param {object}      props
 * @param {function}    props.onChange      - function to call when the input value changes
 *
 * @return {ReactElement} markup
 */
const TextInput = ({ onChange, className, ...rest }) => (
  <input
    {...rest}
    type="text"
    onChange={onChange}
    className={classNames('usaf-input', className)}
  />
);

TextInput.defaultProps = {
  className: ''
};

/**
 * @type {Object}
 * @property {function} onChange change event handler
 */
TextInput.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string
};

export default TextInput;
