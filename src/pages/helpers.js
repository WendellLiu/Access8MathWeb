import { textmath2laObj as textmath2laObjFactory } from '@/lib/content-processor/math-process';
import latexs from '@/lib/tabs/latexs/latexs';

export const bdconvert = (mode) => (data) => {
  return data
    .split('\n')
    .map((line) => {
      let latex_delimiter = 'dollar';
      if (mode === 'b2d') {
        latex_delimiter = 'bracket';
      } else if (mode === 'd2b') {
        latex_delimiter = 'dollar';
      }
      return textmath2laObjFactory({
        latex_delimiter,
        asciimath_delimiter: 'graveaccent',
      })(line).reduce((a, b) => {
        let result;
        if (b.type === 'latex-content') {
          if (mode === 'b2d') {
            result = `$${b.data}$`;
          } else if (mode === 'd2b') {
            result = `\\(${b.data}\\)`;
          } else {
            result = `\\(${b.data}\\)`;
          }
        } else if (b.type === 'asciimath-content') {
          result = `\`${b.data}\``;
        } else {
          result = `${b.data}`;
        }
        return a + result;
      }, '');
    })
    .reduce((a, b) => {
      return a + b + '\n';
    }, '');
};

export const myCompletions = (context) => {
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
