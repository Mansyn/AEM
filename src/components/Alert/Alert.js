import React from 'react';
import PropTypes from 'prop-types';
import { IconWarn } from '../Icon';

import './alert.scss';

/**
 * Alert - An Application Toolbar for displaying Alert/Warning information
 * @extends {React.Component}
 * @param {object} children Child elements of the Alert to be displayed
 *
 * @example:
 *  <Alert>
 *    Alert Text | Custom Tag
 *  </Alert>
 */
const Alert = ({ children }) => (
  <div className="usaf-alert">
    <div className="usaf-alert__icon">
      <IconWarn />
    </div>
    <div className="usaf-alert__content" >
      {children}
    </div>
  </div>
);

/**
 *
 * @type {Object}
 */
Alert.defaultProps = {};

/**
 *
 * @type {Object}
 */
Alert.propTypes = {
  children: PropTypes.node.isRequired
};

export default Alert;
