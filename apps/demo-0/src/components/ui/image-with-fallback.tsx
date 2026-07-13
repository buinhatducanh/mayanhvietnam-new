'use client';

import { useState, useEffect } from 'react';
import Image, { type ImageProps } from 'next/image';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  productName?: string;
}

export function ImageWithFallback({
  src,
  fallbackSrc,
  productName = '',
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleOnError = () => {
    if (fallbackSrc) {
      setImgSrc(fallbackSrc);
      return;
    }

    const nameLower = productName.toLowerCase();
    const srcLower = String(src).toLowerCase();

    // Only use specific local images if it's the exact model match to prevent visual mismatches
    if (nameLower.includes('r50') || srcLower.includes('r50')) {
      setImgSrc('/images/canon-eos-r50.png');
    } else if (nameLower.includes('a7c-ii') || nameLower.includes('a7c ii') || srcLower.includes('a7c-ii')) {
      setImgSrc('/images/sony-a7c-ii.png');
    } else if (nameLower.includes('x-t5') || nameLower.includes('xt5') || srcLower.includes('x-t5')) {
      setImgSrc('/images/fujifilm-x-t5.png');
    } else if (
      nameLower.includes('mavic-air-2') ||
      nameLower.includes('mavic air 2') ||
      srcLower.includes('mavic-air-2')
    ) {
      setImgSrc('/images/dji-mavic-air-2.png');
    } else {
      // General clean placeholder for other products
      setImgSrc('/placeholder.svg');
    }
  };

  return (
    <Image
      {...props}
      src={imgSrc || '/placeholder.svg'}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={handleOnError}
    />
  );
}
