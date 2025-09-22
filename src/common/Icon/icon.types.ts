import type { JSXBase } from '@stencil/core/internal';

export enum IconNameEnum {
  contract = 'contract',
  layers = 'layers',
  lock = 'lock',
  angleUp = 'angle-up',
  angleDown = 'angle-down',
  pencil = 'pencil',
  anglesLeft = 'angles-left',
  anglesRight = 'angles-right',
  triangularWarning = 'triangular-warning',
  circleExclamation = 'circle-exclamation',
  arrowUpRight = 'arrow-up-right',
}

export type IconPropsType = JSXBase.IntrinsicElements['svg'] & {
  name: `${IconNameEnum}`;
};
