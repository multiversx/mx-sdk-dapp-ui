/**
 * Vendored from https://github.com/unjs/uqr
 * Minimal port — only `renderSVG` and its dependencies.
 *
 * MIT License
 * Copyright (c) Project Nayuki
 * Copyright (c) 2023 Anthony Fu <https://github.com/antfu>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 */

// prettier-ignore
const ECC_CODEWORDS_PER_BLOCK = [
  [-1,  7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
  [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
];

// prettier-ignore
const NUM_ERROR_CORRECTION_BLOCKS = [
  [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2,  4,  4,  4,  4,  4,  6,  6,  6,  6,  7,  8,  8,  9,  9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
  [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5,  5,  5,  8,  9,  9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
  [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8,  8,  8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
  [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8,  8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81],
];

const LOW: [number, number] = [0, 1];
const MEDIUM: [number, number] = [1, 0];
const QUARTILE: [number, number] = [2, 3];
const HIGH: [number, number] = [3, 2];
const EccMap: Record<string, [number, number]> = { L: LOW, M: MEDIUM, Q: QUARTILE, H: HIGH };

const NUMERIC_REGEX = /^[0-9]*$/;
const ALPHANUMERIC_REGEX = /^[A-Z0-9 $%*+./:-]*$/;
const ALPHANUMERIC_CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';
const MIN_VERSION = 1;
const MAX_VERSION = 40;
const PENALTY_N1 = 3,
  PENALTY_N2 = 3,
  PENALTY_N3 = 40,
  PENALTY_N4 = 10;

const enum ModuleType {
  Data = 0,
  Function = 1,
  Position = 2,
  Timing = 3,
  Alignment = 4,
}

function getBit(x: number, i: number) {
  return ((x >>> i) & 1) !== 0;
}

function appendBits(val: number, len: number, bb: number[]) {
  if (len < 0 || len > 31 || val >>> len !== 0) {
    throw new RangeError('Value out of range');
  }
  for (let i = len - 1; i >= 0; i--) {
    bb.push((val >>> i) & 1);
  }
}

function rsMul(x: number, y: number) {
  if (x >>> 8 !== 0 || y >>> 8 !== 0) {
    throw new RangeError('Byte out of range');
  }
  let z = 0;
  for (let i = 7; i >= 0; i--) {
    z = (z << 1) ^ ((z >>> 7) * 285);
    z ^= ((y >>> i) & 1) * x;
  }
  return z;
}

function rsDivisor(degree: number) {
  const r: number[] = [...Array(degree - 1).fill(0), 1];
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < r.length; j++) {
      r[j] = rsMul(r[j], root);
      if (j + 1 < r.length) {
        r[j] ^= r[j + 1];
      }
    }
    root = rsMul(root, 2);
  }
  return r;
}

function rsRemainder(data: number[], div: number[]) {
  const r = div.map(() => 0);
  for (const b of data) {
    const f = b ^ (r.shift() as number);
    r.push(0);
    div.forEach((c, i) => (r[i] ^= rsMul(c, f)));
  }
  return r;
}

function numRawModules(ver: number) {
  let r = (16 * ver + 128) * ver + 64;
  if (ver >= 2) {
    const n = Math.floor(ver / 7) + 2;
    r -= (25 * n - 10) * n - 55;
    if (ver >= 7) {
      r -= 36;
    }
  }
  return r;
}

function numDataCodewords(ver: number, ecl: [number, number]) {
  return (
    Math.floor(numRawModules(ver) / 8) - ECC_CODEWORDS_PER_BLOCK[ecl[0]][ver] * NUM_ERROR_CORRECTION_BLOCKS[ecl[0]][ver]
  );
}

function toUtf8(str: string) {
  str = encodeURI(str);
  const r: number[] = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== '%') {
      r.push(str.charCodeAt(i));
    } else {
      r.push(parseInt(str.substring(i + 1, i + 3), 16));
      i += 2;
    }
  }
  return r;
}

const M_NUM = [1, 10, 12, 14],
  M_ALNUM = [2, 9, 11, 13],
  M_BYTE = [4, 8, 16, 16];
const ccBits = (mode: number[], ver: number) => mode[Math.floor((ver + 7) / 17) + 1];

class Seg {
  private bits: number[];
  constructor(
    public mode: number[],
    public numChars: number,
    bits: number[],
  ) {
    if (numChars < 0) {
      throw new RangeError();
    }
    this.bits = bits.slice();
  }
  getData() {
    return this.bits.slice();
  }
}

function segBytes(data: number[]) {
  const bb: number[] = [];
  for (const b of data) {
    appendBits(b, 8, bb);
  }
  return new Seg(M_BYTE, data.length, bb);
}

function segNumeric(digits: string) {
  if (!NUMERIC_REGEX.test(digits)) {
    throw new RangeError();
  }
  const bb: number[] = [];
  for (let i = 0; i < digits.length; ) {
    const n = Math.min(digits.length - i, 3);
    appendBits(parseInt(digits.substring(i, i + n), 10), n * 3 + 1, bb);
    i += n;
  }
  return new Seg(M_NUM, digits.length, bb);
}

function segAlphanum(text: string) {
  if (!ALPHANUMERIC_REGEX.test(text)) {
    throw new RangeError();
  }
  const bb: number[] = [];
  let i = 0;
  for (; i + 2 <= text.length; i += 2) {
    let t = ALPHANUMERIC_CHARSET.indexOf(text[i]) * 45 + ALPHANUMERIC_CHARSET.indexOf(text[i + 1]);
    appendBits(t, 11, bb);
  }
  if (i < text.length) {
    appendBits(ALPHANUMERIC_CHARSET.indexOf(text[i]), 6, bb);
  }
  return new Seg(M_ALNUM, text.length, bb);
}

function makeSegments(text: string): Seg[] {
  if (!text) {
    return [];
  }
  if (NUMERIC_REGEX.test(text)) {
    return [segNumeric(text)];
  }
  if (ALPHANUMERIC_REGEX.test(text)) {
    return [segAlphanum(text)];
  }
  return [segBytes(toUtf8(text))];
}

function totalBits(segs: Seg[], ver: number) {
  let r = 0;
  for (const s of segs) {
    const cb = ccBits(s.mode, ver);
    if (s.numChars >= 1 << cb) {
      return Infinity;
    }
    r += 4 + cb + s.getData().length;
  }
  return r;
}

class QrCode {
  size: number;
  mask = 0;
  modules: boolean[][] = [];
  types: number[][] = [];

  constructor(
    public version: number,
    public ecc: [number, number],
    data: number[],
    msk: number,
  ) {
    if (version < MIN_VERSION || version > MAX_VERSION) {
      throw new RangeError();
    }
    if (msk < -1 || msk > 7) {
      throw new RangeError();
    }
    this.size = version * 4 + 17;
    for (let i = 0; i < this.size; i++) {
      this.modules.push(Array(this.size).fill(false));
      this.types.push(Array(this.size).fill(ModuleType.Data));
    }
    this.drawFunctions();
    this.drawCodewords(this.addEcc(data));
    if (msk === -1) {
      let min = 1e9;
      for (let i = 0; i < 8; i++) {
        this.applyMask(i);
        this.drawFormat(i);
        const p = this.penalty();
        if (p < min) {
          msk = i;
          min = p;
        }
        this.applyMask(i);
      }
    }
    this.mask = msk;
    this.applyMask(msk);
    this.drawFormat(msk);
  }

  private set(x: number, y: number, dark: boolean, type: number = ModuleType.Function) {
    this.modules[y][x] = dark;
    this.types[y][x] = type;
  }

  private drawFunctions() {
    for (let i = 0; i < this.size; i++) {
      this.set(6, i, i % 2 === 0, ModuleType.Timing);
      this.set(i, 6, i % 2 === 0, ModuleType.Timing);
    }
    this.finder(3, 3);
    this.finder(this.size - 4, 3);
    this.finder(3, this.size - 4);
    const ap = this.alignPos();
    const na = ap.length;
    for (let i = 0; i < na; i++) {
      for (let j = 0; j < na; j++) {
        if (!(i === 0 && j === 0) && !(i === 0 && j === na - 1) && !(i === na - 1 && j === 0)) {
          this.align(ap[i], ap[j]);
        }
      }
    }
    this.drawFormat(0);
    this.drawVer();
  }

  private drawFormat(mask: number) {
    const data = (this.ecc[1] << 3) | mask;
    let rem = data;
    for (let i = 0; i < 10; i++) {
      rem = (rem << 1) ^ ((rem >>> 9) * 1335);
    }
    const bits = ((data << 10) | rem) ^ 21522;
    for (let i = 0; i <= 5; i++) {
      this.set(8, i, getBit(bits, i));
    }
    this.set(8, 7, getBit(bits, 6));
    this.set(8, 8, getBit(bits, 7));
    this.set(7, 8, getBit(bits, 8));
    for (let i = 9; i < 15; i++) {
      this.set(14 - i, 8, getBit(bits, i));
    }
    for (let i = 0; i < 8; i++) {
      this.set(this.size - 1 - i, 8, getBit(bits, i));
    }
    for (let i = 8; i < 15; i++) {
      this.set(8, this.size - 15 + i, getBit(bits, i));
    }
    this.set(8, this.size - 8, true);
  }

  private drawVer() {
    if (this.version < 7) {
      return;
    }
    let rem = this.version;
    for (let i = 0; i < 12; i++) {
      rem = (rem << 1) ^ ((rem >>> 11) * 7973);
    }
    const bits = (this.version << 12) | rem;
    for (let i = 0; i < 18; i++) {
      const a = this.size - 11 + (i % 3),
        b = Math.floor(i / 3);
      this.set(a, b, getBit(bits, i));
      this.set(b, a, getBit(bits, i));
    }
  }

  private finder(x: number, y: number) {
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const xx = x + dx,
          yy = y + dy;
        if (xx >= 0 && xx < this.size && yy >= 0 && yy < this.size) {
          this.set(
            xx,
            yy,
            Math.max(Math.abs(dx), Math.abs(dy)) !== 2 && Math.max(Math.abs(dx), Math.abs(dy)) !== 4,
            ModuleType.Position,
          );
        }
      }
    }
  }

  private align(x: number, y: number) {
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        this.set(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1, ModuleType.Alignment);
      }
    }
  }

  private addEcc(data: number[]) {
    const { version: ver, ecc: ecl } = this;
    const nb = NUM_ERROR_CORRECTION_BLOCKS[ecl[0]][ver],
      bel = ECC_CODEWORDS_PER_BLOCK[ecl[0]][ver];
    const raw = Math.floor(numRawModules(ver) / 8),
      nsb = nb - (raw % nb),
      sbl = Math.floor(raw / nb);
    const blocks: number[][] = [],
      div = rsDivisor(bel);
    for (let i = 0, k = 0; i < nb; i++) {
      const dat = data.slice(k, k + sbl - bel + (i < nsb ? 0 : 1));
      k += dat.length;
      const ecc = rsRemainder(dat, div);
      if (i < nsb) {
        dat.push(0);
      }
      blocks.push(dat.concat(ecc));
    }
    const r: number[] = [];
    for (let i = 0; i < blocks[0].length; i++) {
      blocks.forEach((b, j) => {
        if (i !== sbl - bel || j >= nsb) {
          r.push(b[i]);
        }
      });
    }
    return r;
  }

  private drawCodewords(data: number[]) {
    let i = 0;
    for (let right = this.size - 1; right >= 1; right -= 2) {
      if (right === 6) {
        right = 5;
      }
      for (let vert = 0; vert < this.size; vert++) {
        for (let j = 0; j < 2; j++) {
          const x = right - j,
            upward = ((right + 1) & 2) === 0,
            y = upward ? this.size - 1 - vert : vert;
          if (!this.types[y][x] && i < data.length * 8) {
            this.modules[y][x] = getBit(data[i >>> 3], 7 - (i & 7));
            i++;
          }
        }
      }
    }
  }

  private applyMask(mask: number) {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        let inv: boolean;
        switch (mask) {
          case 0:
            inv = (x + y) % 2 === 0;
            break;
          case 1:
            inv = y % 2 === 0;
            break;
          case 2:
            inv = x % 3 === 0;
            break;
          case 3:
            inv = (x + y) % 3 === 0;
            break;
          case 4:
            inv = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0;
            break;
          case 5:
            inv = ((x * y) % 2) + ((x * y) % 3) === 0;
            break;
          case 6:
            inv = (((x * y) % 2) + ((x * y) % 3)) % 2 === 0;
            break;
          default:
            inv = (((x + y) % 2) + ((x * y) % 3)) % 2 === 0;
        }
        if (!this.types[y][x] && inv) {
          this.modules[y][x] = !this.modules[y][x];
        }
      }
    }
  }

  private penalty() {
    let r = 0;
    for (let y = 0; y < this.size; y++) {
      let col = false,
        rx = 0,
        rh = [0, 0, 0, 0, 0, 0, 0];
      for (let x = 0; x < this.size; x++) {
        if (this.modules[y][x] === col) {
          rx++;
          if (rx === 5) {
            r += PENALTY_N1;
          } else if (rx > 5) {
            r++;
          }
        } else {
          this.phAdd(rx, rh);
          if (!col) {
            r += this.phCount(rh) * PENALTY_N3;
          }
          col = this.modules[y][x];
          rx = 1;
        }
      }
      r += this.phEnd(col, rx, rh) * PENALTY_N3;
    }
    for (let x = 0; x < this.size; x++) {
      let col = false,
        ry = 0,
        rh = [0, 0, 0, 0, 0, 0, 0];
      for (let y = 0; y < this.size; y++) {
        if (this.modules[y][x] === col) {
          ry++;
          if (ry === 5) {
            r += PENALTY_N1;
          } else if (ry > 5) {
            r++;
          }
        } else {
          this.phAdd(ry, rh);
          if (!col) {
            r += this.phCount(rh) * PENALTY_N3;
          }
          col = this.modules[y][x];
          ry = 1;
        }
      }
      r += this.phEnd(col, ry, rh) * PENALTY_N3;
    }
    for (let y = 0; y < this.size - 1; y++) {
      for (let x = 0; x < this.size - 1; x++) {
        const c = this.modules[y][x];
        if (c === this.modules[y][x + 1] && c === this.modules[y + 1][x] && c === this.modules[y + 1][x + 1]) {
          r += PENALTY_N2;
        }
      }
    }
    let dark = 0;
    for (const row of this.modules) {
      dark = row.reduce((s, c) => s + (c ? 1 : 0), dark);
    }
    r += (Math.ceil(Math.abs(dark * 20 - this.size * this.size * 10) / (this.size * this.size)) - 1) * PENALTY_N4;
    return r;
  }

  private alignPos() {
    if (this.version === 1) {
      return [];
    }
    const n = Math.floor(this.version / 7) + 2;
    const step = this.version === 32 ? 26 : Math.ceil((this.version * 4 + 4) / (n * 2 - 2)) * 2;
    const r = [6];
    for (let p = this.size - 7; r.length < n; p -= step) {
      r.splice(1, 0, p);
    }
    return r;
  }

  private phCount(h: number[]) {
    const n = h[1],
      core = n > 0 && h[2] === n && h[3] === n * 3 && h[4] === n && h[5] === n;
    return (core && h[0] >= n * 4 && h[6] >= n ? 1 : 0) + (core && h[6] >= n * 4 && h[0] >= n ? 1 : 0);
  }
  private phEnd(col: boolean, len: number, h: number[]) {
    if (col) {
      this.phAdd(len, h);
      len = 0;
    }
    len += this.size;
    this.phAdd(len, h);
    return this.phCount(h);
  }
  private phAdd(len: number, h: number[]) {
    if (h[0] === 0) {
      len += this.size;
    }
    h.pop();
    h.unshift(len);
  }
}

function encodeQr(text: string): QrCode {
  const ecl = EccMap['L'];
  const segs = makeSegments(text);
  let ver = MIN_VERSION,
    used = 0;
  for (; ver <= MAX_VERSION; ver++) {
    const cap = numDataCodewords(ver, ecl) * 8;
    used = totalBits(segs, ver);
    if (used <= cap) {
      break;
    }
    if (ver === MAX_VERSION) {
      throw new RangeError('Data too long');
    }
  }
  let ecl2 = ecl;
  for (const e of [MEDIUM, QUARTILE, HIGH] as [number, number][]) {
    if (used <= numDataCodewords(ver, e) * 8) {
      ecl2 = e;
    }
  }
  const bb: number[] = [];
  for (const s of segs) {
    appendBits(s.mode[0], 4, bb);
    appendBits(s.numChars, ccBits(s.mode, ver), bb);
    for (const b of s.getData()) {
      bb.push(b);
    }
  }
  const cap = numDataCodewords(ver, ecl2) * 8;
  appendBits(0, Math.min(4, cap - bb.length), bb);
  appendBits(0, (8 - (bb.length % 8)) % 8, bb);
  for (let p = 236; bb.length < cap; p ^= 236 ^ 17) {
    appendBits(p, 8, bb);
  }
  const cw = Array.from({ length: Math.ceil(bb.length / 8) }, () => 0);
  bb.forEach((b, i) => (cw[i >>> 3] |= b << (7 - (i & 7))));
  return new QrCode(ver, ecl2, cw, -1);
}

export function renderSVG(data: string, pixelSize = 10): string {
  const qr = encodeQr(data);
  const border = 1;
  const size = qr.size + border * 2;
  const px = pixelSize;
  const dim = size * px;
  const paths: string[] = [];
  for (let row = 0; row < qr.size; row++) {
    for (let col = 0; col < qr.size; col++) {
      if (qr.modules[row][col]) {
        const x = (col + border) * px,
          y = (row + border) * px;
        paths.push(`M${x},${y}h${px}v${px}h-${px}z`);
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dim} ${dim}"><rect fill="white" width="${dim}" height="${dim}"/><path fill="black" d="${paths.join('')}"/></svg>`;
}
