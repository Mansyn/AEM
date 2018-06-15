import React from 'react';
import Icon from './Icon';

/**
 *  IconMultiSelect
 *
 *  SVG multi select icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconMultiSelect />
 *    <IconMultiSelect theme="primary" />
 */
const IconMultiSelect = props => (
  <Icon {...props} >
    <path d="M46.1 16.3l6-7.8H56v7.8M34.2 31.9l6.1-7.8H56v7.8M22.2 47.5l6-7.8H56v7.8M43.5 8.5h-8.8L13 36.9l-8-8-5 5 13.7 13.6" />
  </Icon>
);

export default IconMultiSelect;
