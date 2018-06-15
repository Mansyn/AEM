import React from 'react';
import PropTypes from 'prop-types';
import { default as ReactModal } from 'react-modal';
import Button from '../Button/Button';
import { IconClose } from '../Icon';
import './modal.scss';

/**
 *  Modal
 *
 *  This is a basic modal component on which specific modals will be built.
 *
 *  @param {Object} props
 *  @param {String} props.isOpen - Whether modal is open or not, toggle to open/close.
 *  @param {String} props.className - Class name to add to the modal's container.
 *  @param {String} props.title - Modal title, appears in h1 tag.
 *  @param {String} props.onClose - Method to call on clicking the close button at top right.
 *  @param {Node} props.children - Content of the modal.
 */
const Modal = ({ isOpen, className, title, onClose, children }) => (
  <ReactModal
    isOpen={isOpen}
    title={title}
    contentLabel="usaf modal"
    portalClassName="usaf-modal__portal"
    overlayClassName="usaf-modal__overlay"
    className={`usaf-modal__window ${className}`}
    onRequestClose={onClose}
  >
    <h1 className="usaf-modal__title">{title}</h1>
    <Button
      theme="icon"
      onClick={onClose}
      className="usaf-modal__close-btn"
    >
      <IconClose />
    </Button>

    <div className="usaf-modal__content">
      {children}
    </div>
  </ReactModal>
);

export default Modal;

Modal.defaultProps = {
  isOpen: false,
  className: ''
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};
