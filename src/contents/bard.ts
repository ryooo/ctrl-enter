import type { PlasmoCSConfig } from 'plasmo'
import { getConfig } from 'src/utils/config'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://bard.google.com/*'],
  all_frames: true
}

const sendButton = (elm: HTMLElement) =>
  elm.parentElement?.parentElement?.parentElement?.parentElement?.nextElementSibling?.getElementsByTagName(
    'button'
  )[0]

const handleKeyEvent = (e: KeyboardEvent) => {
  if (isTextArea(e)) {
    if (key(e) === 'enter') {
      e.stopPropagation()
    } else if (key(e) === 'handleKeyEvent') {
      sendButton(e.target as HTMLElement)?.click()
    }
  }
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.tagName === 'TEXTAREA'
}

const addEvent = () => {
  document.addEventListener('keydown', handleKeyEvent, { capture: true })
}

chrome.storage.onChanged.addListener(async () => {
  const config = await getConfig()
  const bardConfig = config.bard

  if (bardConfig) {
    addEvent()
  } else {
    document.removeEventListener('keydown', handleKeyEvent, { capture: true })
  }
})

addEvent()
