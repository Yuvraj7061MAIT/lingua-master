const fromText = document.querySelector(".from-text");
const  toText = document.querySelector(".to-text");
const  icons = document.querySelectorAll(".row i");
const  translateBtn = document.querySelector("button");


fromText.addEventListener("keyup", () => {
  if (!fromText.value) {
    toText.value = "";
  }
});

translateBtn.addEventListener("click", async () => {
  let text = fromText.value.trim();
  if (!text) return;
  toText.setAttribute("placeholder", "Translating...");

  //new logic
  try {
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ // stringify the JSON object
        topic: text,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Server Response:', data);
        if (data.success) {
          toText.value = data.topic;
          toText.setAttribute("placeholder", "Translation");
        }
      });
    console.log(`frontend has done its work`);
  } catch (error) {
    console.error('Error:', error);
    toText.value = 'Language Detection Error';
    toText.setAttribute("placeholder", "Translation");
  }
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (!fromText.value || !toText.value) return;
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let utterance;
      if (target.id == "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTag[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTag[1].value;
      }
      speechSynthesis.speak(utterance);
    }
  });
});
