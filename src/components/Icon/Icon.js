import React from 'react';
import PropTypes from 'prop-types';
import './icon.scss';

/**
 *  Icon
 *
 *  This is the wrapper component for building SVG icons.
 *
 *  @param {Object} props
 *  @param {String} props.theme - Optional color setting to apply to the icon
 *  @param {String} props.className - Optional className, used for multi color icons
 *  @param {Node} props.children - SVG paths for the icon
 *  @return {JSX} SVG element containing an icon
 */
const Icon = ({ theme, children, className }) => {
  const themeClass = theme ? `usaf-icon--${theme}` : '';

  return (
    <span className={`usaf-icon ${themeClass} ${className}`}>
      <svg className="usaf-icon__svg "viewBox="0 0 56 56">
        {children}
      </svg>
    </span>
  );
};

Icon.defaultProps = {
  className: ''
};

Icon.propTypes = {
  theme: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Icon;
