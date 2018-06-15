import React from 'react';
import Icon from './Icon';

/**
 *  IconRadio
 *
 *  SVG radio icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconRadio />
 *    <IconRadio theme="primary" />
 */
const IconRadio = props => (
  <Icon {...props} className="usaf-radio__icon">
    <circle className="usaf-radio__stroke" cx="28" cy="28" r="28" />
    <circle className="usaf-radio__fill" cx="28" cy="28" r="22" />
    <circle className="usaf-radio__dot" cx="28" cy="28" r="12" />
  </Icon>
);

export default IconRadio;
