export class LiveSitePreviewElement extends HTMLElement {
  root?: ShadowRoot
  url?: string
  description?: string
  heading?: string
  height = 400
  width = 200

  static get observedAttributes(): string[] {
    return ['url', 'title', 'description']
  }

  connectedCallback(): void {
    this.url = this.getAttribute('url') || ''
    this.height = this.getAttribute('height')
    this.root = this.attachShadow({ mode: 'open' })
    const iframe = document.createElement('iframe')

    iframe.src = this.url
    iframe.height = this.height.toString()
    iframe.width = this.width.toString()
    this.root.append(iframe)
  }

  // disconnectedCallback(): void {}

  attributeChangedCallback(
    attrName: string,
    oldValue: string,
    newValue: string
  ): void {
    const iframe = this.root?.querySelector('iframe')

    if (iframe) {
      switch (attrName) {
        case 'url':
          iframe.src = newValue
      }
    }
  }
}

if (!customElements.get('live-site-preview')) {
  window.LiveSitePreviewElement = LiveSitePreviewElement
  customElements.define('live-site-preview', LiveSitePreviewElement)
}

declare global {
  interface Window {
    LiveSitePreviewElement: typeof LiveSitePreviewElement
  }
  interface HTMLElementTagNameMap {
    'live-site-preview': LiveSitePreviewElement
  }
}
