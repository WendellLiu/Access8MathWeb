import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';

import { useTranslation } from '@/lib/i18n';
import { changeLanguage } from 'i18next';

const LANGUAGES = [
  { locale: 'zh-TW' },
  {
    locale: 'en',
  },
];

const LanguageMenu = () => {
  const commonT = useTranslation('common');

  return (
    <Popover className="relative">
      <Popover.Button className="text-xl font-semibold leading-8 text-gray-900">
        <span>Laungage</span>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {LANGUAGES.map(({ locale }) => (
                <button
                  key={locale}
                  className="group relative flex rounded-lg p-4 hover:bg-gray-50 font-semibold text-gray-900"
                  onClick={() => changeLanguage(locale)}
                >
                  {commonT(locale)}
                </button>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default LanguageMenu;
