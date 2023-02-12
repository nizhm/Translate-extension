const initTranslate = () => {
  // 单词翻译支持oxford、cambridge、有道
  // 句子翻译支持baidu
  const dictionaryMap = new Map([
    [
      'Translate_v1_oxford',
      {
        dicType: 'oxford',
        dicPrefix: 'https://www.oxfordlearnersdictionaries.com/definition/english/',
        paragraphTranslatePrefix: 'https://fanyi.baidu.com/?aldtype=23#en/zh/'
      }
    ],
    [
      'Translate_v1_bridge',
      {
        dicType: 'bridge',
        dicPrefix: 'https://dictionary.cambridge.org/dictionary/english-chinese-traditional/',
        paragraphTranslatePrefix: 'https://fanyi.baidu.com/?aldtype=23#en/zh/'
      }
    ],
    [
      'Translate_v1_youdao',
      {
        dicType: 'youdao',
        dicPrefix:  'https://www.youdao.com/result?lang=en&word=',
        paragraphTranslatePrefix: 'https://fanyi.baidu.com/?aldtype=23#en/zh/'
      }
    ],
    [
      'Translate_v1_baidu',
      {
        dicType: 'baidu',
        dicPrefix:  'https://fanyi.baidu.com/?aldtype=85#en/zh/',
        paragraphTranslatePrefix: 'https://fanyi.baidu.com/?aldtype=23#en/zh/'
      }
    ],
    [
      'Translate_v1_google',
      {
        dicType: 'google',
        dicPrefix:  'https://translate.google.com/?hl=en&sl=auto&tl=zh-CN&op=translate&text=',
        paragraphTranslatePrefix: 'https://translate.google.com/?hl=en&sl=auto&tl=zh-CN&op=translate&text='
      }
    ]
  ])


  dictionaryMap.forEach((({ dicType, dicPrefix }, contextMenuId) => {
    chrome.contextMenus.create({
      title: `${dicType}: %s`,
      contexts:["selection"],
      id: contextMenuId
    });
    chrome.contextMenus.onClicked.addListener(translateSelected);
  }))
  async function disableMenuItems() {
    dictionaryMap.forEach((dic, contextMenuId) => {
      if (contextMenuId !== 'Translate_v1_baidu') {
        chrome.contextMenus.update(contextMenuId, { enabled: false });
      }
    })
  }
  async function translateSelected(info) {
    const {
      menuItemId,
      selectionText
    } = info
    const {
      dicPrefix,
      paragraphTranslatePrefix
    } = dictionaryMap.get(menuItemId)

    const translate = selectionText.trim()
    // 空字符或者字母、连字符组成的字符串识别为单词
    const isWord = translate === '' || (/^[a-zA-Z-]*$/g).test(translate)
    const url = (isWord ? dicPrefix : paragraphTranslatePrefix) + translate

    await chrome.windows.create({
      width: 1000,
      height: 600,
      top: 100,
      left: 150,
      type: 'popup',
      url
    })
  }
}

initTranslate();
