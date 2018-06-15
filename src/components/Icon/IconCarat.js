import React from 'react';
import Icon from './Icon';

/**
 *  IconCarat
 *
 *  SVG back icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconCarat />
 *    <IconCarat theme="primary" />
 */
const IconCarat = props => (
  <Icon {...props} >
    <path d="M43.5 28.3l-2.7-2.7L15.2 0l-2.7 2.7 25.6 25.6-25 25 2.8 2.7 24.9-25" />
  </Icon>
);

export default IconCarat;
