// import { blah } from './contextMenu'

export const add = (x, y) => {
  return x + y
}

chrome.notifications.create({
  type: 'basic',
  title: 'jack is great',
  message: 'Jack rocks my world!',
  iconUrl: '',
  buttons: [{ title: 'yes' }]
})

// blah()
