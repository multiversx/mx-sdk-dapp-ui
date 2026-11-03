import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { SignTransactionsOverview } from '../SignTransactionsOverview';

const defaultProps = {
  identifier: 'EGLD',
  usdValue: '≈ $1',
  amount: '1',
  tokenIconUrl: '',
  interactor: 'erd1receiver',
  interactorIconUrl: '',
  action: '',
  isApp: false,
};

const render = (props: Partial<Parameters<typeof SignTransactionsOverview>[0]> = {}) =>
  newSpecPage({
    components: [],
    template: () => <SignTransactionsOverview {...defaultProps} {...props} />,
  });

describe('SignTransactionsOverview', () => {
  it('shows the warning for the receiver', async () => {
    const page = await render({ interactorWarning: 'Reported address' });

    const warning = page.root.querySelector(
      `[data-testid="${DataTestIdsEnum.signTransactionsOverviewInteractorWarning}"]`,
    );

    expect(warning).not.toBeNull();
    expect(warning.textContent).toContain('Reported address');
  });

  it('shows no warning when there is none', async () => {
    const page = await render();

    expect(
      page.root.querySelector(`[data-testid="${DataTestIdsEnum.signTransactionsOverviewInteractorWarning}"]`),
    ).toBeNull();
  });

  it('does not show a made-up fee when none is available', async () => {
    const page = await render();

    const fee = page.root.querySelector(`[data-testid="${DataTestIdsEnum.signTransactionsOverviewNetworkFee}"]`);

    expect(fee.textContent.trim()).toBe('-');
  });

  it('shows the provided fee', async () => {
    const page = await render({ networkFee: '≈ $0.01' });

    const fee = page.root.querySelector(`[data-testid="${DataTestIdsEnum.signTransactionsOverviewNetworkFee}"]`);

    expect(fee.textContent.trim()).toBe('≈ $0.01');
  });

  it('shows the EGLD value next to the token amount', async () => {
    const page = await render({
      identifier: 'TOKEN-123456',
      egldValue: { amount: '5', usdValue: '≈ $89.10' },
      egldLabel: 'xEGLD',
    });

    const egldValue = page.root.querySelector(`[data-testid="${DataTestIdsEnum.signTransactionsOverviewEgldValue}"]`);

    expect(egldValue.textContent).toContain('+ 5 xEGLD');
    expect(egldValue.textContent).toContain('≈ $89.10');
  });

  it('shows no EGLD value when there is none', async () => {
    const page = await render();

    expect(page.root.querySelector(`[data-testid="${DataTestIdsEnum.signTransactionsOverviewEgldValue}"]`)).toBeNull();
  });

  it('shows who pays the fee of a relayed transaction', async () => {
    const page = await render({ relayer: 'erd1relayer' });

    const row = page.root.querySelector(`[data-testid="${DataTestIdsEnum.signTransactionsOverviewRelayer}"]`);

    expect(row.textContent).toContain('Fee paid by');
    expect(row.textContent).toContain('erd1relayer');
  });

  it('shows the sender when it is another account', async () => {
    const page = await render({ sender: 'erd1multisig' });

    const row = page.root.querySelector(`[data-testid="${DataTestIdsEnum.signTransactionsOverviewSender}"]`);

    expect(row.textContent).toContain('erd1multisig');
  });

  it('shows no sender or relayer rows by default', async () => {
    const page = await render();

    expect(page.root.querySelector(`[data-testid="${DataTestIdsEnum.signTransactionsOverviewRelayer}"]`)).toBeNull();
    expect(page.root.querySelector(`[data-testid="${DataTestIdsEnum.signTransactionsOverviewSender}"]`)).toBeNull();
  });
});
