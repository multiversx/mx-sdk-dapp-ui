import { newSpecPage } from '@stencil/core/testing';
import { FormatAmount } from '../format-amount';

describe('FormatAmount component', () => {
  const renderComponent = async (props: any) => {
    const page = await newSpecPage({
      components: [FormatAmount],
      html: '<format-amount></format-amount>',
      supportsShadowDom: true,
    });

    const component = page.root;
    Object.keys(props).forEach((key) => {
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

  it('should render valid amount with decimals', async () => {
    const props = {
      isValid: true,
      valueInteger: '99999',
      valueDecimal: '99',
      label: 'EGLD',
    };

    const page = await renderComponent(props);
    expect(page.root.shadowRoot.querySelector('span[data-testid="formatAmountInt"]').textContent).toBe('99999');
    expect(decimalsSelector(page)).toBe('.99');
  });

  it('should not render decimals when valueDecimal is empty', async () => {
    const props = {
      isValid: true,
      valueInteger: '90000',
      valueDecimal: '',
      label: 'EGLD',
    };

    const page = await renderComponent(props);
    expect(decimalsSelector(page)).toBe(undefined);
  });

  it('should render invalid state when isValid is false', async () => {
    const props = {
      isValid: false,
      valueInteger: '',
      valueDecimal: '',
      label: '',
    };

    const page = await renderComponent(props);
    expect(page.root.shadowRoot.querySelector('span[data-testid="formatAmountInt"]').textContent).toBe('...');
  });

  it('should render symbol when label is provided', async () => {
    const props = {
      isValid: true,
      valueInteger: '90000',
      valueDecimal: '00',
      label: 'EGLD',
    };

    const page = await renderComponent(props);
    expect(symbolSelector(page)).toBe(1);
  });

  it('should not render symbol when label is not provided', async () => {
    const props = {
      isValid: true,
      valueInteger: '90000',
      valueDecimal: '00',
      label: '',
    };

    const page = await renderComponent(props);
    expect(symbolSelector(page)).toBe(0);
  });
});
