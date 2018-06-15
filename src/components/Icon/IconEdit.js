import React from 'react';
import Icon from './Icon';

/**
 *  IconEdit
 *
 *  SVG edit icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconEdit />
 *    <IconEdit theme="primary" />
 */
const IconEdit = props => (
  <Icon {...props} >
    <path d="M0 9.3h4.6V56H0zm41.7 23.4h4.6V56h-4.6z" />
    <path d="M-.04 9.372h23.2v4.7H-.04zm-.004 42.005h46.4v4.7h-46.4zm17.18-26.635L13.9 28v14h13.9l3.248-3.26m19.915-19.985L56 13.7 41.7 0l-4.687 4.72m-2.67 30.715L47.67 22.06 33.724 8.033l-13.3 13.397" />
  </Icon>
);

export default IconEdit;
