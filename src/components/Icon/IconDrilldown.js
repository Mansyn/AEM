import React from 'react';
import Icon from './Icon';

/**
 *  IconDrilldown
 *
 *  SVG drilldown icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconDrilldown />
 *    <IconDrilldown theme="primary" />
*/
const IconDrilldown = props => (
  <Icon {...props} >
    <path d="M0 4.5h43.1V13H0z" />
    <path d="M34.53 4.53h8.6v42h-8.6z" />
    <path d="M38.8 51.5L21.5 34.4H56" />
  </Icon>
);

export default IconDrilldown;
