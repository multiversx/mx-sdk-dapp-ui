import { newE2EPage } from '@stencil/core/testing';

const tag = 'wallet-connect-modal';

describe('wallet-connect-modal', () => {
  it(`renders ${tag}`, async () => {
    const page = await newE2EPage();

    await page.setContent(`<${tag}></${tag}>`);
    const element = await page.find(tag);
    expect(element).toHaveClass('hydrated');
  });

  it('check subtitle', async () => {
    const page = await newE2EPage();

    await page.setContent(`<${tag}></${tag}>`);
    const element = await page.find(`${tag} >>> div`);
    expect(element.textContent).toContain(`Scan this QR code with your app`);
  });

  it('check QR code', async () => {
    const page = await newE2EPage();

    await page.setContent(`<${tag}></${tag}>`);
    const modalElement = await page.find(tag);

    const qrData = { wcURI: 'test-qr-code-uri' };
    modalElement.setProperty('data', qrData);
    await page.waitForChanges();

    const qrCodeContainer = await page.find(`${tag} >>> .qr-code-container`);
    expect(qrCodeContainer).not.toBeNull();

    const svgElement = await qrCodeContainer.find('svg');
    expect(svgElement).not.toBeNull();
  });
});
