import { newE2EPage } from '@stencil/core/testing';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

const tag = 'wallet-connect-panel';

describe('wallet-connect-panel', () => {
  it(`renders ${tag}`, async () => {
    const page = await newE2EPage();

    await page.setContent(`<${tag}></${tag}>`);
    const element = await page.find(tag);
    expect(element).toHaveClass('hydrated');
  });

  it('check title & subtitle', async () => {
    const page = await newE2EPage();

    await page.setContent(`<${tag}></${tag}>`);
    const titleElement = await page.find(`${tag} >>> [data-testid=${DataTestIdsEnum.walletConnetModalTitle}]`);
    expect(titleElement.textContent).toContain('xPortal Mobile Wallet');

    const subtitleElement = await page.find(`${tag} >>> [data-testid=${DataTestIdsEnum.walletConnetModalSubtitle}]`);
    expect(subtitleElement.textContent).toContain('Scan this QR code with your app');
  });

  it('check QR code', async () => {
    const page = await newE2EPage();

    await page.setContent(`<${tag}></${tag}>`);
    const modalElement = await page.find(tag);

    const loading = await page.find(`${tag} >>> [data-testid=${DataTestIdsEnum.walletConnectLoading}]`);
    expect(loading).toBeDefined();

    const qrData = { wcURI: 'test-qr-code-uri' };
    modalElement.setProperty('data', qrData);
    await page.waitForChanges();

    const qrCodeContainer = await page.find(`${tag} >>> [data-testid=${DataTestIdsEnum.walletConnectQrCode}]`);
    expect(qrCodeContainer).not.toBeNull();

    const svgElement = await qrCodeContainer.find('svg');
    expect(svgElement).not.toBeNull();
  });
});
