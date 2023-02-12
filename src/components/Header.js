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

export default Header
