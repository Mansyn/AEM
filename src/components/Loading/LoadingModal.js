import React from 'react';
import PropTypes from 'prop-types';
import { default as ReactModal } from 'react-modal';
import LoadingStripes from './LoadingStripes';
import './loading-modal.scss';

/**
 * Loading Modal
 *
 * An indeterminate loader as a modal. Uses ReactModal.
 *
 * @param {Object} props
 * @property {Boolean} [props.isOpen] - Whether modal is open or not, toggle to open/close.
 * @property {Node} [props.children] - Message to display
 * @return {ReactElement}
 *
 * @example
 * <LoadingModal isOpen={true|false}>Results Loading</LoadingModal>
 *
 */

const LoadingModal = ({ isOpen, children }) => (
  <ReactModal
    isOpen={isOpen}
    contentLabel="usaf modal"
    portalClassName="usaf-modal__portal"
    overlayClassName="usaf-modal__overlay"
    className={'usaf-modal__window usaf-loading-modal__window'}
  >
    <LoadingStripes />

    <div className="usaf-loading-modal__content">
      {children}
    </div>
  </ReactModal>
);

LoadingModal.defaultProps = {
  isOpen: false
};

LoadingModal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node
};

export default LoadingModal;
