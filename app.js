const ThemeToggle = document.getElementById("btn");
const inputs = document.getElementById("input");
const btn = document.getElementById("searchbtn");
const Words = document.getElementById("word");
const phonetics = document.getElementById("phonetic");
const lI = document.getElementById("li");
const Verb = document.getElementById("verb");
const Adjective = document.getElementById("adjective");
const error = document.getElementById("error");

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

const Search = async (word) => {
  try {
    const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await fetch(`${api}`);
    const data = await response.json();
    console.log(data[0].word);
    console.log(data);
    Words.innerText = `${data[0].word}`;
    phonetics.innerText = `${data[0].phonetics[0].text}`;
    const Alldefinitions = data[0].meanings[0].definitions;
    lI.innerHTML = Alldefinitions.map((items, index) => {
      console.log(items.definition);
      return `<li> ${items.definition}</li>`;
    }).join("");

    const AlldefinitionsVerb = data[0].meanings[1].definitions;
    Verb.innerHTML = AlldefinitionsVerb.map((items, index) => {
      console.log(items.definition);
      return `<li> ${items.definition}</li>`;
    }).join("");

    const AlldefinitionsAdjective = data[0].meanings[2].definitions;

    if (!AlldefinitionsAdjective.length === 0 || AlldefinitionsAdjective) {
      let text = "Meaning not found";
      Adjective.innerHTML = `<li>${text}</li>`;
    } else {
      Adjective.innerHTML = AlldefinitionsAdjective.map((items, index) => {
        console.log(items.definition);
        return `<li> ${items.definition}</li>`;
      }).join("");
    }
  } catch (error) {
    console.error("error", error);
  }
};

