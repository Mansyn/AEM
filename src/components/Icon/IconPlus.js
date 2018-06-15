import React from 'react';
import Icon from './Icon';

/**
 *  IconPlus
 *
 *  SVG plus icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconPlus />
 *    <IconPlus theme="primary" />
 */
const IconPlus = props => (
  <Icon {...props} >
    <path d="M56 24.89H31.2V0H25v24.89H.1v6.2H25V55.9h6.2V31.09H56" />
  </Icon>
);

export default IconPlus;
