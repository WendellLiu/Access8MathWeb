import React, { Fragment, useMemo } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline';

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

const solutions = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of your traffic',
    href: '#',
    icon: ChartPieIcon,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers',
    href: '#',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Security',
    description: "Your customers' data will be safe and secure",
    href: '#',
    icon: FingerPrintIcon,
  },
  {
    name: 'Integrations',
    description: 'Connect with third-party tools',
    href: '#',
    icon: SquaresPlusIcon,
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will convert',
    href: '#',
    icon: ArrowPathIcon,
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
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <span>{t('more')}</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
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
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {items.map(({ id, name, href }) => (
                <div
                  key={id}
                  className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div>
                    <a href={href} className="font-semibold text-gray-900">
                      {name}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default NativeMenu;
