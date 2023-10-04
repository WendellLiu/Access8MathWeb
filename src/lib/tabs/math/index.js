import { ReactComponent as Common } from '@/components/svg/math/common.svg';
import { ReactComponent as Operator } from '@/components/svg/math/operator.svg';
import { ReactComponent as Relation } from '@/components/svg/math/relation.svg';
import { ReactComponent as Logic } from '@/components/svg/math/logic.svg';
import { ReactComponent as Arrow } from '@/components/svg/math/arrow.svg';
import { ReactComponent as TwoDimension } from '@/components/svg/math/two_dimension.svg';
import { ReactComponent as SetIcon } from '@/components/svg/math/set.svg';
import { ReactComponent as Other } from '@/components/svg/math/other.svg';
import { ReactComponent as UpperGreekAlphabet } from '@/components/svg/math/upper_greek_alphabet.svg';
import { ReactComponent as LowerGreekAlphabet } from '@/components/svg/math/lower_greek_alphabet.svg';

const latexs = [
  {
    id: 'common',
    Icon: Common,
  },
  {
    id: 'operator',
    Icon: Operator,
  },
  {
    id: 'relation',
    Icon: Relation,
  },
  {
    id: 'logic',
    Icon: Logic,
  },
  {
    id: 'arrow',
    Icon: Arrow,
  },
  {
    id: 'two_dimension',
    Icon: TwoDimension,
  },
  {
    id: 'set',
    Icon: SetIcon,
  },
  {
    id: 'other',
    Icon: Other,
  },
  {
    id: 'upper_greek_alphabet',
    Icon: UpperGreekAlphabet,
  },
  {
    id: 'lower_greek_alphabet',
    Icon: LowerGreekAlphabet,
  },
];

export default latexs;
