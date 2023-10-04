import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@headlessui/react';

import { useTranslation } from '@/lib/i18n';
import mainTabList from '@/lib/tabs/main';
import markdowns from '@/lib/tabs/markdowns';

// import { compare } from '@/lib/data-process';
// import markdowns from '@/lib/markdowns';
import mathTabList from '@/lib/tabs/math';

const mathTabListById = mathTabList.reduce((acc, currentTab) => {
  return {
    ...acc,
    [currentTab.id]: currentTab,
  };
}, {});

const EditIconsTab = ({ insertLatex }) => {
  const [mainActive, setMainActive] = useState('markdown');
  const [mathTabActive, setMathTabActive] = useState('common');
  //
  const t = useTranslation('tabs');

  return (
    <div>
      <Tab.Group as="div">
        <div className="flex padding_bottom">
          <Tab.List
            as="div"
            className="flex-auto xl:grow-0 flex flex-wrap xl:flex-nowrap bg-white"
          >
            {mainTabList.map(({ id }) => (
              <Tab
                as="button"
                key={id}
                className={`category-icon w-24 h-12 flex-basis-like-1/3 xl:flex-basis-auto grow xl:grow-0 xl:shrink-0 order mx-0.5 border bg-gray-50 text-sm text-center cursor-pointer transition-color ${
                  mainActive === id ? 'main_active' : ''
                }`}
                onClick={() => setMainActive(id)}
              >
                {t(`main.${id}`)}
              </Tab>
            ))}
          </Tab.List>
        </div>
        {mainActive === 'markdown' && (
          <div>
            <Tab.Panels
              as="div"
              className="bg-bg2 border border-gray-300 flex flex-wrap"
            >
              {markdowns.map((tab) => (
                <button
                  key={tab.id}
                  className="w-w5 h-w5 bg-white border group relative"
                  aria-label={t(`markdown.${tab.id}`)}
                  onClick={() => insertLatex(tab)}
                >
                  <tab.Icon size={51} />
                  <Tab
                    as="div"
                    className="absolute p-4 shadow-lg hidden bg-bg2 group-hover:block whitespace-nowrap z-10"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)',
                      top: '55px',
                    }}
                  >
                    {t(`markdown.${tab.id}`)}
                  </Tab>
                </button>
              ))}
            </Tab.Panels>
          </div>
        )}
        {mainActive === 'math' && (
          <div>
            <Tab.Group as="div">
              <div className="flex">
                <Tab.List
                  as="div"
                  className="flex-auto flex flex-wrap xl:flex-nowrap bg-white"
                >
                  {mathTabList.map((tab) => (
                    <Tab
                      as="button"
                      key={tab.id}
                      aria-label={t(`categorys.${tab.id}`)}
                      className={`group relative category-icon h-12 flex-basis-like-1/3 xl:flex-basis-auto grow xl:shrink-0 order mx-0.5 border bg-gray-50 cursor-pointer transition-color ${
                        mathTabActive === tab.id ? 'active' : ''
                      }`}
                      onClick={() => setMathTabActive(tab.id)}
                    >
                      <tab.Icon size={48} />
                      <div
                        className="absolute p-4 shadow-lg hidden bg-bg2 group-hover:block whitespace-nowrap z-10"
                        style={{
                          left: '50%',
                          transform: 'translateX(-50%)',
                          top: '55px',
                        }}
                      >
                        {t(`categorys.${tab.id}`)}
                      </div>
                    </Tab>
                  ))}
                </Tab.List>
              </div>
              {
                <Tab.Panels
                  as="div"
                  className="bg-bg2 border border-gray-300 flex flex-wrap"
                >
                  <Tab.Panel>
                    {mathTabListById[mathTabActive].subTabs.map((tab) => (
                      <button
                        key={tab.id}
                        className="w-w5 h-w5 bg-white border group relative"
                        aria-label={t(`latexs.${tab.id}`)}
                        onClick={() => insertLatex(tab)}
                      >
                        <tab.Icon size={51} />
                        <Tab
                          as="div"
                          className="absolute p-4 shadow-lg hidden bg-bg2 group-hover:block whitespace-nowrap z-10"
                          style={{
                            left: '50%',
                            transform: 'translateX(-50%)',
                            top: '55px',
                          }}
                        >
                          {t(`latexs.${tab.id}`)}
                        </Tab>
                      </button>
                    ))}
                  </Tab.Panel>
                </Tab.Panels>
              }
            </Tab.Group>
          </div>
        )}
      </Tab.Group>
    </div>
  );
};

EditIconsTab.propTypes = {
  insertLatex: PropTypes.func,
};

export default EditIconsTab;
