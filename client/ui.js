const spellForm = document.querySelector("#spellForm");


document.addEventListener("DOMContentLoaded", () => {
    App.init()
})

spellForm.addEventListener("submit", (e) => {
  e.preventDefault();

  App.createSpell(spellForm["title"].value, spellForm["description"].value, spellForm["power"].value);
});
