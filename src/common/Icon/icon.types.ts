import type { JSXBase } from '@stencil/core/internal';

export enum IconNameEnum {
  contract = 'contract',
  layers = 'layers',
  lock = 'lock',
  angleUp = 'angle-up',
  angleDown = 'angle-down',
}

export type IconPropsType = JSXBase.IntrinsicElements['svg'] & {
  name: `${IconNameEnum}`;
};
