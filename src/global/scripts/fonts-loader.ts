interface FontVariantType {
  weight: number;
  name: string;
}

const fontVariants: FontVariantType[] = [
  { weight: 400, name: `Regular` },
  { weight: 500, name: `Medium` },
  { weight: 700, name: `Bold` },
];

fontVariants.forEach(fontVariant => {
  const fontName = 'Satoshi';
  const fontPath = `../collection/assets/fonts/${fontName}-${fontVariant.name}.woff2`;
  const fontUrl = new URL(fontPath, import.meta.url);

  const fontFace = new FontFace(fontName, `url(${fontUrl.href})`, {
    style: 'normal',
    weight: String(fontVariant.weight),
  });

  fontFace.load().then(loadedFace => {
    document.fonts.add(loadedFace);
  });
});
