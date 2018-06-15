import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './text-input.scss';

/*
* NumericStepper
*  @example
*    Using defaultValue:
*    <NumiericInput
*      defaultValue="Some default value"
*      min="some min value"
*      max="some max value"
*      onChange = {onChange}
*    />
* @type     {function}       NumericInput component as pure function
*
* @param    {function}      props.onChange      - onChange event handler
* @property {string}        props.className     - className
*
* @return   {ReactElement}  markup
*/

const NumericInput = ({ onChange, className, ...rest }) => (
  <input
    {...rest}
    type="number"
    onChange={onChange}
    className={classNames('usaf-input', className)}
  />
);

NumericInput.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string
};

NumericInput.defaultProps = {
  onChange: () => {},
  className: ''
};

export default NumericInput;
