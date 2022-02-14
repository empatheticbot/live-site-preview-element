// const delay = async (number) => {
//   return new Promise((reslove) => {
//     setTimeout(() => reslove(), number)
//   })
// }

describe('template custom element', function () {
  describe('element creation', function () {
    it('creates from document.createElement', function () {
      const el = document.createElement('live-site-preview')
      assert.equal('LIVE-SITE-PREVIEW', el.nodeName)
    })

    it('creates from constructor', function () {
      const el = new window.TemplateCustomElement()
      assert.equal('LIVE-SITE-PREVIEW', el.nodeName)
    })
  })

  describe('renders', function () {
    beforeEach(function () {
      document.body.innerHTML = `
        <div id="mocha-fixture">
          <live-site-preview></live-site-preview>
        </div>
      `
    })
    it('renders text of component', async function () {
      const templateElement = document.querySelector('live-site-preview')
      expect(templateElement.textContent).to.equal('hello world!!')
    })
  })
})
