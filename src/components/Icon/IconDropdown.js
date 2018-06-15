import React from 'react';
import Icon from './Icon';

/**
 *  IconDropdown
 *
 *  SVG dropdown icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconDropdown />
 *    <IconDropdown theme="primary" />
 */
const IconDropdown = props => (
  <Icon {...props} >
    <path d="M28 44.3L0 21v-9.3h56V21" />
  </Icon>
);

export default IconDropdown;
