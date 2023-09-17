import React, { useState } from 'react';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react';

import { compare } from '@/lib/data-process';
import latexs from '@/lib/latexs';
import markdowns from '@/lib/markdowns';
import tabs from '@/lib/tabs';

import SvgIcon from '@/components/SvgIcon';

const insertLatex = () => {};

const EditIconsTab = () => {
  const mains = ['math', 'mark_down'];
  const [mainActive, setMainActive] = useState(0);
  const [active, setActive] = useState(0);
  const orderLatexs = latexs.sort(compare('order', 'asc'));

  return (
    <div>
      {/* Main category icons of symbols */}
      <TabGroup as="div" onChange={(mainK) => setMainActive(mainK)}>
        <div className="flex padding_bottom">
          <TabList
            as="div"
            className="flex-auto xl:grow-0 flex flex-wrap xl:flex-nowrap bg-white"
          >
            {mains.map((tab, mainK) => (
              <Tab
                as="button"
                key={mainK}
                className={`category-icon w-24 h-12 flex-basis-like-1/3 xl:flex-basis-auto grow xl:grow-0 xl:shrink-0 order mx-0.5 border bg-gray-50 text-sm text-center cursor-pointer transition-color ${
                  mainActive === mainK ? 'main_active' : ''
                }`}
                onClick={() => setMainActive(mainK)}
              >
                {`default.mains.${tab}`}
              </Tab>
            ))}
          </TabList>
        </div>
        {mainActive === 1 && (
          <div>
            <TabPanels
              as="div"
              className="bg-bg2 border border-gray-300 flex flex-wrap"
            >
              {markdowns.map((icon) => (
                <button
                  key={icon.id}
                  className="w-w5 h-w5 bg-white border group relative"
                  aria-label={`default.markdown.${icon.id}`}
                  onClick={() => insertLatex(icon)}
                >
                  <SvgIcon name={icon.id} size={51} />
                  <Tab
                    as="div"
                    className="absolute p-4 shadow-lg hidden bg-bg2 group-hover:block whitespace-nowrap z-10"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)',
                      top: '55px',
                    }}
                  >
                    {`default.markdown.${icon.id}`}
                  </Tab>
                </button>
              ))}
            </TabPanels>
          </div>
        )}
        {mainActive === 0 && (
          <div>
            <TabGroup as="div" onChange={(k) => setActive(k)}>
              <div className="flex">
                <TabList
                  as="div"
                  className="flex-auto flex flex-wrap xl:flex-nowrap bg-white"
                >
                  {tabs.map((tab, k) => (
                    <Tab
                      as="button"
                      key={k}
                      aria-label={`default.categorys.${tab}`}
                      className={`group relative category-icon h-12 flex-basis-like-1/3 xl:flex-basis-auto grow xl:shrink-0 order mx-0.5 border bg-gray-50 cursor-pointer transition-color ${
                        active === k ? 'active' : ''
                      }`}
                      onClick={() => setActive(k)}
                    >
                      <SvgIcon name={tab} size={48} />
                      <div
                        className="absolute p-4 shadow-lg hidden bg-bg2 group-hover:block whitespace-nowrap z-10"
                        style={{
                          left: '50%',
                          transform: 'translateX(-50%)',
                          top: '55px',
                        }}
                      >
                        {`default.categorys.${tab}`}
                      </div>
                    </Tab>
                  ))}
                </TabList>
              </div>
              {/* Sub category icons of symbols */}
              <TabPanels
                as="div"
                className="bg-bg2 border border-gray-300 flex flex-wrap"
              >
                {tabs.map((tab, k) => (
                  <TabPanel key={k}>
                    {orderLatexs
                      .filter((latex) => latex.category === tab.toLowerCase())
                      .map((icon) => (
                        <button
                          key={icon.id}
                          className="w-w5 h-w5 bg-white border group relative"
                          aria-label={`default.latexs.${icon.id}`}
                          onClick={() => insertLatex(icon)}
                        >
                          <SvgIcon name={icon.id} size={51} />
                          <Tab
                            as="div"
                            className="absolute p-4 shadow-lg hidden bg-bg2 group-hover:block whitespace-nowrap z-10"
                            style={{
                              left: '50%',
                              transform: 'translateX(-50%)',
                              top: '55px',
                            }}
                          >
                            {`default.latexs.${icon.id}`}
                          </Tab>
                        </button>
                      ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>
          </div>
        )}
      </TabGroup>
    </div>
  );
};

export default EditIconsTab;
