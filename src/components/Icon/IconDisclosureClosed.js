import React from 'react';
import Icon from './Icon';

/**
 *  IconDiscolsureClosed
 *
 *  SVG disclosure closed icon, note this icon has a hardcoded fill
 *  for the minus sign per visual design requirements
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconDiscolsureClosed />
 *    <IconDiscolsureClosed theme="primary" />
 */
const IconDiscolsureClosed = props => (
  <Icon {...props} >
    <path d="M0 0h56v56H0z" />
    <path fill="#FFF" d="M44.8 26.1h-15V11.2h-3.7v14.9H11.2v3.7h14.9v15h3.7v-15h15" />
  </Icon>
);

export default IconDiscolsureClosed;
