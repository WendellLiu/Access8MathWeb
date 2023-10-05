import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@headlessui/react';

import { useTranslation } from '@/lib/i18n';
import mainTabList from '@/lib/tabs/main';
import markdowns from '@/lib/tabs/markdowns';

import { compare } from '@/lib/data-process';
import mathTabList from '@/lib/tabs/math';

const EditIconsTab = ({ insertLatex }) => {
  const [mainActive, setMainActive] = useState('markdown');
  const [mathTabActive, setMathTabActive] = useState(null);

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
              >
                {t(`main.${id}`)}
              </Tab>
            ))}
          </Tab.List>
        </div>
        <div>
          <Tab.Panels
            as="div"
            className="bg-bg2 border border-gray-300 flex flex-wrap"
          >
            <Tab.Panel>
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
                <Tab.Panels
                  as="div"
                  className="bg-bg2 border border-gray-300 flex flex-wrap"
                >
                  {mathTabList.map((mathTab) => {
                    return (
                      <Tab.Panel key={mathTab.id}>
                        {(mathTab?.subTabs || [])
                          .sort(compare('order', 'asc'))
                          .map((subTab) => (
                            <button
                              key={subTab.id}
                              className="w-w5 h-w5 bg-white border group relative"
                              aria-label={t(`latexs.${subTab.id}`)}
                              onClick={() => insertLatex(subTab)}
                            >
                              <subTab.Icon size={51} />
                              <Tab
                                as="div"
                                className="absolute p-4 shadow-lg hidden bg-bg2 group-hover:block whitespace-nowrap z-10"
                                style={{
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  top: '55px',
                                }}
                              >
                                {t(`latexs.${subTab.id}`)}
                              </Tab>
                            </button>
                          ))}
                      </Tab.Panel>
                    );
                  })}
                </Tab.Panels>
              </Tab.Group>
            </Tab.Panel>
            <Tab.Panel>
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
            </Tab.Panel>
          </Tab.Panels>
        </div>
        {mainActive === 'math' && <div></div>}
      </Tab.Group>
    </div>
  );
};

EditIconsTab.propTypes = {
  insertLatex: PropTypes.func,
};

export default EditIconsTab;
