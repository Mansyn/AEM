import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({ children }) => (
  <div className="usaf-tab">
    {children}
  </div>
);

// Tab's properties. The label property is used by TabGroup.
Tab.propTypes = {
  label: PropTypes.string.isRequired, // eslint-disable-line
  children: PropTypes.element.isRequired
};

export default Tab;
