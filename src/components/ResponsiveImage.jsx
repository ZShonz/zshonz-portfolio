import manifest from '../responsive-images.json';
const imported = import.meta.glob('/assets/**/*.{jpg,jpeg,png}', { eager: true, query: '?url', import: 'default' });
const byUrl = Object.fromEntries(Object.entries(imported).map(([key,url]) => [url,manifest[key]]));
export default function ResponsiveImage({ src, sizes = '(max-width: 640px) calc(100vw - 48px), (max-width: 1800px) 88vw, 1408px', ...props }) {
  const base = import.meta.env.BASE_URL;
  const key = src?.startsWith(base) ? '/' + src.slice(base.length) : src;
  const info = byUrl[src] || manifest[key];
  const candidates = info?.variants.map(v => `${base}${v.file} ${v.width}w`) || [];
  if (info && info.width > info.variants.at(-1).width) candidates.push(`${src} ${info.width}w`);
  return <img {...props} src={src} srcSet={candidates.length ? candidates.join(', ') : undefined} sizes={candidates.length ? sizes : undefined} width={props.width || info?.width} height={props.height || info?.height} />;
}
