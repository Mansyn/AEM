import React from 'react';
import Icon from './Icon';

/**
 *  IconMinus
 *
 *  SVG minus icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconMinus />
 *    <IconMinus theme="primary" />
 */
const IconMinus = props => (
  <Icon {...props} >
    <path d="M0 24.895h56v6.21H0z" />
  </Icon>
);

export default IconMinus;
