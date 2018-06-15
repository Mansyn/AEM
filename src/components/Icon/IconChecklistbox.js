import React from 'react';
import Icon from './Icon';

/**
 *  IconChecklistbox
 *
 *  SVG back icon
 *
 *  @param {Object} props - Properties to pass through to the {@link Icon} component
 *  @return {JSX} SVG element containing an icon
 *
 *  @example
 *    <IconChecklistbox />
 */
const IconChecklistbox = props => (
  <Icon {...props}>
    <path className="usaf-icon-checklistbox__box" d="M0 2.232h50v45.536H0z" />
    <path className="usaf-icon-checklistbox__partial" d="M0 47.768V2.232h50" />
    <path className="usaf-icon-checklistbox__check" d="M50 7.143l-6.518-4.91-25.09 33.124L5.805 22.68 0 28.48l19.286 19.286" />
  </Icon>
);

export default IconChecklistbox;
