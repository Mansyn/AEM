import React from 'react';
import Icon from './Icon';

/**
 *  IconExport
 *
 *  SVG export icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
*
 *  @example
 *    <IconExport />
 *    <IconExport theme="primary" />
 */
const IconExport = props => (
  <Icon {...props} >
    <path d="M0 8.6h47.4v4.3H0zM41 0h15v4.3H41z" />
    <path d="M51.668-.037h4.3v15h-4.3zM.044 8.55h4.3v47.4h-4.3z" />
    <path d="M.008 51.706h47.4v4.3H.008z" />
    <path d="M43.064 8.557h4.3v47.4h-4.3z" />
    <path d="M53.7 5.8L36.5 23h-3.1v-3L50.7 2.8" />
  </Icon>
);

export default IconExport;
