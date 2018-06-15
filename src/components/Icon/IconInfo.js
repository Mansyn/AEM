import React from 'react';
import Icon from './Icon';

/**
 *  IconInfo
 *
 *  SVG info icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
*
 *  @example
 *    <IconInfo />
 *    <IconInfo theme="primary" />
 */
const IconInfo = props => (
  <Icon {...props} >
    <path d="M28 0C12.536 0 0 12.536 0 28s12.536 28 28 28 28-12.536 28-28S43.464 0 28 0zm4 40.5h-8v-16h8v16zm0-19h-8v-8h8v8z" />
  </Icon>
);

export default IconInfo;
