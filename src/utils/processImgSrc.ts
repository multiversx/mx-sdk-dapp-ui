export function processImgSrc(src: string) {
  const baseUrl = import.meta.url;
  const imageSource = new URL(`../collection/assets/${src}`, baseUrl);

  return imageSource.href;
}
