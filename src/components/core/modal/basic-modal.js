import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import i18n from '@/lib/i18n';

const BsicModal = ({
  title,
  isOpen,
  onClose,
  onCancel = () => {},
  onConfirm = () => {},
  hasCancel = true,
  hasConfirm = true,
  cancelLabel = i18n.t('modal.cancel'),
  confirmLabel = i18n.t('modal.confirm'),
  children,
}) => {
  return (
    <Transition.Root appear show={isOpen} as={Fragment}>
      <Dialog
        className="fixed z-10 inset-0 overflow-y-auto px-10"
        open={isOpen}
        onClose={onClose}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black/25" />
          <Dialog.Panel className="bg-white shadow-xl rounded-2xl p-4 z-10">
            <Dialog.Title>{title}</Dialog.Title>
            {children}
            {hasCancel && <button onClick={onCancel}>{cancelLabel}</button>}
            {hasConfirm && <button onClick={onConfirm}>{confirmLabel}</button>}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

BsicModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  cancelLabel: PropTypes.string,
  onConfirm: PropTypes.func,
  confirmLabel: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.element,
  hasCancel: PropTypes.bool,
  hasConfirm: PropTypes.bool,
};

export default BsicModal;
