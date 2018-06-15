import React from 'react';
import Icon from './Icon';

/**
 *  IconDiscolsureOpen
 *
 *  SVG discolsure open icon, note this icon has a hardcoded fill
 *  for the minus sign per visual design requirements
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconDiscolsureOpen />
 *    <IconDiscolsureOpen theme="primary" />
 */
const IconDiscolsureOpen = props => (
  <Icon {...props} >
    <path d="M0 0h56v56H0z" />
    <path fill="#FFF" d="M11.2 26.1h33.6v3.7H11.2z" />
  </Icon>
);

export default IconDiscolsureOpen;
