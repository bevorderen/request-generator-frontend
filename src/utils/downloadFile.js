export const downloadFile = (base64Data, fileName, type) => {
  const blob = new Blob([base64Data], { type })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  link.click()
  URL.revokeObjectURL(link.href)
}