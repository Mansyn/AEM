import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import './modal.scss';

/**
 *  ConfirmModal
 *
 *  This is a confirmation modal component.
 *
 *  @param {Object} props
 *  @param {String} props.isOpen - Whether modal is open or not, toggle to open/close.
 *  @param {String} props.title - Modal title, appears in h1 tag.
 *  @param {Function} props.onClose - Method to call on clicking the close button at top right.
 *  @param {String} props.confirmLabel - Text label for 'confirm' button, defaults to 'OK'.
 *  @param {String} props.cancelLabel - Text label for 'cancel' button, defaults to 'Cancel'.
 *  @param {Function} props.onConfirm - Method to call on clicking the confirm buttom.
 *  @param {Function} props.onCancel - Method to call on clicking the cancel buttom.
 *  @param {Node} props.children - Content of the modal.
 */
const ConfirmModal = ({
  isOpen,
  title,
  onClose,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  children
}) => (
  <Modal
    isOpen={isOpen}
    title={title}
    onClose={onClose}
    className="usaf-modal--confirm"
  >
    {children}

    <div className="usaf-modal__btn-bar">
      <Button
        onClick={onConfirm}
        theme="primary"
      >
        {confirmLabel}
      </Button>
      <Button
        onClick={onCancel}
        theme="secondary"
      >
        {cancelLabel}
      </Button>
    </div>
  </Modal>
);

export default ConfirmModal;

ConfirmModal.defaultProps = {
  isOpen: false,
  confirmLabel: 'OK',
  cancelLabel: 'Cancel'
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};
