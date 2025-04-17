jest.mock('../../../../utils/processImgSrc', () => ({
  processImgSrc: jest.fn().mockImplementation(src => src),
}));

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
    });
  });

  describe('content', () => {
    it('displays correct title and subtitle', async () => {
      const page = await createPage({ isOpen: true });
      const shadow = page.root.shadowRoot;
      const body = shadow.querySelector('mvx-wallet-connect-body').shadowRoot;

      const titleElement = body.querySelector(`[data-testid=${DataTestIdsEnum.walletConnetModalTitle}]`);
      expect(titleElement).toBeTruthy();
      expect(titleElement.textContent.trim()).toContain('Scan this QR code with your app');
    });
  });

  describe('QR code', () => {
    it('shows loading state initially', async () => {
      const page = await createPage({ isOpen: true });
      const body = page.root.shadowRoot.querySelector('mvx-wallet-connect-body').shadowRoot;
      const loading = body.querySelector(`[data-testid=${DataTestIdsEnum.walletConnectLoading}]`);
      expect(loading).toBeTruthy();
    });

    it('displays QR code when data is provided', async () => {
      const qrData = { wcURI: 'test-qr-code-uri' };
      const page = await createPage({ data: qrData, isOpen: true });

      // Wait for QR code generation
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();

      const body = page.root.shadowRoot.querySelector('mvx-wallet-connect-body').shadowRoot;
      const qrCodeContainer = body.querySelector(`[data-testid=${DataTestIdsEnum.walletConnectQrCode}]`);
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

      const body = page.root.shadowRoot.querySelector('mvx-wallet-connect-body').shadowRoot;
      const loading = body.querySelector(`[data-testid=${DataTestIdsEnum.walletConnectLoading}]`);
      expect(loading).toBeNull();
    });
  });
});
