import Header from './Header'

const App = {
  name: 'App',
  render(h) {
    return h(
      'div',
      {
        id: 'app',
        class: {
          theme: true
        }
      },
      [
        Header
      ]
    )
  }
}

export default App
