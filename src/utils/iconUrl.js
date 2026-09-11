import * as simpleIcons from 'simple-icons';

const fallbackIcon = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16'/></svg>";

export const getLocalIconUrl = (slug, color) => {
  const exportName = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const icon = simpleIcons[exportName];
  const iconColor = color || icon?.hex || 'D03B13';
  const svg = icon
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#${iconColor}"><path d="${icon.path}"/></svg>`
    : fallbackIcon.replace('currentColor', `#${iconColor}`);

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};