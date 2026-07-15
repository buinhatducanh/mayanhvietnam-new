import type { CameraBody, LensOption } from './types';

/**
 * Camera bodies with mount info — for lens compatibility checker.
 * Source: mayanhvietnam.com 2026-07-10
 */
export const cameraBodies: CameraBody[] = [
  { name: 'Canon EOS R50', mountType: 'Canon RF', sensor: 'APS-C' },
  { name: 'Canon EOS R8', mountType: 'Canon RF', sensor: 'Full-frame' },
  { name: 'Canon EOS R6 Mark II', mountType: 'Canon RF', sensor: 'Full-frame' },
  { name: 'Canon EOS R5 Mark II', mountType: 'Canon RF', sensor: 'Full-frame' },
  { name: 'Sony Alpha A7 IV', mountType: 'Sony E', sensor: 'Full-frame' },
  { name: 'Sony Alpha A7R V', mountType: 'Sony E', sensor: 'Full-frame' },
  { name: 'Sony ZV-E10 II', mountType: 'Sony E', sensor: 'APS-C' },
  { name: 'Sony FX30', mountType: 'Sony E', sensor: 'APS-C' },
  { name: 'Nikon Z5 II', mountType: 'Nikon Z', sensor: 'Full-frame' },
  { name: 'Nikon Z6 III', mountType: 'Nikon Z', sensor: 'Full-frame' },
  { name: 'Nikon Z50 II', mountType: 'Nikon Z', sensor: 'APS-C' },
  { name: 'Nikon ZFC', mountType: 'Nikon Z', sensor: 'APS-C' },
  { name: 'Fujifilm X-T5', mountType: 'Fujifilm X', sensor: 'APS-C' },
  { name: 'Fujifilm X-H2S', mountType: 'Fujifilm X', sensor: 'APS-C' },
];

/**
 * Available lenses — with mount + coverage info.
 * Source: mayanhvietnam.com 2026-07-10
 */
export const lensOptions: LensOption[] = [
  { name: 'Canon RF 50mm f/1.8 STM', mountType: 'Canon RF', focalRange: '50mm', coverage: 'Full-frame' },
  { name: 'Canon RF 24-70mm f/2.8L IS USM', mountType: 'Canon RF', focalRange: '24-70mm', coverage: 'Full-frame' },
  { name: 'Sony FE 70-200mm f/2.8 GM II', mountType: 'Sony E', focalRange: '70-200mm', coverage: 'Full-frame' },
  { name: 'Nikon Z 24-70mm f/2.8 S II', mountType: 'Nikon Z', focalRange: '24-70mm', coverage: 'Full-frame' },
  { name: 'Nikon Z 24-70mm f/4 S', mountType: 'Nikon Z', focalRange: '24-70mm', coverage: 'Full-frame' },
  { name: 'Tamron 28-75mm F2.8 Di III VXD G2', mountType: 'Nikon Z', focalRange: '28-75mm', coverage: 'Full-frame' },
  { name: 'Viltrox AF 14mm f/4 Air Z', mountType: 'Nikon Z', focalRange: '14mm', coverage: 'APS-C' },
];

/**
 * Check lens compatibility with a camera body.
 */
export function checkLensCompatibility(
  bodyName: string,
  lensName: string,
): { compatible: boolean; warning?: string } {
  const body = cameraBodies.find((b) => b.name === bodyName);
  const lens = lensOptions.find((l) => l.name === lensName);

  if (!body || !lens) return { compatible: false, warning: 'Không tìm thấy body hoặc lens' };

  if (body.mountType !== lens.mountType) {
    return { compatible: false, warning: `Mount không khớp: body ${body.mountType} ≠ lens ${lens.mountType}` };
  }

  if (body.sensor === 'APS-C' && lens.coverage === 'Full-frame') {
    return { compatible: true, warning: 'Lens Full-frame trên body APS-C — ảnh bị crop 1.5x/1.6x, nhưng vẫn dùng được' };
  }

  return { compatible: true };
}
