import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './data-refresh.scss';

/**
 * Component to display data refresh information
 *
 * @type {function} DataRefresh component as pure function
 * @param {Object} props
 * @param {Number} props.refreshDate - date passed in as a number
 * @param {String} props.dataSource - name of the data source used to get the data from
 * @param {String} props.dateFormat - string used to format the data (using moment format)
 * @return {ReactElement} markup
 */
const DataRefresh = ({ refreshDate, dataSource, dateFormat }) => (
  <div className="usaf-data-refresh">
    Data last refreshed: {moment.utc(refreshDate).format(dateFormat)}
    <br />
    Data Source: {dataSource}
  </div>
);

DataRefresh.propTypes = {
  dateFormat: PropTypes.string,
  refreshDate: PropTypes.number.isRequired,
  dataSource: PropTypes.string.isRequired
};

DataRefresh.defaultProps = {
  dateFormat: 'D MMMM YYYY HH:MM [Z]'
};

export default DataRefresh;
