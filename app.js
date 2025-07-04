const ThemeToggle = document.getElementById("btn");
const inputs = document.getElementById("input");
const btn = document.getElementById("searchbtn");
const Words = document.getElementById("word");
const phonetics = document.getElementById("phonetic");
const lI = document.getElementById("li");
const Verb = document.getElementById("verb");
const Adjective = document.getElementById("adjective");
const error = document.getElementById("error");
const PlayBtn = document.getElementById("playBtn");
const noResult = document.getElementById("no-result");

// Function to set theme
//

// Event listener
if (localStorage.getItem("theme" === "light")) {
  document.body.classList.add("light-theme");
}

ThemeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const theme = document.body.classList.contains("light-theme")
    ? "light"
    : "dark";
  localStorage.setItem("theme", theme);
});
let audio = null;

 document.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const word = inputs.value.trim(); // use existing variable "inputs"
    if (!word) return;

    try {
      const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
      const response = await fetch(api);
      const data = await response.json();

      console.log(data[0].word);
      Words.innerText = data[0].word;
      phonetics.innerText = data[0].phonetics?.[0]?.text || "N/A";

      const Alldefinitions = data[0].meanings?.[0]?.definitions || [];
      lI.innerHTML = Alldefinitions.map(item => `<li>${item.definition}</li>`).join("");

      const AlldefinitionsVerb = data[0].meanings?.[1]?.definitions || [];
      Verb.innerHTML = AlldefinitionsVerb.map(item => `<li>${item.definition}</li>`).join("");

      const AlldefinitionsAdjective = data[0].meanings?.[2]?.definitions || [];

      if (AlldefinitionsAdjective.length === 0) {
        Adjective.innerHTML = `<li>Meaning not found</li>`;
      } else {
        Adjective.innerHTML = AlldefinitionsAdjective.map(item => `<li>${item.definition}</li>`).join("");
      }

      // Set audio if available
      const audioSrc = data[0].phonetics.find(p => p.audio)?.audio;
      if (audioSrc) {
        audio = new Audio(audioSrc);
      }

    } catch (err) {
      console.error("Fetch error:", err);
      error.innerText = "Word not found".style.color ='red';
      
    }
  }
});

PlayBtn.addEventListener("click", () => {
  if (audio) {
    audio.play();
  }
});


console.log('name');

const wordss=(weather)=>{
  if(weather === 'clear'){
 return 'what a good day'
}else{
  return null
}

}

console.log(wordss('clear'));
