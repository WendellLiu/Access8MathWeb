// only for migration period
/* eslint-disable no-unused-vars */

'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { basicSetup } from 'codemirror';
import { EditorView } from '@codemirror/view';
import { EditorState, EditorSelection } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { autocompletion } from '@codemirror/autocomplete';

import { marked as markedFactory } from '@/lib/content-processor/markdown-process.js';
import { textmath2laObj as textmath2laObjFactory } from '@/lib/content-processor/math-process';
import asciimath2mmlFactory from '@/lib/content-processor/am2mml.js';
import latex2mmlFactory from '@/lib/content-processor/tex2mml.js';
import mml2svg from '@/lib/content-processor/mml2svg.js';
import latexs from '@/lib/latexs';

import Button from '@/components/core/button';

const myCompletions = (context) => {
  let word = context.matchBefore(new RegExp('\\\\\\w*'));
  if (!word || (word.from == word.to && !context.explicit)) return null;
  const options = latexs.map((item) => {
    return {
      label: item.latex,
      type: 'text',
      apply: item.latex,
    };
  });
  return {
    from: word.from,
    options,
  };
};

export default function Home() {
  const [basic, setBasic] = useState(false);
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

  const codemirrorView = useRef(null);
  const inputArea = useRef(null);
  const importFile = useRef(null);

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
      if (selecteds['LaTeX_delimiter'] === 'bracket') {
        LaTeX_delimiter_start = '\\(';
        LaTeX_delimiter_end = '\\)';
      } else if (selecteds['LaTeX_delimiter'] === 'dollar') {
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
    if (selecteds['LaTeX_delimiter'] === 'bracket') {
      LaTeX_delimiter_start = '\\(';
      LaTeX_delimiter_end = '\\)';
    } else if (selecteds['LaTeX_delimiter'] === 'dollar') {
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
  }, [basic, selecteds, data]);

  const LaTeXSepConvert = useCallback((type) => {
    // LaTeX Sep Convert logic here
  }, []);

  const importClick = useCallback(() => {
    // Import click logic here
  }, []);

  const exportClick = useCallback(() => {
    // Export click logic here
  }, []);

  const insertLatex = useCallback(() => {
    // Insert LaTeX logic here
  }, []);

  const importAction = useCallback(() => {
    // Import action logic here
  }, []);

  const $t = useTranslations('Home');

  return (
    <div className="home flex flex-wrap pt-16 md:pt-p2 h-screen w-screen overflow-x-hidden overflow-y-auto">
      {/* Left side input panel */}
      <div className="w-2/4 p-p1 flex-basis-like-1/1 grow md:flex-1 bg-bg1 text-left pt-p1 pl-p3 pr-p3 flex flex-col">
        <p role="heading" aria-level="1" className="text-2xl md:text-3xl">
          {$t('editContent')}
        </p>
        <div className="flex justify-end mb-m2 mt-8 md:mt-m1">
          <Button variant="primary" className="ml-2" onClick={insertMark}>
            {$t('mark')}
          </Button>
          <Button
            variant="primary"
            className="ml-2"
            onClick={() => LaTeXSepConvert('d2b')}
          >
            {$t('dollar2bracket')}
          </Button>
          <Button
            variant="primary"
            className="ml-2"
            onClick={() => LaTeXSepConvert('b2d')}
          >
            {$t('bracket2dollar')}
          </Button>
          <Button variant="primary" className="ml-2" onClick={importClick}>
            {$t('import')}
          </Button>
          <Button variant="primary" className="ml-2" onClick={exportClick}>
            {$t('export')}
          </Button>
          <button
            className="hover:scale-110 transition-scale ml-2"
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
