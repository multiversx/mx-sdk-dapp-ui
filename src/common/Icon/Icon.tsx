import { h } from '@stencil/core';

import { AngleDownIcon } from './components/AngleDownIcon';
import { AnglesLeftIcon } from './components/AnglesLeftIcon';
import { AnglesRightIcon } from './components/AnglesRightIcon';
import { AngleUpIcon } from './components/AngleUpIcon';
import { CircleExclamationIcon } from './components/CircleExclamationIcon';
import { ContractIcon } from './components/ContractIcon';
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

    default:
      console.error(`No data for the ${name} icon.`);
      return null;
  }
};
