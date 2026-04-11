/**
 * Resolves a Payload media URL to an absolute URL.
 * Payload stores media as relative paths like /api/media/file/...
 * which need a full domain prefix in production.
 */
export function mediaUrl(url: string | null | undefined): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
  return `${base}${url}`
}
