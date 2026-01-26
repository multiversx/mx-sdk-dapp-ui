import { h } from '@stencil/core';
import classNames from 'classnames';
import { Button } from 'common/Button/Button';
import { SpinnerIcon } from 'common/Icon/components/SpinnerIcon/SpinnerIcon';
import type { IConnectScreenData } from 'components/functional/ledger-connect/ledger-connect.types';

// prettier-ignore
const styles = {
  ledgerIntro: 'ledger-intro mvx:flex-1 mvx:flex mvx:flex-col mvx:py-6 mvx:overflow-auto mvx:overflow-x-hidden',
  ledgerIntroWrapper: 'ledger-intro-wrapper mvx:flex mvx:flex-col mvx:items-center mvx:gap-6 mvx:text-center mvx:text-base mvx:mb-auto',
  ledgerIntroIcon: 'ledger-intro-icon mvx:mx-auto mvx:self-start mvx:w-auto! mvx:h-auto!',
  ledgerIntroDescription: 'ledger-intro-description mvx:text-base mvx:leading-6',
  ledgerIntroError: 'ledger-intro-error mvx:text-base mvx:max-w-60 mvx:mb-6 mvx:leading-6',
  ledgerIntroIssues: 'ledger-intro-issues mvx:text-base mvx:mt-10 mvx:mx-auto mvx:text-center mvx:relative mvx:pb-1',
} satisfies Record<string, string>;

const ledgerIntroClasses: Record<string, string> = {
  icon: 'mvx:w-50 mvx:h-auto mvx:xs:w-100 mvx:xs:h-85',
  button: 'mvx:w-48 mvx:xs:mt-5',
};

export interface LedgerIntroPropsType {
  connectScreenData?: IConnectScreenData;
  isAwaiting?: boolean;
  onConnect?: (event: MouseEvent) => void;
}

export function LedgerIntro({ connectScreenData, isAwaiting = false, onConnect }: LedgerIntroPropsType) {
  const showError = connectScreenData && connectScreenData.error;

  const handleLedgerConnectClick = (event: MouseEvent) => {
    event.preventDefault();
    onConnect?.(event);
  };

  return (
    <div class={styles.ledgerIntro}>
      <style>
        {`
          .ledger-intro::-webkit-scrollbar {
            display: none;
          }
          .ledger-intro-issues:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 2rem;
            right: 2rem;
            height: 1px;
            transition: all 200ms ease-in-out;
            opacity: 0;
            background-color: var(--mvx-text-color-secondary);
          }
          .ledger-intro-issues:hover:after {
            opacity: 0.5;
          }
        `}
      </style>
      <div class={styles.ledgerIntroWrapper}>
        <mvx-ledger-icon class={classNames(styles.ledgerIntroIcon, ledgerIntroClasses.icon)} />

        <div class={styles.ledgerIntroDescription} style={{ color: 'var(--mvx-text-color-secondary)' }}>
          Connect your device <br />
          and open the MultiversX App
        </div>

        <Button
          variant="secondary"
          disabled={Boolean(isAwaiting)}
          onClick={handleLedgerConnectClick}
          class={classNames('ledger-intro-button', ledgerIntroClasses.button)}
        >
          {isAwaiting ? (
            <span class="ledger-intro-button-label">Connecting...</span>
          ) : (
            <span class="ledger-intro-button-label">{showError ? 'Retry Connection' : 'Connect Ledger'}</span>
          )}

          {isAwaiting && <SpinnerIcon />}
        </Button>

        {showError && (
          <div class={styles.ledgerIntroError} style={{ color: 'var(--mvx-error-color)' }}>
            {connectScreenData.error}
          </div>
        )}
      </div>

      <a
        href="https://support.ledger.com/hc/en-us/articles/115005165269-Connection-issues-with-Windows-or-Linux"
        target="_blank"
        rel="noopener noreferrer"
        class={styles.ledgerIntroIssues}
        style={{ color: 'var(--mvx-text-color-secondary)' }}
      >
        Having connection issues?
      </a>
    </div>
  );
}
