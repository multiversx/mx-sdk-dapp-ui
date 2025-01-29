import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { FontawesomeIcon } from '../fontawesome-icon';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

describe('FontawesomeIcon Component', () => {
  it('should render with icon prop', async () => {
    const page = await newSpecPage({
      components: [FontawesomeIcon],
      template: () => <fontawesome-icon icon={faUser}></fontawesome-icon>,
    });

    const div = page.root.shadowRoot.querySelector('div');
    expect(div).not.toBeNull();
    expect(div.innerHTML).toBe(
      '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"></path></svg>',
    );
  });

  it('should not render when icon prop is not provided', async () => {
    const page = await newSpecPage({
      components: [FontawesomeIcon],
      template: () => <fontawesome-icon></fontawesome-icon>,
    });

    expect(page.root.shadowRoot.childNodes.length).toBe(0);
  });

  it('should apply custom class when provided', async () => {
    const page = await newSpecPage({
      components: [FontawesomeIcon],
      template: () => <fontawesome-icon icon={faUser} class="custom-class"></fontawesome-icon>,
    });

    const div = page.root.shadowRoot.querySelector('div');
    expect(div.classList.contains('custom-class')).toBe(true);
  });

  it('should set description as title when provided', async () => {
    const page = await newSpecPage({
      components: [FontawesomeIcon],
      template: () => <fontawesome-icon icon={faUser} description="User Icon"></fontawesome-icon>,
    });

    const div = page.root.shadowRoot.querySelector('div');
    expect(div.getAttribute('title')).toBe('User Icon');
  });

  it('should use default class when no class prop is provided', async () => {
    const page = await newSpecPage({
      components: [FontawesomeIcon],
      template: () => <fontawesome-icon icon={faUser}></fontawesome-icon>,
    });

    const div = page.root.shadowRoot.querySelector('div');
    expect(div.classList.contains('fontawesome-icon')).toBe(true);
  });
});
