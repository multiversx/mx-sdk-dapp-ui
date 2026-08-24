/**
 * A stand-in for the QR code that `sdk-dapp` renders from the WalletConnect URI.
 * `mvx-wallet-connect-scan` injects whatever SVG markup it is given via
 * `innerHTML`, so any valid SVG exercises the same code path.
 */
export const createQrCodeSvg = (): string => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" shape-rendering="crispEdges" width="220" height="220">
  <rect width="25" height="25" fill="#ffffff"/>
  <g fill="#000000">
    ${Array.from({ length: 25 }, (_, row) =>
      Array.from({ length: 25 }, (_, column) => {
        const isFinder =
          (row < 7 && column < 7) || (row < 7 && column > 17) || (row > 17 && column < 7);
        const isBorder = isFinder && (row % 6 === 0 || column % 6 === 0 || (row > 1 && row < 5 && column > 1 && column < 5));
        const isData = !isFinder && (row * 7 + column * 3) % 5 < 2;

        return isBorder || isData ? `<rect x="${column}" y="${row}" width="1" height="1"/>` : '';
      }).join(''),
    ).join('')}
  </g>
</svg>`;

export const EXAMPLE_WC_URI =
  'wc:8a5e5bdc4f4f6f2b1c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b@2?relay-protocol=irn&symKey=7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a';

export const EXAMPLE_DEEP_LINK = `https://xportal.com/?wallet-connect=${encodeURIComponent(EXAMPLE_WC_URI)}`;
