import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { LanguageIcon } from '@heroicons/react/20/solid';

import i18n, { useTranslation } from '@/lib/i18n';

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
      <Popover.Button className="flex items-center text-xl font-semibold leading-8 text-gray-900">
        <LanguageIcon className="h-5 w-5 flex-none mr-1" aria-hidden="true" />
        <span>{commonT(`locale.${i18n.language}`)}</span>
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
                  className="group relative flex rounded-lg p-4 hover:bg-gray-50 font-semibold text-gray-900 w-full"
                  onClick={() => i18n.changeLanguage(locale)}
                >
                  {commonT(`locale.${locale}`)}
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
