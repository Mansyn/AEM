import React from 'react';
import Icon from './Icon';

/**
 *  IconClose
 *
 *  SVG close icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconClose />
 *    <IconClose theme="primary" />
 */
const IconClose = props => (
  <Icon {...props} >
    <path d="M55.924.776L.842 55.858l-.776-.775L55.15 0z" />
    <path d="M55.925 55.224L55.15 56 .066.917.843.142z" />
  </Icon>
);

export default IconClose;
