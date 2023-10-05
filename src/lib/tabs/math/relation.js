import { ReactComponent as Cong } from '@/components/svg/relation/cong.svg';
import { ReactComponent as Sim } from '@/components/svg/operator/sim.svg';
import { ReactComponent as Parallel } from '@/components/svg/operator/parallel.svg';
import { ReactComponent as Perp } from '@/components/svg/operator/perp.svg';
import { ReactComponent as Le } from '@/components/svg/operator/le.svg';
import { ReactComponent as Ge } from '@/components/svg/operator/ge.svg';
import { ReactComponent as Ne } from '@/components/svg/operator/ne.svg';
import { ReactComponent as Approx } from '@/components/svg/operator/approx.svg';

const relation = [
  {
    id: 'cong',
    latex: '\\cong',
    offset: 0,
    category: 'relation',
    shortcut: -1,
    order: 7,
    Icon: Cong,
  },
  {
    id: 'sim',
    latex: '\\sim',
    offset: 0,
    category: 'relation',
    shortcut: -1,
    order: 8,
    Icon: Sim,
  },
  {
    id: 'parallel',
    latex: '\\parallel',
    offset: 0,
    category: 'relation',
    shortcut: -1,
    order: 5,
    Icon: Parallel,
  },
  {
    id: 'perp',
    latex: '\\perp',
    offset: 0,
    category: 'relation',
    shortcut: -1,
    order: 6,
    Icon: Perp,
  },
  {
    id: 'le',
    latex: '\\le',
    offset: 0,
    category: 'relation',
    shortcut: -1,
    order: 2,
    Icon: Le,
  },
  {
    id: 'ge',
    latex: '\\ge',
    offset: 0,
    category: 'relation',
    shortcut: -1,
    order: 1,
    Icon: Ge,
  },
  {
    id: 'ne',
    latex: '\\ne',
    offset: 0,
    category: 'relation',
    shortcut: -1,
    order: 3,
    Icon: Ne,
  },
  {
    id: 'approx',
    latex: '\\approx',
    offset: 0,
    category: 'relation',
    shortcut: -1,
    order: 4,
    Icon: Approx,
  },
];

export default relation;
