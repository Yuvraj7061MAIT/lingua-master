// background.js

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "translateContextMenu",
      title: "Translate '%s' with Gunjan",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    var text = info.selectionText;
    if (info.menuItemId === "translateContextMenu") {
      try {
        await fetch("http://localhost:3000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic: text,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Server Response:", data);
            if (data.success) {
              const updatedText = `${text} (${data.topic})`;

              // Update the selected text on the webpage
              chrome.tabs.sendMessage(tab.id, {
                  action: "updateSelectedText",
                  updatedText: updatedText,
              });
            }
          });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  });
  