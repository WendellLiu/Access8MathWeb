import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from '@/lib/i18n';
import BasicModal from '@/components/core/modal/basic-modal';

const SettingModal = ({ isOpen, onClose, updateConfig, displayConfig }) => {
  const t = useTranslation('setting-modal');

  const optionGroup = useMemo(() => {
    return [
      {
        configName: 'htmlDocumentDisplay',
        configLabel: t('htmlDocumentDisplay.name'),
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
      {
        configName: 'htmlMathDisplay',
        configLabel: t('htmlMathDisplay.name'),
        options: [
          {
            value: 'block',
            label: t('htmlMathDisplay.block'),
          },
          {
            value: 'inline',
            label: t('htmlMathDisplay.inline'),
          },
        ],
      },
      {
        configName: 'latexDelimiter',
        configLabel: t('latexDelimiter.name'),
        options: [
          {
            value: 'bracket',
            label: t('latexDelimiter.bracket'),
          },
          {
            value: 'dollar',
            label: t('latexDelimiter.dollar'),
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
      onConfirm={onClose}
      confirmLabel={t('finish')}
    >
      <div>
        {optionGroup.map(({ configName, configLabel, options }) => {
          return (
            <div key={configName} className="py-2 px-2 text-left text-lg">
              <div>
                <h3>{configLabel}</h3>
              </div>
              {options.map(({ value, label }) => {
                return (
                  <div className="py-1 pr-4 inline-block" key={value}>
                    <input
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      id={value}
                      type="radio"
                      value={value}
                      name={value}
                      checked={displayConfig[configName] === value}
                      onChange={() => {
                        updateConfig(configName, value);
                      }}
                    />
                    <label
                      className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                      htmlFor={value}
                    >
                      {label}
                    </label>
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
  updateConfig: PropTypes.func,
  displayConfig: PropTypes.shape({
    htmlDocumentDisplay: PropTypes.string,
    htmlMathDisplay: PropTypes.string,
    latexDelimiter: PropTypes.string,
  }),
};

export default SettingModal;
