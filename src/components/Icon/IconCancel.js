import React from 'react';
import Icon from './Icon';

/**
 *  IconCancel
 *
 *  SVG cancel icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconCancel />
 *    <IconCancel theme="primary" />
 */
const IconCancel = props => (
  <Icon {...props}>
    <path d="M5.516 56.004L-.07 50.42 50.337-.005l5.587 5.585z" />
    <path d="M-.005 5.516L5.58-.07l50.424 50.408-5.585 5.587z" />
  </Icon>
);

export default IconCancel;
