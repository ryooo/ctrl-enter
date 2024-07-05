import type { PlasmoCSConfig } from 'plasmo'
import { WILDCARDS } from './constants/services'
import { getTriggeredTextBoxes } from './core/getTextBoxes'
import { sendController } from './core/sendControl'
import { getServiceFromUrl } from './utils/wildcard'

export const config: PlasmoCSConfig = {
  matches: WILDCARDS,
  // biome-ignore lint/style/useNamingConvention: `all_frames` is provided by the external library (Plasmo)
  all_frames: true,
}
;(() => {
  let textAreas: HTMLElement[] = []
  const serviceName = getServiceFromUrl(location.href)

  let composing = false
  const handleKeyDown = (e: KeyboardEvent) => {
    composing = e.isComposing
  }
  const handleKeyUp = (e: KeyboardEvent) => sendController[serviceName](e, composing)
  const updateTextAreas = () => {
    textAreas = getTriggeredTextBoxes(serviceName)
    for (const textArea of textAreas) {
      textArea.removeEventListener('keydown', handleKeyDown)
      textArea.removeEventListener('keyup', handleKeyUp)
    }
    for (const textArea of textAreas) {
      textArea.addEventListener('keydown', handleKeyDown, { capture: true })
      textArea.addEventListener('keyup', handleKeyUp, { capture: true })
    }
  }

  new MutationObserver(updateTextAreas).observe(document.body, { childList: true, subtree: true })
  updateTextAreas()
})()
