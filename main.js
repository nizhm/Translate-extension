const initTranslate = () => {
  const CONTEXT_MENU_ID = "Translate_v1";
  const translateSelected =  (info, tab) => {
    if (info.menuItemId !== CONTEXT_MENU_ID) {
      return;
    }
    console.log("Selected:\n" + info.selectionText);
  }
  chrome.contextMenus.create({
    title: "%s",
    contexts:["selection"],
    id: CONTEXT_MENU_ID
  });
  chrome.contextMenus.onClicked.addListener(translateSelected);
}

initTranslate();
