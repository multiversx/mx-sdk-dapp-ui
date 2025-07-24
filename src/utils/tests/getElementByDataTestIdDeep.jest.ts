import { createDataTestIdSelector, walkShadowDom } from './shadowDomTraversal';

/**
 * Recursively searches the document and all shadow roots for the first element
 * matching the given data-testid using Jest/JSDOM.
 *
 * @param {string} dataTestId - The value of the data-testid attribute to search for.
 * @param {Document|ShadowRoot} root - The root to search from (defaults to document).
 * @returns {Element|null} - The found element, or null.
 */
export function getElementByDataTestIdDeep(dataTestId: string, root: Document | ShadowRoot = document): Element | null {
  return walkShadowDom(root, createDataTestIdSelector(dataTestId));
}

/**
 * Jest/Testing Library compatible version that works with screen queries
 * @param {string} dataTestId - The value of the data-testid attribute to search for.
 * @returns {Element|null} - The found element, or null.
 */
export function queryByDataTestIdDeep(dataTestId: string): Element | null {
  return getElementByDataTestIdDeep(dataTestId);
}

/**
 * Jest/Testing Library compatible version that throws if element not found
 * @param {string} dataTestId - The value of the data-testid attribute to search for.
 * @returns {Element} - The found element.
 * @throws {Error} If element is not found.
 */
export function getByDataTestIdDeep(dataTestId: string): Element {
  const element = getElementByDataTestIdDeep(dataTestId);
  if (!element) {
    throw new Error(`Unable to find element with data-testid: ${dataTestId}`);
  }
  return element;
}
