const LOGO_URL =
  'https://liqbuhtnlclwwilrvpgs.supabase.co/storage/v1/object/public/Fencing_plus/00_Brand_Identity/FENCING%20PLUS%20Logo/high_resolution_PNG/FENCING_PLUS_v5.png';

export default function LogoImage({
  alt = 'FENCING PLUS',
  className,
  style,
  blendMode,
}: {
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  blendMode?: 'multiply' | 'normal';
}) {
  return (
    <img
      src={LOGO_URL}
      alt={alt}
      className={className}
      style={{
        ...style,
        mixBlendMode: blendMode ?? 'normal',
      }}
    />
  );
}
