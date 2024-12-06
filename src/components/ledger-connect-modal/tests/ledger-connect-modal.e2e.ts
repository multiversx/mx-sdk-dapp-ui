import { newE2EPage } from '@stencil/core/testing';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

const tag = 'ledger-connect-modal';

describe('ledger-connect-modal', () => {
  it(`renders ${tag}`, async () => {
    const page = await newE2EPage();

    await page.setContent(`<${tag}></${tag}>`);
    const element = await page.find(tag);
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes according to data', async () => {
    const page = await newE2EPage();

    await page.setContent(`<${tag}></${tag}>`);
    const element = await page.find(`${tag} >>> div`);
    expect(element.textContent).toContain(`Unlock your device`);

    const component = await page.find(tag);
    component.setProperty('data', { connectScreenData: { error: 'Unable to find device' } });
    await page.waitForChanges();
    const error = await page.find(`${tag} >>> div`);
    expect(error.textContent).toContain(`Unable to find device`);

    const loadingUpdate = { connectScreenData: {}, accountScreenData: { accounts: [], startIndex: 0, addressesPerPage: 10, isLoading: true }, confirmScreenData: null };
    component.setProperty('data', loadingUpdate);
    const loading = await page.find(`${tag} >>> [data-testid=${DataTestIdsEnum.ledgerLoading}]`);
    expect(loading).toBeDefined();

    const accountsScreenFetchingUpdate = {
      connectScreenData: {},
      accountScreenData: {
        accounts: [
          { address: 'erd18ykcupcm55vfjzy40tjqck260ktk3shhh7fh5g5exmjxqvm3v7jspa8ctr', balance: '...', index: 0 },
          { address: 'erd1894027ex33q3x0nx52w0w0dtlrtvmdpm7jhg8lwyta5s33wp4cpsj7zkv5', balance: '...', index: 1 },
          { address: 'erd1sf95q8xf0y7q237daxwv0w9tuc56krruw5t63ju8e3g7sfcfgras5dpun0', balance: '...', index: 2 },
          { address: 'erd1cphyth5ud3htxcnpuuttxh0tr0mt3ja8pgyvm7kgf06suzqud9hqkuz38k', balance: '...', index: 3 },
          { address: 'erd1vm7ds77jq5t424gd56336a57sh84lh302lqjvrc6quserg59vr7qgz4c4g', balance: '...', index: 4 },
          { address: 'erd1xt4fu2q3wdzy47aktcc2907qqqtfm4xcffl4tf2zyyfskmhth9ust8d73p', balance: '...', index: 5 },
          { address: 'erd19mgjxltf6d6qt5saw2f787aypdpj59al95m2hkkanqamchf5dzzqxn5e0c', balance: '...', index: 6 },
          { address: 'erd19hasmrswh6khqspse9ck35vf0eykpkjyq2y0uma8ur0pfmlqqerssjjx04', balance: '...', index: 7 },
          { address: 'erd186l9rguljypvm0lxdhqjg62h3p8yg4ugry69vkhw2j4xsz0ch7ksntfw4h', balance: '...', index: 8 },
          { address: 'erd1ydfcnm4u7syq03vr959ljk5cqfld0vsjgfgejqjshzt6nktnddhsq4w9r8', balance: '...', index: 9 },
        ],
      },
      confirmScreenData: null,
    };
    component.setProperty('data', accountsScreenFetchingUpdate);
    await page.waitForChanges();
    const fetchingList = await page.find(`${tag} >>> [data-testid=${DataTestIdsEnum.addressTableContainer}]`);
    expect(fetchingList).toBeDefined();

    const balancesUpdate = {
      connectScreenData: {},
      accountScreenData: {
        accounts: [
          { address: 'erd18ykcupcm55vfjzy40tjqck260ktk3shhh7fh5g5exmjxqvm3v7jspa8ctr', balance: '8998313560000000000', index: 0 },
          { address: 'erd1894027ex33q3x0nx52w0w0dtlrtvmdpm7jhg8lwyta5s33wp4cpsj7zkv5', balance: '0', index: 1 },
          { address: 'erd1sf95q8xf0y7q237daxwv0w9tuc56krruw5t63ju8e3g7sfcfgras5dpun0', balance: '139289100230000000', index: 2 },
          { address: 'erd1cphyth5ud3htxcnpuuttxh0tr0mt3ja8pgyvm7kgf06suzqud9hqkuz38k', balance: '0', index: 3 },
          { address: 'erd1vm7ds77jq5t424gd56336a57sh84lh302lqjvrc6quserg59vr7qgz4c4g', balance: '0', index: 4 },
          { address: 'erd1xt4fu2q3wdzy47aktcc2907qqqtfm4xcffl4tf2zyyfskmhth9ust8d73p', balance: '32299650000000000000', index: 5 },
          { address: 'erd19mgjxltf6d6qt5saw2f787aypdpj59al95m2hkkanqamchf5dzzqxn5e0c', balance: '0', index: 6 },
          { address: 'erd19hasmrswh6khqspse9ck35vf0eykpkjyq2y0uma8ur0pfmlqqerssjjx04', balance: '0', index: 7 },
          { address: 'erd186l9rguljypvm0lxdhqjg62h3p8yg4ugry69vkhw2j4xsz0ch7ksntfw4h', balance: '0', index: 8 },
          { address: 'erd1ydfcnm4u7syq03vr959ljk5cqfld0vsjgfgejqjshzt6nktnddhsq4w9r8', balance: '0', index: 9 },
        ],
        startIndex: 10,
        addressesPerPage: 10,
        isLoading: false,
      },
      confirmScreenData: null,
    };
    component.setProperty('data', balancesUpdate);
    await page.waitForChanges();
    const addressTableContainer = await page.find(`${tag} >>> [data-testid=${DataTestIdsEnum.addressTableContainer}]`);
    expect(addressTableContainer.textContent).toContain('89983');

    const connectScreenUpdate = {
      connectScreenData: {},
      accountScreenData: null,
      confirmScreenData: {
        selectedAddress: 'erd18ykcupcm55vfjzy40tjqck260ktk3shhh7fh5g5exmjxqvm3v7jspa8ctr',
        data: 'https://localhost:3001 for more than one day.',
        confirmAddressText: 'For security, please confirm your address:',
        authText: 'and authorize:',
        areShownText: '',
      },
    };
    component.setProperty('data', connectScreenUpdate);
    await page.waitForChanges();
    const confirmScreen = await page.find(`${tag} >>> [data-testid=${DataTestIdsEnum.ledgerConfirmAddress}]`);
    expect(confirmScreen.textContent).toContain('please confirm your address');
  });
});
