chrome.contextMenus.create({
  id: "findJournalInfo",
  title: "查询期刊信息",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "findJournalInfo") {
    let selectedText = info.selectionText.trim();
    
    // 读取本地 JSON 文件
    fetch('abs_journals.json')
      .then(response => response.json())
      .then(data => {
        if (data[selectedText]) {
          const journalInfo = data[selectedText];
          alert(`
            ABS Rating: ${journalInfo.ABS}, 
            Scopus: ${journalInfo.Scopus}, 
            SCI: ${journalInfo.SCI}
          `);
        } else {
          alert('Journal not found');
        }
      })
      .catch(error => {
        alert('Error fetching journal data');
        console.error(error);
      });
  }
});
