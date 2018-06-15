import React from 'react';
import Icon from './Icon';

/**
 *  IconCheckbox
 *
 *  SVG back icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconCheckbox />
 */
const IconCheckbox = props => (
  <Icon {...props}>
    <path className="usaf-icon-checkbox__border" d="M0 0h50v50H0z" />
    <path className="usaf-icon-checkbox__background" d="M6.786 6.786h36.43v36.43H6.785z" />
    <g className="usaf-icon-checkbox__x">
      <path d="M36.806 18.372L18.37 36.807l-5.176-5.177L31.63 13.195z" />
      <path d="M36.806 31.63l-5.177 5.177-18.436-18.435 5.177-5.177z" />
    </g>
  </Icon>
);

export default IconCheckbox;
