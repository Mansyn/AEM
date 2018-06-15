import React from 'react';
import PropTypes from 'prop-types';
import './app-bar.scss';

/**
 * AppBar - An Application Toolbar
 * @extends {React.Component}
 * @property {boolean} borderBottom True if the bottom border will be displayed
 * @property {boolean} borderTop True if the top border will be displayed
 * @property {object} children Child elements of the AppBar to be displayed
 */
const AppBar = ({ children, borderBottom, borderTop }) => {
  let appBarContentClass = 'usaf-app-bar__content';
  if (borderBottom) appBarContentClass += ' usaf-app-bar--bottom';
  if (borderTop) appBarContentClass += ' usaf-app-bar--top';

  return (
    <div className="usaf-app-bar">
      <div className={appBarContentClass}>
        {children}
      </div>
    </div>
  );
};

export default AppBar;

/**
 *
 * @type {Object}
 */
AppBar.defaultProps = {
  borderBottom: false,
  borderTop: false
};

/**
 *
 * @type {Object}
 */
AppBar.propTypes = {
  borderBottom: PropTypes.bool,
  borderTop: PropTypes.bool,
  children: PropTypes.node.isRequired
};
