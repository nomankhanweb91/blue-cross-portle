// scripts/generate-icons.js - Generates minimal valid PNG icons for PWA compliance
import fs from 'node:fs';
import zlib from 'node:zlib';

function createSolidPNG(width, height, r, g, b, a = 255) {
  // Construct a minimal uncompressed/deflated raw RGBA PNG
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth: 8
  ihdr[9] = 6; // Color type: 6 (RGBA)
  ihdr[10] = 0; // Compression: 0
  ihdr[11] = 0; // Filter: 0
  ihdr[12] = 0; // Interlace: 0
  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Raw image data with 0 filter byte for each scanline
  const scanlineLength = 1 + width * 4;
  const rawData = Buffer.alloc(scanlineLength * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength;
    rawData[rowOffset] = 0; // Filter type None
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      // Draw blue cross brand motif
      const cx = width / 2;
      const cy = height / 2;
      const isCross = (Math.abs(x - cx) < width * 0.12 && Math.abs(y - cy) < height * 0.38) ||
                      (Math.abs(y - cy) < height * 0.12 && Math.abs(x - cx) < width * 0.38);
      if (isCross) {
        rawData[pxOffset] = 56;    // R
        rawData[pxOffset + 1] = 189; // G
        rawData[pxOffset + 2] = 248; // B
        rawData[pxOffset + 3] = 255; // A
      } else {
        rawData[pxOffset] = r;
        rawData[pxOffset + 1] = g;
        rawData[pxOffset + 2] = b;
        rawData[pxOffset + 3] = a;
      }
    }
  }

  const deflated = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = (c >>> 8) ^ table[(c ^ buf[i]) & 0xff];
  }
  return (c ^ 0xffffffff) >>> 0;
}

const table = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  table[n] = c >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  const crc = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(crc, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

// Generate PWA icons
fs.writeFileSync('public/pwa-192x192.png', createSolidPNG(192, 192, 15, 23, 42));
fs.writeFileSync('public/pwa-512x512.png', createSolidPNG(512, 512, 15, 23, 42));
fs.writeFileSync('public/pwa-maskable-512x512.png', createSolidPNG(512, 512, 29, 78, 216));
fs.writeFileSync('public/apple-touch-icon.png', createSolidPNG(180, 180, 15, 23, 42));
fs.writeFileSync('public/favicon.ico', createSolidPNG(32, 32, 29, 78, 216));
console.log('PWA compliance PNG icons generated successfully.');
