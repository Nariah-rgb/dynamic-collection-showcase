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
        <button class="fun-fact-btn" data-student-index="${index}>Fun Fact</button>
        <p class="hidden-fact d-none mt-2">
        ${student.hiddenDetail}
        </p>
        </div>
        `;
        const btn = card.querySelector(".fun-fact-btn");

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
                            <h5 class="modal-title" id="studentModalLabel">Player Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="studentModalBody">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modalElement); 
        }

        const studentModalLabel = document.getElementById('studentModalLabel');
        const studentModalBody = document.getElementById('studentModalBody');
        studentModalLabel.textContent = `${selectedStudent.firstName} ${selectedStudent.lastName}`;

        studentModalBody.innerHTML = `
            <div class="row">
                <div class="col-md-5 text-center mb-3">
                    <img src="${selectedStudent.photo}" alt="${selectedStudent.firstName} ${selectedStudent.lastName}"
                        class="img-fluid rounded mb-3" style="max-height: 300px;">
                </div>
                <div class="col-md-7">
                    <h4 class="mb-3">${selectedStudent.firstName} ${selectedStudent.lastName}</h4>
                    <div class="mb-3">
                        <div class="d-flex align-items-center mb-2">
                            <div class="me-3"><strong>Age:</strong></div>
                            <div>${selectedStudent.age}</div>
                        </div>
                    </div>
                    <div class="alert alert-info">
                        <h5 class="alert-heading"><i class="fas fa-lightbulb me-2"></i></h5>
                        <p class="mb-0">${selectedStudent.hiddenDetail}</p>
                    </div>
                </div>
            </div>
        `;
        const studentModal = new bootstrap.Modal(modalElement);
        studentModal.show();
    };

    
