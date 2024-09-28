import Store from 'electron-store'

const store = new Store()

export function getWindowLocation() {
  const defaultReturn = [0, 0]
  const cords = store.get('settings.window.location')

  if (cords) {
    return cords
  } else {
    store.set('settings.window.location', defaultReturn)
    return defaultReturn
  }
}

export function setWindowLocation(cords) {
  store.set('settings.window.location', cords)
}

export function getFollowMouse() {
  const defaultReturn = ''
  const theSetting = store.get('settings.followMouse')

  if (theSetting) {
    return theSetting
  } else {
    store.set('settings.followMouse', defaultReturn)
    return defaultReturn
  }
}

export function setFollowMouse(value) {
  store.set('settings.followMouse', value)
}

export function getShowRegion() {
  const defaultReturn = ''
  const theSetting = store.get('settings.showRegion')

  if (theSetting) {
    return theSetting
  } else {
    store.set('settings.showRegion', defaultReturn)
    return defaultReturn
  }
}

export function setShowRegion(value) {
  store.set('settings.showRegion', value)
}

export function getDarkMode() {
  const defaultReturn = ''
  const theSetting = store.get('settings.darkMode')

  if (theSetting) {
    return theSetting
  } else {
    store.set('settings.darkMode', defaultReturn)
    return defaultReturn
  }
}

export function setDarkMode(value) {
  store.set('settings.darkMode', value)
}
