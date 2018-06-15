import React from 'react';
import Icon from './Icon';


/**
 *  IconHamburgerMenu
 *
 *  SVG hamburger menu icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconHamburgerMenu />
 */

const IconHamburgerMenu = props => (
  <Icon {...props}>
    <rect x="0" y="8" width="56" height="8" />
    <rect x="0" y="24" width="56" height="8" />
    <rect x="0" y="40" width="56" height="8" />
  </Icon>
);

export default IconHamburgerMenu;
