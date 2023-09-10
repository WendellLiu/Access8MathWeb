'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';

import { marked as markedFactory } from 'lib/content-processor/markdown-process.js';
import { textmath2laObj as textmath2laObjFactory } from 'lib/content-processor/math-process';
import asciimath2mmlFactory from 'lib/content-processor/am2mml.js';
import latex2mmlFactory from 'lib/content-processor/tex2mml.js';
import mml2svg from 'lib/content-processor/mml2svg.js';

export default function Home() {
  console.log('hit Home');
  const [basic, setBasic] = useState(true);
  const [data, setData] = useState('');
  const [showUseTipModal, setShowUseTipModal] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [selecteds, setSelecteds] = useState({
    HTML_document_display: 'markdown',
    HTML_math_display: 'block',
    color_match: 'blackTextOnWhiteBackground',
    LaTeX_delimiter: 'bracket',
  });
  const [selectionStart, setSelectionStart] = useState(-1);
  const [selectionEnd, setSelectionEnd] = useState(-1);
  const [inputArea, setInputArea] = useState(null);
  const [importFile, setImportFile] = useState(null);
  const [codemirrorView, setCodemirrorView] = useState(null);

  const content = useMemo(() => {
    return data.split('\n').map((line) => {
      return textmath2laObjFactory({
        latex_delimiter: selecteds['LaTeX_delimiter'],
        asciimath_delimiter: 'graveaccent',
      })(line).reduce((a, b) => {
        let result;
        if (b.type === 'latex-content') {
          result = `<div class="sr-only">${latex2mmlFactory({
            display: selecteds['HTML_math_display'],
          })(b.data)}</div><div aria-hidden="true">${mml2svg(
            latex2mmlFactory({
              display: selecteds['HTML_math_display'],
            })(b.data),
          )}</div>`;
        } else if (b.type === 'asciimath-content') {
          result = `<div class="sr-only">${asciimath2mmlFactory({
            display: selecteds['HTML_math_display'],
          })(b.data)}</div><div aria-hidden="true">${mml2svg(
            asciimath2mmlFactory({
              display: selecteds['HTML_math_display'],
            })(b.data),
          )}</div>`;
        } else {
          result = `${b.data}`;
        }
        return a + result;
      }, '');
    });
  }, [data, selecteds]);

  const contentmd = useMemo(() => {
    return markedFactory({
      latex_delimiter: selecteds['LaTeX_delimiter'],
      asciimath_delimiter: 'graveaccent',
      display: selecteds['HTML_math_display'],
    })(data);
  }, [data, selecteds]);

  const EditIconsTab = () => <div>EditIconsTab</div>;

  const insertMark = () => {
    // Insert mark logic here
  };

  const LaTeXSepConvert = (type) => {
    // LaTeX Sep Convert logic here
  };

  const importClick = () => {
    // Import click logic here
  };

  const exportClick = () => {
    // Export click logic here
  };

  const insertLatex = () => {
    // Insert LaTeX logic here
  };

  const importAction = () => {
    // Import action logic here
  };

  const $t = useTranslations('Home');

  return (
    <div className="home flex flex-wrap pt-16 md:pt-p2 h-screen w-screen overflow-x-hidden overflow-y-auto">
      {/* Left side input panel */}
      <div className="w-2/4 p-p1 flex-basis-like-1/1 grow md:flex-1 bg-bg1 text-left pt-p1 pl-p3 pr-p3 flex flex-col">
        <p role="heading" aria-level="1" className="text-2xl md:text-3xl">
          {$t('editContent')}
        </p>
        <div className="mt-8 md:mt-m1 flex justify-end items-center mb-m2">
          <button className="home-btn" onClick={insertMark}>
            {$t('mark')}
          </button>
          <button className="home-btn" onClick={() => LaTeXSepConvert('d2b')}>
            {$t('dollar2bracket')}
          </button>
          <button className="home-btn" onClick={() => LaTeXSepConvert('b2d')}>
            {$t('bracket2dollar')}
          </button>
          <button className="home-btn" onClick={importClick}>
            {$t('import')}
          </button>
          <button className="home-btn" onClick={exportClick}>
            {$t('export')}
          </button>
          <button
            className="hover:scale-110 transition-scale"
            onClick={() => setShowUseTipModal(true)}
            aria-label={$t('descript')}
          >
            tipmodal
          </button>
        </div>
        <EditIconsTab insert-latex={insertLatex} />
        <div className="flex flex-1">
          {basic ? (
            <textarea
              className="left-side-input-textarea flex-1 resize-none p-3 border border-bd1 overflow-y-scroll rounded-b-lg"
              ref="inputArea"
              type="text"
              value={data}
              onChange={(e) => {
                console.log('textarea onChange', e.target.value);
                setData(e.target.value);
              }}
            />
          ) : (
            <div
              id="codemirror"
              className="left-side-input-textarea flex-1 resize-none border border-bd1 overflow-y-scroll rounded-b-lg"
            ></div>
          )}
          <input
            type="file"
            ref="importFile"
            className="hidden"
            onChange={importAction}
          />
        </div>
      </div>

      {/* Right side output panel */}
      <div className="w-2/4 flex-basis-like-1/1 grow md:flex-1 text-left p-p1 pt-p1 pl-p3 flex flex-col">
        <div className="flex md:mb-m3 w-100">
          <p
            role="heading"
            aria-level="1"
            className="text-2xl md:text-3xl w-100"
          >
            {$t('result')}
          </p>
          <button
            onClick={() => setShowSettingModal(true)}
            aria-label={$t('useSetting')}
          >
            modal
          </button>
        </div>
        {selecteds['HTML_document_display'] === 'markdown' ? (
          <div
            className="right-side-input-textarea border-2 overflow-scroll p-4 flex-1 rounded-lg"
            dangerouslySetInnerHTML={{ __html: contentmd }}
          />
        ) : (
          <div className="right-side-input-textarea border-2 overflow-scroll p-4 flex-1 rounded-lg">
            {content.map((line, key) => (
              <span key={key}>
                <span dangerouslySetInnerHTML={{ __html: line }} />
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
