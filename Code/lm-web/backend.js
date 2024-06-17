// Get the anchor element by its ID
var myAnchor = document.getElementById("hindilogo");

var btext = new Array(5);
var ltext = new Array(9);

for (let i = 0; i < btext.length; i++) {
  btext[i] = document.querySelector(".bold" + (i + 1)).innerHTML;
}

// Add an event listener to the anchor element
myAnchor.addEventListener("click", async function (event) {
  // Prevent the default behavior of the anchor tag (e.g., navigating to a new page)
  event.preventDefault();


  if(myAnchor.innerHTML=="हिन्दी")
  {
    myAnchor.innerHTML="English";

  // new logic
  for (let i = 0; i < btext.length; i++) {
    btext[i] = document.querySelector(".bold" + (i + 1)).textContent;
    try {
      await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ // stringify the JSON object
          topic: btext[i],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Server Response:', data);
          if (data.success) {
            document.querySelector(".bold" + (i + 1)).textContent = data.topic;
          }
        });
      console.log(`frontend has done its work`);
    } catch (error) {
      console.error('Error:', error);
      toText.value = 'Language Detection Error';
      toText.setAttribute("placeholder", "Translation");
    }
  }


//ltext
for (let i = 0; i < ltext.length; i++) {
  ltext[i] = document.querySelector(".light" + (i + 1)).textContent;
}

  // new logic
  for (let i = 0; i < ltext.length; i++) {
    ltext[i] = document.querySelector(".light" + (i + 1)).textContent;
    try {
      await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ // stringify the JSON object
          topic: ltext[i],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Server Response:', data);
          if (data.success) {
            document.querySelector(".light" + (i + 1)).textContent = data.topic;
          }
        });
      console.log(`frontend has done its work`);
    } catch (error) {
      console.error('Error:', error);
      toText.value = 'Language Detection Error';
      toText.setAttribute("placeholder", "Translation");
    }
  }
}else{
  location.reload();
}

});
