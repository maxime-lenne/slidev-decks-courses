/**
 * Wrap emoji inside markdown headings (h1–h6) in a <span class="ml-emoji">.
 *
 * The theme applies a blue→green gradient to all headings via
 * `background-clip: text` + `-webkit-text-fill-color: transparent`, which also
 * clips emoji glyphs into the gradient (washing out their native colors).
 * There is no CSS selector to target an emoji within a text node, so we isolate
 * each emoji in its own element; a companion CSS rule (`.ml-emoji`) then resets
 * the fill so the emoji keeps its own colors.
 */

// Base pictographic + optional skin-tone modifier / VS16 (U+FE0F),
// plus ZWJ (U+200D) sequences.
const EMOJI_RE =
  new RegExp('\\p{Extended_Pictographic}(\\p{Emoji_Modifier}|\\uFE0F)?(\\u200D\\p{Extended_Pictographic}(\\p{Emoji_Modifier}|\\uFE0F)?)*', 'gu')

function wrapEmojiInHeading(heading: HTMLElement) {
  if (heading.dataset.emojiWrapped) return
  heading.dataset.emojiWrapped = '1'

  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT)
  const textNodes: Text[] = []
  let current: Node | null
  while ((current = walker.nextNode())) textNodes.push(current as Text)

  for (const textNode of textNodes) {
    const text = textNode.nodeValue ?? ''
    EMOJI_RE.lastIndex = 0
    if (!EMOJI_RE.test(text)) continue

    EMOJI_RE.lastIndex = 0
    const fragment = document.createDocumentFragment()
    let lastIndex = 0
    let match: RegExpExecArray | null
    while ((match = EMOJI_RE.exec(text))) {
      if (match.index > lastIndex)
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)))
      const span = document.createElement('span')
      span.className = 'ml-emoji'
      span.textContent = match[0]
      fragment.appendChild(span)
      lastIndex = match.index + match[0].length
    }
    if (lastIndex < text.length)
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)))

    textNode.parentNode?.replaceChild(fragment, textNode)
  }
}

function wrapAll() {
  document
    .querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6')
    .forEach(wrapEmojiInHeading)
}

export function setupHeadingEmoji() {
  if (typeof window === 'undefined') return

  let scheduled = false
  const schedule = () => {
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(() => {
      scheduled = false
      wrapAll()
    })
  }

  schedule()
  const observer = new MutationObserver(schedule)
  observer.observe(document.body, { childList: true, subtree: true })
}
