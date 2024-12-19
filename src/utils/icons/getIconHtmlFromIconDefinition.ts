import { library, icon, IconDefinition, Icon } from '@fortawesome/fontawesome-svg-core';

export function getIconHtmlFromIconDefinition(iconDefinition: IconDefinition): string | null {
  let faIcon: Icon;
  library.add(iconDefinition);
  faIcon = icon(iconDefinition);

  return faIcon ? faIcon.html[0] : null;
}
