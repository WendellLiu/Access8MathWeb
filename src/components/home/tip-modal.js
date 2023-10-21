import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from '@/lib/i18n';
import BasicModal from '@/components/core/modal/basic-modal';

const TipModal = ({ isOpen, onClose }) => {
  const t = useTranslation('tip-modal');

  const tips = t('tips', { returnObjects: true });

  return (
    <BasicModal
      title={t('title')}
      isOpen={isOpen}
      hasConfirm={false}
      onClose={onClose}
      onCancel={onClose}
    >
      <div className="mt-m2">
        {tips.map(({ title, content }, index) => (
          <div key={index} className="py-p5 px-m2 text-left text-lg">
            <b>{title}</b>
            <p>{content}</p>
          </div>
        ))}
      </div>
    </BasicModal>
  );
};

TipModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  cancelLabel: PropTypes.string,
  onConfirm: PropTypes.func,
  confirmLabel: PropTypes.string,
  title: PropTypes.string,
};

export default TipModal;
