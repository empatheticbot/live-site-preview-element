export class LiveSitePreviewElement extends HTMLElement {
  root?: ShadowRoot
  url?: string
  description?: string
  heading?: string
  height = 880
  width = 398

  static get observedAttributes(): string[] {
    return ['url', 'title', 'description']
  }

  connectedCallback(): void {
    this.url = this.getAttribute('url') || ''

    this.root = this.attachShadow({ mode: 'open' })
    const iframe = document.createElement('iframe')

    const svg = document.createElement('svg')
    // svg.setAttribute('height', '300')
    // svg.setAttribute('width', '200')

    svg.innerHTML = `
      <defs>
          <clipPath id="svgPath">
              <path fill="#FFFFFF" stroke="#000000" stroke-width="1.5794" stroke-miterlimit="10" d="M215,100.3c97.8-32.6,90.5-71.9,336-77.6c92.4-2.1,98.1,81.6,121.8,116.4c101.7,149.9,53.5,155.9,14.7,178c-96.4,54.9,5.4,269-257,115.1c-57-33.5-203,46.3-263.7,20.1c-33.5-14.5-132.5-45.5-95-111.1C125.9,246.6,98.6,139.1,215,100.3z"/>
          </clipPath>
      </defs>
   `

    iframe.src = this.url
    iframe.scrolling = 'no'
    iframe.height = this.height.toString()
    iframe.width = this.width.toString()
    iframe.style.overflow = 'hidden'
    iframe.style.clipPath = 'url(#svgPath)'

    this.root.append(svg)
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
