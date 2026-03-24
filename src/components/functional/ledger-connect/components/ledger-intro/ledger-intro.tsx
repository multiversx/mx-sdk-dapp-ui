import { h } from '@stencil/core';
import { LedgerIntro as LedgerIntroCommon } from 'common/LedgerIntro/LedgerIntro';

import type { IConnectScreenData } from '../../ledger-connect.types';

interface LedgerIntroPropsType {
  connectScreenData?: IConnectScreenData;
  isAwaiting?: boolean;
  onConnect?: (event: MouseEvent) => void;
}

export function LedgerIntro({ connectScreenData, isAwaiting = false, onConnect }: LedgerIntroPropsType) {
  return <LedgerIntroCommon connectScreenData={connectScreenData} isAwaiting={isAwaiting} onConnect={onConnect} />;
}
