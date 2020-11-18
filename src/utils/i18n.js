export default function generateTitle (key) {
  const hasKey = this.$te('routes.' + key)
  if (hasKey) {
    return this.$t('routes.' + key)
  }
  return key
}
