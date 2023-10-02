const markdowns = [
  {
    id: 'generic_list',
    latex: '* \n* \n* ',
    offset: 0,
    category: 'markdown',
    shortcut: -1,
  },
  {
    id: 'numbered_list',
    latex: '1. \n2. \n3. ',
    offset: 0,
    category: 'markdown',
    shortcut: -1,
  },
  {
    id: 'horizontal_rule',
    latex: '\n\n----------\n\n',
    offset: 0,
    category: 'markdown',
    shortcut: -1,
  },
  {
    id: 'heading1',
    latex: '# ',
    offset: 0,
    category: 'markdown',
    shortcut: -1,
  },
  {
    id: 'heading2',
    latex: '## ',
    offset: 0,
    category: 'markdown',
    shortcut: -1,
  },
  {
    id: 'heading3',
    latex: '### ',
    offset: 0,
    category: 'markdown',
    shortcut: -1,
  },
  {
    id: 'heading4',
    latex: '#### ',
    offset: 0,
    category: 'markdown',
    shortcut: -1,
  },
  {
    id: 'heading5',
    latex: '##### ',
    offset: 0,
    category: 'markdown',
    shortcut: -1,
  },
  {
    id: 'heading6',
    latex: '###### ',
    offset: 0,
    category: 'markdown',
    shortcut: -1,
  },
  {
    id: 'italic',
    latex: '**',
    offset: -1,
    category: 'markdown',
    shortcut: -1,
  },
  {
    id: 'bold',
    latex: '****',
    offset: -2,
    category: 'markdown',
    shortcut: -1,
  },
  {
    id: 'create_link',
    latex: '[]()',
    offset: -3,
    category: 'markdown',
    shortcut: -1,
  },
  /*{
		id: "insert_image",
		latex: "![]()",
		offset: 3,
		category: "markdown",
		shortcut: -1,
	},*/
  {
    id: 'quote',
    latex: '\n> ',
    offset: 0,
    category: 'markdown',
    shortcut: -1,
  },
  {
    id: 'table',
    latex: `\n\nc1|c2|c3
-|-|-
r1|r1|r1
r2|r2|r2\n\n`,
    offset: 0,
    category: 'markdown',
    shortcut: -1,
  },
];

export default markdowns;