const jsonData = (new URL(document.location)).searchParams.get('data')
const data = JSON.parse(jsonData)
const { translate } = data

const Header = {
  name: 'Header',
  render(h) {
    return h(
      'p',
      translate
    )
  }
}

const TranslateContainer = {
  name: 'TranslateContainer',
  created() {
    window.open(
      `https://www.oxfordlearnersdictionaries.com/definition/english/${translate}`,
      "_blank",
      "popup,left=0,top=200,width=800,height=400"
    )
  }
}

const App = {
  name: 'App',
  render(h) {
    return h(
      'div',
      {
        attrs: {
          id: 'app'
        },
        class: {
          theme: true
        }
      },
      [
        h(Header),
        h(TranslateContainer)
      ]
    )
  }
}

new Vue({
  el: '#app',
  render: h => h(App)
})
