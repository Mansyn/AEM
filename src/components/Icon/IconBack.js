import React from 'react';
import Icon from './Icon';

/**
 *  IconBack
 *
 *  SVG back icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconBack />
 *    <IconBack theme="primary" />
 */
const IconBack = props => (
  <Icon {...props} >
    <path d="M42 56V0L14 28" />
  </Icon>
);

export default IconBack;
