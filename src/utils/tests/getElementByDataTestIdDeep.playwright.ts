import { createDataTestIdSelector } from './shadowDomTraversal';

/**
 * Recursively searches the document and all shadow roots for the first element
 * matching the given data-testid using Playwright.
 *
 * @param {import('@playwright/test').Page} page - The Playwright Page instance.
 * @param {string} testId - The value of the data-testid attribute to search for.
 * @returns {Promise<import('@playwright/test').Locator|null>} - Locator for the found element, or null.
 */
export async function getElementByDataTestIdDeep(page: any, dataTestId: string) {
  const element = await page.evaluate((testId: string) => {
    /**
     * Walks a root node (Document or ShadowRoot) depth-first.
     * @param {ParentNode & (Document|ShadowRoot)} root
     */
    function walk(root: any): any {
      // Try to find in this root first
      const found = root.querySelector(createDataTestIdSelector(testId));
      if (found) {
        return found;
      }
      // Traverse children to enter shadow roots
      const all: any[] = Array.from(root.querySelectorAll('*'));

      for (const el of all) {
        if (el.shadowRoot) {
          const inShadow = walk(el.shadowRoot);

          if (inShadow) {
            return inShadow;
          }
        }
      }
      return null;
    }
    return walk(document);
  }, dataTestId);

  // If nothing found, return null
  if (!element) {
    return null;
  }

  // Return a locator for the found element
  return page.locator(createDataTestIdSelector(dataTestId)).first();
}
