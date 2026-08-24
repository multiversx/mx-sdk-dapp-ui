import { readComponentMetadata } from './component-metadata';

/**
 * Collects the tags of every component under `folderPath`, so they can be
 * excluded from the React and Vue output targets.
 *
 * Thin wrapper over `readComponentMetadata` so there is a single decorator
 * parser in the repo — see src/global/scripts/component-metadata.ts.
 */
export function getExcludedComponentTags(folderPath: string): string[] {
  return readComponentMetadata(folderPath).map(component => component.tag);
}
