import React from 'react';
import Icon from './Icon';

/**
 *  IconCloseCompact
 *
 *  SVG radio icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconCloseCompact />
 *    <IconCloseCompact theme="primary" />
 */
const IconCloseCompact = props => (
  <Icon {...props} className="usaf-icon-close-compact">
    <path d="M55.833 10.603L45.397.167 28 17.564 10.603.167.167 10.603 17.564 28 .167 45.397l10.436 10.436L28 38.437l17.397 17.396 10.436-10.436L38.437 28" />
  </Icon>
);

export default IconCloseCompact;
