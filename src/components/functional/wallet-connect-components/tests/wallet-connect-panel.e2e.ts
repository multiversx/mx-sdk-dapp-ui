import { newSpecPage } from '@stencil/core/testing';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { WalletConnectModal } from '../components/wallet-connect-body';
import { WalletConnectPanel } from '../wallet-connect-panel';

const tag = 'mvx-wallet-connect-panel';

describe('wallet-connect-panel', () => {
  const createPage = async (props: { data?: any; isOpen?: boolean } = {}) => {
    const page = await newSpecPage({
      components: [WalletConnectPanel, WalletConnectModal],
      html: `<${tag}></${tag}>`,
    });

    const component = page.rootInstance as WalletConnectPanel;
    if (props.data) {
      component.data = props.data;
    }
    if (props.isOpen) {
      component.isOpen = true;
    }
    await page.waitForChanges();
    return page;
  };

  describe('rendering', () => {
    it('renders component', async () => {
      const page = await createPage();
      expect(page.root).toBeTruthy();
      expect(page.root.shadowRoot).toBeTruthy();
    });
  });

  describe('content', () => {
    it('displays correct title and subtitle', async () => {
      const page = await createPage({ isOpen: true });

      const titleElement = page.root.shadowRoot.querySelector(`[data-testid=${DataTestIdsEnum.walletConnetModalTitle}]`);
      expect(titleElement).toBeTruthy();
      expect(titleElement.textContent).toContain('xPortal Mobile Wallet');

      const subtitleElement = page.root.shadowRoot.querySelector(`[data-testid=${DataTestIdsEnum.walletConnetModalSubtitle}]`);
      expect(subtitleElement).toBeTruthy();
      expect(subtitleElement.textContent).toContain('Scan this QR code with your app');
    });
  });

  describe('QR code', () => {
    it('shows loading state initially', async () => {
      const page = await createPage({ isOpen: true });
      const bodyComponent = page.root.shadowRoot.querySelector('mvx-wallet-connect-body');
      expect(bodyComponent).toBeTruthy();

      const loading = bodyComponent.shadowRoot.querySelector(`[data-testid=${DataTestIdsEnum.walletConnectLoading}]`);
      expect(loading).toBeTruthy();
    });

    it('displays QR code when data is provided', async () => {
      const qrData = { wcURI: 'test-qr-code-uri' };
      const page = await createPage({ data: qrData, isOpen: true });

      // Wait for QR code generation
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();

      const bodyComponent = page.root.shadowRoot.querySelector('mvx-wallet-connect-body');
      expect(bodyComponent).toBeTruthy();

      const qrCodeContainer = bodyComponent.shadowRoot.querySelector(`[data-testid=${DataTestIdsEnum.walletConnectQrCode}]`);
      expect(qrCodeContainer).toBeTruthy();

      const svgElement = qrCodeContainer.querySelector('svg');
      expect(svgElement).toBeTruthy();
    });

    it('hides loading state when QR code is displayed', async () => {
      const qrData = { wcURI: 'test-qr-code-uri' };
      const page = await createPage({ data: qrData, isOpen: true });

      // Wait for QR code generation
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();

      const bodyComponent = page.root.shadowRoot.querySelector('mvx-wallet-connect-body');
      expect(bodyComponent).toBeTruthy();

      const loading = bodyComponent.shadowRoot.querySelector(`[data-testid=${DataTestIdsEnum.walletConnectLoading}]`);
      expect(loading).toBeNull();
    });
  });
});
