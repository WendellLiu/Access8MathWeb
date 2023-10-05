﻿const latexs = [
  {
    id: 'in',
    latex: '\\in ',
    offset: 0,
    category: 'set',
    shortcut: -1,
    order: 0,
  },
  {
    id: 'notin',
    latex: '\\not\\in ',
    offset: 0,
    category: 'set',
    shortcut: -1,
    order: 1,
  },
  {
    id: 'subset',
    latex: '\\supset ',
    offset: 0,
    category: 'set',
    shortcut: -1,
    order: 2,
  },
  {
    id: 'subsetneqq',
    latex: '\\supsetneqq ',
    offset: 0,
    category: 'set',
    shortcut: -1,
    order: 3,
  },
  {
    id: 'not-subset',
    latex: '\\not\\subset ',
    offset: 0,
    category: 'set',
    shortcut: -1,
    order: 4,
  },
  {
    id: 'supset',
    latex: '\\subset ',
    offset: 0,
    category: 'set',
    shortcut: -1,
    order: 5,
  },
  {
    id: 'supsetneqq',
    latex: '\\subsetneqq ',
    offset: 0,
    category: 'set',
    shortcut: -1,
    order: 6,
  },
  {
    id: 'not-supset',
    latex: '\\not\\supset ',
    offset: 0,
    category: 'set',
    shortcut: -1,
    order: 7,
  },
  {
    id: 'cap',
    latex: '\\cap ',
    offset: 0,
    category: 'set',
    shortcut: -1,
    order: 8,
  },
  {
    id: 'cup',
    latex: '\\cup ',
    offset: 0,
    category: 'set',
    shortcut: -1,
    order: 9,
  },
  {
    id: 'setminus',
    latex: '\\setminus ',
    offset: 0,
    category: 'set',
    shortcut: -1,
    order: 10,
  },
  {
    id: 'complement',
    latex: '\\complement_{}',
    offset: 0,
    category: 'set',
    shortcut: -1,
    order: 11,
  },
  {
    id: 'emptyset',
    latex: '\\emptyset ',
    offset: 0,
    category: 'set',
    shortcut: -1,
    order: 12,
  },
  {
    id: 'natural-number',
    latex: '\\mathbb{N}',
    offset: 0,
    category: 'set',
    shortcut: -1,
    order: 13,
  },
  {
    id: 'real-number',
    latex: '\\mathbb{R}',
    offset: 0,
    category: 'set',
    shortcut: -1,
    order: 14,
  },
  {
    id: 'forall',
    latex: '\\forall',
    offset: 0,
    category: 'set',
    shortcut: -1,
    order: 15,
  },
  {
    id: 'exists',
    latex: '\\exists',
    offset: 0,
    category: 'set',
    shortcut: -1,
    order: 16,
  },
  {
    id: 'alpha-lower',
    latex: '\\alpha ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'a',
    order: 0,
  },
  {
    id: 'alpha-upper',
    latex: '\\Alpha ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'A',
    order: 0,
  },
  {
    id: 'beta-lower',
    latex: '\\beta ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'b',
    order: 1,
  },
  {
    id: 'beta-upper',
    latex: '\\Beta ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'B',
    order: 1,
  },
  {
    id: 'theta-lower',
    latex: '\\theta ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'c',
    order: 7,
  },
  {
    id: 'theta-upper',
    latex: '\\Theta ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'C',
    order: 7,
  },
  {
    id: 'delta-lower',
    latex: '\\delta ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'd',
    order: 3,
  },
  {
    id: 'delta-upper',
    latex: '\\Delta ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'D',
    order: 3,
  },
  {
    id: 'epsilon-lower',
    latex: '\\epsilon ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'e',
    order: 4,
  },
  {
    id: 'epsilon-upper',
    latex: '\\Epsilon ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'E',
    order: 4,
  },
  {
    id: 'phi-lower',
    latex: '\\phi ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'f',
    order: 20,
  },
  {
    id: 'phi-upper',
    latex: '\\Phi ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'F',
    order: 20,
  },
  {
    id: 'gamma-lower',
    latex: '\\gamma ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'g',
    order: 2,
  },
  {
    id: 'gamma-upper',
    latex: '\\Gamma ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'G',
    order: 2,
  },
  {
    id: 'eta-lower',
    latex: '\\eta ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'h',
    order: 6,
  },
  {
    id: 'eta-upper',
    latex: '\\Eta ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'H',
    order: 6,
  },
  {
    id: 'iota-lower',
    latex: '\\iota ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'i',
    order: 8,
  },
  {
    id: 'iota-upper',
    latex: '\\Iota ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'I',
    order: 8,
  },
  {
    id: 'kappa-lower',
    latex: '\\kappa ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'k',
    order: 9,
  },
  {
    id: 'kappa-upper',
    latex: '\\Kappa ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'K',
    order: 9,
  },
  {
    id: 'lambda-lower',
    latex: '\\lambda ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'l',
    order: 10,
  },
  {
    id: 'lambda-upper',
    latex: '\\Lambda ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'L',
    order: 10,
  },
  {
    id: 'mu-lower',
    latex: '\\mu ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'm',
    order: 11,
  },
  {
    id: 'mu-upper',
    latex: '\\Mu ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'M',
    order: 11,
  },
  {
    id: 'nu-lower',
    latex: '\\nu ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'n',
    order: 12,
  },
  {
    id: 'nu-upper',
    latex: '\\Nu ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'N',
    order: 12,
  },
  {
    id: 'omicron-lower',
    latex: '\\omicron ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'o',
    order: 14,
  },
  {
    id: 'omicron-upper',
    latex: '\\Omicron ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'O',
    order: 14,
  },
  {
    id: 'pi-lower',
    latex: '\\pi ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'p',
    order: 15,
  },
  {
    id: 'pi-upper',
    latex: '\\Pi ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'P',
    order: 15,
  },
  {
    id: 'rho-lower',
    latex: '\\rho ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'r',
    order: 16,
  },
  {
    id: 'rho-upper',
    latex: '\\Rho ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'R',
    order: 16,
  },
  {
    id: 'sigma-lower',
    latex: '\\sigma ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 's',
    order: 17,
  },
  {
    id: 'sigma-upper',
    latex: '\\Sigma ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'S',
    order: 17,
  },
  {
    id: 'tau-lower',
    latex: '\\tau ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 't',
    order: 18,
  },
  {
    id: 'tau-upper',
    latex: '\\Tau ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'T',
    order: 18,
  },
  {
    id: 'upsilon-lower',
    latex: '\\upsilon ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'u',
    order: 19,
  },
  {
    id: 'upsilon-upper',
    latex: '\\Upsilon ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'U',
    order: 19,
  },
  {
    id: 'psi-lower',
    latex: '\\psi ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'v',
    order: 22,
  },
  {
    id: 'psi-upper',
    latex: '\\Psi ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'V',
    order: 22,
  },
  {
    id: 'omega-lower',
    latex: '\\omega ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'w',
    order: 23,
  },
  {
    id: 'omega-upper',
    latex: '\\Omega ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'W',
    order: 23,
  },
  {
    id: 'xi-lower',
    latex: '\\xi ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'y',
    order: 13,
  },
  {
    id: 'xi-upper',
    latex: '\\Xi ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'Y',
    order: 13,
  },
  {
    id: 'chi-lower',
    latex: '\\chi ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'x',
    order: 21,
  },
  {
    id: 'chi-upper',
    latex: '\\Chi ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'X',
    order: 21,
  },
  {
    id: 'zeta-lower',
    latex: '\\zeta ',
    offset: 0,
    category: 'lower_greek_alphabet',
    shortcut: 'z',
    order: 5,
  },
  {
    id: 'zeta-upper',
    latex: '\\Zeta ',
    offset: 0,
    category: 'upper_greek_alphabet',
    shortcut: 'Z',
    order: 5,
  },
];

export default latexs;
