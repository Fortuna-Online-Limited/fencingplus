const VIDEO_EXTENSIONS = ['mp4', 'webm', 'mov', 'm4v', 'ogg', 'ogv'];
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'avif'];

export type MediaType = 'video' | 'image';

export function getMediaType(url: string): MediaType {
  const clean = url.split('?')[0].split('#')[0];
  const ext = clean.split('.').pop()?.toLowerCase() || '';
  if (VIDEO_EXTENSIONS.includes(ext)) return 'video';
  if (IMAGE_EXTENSIONS.includes(ext)) return 'image';
  // Fallback: check URL path patterns for video platforms
  if (/(youtube\.com|youtu\.be|vimeo\.com)/.test(clean)) return 'video';
  return 'image';
}

export function isVideoUrl(url: string): boolean {
  return getMediaType(url) === 'video';
}

export const VIDEO_ACCEPT = '.mp4,.webm,.mov,.m4v';
export const IMAGE_ACCEPT = 'image/*';

export const ACCEPT_ALL = `${IMAGE_ACCEPT},${VIDEO_ACCEPT}`;
