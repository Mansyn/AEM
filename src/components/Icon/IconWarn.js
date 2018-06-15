import React from 'react';
import Icon from './Icon';

/**
 *  IconWarn
 *
 *  SVG warning icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconWarn />
 *    <IconWarn theme="primary" />
 */
const IconWarn = props => (
  <Icon {...props}>
    <path
      d="M20.7,46.1c0-1.7,1.4-2.5,4.8-2.5H28c3.3,0,4.8,0.9,4.8,2.5v7.3c0,
      1.7-1.4,2.5-4.8,2.5h-2.5c-3.3,0-4.8-0.9-4.8-2.5V46.1z
      M22.3,35.6V2.5c0-1.7,1.4-2.5,4.8-2.5h3.4c3.1,0,4.8,0.8,4.8,2.2c0,
      0.3,0.1-0.1-4,33.4c-0.2,1.7-0.8,2.5-4.1,2.5h-0.9
      C23.1,38.2,22.3,37.3,22.3,35.6z"
    />
  </Icon>
);

export default IconWarn;
