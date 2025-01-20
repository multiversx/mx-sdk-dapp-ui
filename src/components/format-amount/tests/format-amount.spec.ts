import { newSpecPage } from '@stencil/core/testing';
import { FormatAmount } from '../format-amount';

describe('Format amount component when digits = 2', () => {
  const renderComponent = async (props: any) => {
    const page = await newSpecPage({
      components: [FormatAmount],
      html: '<format-amount></format-amount>',
      supportsShadowDom: true
    });

    const component = page.root;
    // Set each property individually
    Object.keys(props).forEach(key => {
      component[key] = props[key];
    });

    await page.waitForChanges();
    return page;
  };

  const decimalsSelector = (page) => {
    return page.root.shadowRoot
      .querySelector('span[data-testid="formatAmountDecimals"]')
      ?.textContent;
  };

  const symbolSelector = (page) => {
    return page.root.shadowRoot
      .querySelectorAll('span[data-testid="formatAmountSymbol"]')
      .length;
  };

  it('should show 2 non zero decimals', async () => {
    const props = {
      value: '9999979999800000000000000',
      showLastNonZeroDecimal: false,
      showLabel: true,
      digits: 2,
      egldLabel: 'EGLD'
    };

    const page = await renderComponent(props);
    expect(await decimalsSelector(page)).toBe('.99');
  });

  it('should show 2 zero decimals', async () => {
    const props = {
      value: '9000000000000000000000000',
      showLastNonZeroDecimal: false,
      showLabel: true,
      digits: 2,
      egldLabel: 'EGLD'
    };

    const page = await renderComponent(props);
    expect(await decimalsSelector(page)).toBe('.00');
  });

  it('should show all non zero decimals when showLastNonZeroDecimal = true', async () => {
    const props = {
      value: '100000000000000',
      showLastNonZeroDecimal: true,
      showLabel: false,
      digits: 2,
      egldLabel: 'EGLD'
    };

    const page = await renderComponent(props);
    expect(await decimalsSelector(page)).toBe('.0001');
  });

  it('should not show decimals when value is 0', async () => {
    const props = {
      value: '100000000000000',
      showLastNonZeroDecimal: false,
      showLabel: true,
      digits: 2,
      egldLabel: 'EGLD'
    };

    const page = await renderComponent(props);
    expect(await decimalsSelector(page)).toBe(undefined);
  });

  it('should show symbol', async () => {
    const props = {
      value: '9000000000000000000000000',
      showLastNonZeroDecimal: false,
      showLabel: true,
      digits: 2,
      egldLabel: 'EGLD'
    };

    const page = await renderComponent(props);
    expect(await symbolSelector(page)).toBe(1);
  });

  it('should not show symbol', async () => {
    const props = {
      value: '9000000000000000000000000',
      showLastNonZeroDecimal: false,
      showLabel: false,
      digits: 2,
      egldLabel: 'EGLD'
    };

    const page = await renderComponent(props);
    expect(await symbolSelector(page)).toBe(0);
  });
});
