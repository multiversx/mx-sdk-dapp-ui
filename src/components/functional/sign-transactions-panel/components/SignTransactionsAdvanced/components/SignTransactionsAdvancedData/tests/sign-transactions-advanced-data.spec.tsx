import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { DecodeMethodEnum } from 'components/functional/sign-transactions-panel/sign-transactions-panel.types';
import state from 'components/functional/sign-transactions-panel/signTransactionsPanelStore';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { getProcessedHighlightedData } from '../helpers/getProcessedHighlightedData';
import { SignTransactionsAdvancedData } from '../SignTransactionsAdvancedData';

describe('getProcessedHighlightedData', () => {
  it('marks the first occurrence by default', () => {
    expect(getProcessedHighlightedData({ data: 'a@x@b@x', highlightedData: 'x' })).toEqual({
      beforeHighlight: 'a@',
      highlight: 'x',
      afterHighlight: '@b@x',
    });
  });

  it('marks the requested occurrence', () => {
    expect(getProcessedHighlightedData({ data: 'a@x@b@x', highlightedData: 'x', occurrence: 1 })).toEqual({
      beforeHighlight: 'a@x@b@',
      highlight: 'x',
      afterHighlight: '',
    });
  });

  it('falls back to the first occurrence when there are fewer', () => {
    expect(getProcessedHighlightedData({ data: 'a@x@b', highlightedData: 'x', occurrence: 3 }).beforeHighlight).toBe(
      'a@',
    );
  });
});

describe('SignTransactionsAdvancedData', () => {
  const render = (decodeMethod: DecodeMethodEnum) =>
    newSpecPage({
      components: [],
      template: () => <SignTransactionsAdvancedData decodeMethod={decodeMethod} />,
    });

  beforeEach(() => {
    state.commonData = {
      ...state.commonData,
      data: 'claim@zz',
      highlight: null,
      decodedData: {
        [DecodeMethodEnum.smart]: {
          displayValue: 'claim@zz',
          validationWarnings: ['Invalid hex characters on argument @zz'],
          highlight: null,
        },
      },
    };
  });

  it('shows the warnings of the decoded data', async () => {
    const page = await render(DecodeMethodEnum.smart);

    const warnings = page.root.querySelectorAll(
      `[data-testid="${DataTestIdsEnum.signTransactionsAdvancedDataWarning}"]`,
    );

    expect(warnings.length).toBe(1);
    expect(warnings[0].textContent).toContain('Invalid hex characters');
  });

  it('shows no warnings for the raw data', async () => {
    const page = await render(DecodeMethodEnum.raw);

    expect(
      page.root.querySelector(`[data-testid="${DataTestIdsEnum.signTransactionsAdvancedDataWarning}"]`),
    ).toBeNull();
  });
});
