import React from 'react';
import Icon from './Icon';


/**
 *  IconMenuClose
 *
 *  SVG menu close icon - X
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconMenuClose />
 */

const IconMenuClose = props => (
  <Icon {...props}>
    <rect x="-6.6" y="23" transform="matrix(0.7071 0.7071 -0.7071 0.7071 27.9909 -11.6201)" width="69.2" height="9.9" />
    <rect x="-6.6" y="23" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -11.5759 28.0091)" width="69.2" height="9.9" />
  </Icon>
);

export default IconMenuClose;
