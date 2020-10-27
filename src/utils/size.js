export function getSize () {
  return localStorage.getItem('size')
}

export function setSize (size) {
  return localStorage.setItem('size', size)
}

export function removeSize () {
  return localStorage.removeItem('size')
}
