import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { GenericModal } from '../generic-modal';

describe('GenericModal Component', () => {
  it('should render with required props', async () => {
    const page = await newSpecPage({
      components: [GenericModal],
      template: () => <generic-modal modalTitle="Test Modal" body={<div>Modal Content</div>}></generic-modal>,
    });

    expect(page.root.querySelector('.modal')).not.toBeNull();
    expect(page.root.querySelector('.modal-header h2').textContent).toBe('Test Modal');
    expect(page.root.querySelector('.modal-content').innerHTML).toContain('Modal Content');
  });

  it('should render with subtitle when modalSubtitle is provided', async () => {
    const page = await newSpecPage({
      components: [GenericModal],
      template: () => <generic-modal modalTitle="Test Modal" modalSubtitle="Modal Subtitle" body={<div>Modal Content</div>}></generic-modal>,
    });

    const subtitle = page.root.querySelector('.modal-header h4');
    expect(subtitle).not.toBeNull();
    expect(subtitle.textContent).toBe('Modal Subtitle');
  });

  it('should not render subtitle when modalSubtitle is not provided', async () => {
    const page = await newSpecPage({
      components: [GenericModal],
      template: () => <generic-modal modalTitle="Test Modal" body={<div>Modal Content</div>}></generic-modal>,
    });

    const subtitle = page.root.querySelector('.modal-header h4');
    expect(subtitle).toBeNull();
  });

  it('should emit close event when close button is clicked', async () => {
    const closeSpy = jest.fn();

    const page = await newSpecPage({
      components: [GenericModal],
      template: () => <generic-modal modalTitle="Test Modal" body={<div>Modal Content</div>}></generic-modal>,
    });

    // Set up event listener for close event
    page.root.addEventListener('close', closeSpy);

    // Click the close button
    const closeButton = page.root.querySelector('.modal-header .close');
    const clickEvent = new MouseEvent('click');
    closeButton.dispatchEvent(clickEvent);

    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit close event when Escape key is pressed', async () => {
    const closeSpy = jest.fn();

    const page = await newSpecPage({
      components: [GenericModal],
      template: () => <generic-modal modalTitle="Test Modal" body={<div>Modal Content</div>}></generic-modal>,
    });

    // Set up event listener for close event
    page.root.addEventListener('close', closeSpy);

    // Simulate Escape key press
    const modal = page.root.querySelector('.modal');
    const keyEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    modal.dispatchEvent(keyEvent);

    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('should not emit close event for non-Escape key presses', async () => {
    const closeSpy = jest.fn();

    const page = await newSpecPage({
      components: [GenericModal],
      template: () => <generic-modal modalTitle="Test Modal" body={<div>Modal Content</div>}></generic-modal>,
    });

    // Set up event listener for close event
    page.root.addEventListener('close', closeSpy);

    // Simulate non-Escape key press
    const modal = page.root.querySelector('.modal');
    const keyEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    modal.dispatchEvent(keyEvent);

    expect(closeSpy).not.toHaveBeenCalled();
  });
});
