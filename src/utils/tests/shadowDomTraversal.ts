/**
 * Core shadow DOM traversal logic that can be reused across different testing frameworks.
 * This function recursively searches through the document and all shadow roots.
 */

/**
 * Walks a root node (Document or ShadowRoot) depth-first to find elements.
 * @param {Document | ShadowRoot} root - The root node to start searching from
 * @param {string} selector - CSS selector to search for
 * @returns {Element | null} - The found element, or null
 */
export function walkShadowDom(root: Document | ShadowRoot, selector: string): Element | null {
  // Try to find in this root first
  const found = root.querySelector(selector);
  if (found) {
    return found;
  }

  // Traverse children to enter shadow roots
  const all: Element[] = Array.from(root.querySelectorAll('*'));

  for (const el of all) {
    if (el.shadowRoot) {
      const inShadow = walkShadowDom(el.shadowRoot, selector);
      if (inShadow) {
        return inShadow;
      }
    }
  }
  return null;
}

/**
 * Finds all elements matching a selector in the document and all shadow roots.
 * @param {Document | ShadowRoot} root - The root node to start searching from
 * @param {string} selector - CSS selector to search for
 * @returns {Element[]} - Array of found elements
 */
export function walkShadowDomAll(root: Document | ShadowRoot, selector: string): Element[] {
  const results: Element[] = [];
  
  // Find in this root first
  const found = Array.from(root.querySelectorAll(selector));
  results.push(...found);

  // Traverse children to enter shadow roots
  const all: Element[] = Array.from(root.querySelectorAll('*'));

  for (const el of all) {
    if (el.shadowRoot) {
      const inShadow = walkShadowDomAll(el.shadowRoot, selector);
      results.push(...inShadow);
    }
  }
  
  return results;
}

/**
 * Helper function to create a data-testid selector
 * @param {string} testId - The data-testid value
 * @returns {string} - CSS selector for the data-testid
 */
export function createDataTestIdSelector(testId: string): string {
  return `[data-testid="${testId}"]`;
}