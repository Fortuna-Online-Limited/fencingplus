import { useEffect, useState } from 'react';

const LOGO_URL = '/images/logo/fencing_logo_final.png';

const WHITE_THRESHOLD = 235;

export default function LogoImage({
  alt = 'FENCING PLUS',
  className,
  style,
}: {
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [src, setSrc] = useState<string>(LOGO_URL);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > WHITE_THRESHOLD && data[i + 1] > WHITE_THRESHOLD && data[i + 2] > WHITE_THRESHOLD) {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setSrc(canvas.toDataURL('image/png'));
    };
    img.src = LOGO_URL;
  }, []);

  return <img src={src} alt={alt} className={className} style={style} />;
}
