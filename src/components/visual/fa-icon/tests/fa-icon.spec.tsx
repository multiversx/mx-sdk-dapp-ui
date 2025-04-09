import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { FaIcon } from '../fa-icon';

describe('FaIcon Component', () => {
  it('should render with icon prop', async () => {
    const page = await newSpecPage({
      components: [FaIcon],
      template: () => <mvx-fa-icon icon={faUser}></mvx-fa-icon>,
    });

    const i = page.root.querySelector('i');
    expect(i).not.toBeNull();
    expect(i.innerHTML).toContain('svg-inline--fa fa-user');
  });

  it('should not render when icon prop is not provided', async () => {
    const page = await newSpecPage({
      components: [FaIcon],
      template: () => <mvx-fa-icon></mvx-fa-icon>,
    });

    expect(page.root.querySelector('i')).toBeNull();
  });

  it('should apply custom class when provided', async () => {
    const page = await newSpecPage({
      components: [FaIcon],
      template: () => <mvx-fa-icon icon={faUser} class="custom-class"></mvx-fa-icon>,
    });

    const i = page.root.querySelector('i');
    expect(i.classList.contains('custom-class')).toBe(true);
  });

  it('should set description as title when provided', async () => {
    const page = await newSpecPage({
      components: [FaIcon],
      template: () => <mvx-fa-icon icon={faUser} description="User Icon"></mvx-fa-icon>,
    });

    const i = page.root.querySelector('i');
    expect(i.getAttribute('title')).toBe('User Icon');
  });

  it('should use default class when no class prop is provided', async () => {
    const page = await newSpecPage({
      components: [FaIcon],
      template: () => <mvx-fa-icon icon={faUser}></mvx-fa-icon>,
    });

    const i = page.root.querySelector('i');
    expect(i.classList.contains('fa-icon')).toBe(true);
  });
});
