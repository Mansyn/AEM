import React from 'react';
import Icon from './Icon';

/**
 *  IconCheckmark
 *
 *  SVG checkmark icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconCheckmark />
 *    <IconCheckmark theme="primary" />
 */
const IconCheckmark = props => (
  <Icon {...props} >
    <path d="M56 8l-7.3-5.5-28.1 37.1L6.5 25.4 0 31.9l21.6 21.6" />
  </Icon>
);

export default IconCheckmark;
