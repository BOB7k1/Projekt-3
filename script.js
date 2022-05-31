document.querySelector(".query").addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    document.querySelector(".query").blur();
    search();
  }
});

document.querySelector(".search").addEventListener("click", search);

async function search() {
  let query = document.querySelector(".query").value;

  if (query != "" ) {
    let request = await fetch("https://api.spoonacular.com/recipes/search?query=" + query + "&apiKey=8181470bd0dc4351b23f69f0e29304c7", { method: "GET" });
    let response = await request.json();

    document.querySelector(".dishes").innerHTML = "";
    
    for (let i = 0; i < response.results.length; i++) {
      const dish = response.results[i];
      let name = dish.title;
      let image = response.baseUri + dish.image;

      let a = document.createElement("a");
      a.innerHTML = `
        <span>${name}</span>
        <img src="${image}">
      `;
      a.href = dish.sourceUrl;
      document.querySelector(".dishes").appendChild(a);
    }
  }
}