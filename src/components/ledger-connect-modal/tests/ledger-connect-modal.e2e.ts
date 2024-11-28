import { newE2EPage } from '@stencil/core/testing';

const tag = 'ledger-connect-modal';

describe('ledger-connect-modal', () => {
  it(`renders ${tag}`, async () => {
    const page = await newE2EPage();

    await page.setContent(`<${tag}></${tag}>`);
    const element = await page.find(tag);
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent(`<${tag}></${tag}>`);
    const element = await page.find(`${tag} >>> div`);
    expect(element.textContent).toContain(`Unlock your device`);

    const component = await page.find(tag);
    component.setProperty('data', { connectScreenData: { error: 'Unable to find device' } });
    await page.waitForChanges();
    const error = await page.find(`${tag} >>> div`);
    expect(error.textContent).toContain(`Unable to find device`);

    // component.setProperty('last', 'Quincy');
    // await page.waitForChanges();
    // const last = await page.find('my-component >>> div');
    // expect(last.textContent).toEqual(`Hello, World! I'm James Quincy`);

    // component.setProperty('middle', 'Earl');
    // await page.waitForChanges();
    // const middle = await page.find('my-component >>> div');
    // expect(middle.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
