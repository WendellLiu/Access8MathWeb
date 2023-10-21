import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from '@/lib/i18n';
import BasicModal from '@/components/core/modal/basic-modal';

const SettingModal = ({ isOpen, onClose, onSubmit }) => {
  const t = useTranslation('setting-modal');

  const optionGroup = useMemo(() => {
    return [
      {
        name: t('htmlDocumentDisplay.name'),
        options: [
          {
            value: 'markdown',
            label: t('htmlDocumentDisplay.markdown'),
          },
          {
            value: 'text',
            label: t('htmlDocumentDisplay.text'),
          },
        ],
      },
    ];
  }, [t]);

  return (
    <BasicModal
      title={t('title')}
      isOpen={isOpen}
      hasCancel={false}
      onClose={onClose}
      onConfirm={onSubmit}
      confirmLabel={t('cancelLabel')}
    >
      <div>
        {optionGroup.map(({ name, options }) => {
          return (
            <div key={name} className="py-2 px-2 text-left text-lg">
              <div>
                <h3>{name}</h3>
              </div>
              {options.map(({ value, label }) => {
                return (
                  <div className="py-1 pr-4 inline-block" key={value}>
                    <input id={value} type="radio" value={value} name={value} />
                    <label htmlFor={value}>{label}</label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </BasicModal>
  );
};

SettingModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default SettingModal;
