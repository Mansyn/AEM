import React from 'react';
import Icon from './Icon';

/**
 *  Icon Column
 *
 *  SVG Column Icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 */
const IconColumn = props => (
  <Icon {...props} >
    <path d="M4.7 0H14v56H4.7zM23.3 0h9.3v56h-9.3zM42 0h9.3v56H42z" />
  </Icon>
);

export default IconColumn;
