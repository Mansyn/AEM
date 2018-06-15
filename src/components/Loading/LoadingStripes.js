import React from 'react';
import PropTypes from 'prop-types';
import './loading-stripes.scss';

/**
 * LoadingStripes
 *
 * Indeterminate or progressive loading animation
 *
 * @param {Object} props
 * @param {Number} [props.progress] - float (0 - 1) representing loaded percentage
 * @return {ReactElement} markup
 *
 * @example <LoadingStripes progress={0.3} />
 */
const LoadingStripes = ({ progress }) => {
  const styles = {};
  let isProgress = '';

  if (progress) {
    styles.width = `${progress * 100}%`;
    isProgress = 'usaf-loading-stripes--progress';
  }

  return (
    <div style={styles} className={`usaf-loading-stripes ${isProgress}`} />
  );
};


LoadingStripes.defaultProps = { progress: 1 };

LoadingStripes.propTypes = {
  progress: PropTypes.number
};

export default LoadingStripes;
