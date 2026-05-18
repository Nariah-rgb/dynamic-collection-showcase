document.addEventListener("DOMContentLoaded"), () => {
    const grid = document.getElementById("rosterGrid");
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
}
const render = (list) => {
    grid.innerHTML = "";
    list.forEach((students, index) => {
        const col = document.createElement("div");
        col.className - "col-md-2 col-lg-3 col-xl-3"
        const card = document.createElement("div");
        card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.year}</p>
        <button class="more-info-btn>Fun Fact</button>
        `, container.appendChild(card);
        let btn = card.querySelector("more-info-btn");
        btn.addEventListener("click", function () {
            modalTitle.textContent = item.name;
            modalText.textContent = item.detail;
            modalImage.src = item.image;
            modal.classist.remove("hidden");
        });
    });
}