document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("rosterGrid");

    const render = (list) => {
    grid.innerHTML = "";
    list.forEach((student, index) => {
        const col = document.createElement("div");
        col.className = "col-md-3 col-lg-3";
        const card = document.createElement("div");
        card.className = "card h-100";
        card.innerHTML = `
        <img src="${student.photo}" alt="${student.firstName}">

        <div class="card-body text-center">
        <h5>${student.firstName} ${student.lastName}</h5>
        <p> Age: ${student.age}</p>
        <p> Year: ${student.year}</p>
        <button class="more-info-btn">Fun Fact</button>
        <p class="hidden-fact d-none mt-2">
        ${student.hiddenDetail}
        </p>
        </div>
        `;
        const btn = card.querySelector(".more-info-btn");
        const fact = card.querySelector(".hidden-fact");

        btn.addEventListener("click", () => {
            fact.classList.toggle("d-none");
        });

        col.appendChild(card);
        grid.appendChild(col);

        const moreInfoBtn = card.querySelector('.more-info-btn');
        moreInfoBtn.addEventListener('click', function () {
            const studentIndex = this.getAttribute('data-student-index');
            const selectedStudent = list[studentIndex];
                showStudentModal(selectedStudent);
        })
    });
};
    render(students);
});

const showStudentModal = (selectedStudent) => {
    let modalElement = document.getElementById('studentModal');
}
