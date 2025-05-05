export const twClasses = (tailwindClasses: string) => {
  const tailwindClassesArray = tailwindClasses.split(' ');

  const processTailwindClasses = (tailwindClassesArray: string[]) =>
    tailwindClassesArray.map(tailwindClass => (tailwindClass.startsWith('mvx:') ? tailwindClass : `mvx:${tailwindClass}`));

  return processTailwindClasses(tailwindClassesArray).join(' ');
};
