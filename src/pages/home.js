/* eslint-disable no-unused-vars */
// only for migration period

'use client';

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { basicSetup } from 'codemirror';
import { EditorView } from '@codemirror/view';
import { EditorState, EditorSelection } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { autocompletion } from '@codemirror/autocomplete';

import { useTranslation } from '@/lib/i18n';
import { marked as markedFactory } from '@/lib/content-processor/markdown-process.js';
import { textmath2laObj as textmath2laObjFactory } from '@/lib/content-processor/math-process';
import asciimath2mmlFactory from '@/lib/content-processor/am2mml.js';
import latex2mmlFactory from '@/lib/content-processor/tex2mml.js';
import mml2svg from '@/lib/content-processor/mml2svg.js';

import Button from '@/components/core/button';
import EditIconsTab from '@/components/edit-icons-tab';
import TipModal from '@/components/home/tip-modal';
import SettingModal from '@/components/home/setting-modal';
import { ReactComponent as QuestionCircleComponent } from '@/components/svg/question-circle.svg';
import { ReactComponent as SettingComponent } from '@/components/svg/settings.svg';

// TODO: mvoe the helpers to somewhere appropriate
import { myCompletions, bdconvert } from './helpers';

export default function Home() {
  const [basic, setBasic] = useState(false);
  const [data, setData] = useState('');
  const [showTipModal, setShowTipModal] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false);

  const [displayConfig, setDisplayConfig] = useState({
    htmlDocumentDisplay: 'markdown',
    htmlMathDisplay: 'block',
    latexDelimiter: 'bracket',
  });

  const [selectionStart, setSelectionStart] = useState(-1);
  const [selectionEnd, setSelectionEnd] = useState(-1);

  const codemirrorView = useRef(null);
  const inputArea = useRef(null);
  const importFile = useRef(null);

  const content = useMemo(() => {
    return data.split('\n').map((line) => {
      return textmath2laObjFactory({
        latex_delimiter: displayConfig.latexDelimiter,
        asciimath_delimiter: 'graveaccent',
      })(line).reduce((a, b) => {
        let result;
        if (b.type === 'latex-content') {
          result = `<div class="sr-only">${latex2mmlFactory({
            display: displayConfig.htmlMathDisplay,
          })(b.data)}</div><div aria-hidden="true">${mml2svg(
            latex2mmlFactory({
              display: displayConfig.htmlMathDisplay,
            })(b.data),
          )}</div>`;
        } else if (b.type === 'asciimath-content') {
          result = `<div class="sr-only">${asciimath2mmlFactory({
            display: displayConfig.htmlMathDisplay,
          })(b.data)}</div><div aria-hidden="true">${mml2svg(
            asciimath2mmlFactory({
              display: displayConfig.htmlMathDisplay,
            })(b.data),
          )}</div>`;
        } else {
          result = `${b.data}`;
        }
        return a + result;
      }, '');
    });
  }, [data, displayConfig]);

  const contentmd = useMemo(() => {
    return markedFactory({
      latex_delimiter: displayConfig.latexDelimiter,
      asciimath_delimiter: 'graveaccent',
      display: displayConfig.htmlMathDisplay,
    })(data);
  }, [data, displayConfig]);

  const createView = useCallback((content = '') => {
    if (codemirrorView.current) {
      codemirrorView.current.destroy();
    }
    const editorView = EditorView.theme({
      '&': {
        fontSize: '16px',
        backgroundColor: 'white',
        minHeight: '300px',
        height: '100%',
      },
      '.cm-scroller': { overflow: 'auto' },
    });
    codemirrorView.current = new EditorView({
      state: EditorState.create({
        doc: content,
        extensions: [
          basicSetup,
          autocompletion({
            override: [myCompletions],
          }),
          markdown(),
          EditorView.updateListener.of((update) => {
            setData(update.view.state.doc.toString());
          }),
          editorView,
          EditorView.lineWrapping,
        ],
      }),
      parent: document.getElementById('codemirror'),
    });
  }, []);

  useEffect(() => {
    createView();
  }, [createView]);

  const insertMark = useCallback(() => {
    if (basic) {
      const target = inputArea.current;
      const selectedText = target.value.slice(
        target.selectionStart,
        target.selectionEnd,
      );
      let LaTeX_delimiter_start = '\\(';
      let LaTeX_delimiter_end = '\\)';
      if (displayConfig.latexDelimiter === 'bracket') {
        LaTeX_delimiter_start = '\\(';
        LaTeX_delimiter_end = '\\)';
      } else if (displayConfig.latexDelimiter === 'dollar') {
        LaTeX_delimiter_start = '$';
        LaTeX_delimiter_end = '$';
      }
      const startOffset = LaTeX_delimiter_start.length;
      const endOffset = LaTeX_delimiter_end.length;
      const content = `${LaTeX_delimiter_start}${selectedText}${LaTeX_delimiter_end}`;

      setData(
        data.slice(0, target.selectionStart) +
          content +
          data.slice(target.selectionEnd, data.length),
      );

      setSelectionStart(target.selectionStart + startOffset);
      setSelectionEnd(target.selectionEnd + endOffset);
      return;
    }

    let LaTeX_delimiter_start = '\\(';
    let LaTeX_delimiter_end = '\\)';
    if (displayConfig.latexDelimiter === 'bracket') {
      LaTeX_delimiter_start = '\\(';
      LaTeX_delimiter_end = '\\)';
    } else if (displayConfig.latexDelimiter === 'dollar') {
      LaTeX_delimiter_start = '$';
      LaTeX_delimiter_end = '$';
    }
    const startOffset = LaTeX_delimiter_start.length;
    const endOffset = LaTeX_delimiter_end.length;
    const view = codemirrorView.current;
    view.dispatch(
      view.state.changeByRange((range) => {
        return {
          changes: [
            { from: range.from, insert: LaTeX_delimiter_start },
            { from: range.to, insert: LaTeX_delimiter_end },
          ],
          range: EditorSelection.range(
            range.from + startOffset,
            range.to + endOffset,
          ),
        };
      }),
    );
    view.focus();
  }, [basic, displayConfig, data]);

  const laTeXSepConvert = useCallback(
    (mode) => {
      if (basic) {
        setData(bdconvert(mode)(data));
        return;
      }

      const value = bdconvert(mode)(data);
      createView(value);
    },
    [basic, data, createView],
  );

  const importClick = useCallback(() => {
    importFile.current.click();
  }, []);

  const exportClick = useCallback(() => {
    const output = data;
    const url = window.URL.createObjectURL(new Blob([output]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'export.txt');
    document.body.appendChild(link);
    link.click();
  }, [data]);

  const insertLatex = useCallback(
    ({ latex, offset }) => {
      if (basic) {
        const target = inputArea.current;
        const content = latex;

        setData(
          data.slice(0, target.selectionStart) +
            content +
            data.slice(target.selectionEnd, data.length),
        );

        setSelectionStart(target.selectionStart + latex.length + offset);
        setSelectionEnd(target.selectionStart + latex.length + offset);
        return;
      }

      const view = codemirrorView.current;
      view.dispatch(
        view.state.changeByRange((range) => ({
          changes: [
            {
              from: range.from,
              insert: latex.slice(0, latex.length + offset),
            },
            {
              from: range.to,
              insert: latex.slice(latex.length + offset, latex.length),
            },
          ],
          range: EditorSelection.range(
            range.from + latex.length + offset,
            range.from + latex.length + offset,
          ),
        })),
      );
      view.focus();
    },
    [data, basic],
  );

  const importAction = useCallback(() => {
    // Import action logic here
  }, []);

  const t = useTranslation('home');

  return (
    <main className="container">
      <div className="home flex flex-col md:flex-row pt-16 md:pt-20 md:h-screen w-screen overflow-x-hidden overflow-y-auto">
        {/* Left side input panel */}
        <div className="md:w-1/2 bg-bg1 p-8 flex flex-col">
          <p role="heading" aria-level="1" className="text-2xl md:text-3xl">
            {t('editContent')}
          </p>
          <div className="flex justify-end mb-4 mt-8 md:mt-m1">
            <Button variant="primary" className="ml-2" onClick={insertMark}>
              {t('mark')}
            </Button>
            <Button
              variant="primary"
              className="ml-2"
              onClick={() => laTeXSepConvert('d2b')}
            >
              {t('dollar2bracket')}
            </Button>
            <Button
              variant="primary"
              className="ml-2"
              onClick={() => laTeXSepConvert('b2d')}
            >
              {t('bracket2dollar')}
            </Button>
            <Button variant="primary" className="ml-2" onClick={importClick}>
              {t('import')}
            </Button>
            <Button variant="primary" className="ml-2" onClick={exportClick}>
              {t('export')}
            </Button>
            <button
              className="hover:scale-110 transition-scale ml-2"
              onClick={() => setShowTipModal(true)}
              aria-label={t('descript')}
            >
              <QuestionCircleComponent />
            </button>
          </div>
          <EditIconsTab insertLatex={insertLatex} />
          <div className="flex flex-1">
            {basic ? (
              <textarea
                ref={inputArea}
                className="left-side-input-textarea flex-1 resize-none p-3 border border-bd1 overflow-y-scroll rounded-b-lg"
                type="text"
                value={data}
                onChange={(e) => {
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
              ref={importFile}
              type="file"
              className="hidden"
              onChange={importAction}
            />
          </div>
        </div>

        {/* Right side output panel */}
        <div className="md:w-1/2 flex flex-col md:h-full h-[600px] p-8">
          <div className="flex mb-4 w-100 justify-between">
            <p
              role="heading"
              aria-level="1"
              className="text-2xl md:text-3xl w-100"
            >
              {t('result')}
            </p>
            <button
              onClick={() => setShowSettingModal(true)}
              aria-label={t('setting')}
            >
              <SettingComponent />
            </button>
          </div>
          {displayConfig.htmlDocumentDisplay === 'markdown' ? (
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
      <TipModal isOpen={showTipModal} onClose={() => setShowTipModal(false)} />
      <SettingModal
        isOpen={showSettingModal}
        onClose={() => setShowSettingModal(false)}
        onSubmit={setDisplayConfig}
        displayConfig={displayConfig}
      />
    </main>
  );
}
