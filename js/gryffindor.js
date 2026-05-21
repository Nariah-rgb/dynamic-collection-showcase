const params = new URLSearchParams(window.location.search);
const house = params.get("house");
document.body.classList.add(house);

const students = houses[house] || [];

document.querySelector("h1").textContent =
  house ? house.charAt(0).toUpperCase() + house.slice(1) : "House Not Found";
  
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("rosterGrid");
    const sortSelect = document.getElementById("sortSelect");

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
        <button class="fun-fact-btn" data-student-index="${index}">Fun Fact</button>
        <p class="hidden-fact d-none mt-2">
        ${student.hiddenDetail}
        </p>
        </div>
        `;

            col.appendChild(card);
            grid.appendChild(col);

            const funFactBtn = card.querySelector('.fun-fact-btn');
            funFactBtn.addEventListener('click', function () {
                const studentIndex = this.getAttribute('data-student-index');
                const selectedStudent = list[studentIndex];
                showStudentModal(selectedStudent);
            })
        });
    };
    render(students);

    sortSelect.addEventListener("change", () => {

        const sortedStudents = [...students];

        switch (sortSelect.value) {

            case "firstName-asc":
                sortedStudents.sort((a, b) =>
                    a.firstName.localeCompare(b.firstName)
                );
                break;

            case "lastName-asc":
                sortedStudents.sort((a, b) =>
                    a.lastName.localeCompare(b.lastName)
                );
                break;

            case "age-asc":
                sortedStudents.sort((a, b) =>
                    Number(a.age) - Number(b.age)
                );
                break;

            case "year-asc":
                sortedStudents.sort((a, b) =>
                    a.year.localeCompare(b.year)
                );
                break;
        }

        render(sortedStudents);
    });
});

const showStudentModal = (selectedStudent) => {
    let modalElement = document.getElementById('studentModal');

    if (!modalElement) {
        modalElement = document.createElement('div');
        modalElement.className = 'modal fade';
        modalElement.id = 'studentModal';
        modalElement.setAttribute('tabindex', '-1');
        modalElement.setAttribute('aria-labelledby', 'studentModalLabel');
        modalElement.setAttribute('aria-hidden', 'true');

        modalElement.innerHTML = `
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="studentModalLabel">Student Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="studentModalBody">
                        </div>
                    </div>
                </div>
            `;

        document.body.appendChild(modalElement);
    }

    const studentModalLabel = document.getElementById('studentModalLabel');
    const studentModalBody = document.getElementById('studentModalBody');
studentModalLabel.textContent =
  house.charAt(0).toUpperCase() + house.slice(1);

    studentModalBody.innerHTML = `
            <div class="text-center">

    <img 
        src="${selectedStudent.photo}" 
        class="img-fluid rounded shadow mb-3"
        style="max-height: 300px;"
    >

    <h2 class="mb-3">
        ${selectedStudent.firstName} ${selectedStudent.lastName}
    </h2>

    <div class="mb-3">
        <p><strong>Age:</strong> ${selectedStudent.age}</p>
        <p><strong>Year:</strong> ${selectedStudent.year}</p>
    </div>

    <div class="fact-box p-3 rounded">
        <h5>Fun Fact</h5>
        <p>${selectedStudent.hiddenDetail}</p>
    </div>

</div>
        `;
    const studentModal = new bootstrap.Modal(modalElement);
    studentModal.show();
};

