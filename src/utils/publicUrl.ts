/**
 * Prepends Vite's BASE_URL to a public asset path.
 * On GitHub Pages this will be e.g. /rattlesnake-preachers-site/media/foo.png
 * Locally it will just be /media/foo.png
 */
export const publicUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL ?? '/'
  return `${base.replace(/\/$/, '')}${path}`
}
