/**
 * Prepends Nuxt's app.baseURL to a public asset path.
 * Must be called inside a Vue component setup context.
 */
export const usePublicUrl = () => {
  const config = useRuntimeConfig()
  const base = (config.app.baseURL as string) ?? '/'
  return (path: string): string => `${base.replace(/\/$/, '')}${path}`
}
