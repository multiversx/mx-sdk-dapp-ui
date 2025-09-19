import { h } from '@stencil/core';

import { AngleDownIcon } from './assets/AngleDownIcon';
import { AngleUpIcon } from './assets/AngleUpIcon';
import { ContractIcon } from './assets/ContractIcon';
import { LayersIcon } from './assets/LayersIcon';
import { LockIcon } from './assets/LockIcon';
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

    default:
      console.error(`No data for the ${name} icon.`);
      return null;
  }
};
