import type { Services } from '~/types/serviceType'
import { createKeydownEvent } from '~/utils/createKeydownEvent'
import { getEventKey } from '~/utils/getEventKey'

type SendActions = Record<Services, (e: KeyboardEvent, composing: boolean) => void>

export const sendController: SendActions = {
  discord: (e, _) => {
    const key = getEventKey(e)
    if (key === 'enter') e.stopPropagation()
  },
  twitter: (e, _) => {
    const key = getEventKey(e)
    if (key === 'enter') {
      // dispatch shift-enter because the cursor shifts when enter is used
      const shiftEnterEvent = createKeydownEvent({ keyCode: 13, shiftKey: true, bubbles: true })
      e.currentTarget?.dispatchEvent(shiftEnterEvent)

      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
    }
    if (key === 'ctrl-enter') {
      const textBox = e.currentTarget as HTMLDivElement
      const container = textBox.closest('[role="complementary"]')
      const sendButton = container.querySelector<HTMLButtonElement>(
        'button[data-testid="dmComposerSendButton"]',
      )
      sendButton.click()
    }
  },
  instagram: (e, _) => {
    const key = getEventKey(e)
    if (key === 'enter') e.stopPropagation()
  },
  chatgpt: (e, _) => {
    const key = getEventKey(e)
    if (key === 'enter') e.stopPropagation()

    const textBox = e.currentTarget as HTMLTextAreaElement
    const sendButton = textBox.parentElement?.parentElement?.lastElementChild as HTMLButtonElement
    if (key === 'ctrl-enter') sendButton?.click()
  },
  dify: (e, composing) => {
    const key = getEventKey(e)
    if (key === 'enter') {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()

      if (!composing) {
        const text = '\n'
        const textarea = e.target as HTMLTextAreaElement
        const startPos = textarea.selectionStart
        const endPos = textarea.selectionEnd
        const scrollTop = textarea.scrollTop

        textarea.value =
          textarea.value.substring(0, startPos) +
          text +
          textarea.value.substring(endPos, textarea.value.length)
        textarea.focus()
        textarea.selectionStart = startPos + text.length
        textarea.selectionEnd = startPos + text.length
        textarea.scrollTop = scrollTop
      }
    }

    const textBox = e.currentTarget as HTMLTextAreaElement
    const sendButton = textBox.parentElement?.parentElement?.lastElementChild as HTMLButtonElement
    if (key === 'ctrl-enter') sendButton?.click()
  },
}
