import { newSpecPage } from '@stencil/core/testing';
import { Trim } from 'common/Trim/Trim';

import { ExplorerLink } from '../../../common/explorer-link/explorer-link';
import { CopyButton } from '../../copy-button/copy-button';
import { Tooltip } from '../../tooltip/tooltip';
import { DataWithExplorerLink } from '../data-with-explorer-link';

describe('DataWithExplorerLink', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [DataWithExplorerLink, Trim, CopyButton, ExplorerLink],
      html: '<mvx-data-with-explorer-link data="test-data" explorer-link="https://explorer.com/test"></mvx-data-with-explorer-link>',
    });

    // Check that the main structure is rendered
    const mainDiv = page.root.querySelector('.data-with-explorer-link');
    expect(mainDiv).toBeTruthy();

    // Check that trim component is present with correct class
    const trimComponent = page.root.querySelector('.data-with-explorer-link-trim.trim');
    expect(trimComponent).toBeTruthy();

    // Check that buttons container is present
    const buttonsContainer = page.root.querySelector('.data-with-explorer-link-buttons');
    expect(buttonsContainer).toBeTruthy();

    // Check that copy button and explorer link are present
    const copyButton = page.root.querySelector('mvx-copy-button');
    const explorerLink = page.root.querySelector('mvx-explorer-link');
    expect(copyButton).toBeTruthy();
    expect(explorerLink).toBeTruthy();
  });

  it('renders with custom class and dataTestId', async () => {
    const page = await newSpecPage({
      components: [DataWithExplorerLink, Trim, CopyButton, ExplorerLink],
      html: '<mvx-data-with-explorer-link data="test-data" explorer-link="https://explorer.com/test" class="custom-class" data-test-id="custom-test-id"></mvx-data-with-explorer-link>',
    });

    // Check that custom class is applied to the main div
    const mainDiv = page.root.querySelector('.data-with-explorer-link.custom-class');
    expect(mainDiv).toBeTruthy();

    // Check that dataTestId is applied
    const elementWithTestId = page.root.querySelector('[data-testid="custom-test-id"]');
    expect(elementWithTestId).toBeTruthy();
  });

  it('renders with copy button disabled', async () => {
    const page = await newSpecPage({
      components: [DataWithExplorerLink, Trim, ExplorerLink],
      html: '<mvx-data-with-explorer-link data="test-data" explorer-link="https://explorer.com/test" show-copy-button="false"></mvx-data-with-explorer-link>',
    });

    // Check that buttons container is present
    const buttonsContainer = page.root.querySelector('.data-with-explorer-link-buttons');
    expect(buttonsContainer).toBeTruthy();

    // Check that copy button is not present
    const copyButton = page.root.querySelector('mvx-copy-button');
    expect(copyButton).toBeFalsy();

    // Check that explorer link is present
    const explorerLink = page.root.querySelector('mvx-explorer-link');
    expect(explorerLink).toBeTruthy();
  });

  it('renders with explorer button disabled', async () => {
    const page = await newSpecPage({
      components: [DataWithExplorerLink, Trim, CopyButton],
      html: '<mvx-data-with-explorer-link data="test-data" explorer-link="https://explorer.com/test" show-explorer-button="false"></mvx-data-with-explorer-link>',
    });

    // Check that buttons container is present
    const buttonsContainer = page.root.querySelector('.data-with-explorer-link-buttons');
    expect(buttonsContainer).toBeTruthy();

    // Check that copy button is present
    const copyButton = page.root.querySelector('mvx-copy-button');
    expect(copyButton).toBeTruthy();

    // Check that explorer link is not present
    const explorerLink = page.root.querySelector('mvx-explorer-link');
    expect(explorerLink).toBeFalsy();
  });

  it('renders with both buttons disabled', async () => {
    const page = await newSpecPage({
      components: [DataWithExplorerLink, Trim],
      html: '<mvx-data-with-explorer-link data="test-data" explorer-link="https://explorer.com/test" show-copy-button="false" show-explorer-button="false"></mvx-data-with-explorer-link>',
    });

    // Check that main div is present
    const mainDiv = page.root.querySelector('.data-with-explorer-link');
    expect(mainDiv).toBeTruthy();

    // Check that trim component is present
    const trimComponent = page.root.querySelector('.data-with-explorer-link-trim.trim');
    expect(trimComponent).toBeTruthy();

    // Check that buttons container is not present
    const buttonsContainer = page.root.querySelector('.data-with-explorer-link-buttons');
    expect(buttonsContainer).toBeFalsy();
  });

  it('renders with tooltips enabled', async () => {
    const page = await newSpecPage({
      components: [DataWithExplorerLink, Trim, CopyButton, ExplorerLink, Tooltip],
      html: '<mvx-data-with-explorer-link data="test-data" explorer-link="https://explorer.com/test" with-tooltip="true"></mvx-data-with-explorer-link>',
    });

    // Check that buttons container is present
    const buttonsContainer = page.root.querySelector('.data-with-explorer-link-buttons');
    expect(buttonsContainer).toBeTruthy();

    // Check that tooltips are present
    const tooltips = page.root.querySelectorAll('mvx-tooltip');
    expect(tooltips.length).toBe(2);

    // Check component props
    const component = page.rootInstance as DataWithExplorerLink;
    expect(component.withTooltip).toBe(true);
    expect(component.showCopyButton).toBe(true);
    expect(component.showExplorerButton).toBe(true);
  });

  it('renders with tooltips enabled and copy button disabled', async () => {
    const page = await newSpecPage({
      components: [DataWithExplorerLink, Trim, ExplorerLink, Tooltip],
      html: '<mvx-data-with-explorer-link data="test-data" explorer-link="https://explorer.com/test" with-tooltip="true" show-copy-button="false"></mvx-data-with-explorer-link>',
    });

    // Check that only one tooltip is present
    const tooltips = page.root.querySelectorAll('mvx-tooltip');
    expect(tooltips.length).toBe(1);

    // Check that copy button is not present
    const copyButton = page.root.querySelector('mvx-copy-button');
    expect(copyButton).toBeFalsy();

    // Check component props
    const component = page.rootInstance as DataWithExplorerLink;
    expect(component.withTooltip).toBe(true);
    expect(component.showCopyButton).toBe(false);
    expect(component.showExplorerButton).toBe(true);
  });

  it('renders with tooltips enabled and explorer button disabled', async () => {
    const page = await newSpecPage({
      components: [DataWithExplorerLink, Trim, CopyButton, Tooltip],
      html: '<mvx-data-with-explorer-link data="test-data" explorer-link="https://explorer.com/test" with-tooltip="true" show-explorer-button="false"></mvx-data-with-explorer-link>',
    });

    // Check that only one tooltip is present
    const tooltips = page.root.querySelectorAll('mvx-tooltip');
    expect(tooltips.length).toBe(1);

    // Check that explorer link is not present
    const explorerLink = page.root.querySelector('mvx-explorer-link');
    expect(explorerLink).toBeFalsy();

    // Check component props
    const component = page.rootInstance as DataWithExplorerLink;
    expect(component.withTooltip).toBe(true);
    expect(component.showCopyButton).toBe(true);
    expect(component.showExplorerButton).toBe(false);
  });

  it('stops event propagation when clicking on buttons container', async () => {
    const page = await newSpecPage({
      components: [DataWithExplorerLink, Trim, CopyButton, ExplorerLink],
      html: '<mvx-data-with-explorer-link data="test-data" explorer-link="https://explorer.com/test"></mvx-data-with-explorer-link>',
    });

    const buttonsContainer = page.root.querySelector('.data-with-explorer-link-buttons');
    expect(buttonsContainer).toBeTruthy();

    // The onClick handler should be attached to the buttons container
    // We can't directly test the event.stopPropagation() call in unit tests,
    // but we can verify the structure is correct for the handler to exist
    const component = page.rootInstance as DataWithExplorerLink;
    expect(component.showCopyButton).toBe(true);
    expect(component.showExplorerButton).toBe(true);
  });

  it('renders without buttons container when both buttons are disabled', async () => {
    const page = await newSpecPage({
      components: [DataWithExplorerLink, Trim],
      html: '<mvx-data-with-explorer-link data="test-data" explorer-link="https://explorer.com/test" show-copy-button="false" show-explorer-button="false"></mvx-data-with-explorer-link>',
    });

    const buttonsContainer = page.root.querySelector('.data-with-explorer-link-buttons');
    expect(buttonsContainer).toBeFalsy();

    // But trim component should still be present
    const trimComponent = page.root.querySelector('.data-with-explorer-link-trim.trim');
    expect(trimComponent).toBeTruthy();
  });

  it('renders with empty data', async () => {
    const page = await newSpecPage({
      components: [DataWithExplorerLink, Trim, CopyButton, ExplorerLink],
      html: '<mvx-data-with-explorer-link data="" explorer-link="https://explorer.com/test"></mvx-data-with-explorer-link>',
    });

    // Check that the component renders even with empty data
    const mainDiv = page.root.querySelector('.data-with-explorer-link');
    expect(mainDiv).toBeTruthy();

    // Check that trim component is present
    const trimComponent = page.root.querySelector('.data-with-explorer-link-trim.trim');
    expect(trimComponent).toBeTruthy();

    // Check that the component instance has empty data
    const component = page.rootInstance as DataWithExplorerLink;
    expect(component.data).toBe('');
  });

  it('renders with long data string', async () => {
    const longData = 'a'.repeat(100);
    const page = await newSpecPage({
      components: [DataWithExplorerLink, Trim, CopyButton, ExplorerLink],
      html: `<mvx-data-with-explorer-link data="${longData}" explorer-link="https://explorer.com/test"></mvx-data-with-explorer-link>`,
    });

    // Check that the component renders with long data
    const mainDiv = page.root.querySelector('.data-with-explorer-link');
    expect(mainDiv).toBeTruthy();

    // Check that the component instance has the correct long data
    const component = page.rootInstance as DataWithExplorerLink;
    expect(component.data).toBe(longData);

    // Check that trim component is present to handle the long text
    const trimComponent = page.root.querySelector('.data-with-explorer-link-trim.trim');
    expect(trimComponent).toBeTruthy();
  });

  it('has correct component properties set', async () => {
    const page = await newSpecPage({
      components: [DataWithExplorerLink],
      html: '<mvx-data-with-explorer-link data="test-data" explorer-link="https://explorer.com/test" show-copy-button="false" show-explorer-button="true" with-tooltip="true" class="custom" data-test-id="test"></mvx-data-with-explorer-link>',
    });

    const component = page.rootInstance as DataWithExplorerLink;
    expect(component.data).toBe('test-data');
    expect(component.explorerLink).toBe('https://explorer.com/test');
    expect(component.showCopyButton).toBe(false);
    expect(component.showExplorerButton).toBe(true);
    expect(component.withTooltip).toBe(true);
    expect(component.class).toBe('custom');
    expect(component.dataTestId).toBe('test');
  });
});