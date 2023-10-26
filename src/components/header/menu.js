import React, { Fragment, useMemo } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { useTranslation } from '@/lib/i18n';

const ABOUT_ITEMS = [
  { id: 'tutorialVideo', href: 'https://www.youtube.com/watch?v=E6DuuiuS6zo' },
  {
    id: 'tutorialDownload',
    href: 'https://drive.google.com/drive/folders/1fVrQjhHEypOGr3lVcqBsmk0f_u_FD1IP',
  },
  { id: 'caseSharing', href: 'https://medium.com/p/cbf266d6f9b6' },
  {
    id: 'audiovisualReport',
    href: 'https://www.youtube.com/watch?v=11JjNgEJdrM',
  },
  {
    id: 'ntnuNews',
    href: 'https://pr.ntnu.edu.tw/ntnunews/index.php?mode=data&id=21099',
  },
  {
    id: 'developmentRepository',
    href: 'https://github.com/tsengwoody/Access8Math',
  },
];

const NativeMenu = () => {
  const t = useTranslation('menu');

  const items = useMemo(() => {
    return ABOUT_ITEMS.map((item) => {
      return {
        ...item,
        name: t(item.id),
      };
    });
  }, [t]);

  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center md:text-xl text-base font-semibold leading-8 text-gray-900">
        <span>{t('more')}</span>
        <ChevronDownIcon
          className="h-5 w-5 flex-none text-gray-400 ml-1"
          aria-hidden="true"
        />
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
        <Popover.Panel className="absolute right-0 z-10 mt-5 flex w-screen max-w-max">
          <div className="overflow-hidden rounded-xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div>
              {items.map(({ id, name, href }) => (
                <a
                  key={id}
                  href={href}
                  className="font-semibold text-gray-900 group relative flex rounded-lg p-4 hover:bg-gray-50"
                  target="_blank"
                  rel="noreferrer"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default NativeMenu;