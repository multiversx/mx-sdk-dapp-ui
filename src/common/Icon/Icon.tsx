import { h } from '@stencil/core';

import { AngleDownIcon } from './components/AngleDownIcon';
import { AngleLeftIcon } from './components/AngleLeftIcon';
import { AngleRightIcon } from './components/AngleRightIcon';
import { AnglesLeftIcon } from './components/AnglesLeftIcon';
import { AnglesRightIcon } from './components/AnglesRightIcon';
import { AngleUpIcon } from './components/AngleUpIcon';
import { ArrowUpRightFromSquareIcon } from './components/ArrowUpRightFromSquare';
import { ArrowUpRightIcon } from './components/ArrowUpRightIcon';
import { BackArrowIcon } from './components/BackArrowIcon';
import { CheckIcon } from './components/CheckIcon';
import { CircleExclamationIcon } from './components/CircleExclamationIcon';
import { CloseIcon } from './components/CloseIcon';
import { ContractIcon } from './components/ContractIcon';
import { CopyIcon } from './components/CopyIcon';
import { LayersIcon } from './components/LayersIcon';
import { LockIcon } from './components/LockIcon';
import { PencilIcon } from './components/PencilIcon';
import { TriangularWarningIcon } from './components/TriangularWarningIcon';
import type { IconPropsType } from './icon.types';

export const Icon = ({ name, ...properties }: IconPropsType) => {
  switch (name) {
    case 'contract':
      return <ContractIcon {...properties} />;

    case 'layers':
      return <LayersIcon {...properties} />;

    case 'lock':
      return <LockIcon {...properties} />;

    case 'angle-up':
      return <AngleUpIcon {...properties} />;

    case 'angle-down':
      return <AngleDownIcon {...properties} />;

    case 'pencil':
      return <PencilIcon {...properties} />;

    case 'angles-left':
      return <AnglesLeftIcon {...properties} />;

    case 'angles-right':
      return <AnglesRightIcon {...properties} />;

    case 'triangular-warning':
      return <TriangularWarningIcon {...properties} />;

    case 'circle-exclamation':
      return <CircleExclamationIcon {...properties} />;

    case 'arrow-up-right':
      return <ArrowUpRightIcon {...properties} />;

    case 'copy':
      return <CopyIcon {...properties} />;

    case 'check':
      return <CheckIcon {...properties} />;

    case 'angle-left':
      return <AngleLeftIcon {...properties} />;

    case 'angle-right':
      return <AngleRightIcon {...properties} />;

    case 'back-arrow':
      return <BackArrowIcon {...properties} />;

    case 'arrow-up-right-from-square-icon':
      return <ArrowUpRightFromSquareIcon {...properties} />;

    case 'close':
      return <CloseIcon {...properties} />;

    default:
      console.error(`No data for the ${name} icon.`);
      return null;
  }
};
