import { walkShadowDom } from './shadowDomTraversal';

// Note: JSDOM does not support shadow DOM natively. These tests simulate shadow DOM by mocking shadowRoot properties.
// For full shadow DOM support, run in a browser environment or use a polyfill.

describe('walkShadowDom', () => {
  let root: Document;
  beforeEach(() => {
    document.body.innerHTML = '';
    root = document;
  });

  it('finds an element in the light DOM', () => {
    const div = document.createElement('div');
    div.setAttribute('data-testid', 'foo');
    document.body.appendChild(div);
    expect(walkShadowDom(root, '[data-testid="foo"]')).toBe(div);
  });

  it('finds an element in a simulated shadow DOM', () => {
    const host = document.createElement('div');
    const shadowRoot = document.createElement('div');
    const shadowChild = document.createElement('span');
    shadowChild.setAttribute('data-testid', 'bar');
    shadowRoot.appendChild(shadowChild);
    // Simulate shadowRoot property
    (host as any).shadowRoot = shadowRoot;
    document.body.appendChild(host);
    // Patch querySelectorAll to include host for traversal
    const origQuerySelectorAll = document.querySelectorAll;
    document.querySelectorAll = function (sel) {
      // If selector is '*', include host
      if (sel === '*') {
        return [host] as any;
      }
      return origQuerySelectorAll.call(this, sel);
    };
    expect(walkShadowDom(document, '[data-testid="bar"]')).toBe(shadowChild);
    document.querySelectorAll = origQuerySelectorAll;
  });

  it('throws if root is missing', () => {
    expect(() => walkShadowDom(undefined as any, '[data-testid="foo"]')).toThrow('walkShadowDom: root is required');
  });

  it('throws if selector is missing', () => {
    expect(() => walkShadowDom(document, undefined as any)).toThrow(
      'walkShadowDom: selector must be a non-empty string',
    );
  });

  it('throws if selector is not a string', () => {
    expect(() => walkShadowDom(document, 123 as any)).toThrow('walkShadowDom: selector must be a non-empty string');
  });

  it('throws a clear error for invalid CSS selector', () => {
    expect(() => walkShadowDom(document, '!!!invalid')).toThrow(/Invalid CSS selector/);
  });
});
