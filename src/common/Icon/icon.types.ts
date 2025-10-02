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
  copy = 'copy',
  check = 'check',
  angleLeft = 'angle-left',
  angleRight = 'angle-right',
  backArrow = 'back-arrow',
  arrowUpRightFromSquare = 'arrow-up-right-from-square-icon',
  close = 'close',
  hourglass = 'hourglass',
  ban = 'ban',
  circleCheck = 'circle-check',
  circleInfo = 'circle-info',
  coins = 'coins',
  arrowsRotate = 'arrows-rotate'

}

export type IconPropsType = JSXBase.IntrinsicElements['svg'] & {
  name: `${IconNameEnum}`;
};
