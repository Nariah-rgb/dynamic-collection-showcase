// Read the current house from the URL query string (e.g. ?house=gryffindor).
const params = new URLSearchParams(window.location.search);
const house = params.get("house");

// Apply the house as a body class so house-specific styling can be used.
document.body.classList.add(house);

// Pull the student array for this house from a global "houses" object
// If the house doesn't exist, fallback to an empty array to prevent errors
const students = houses[house] || [];

// Shared helper for formatting a house name for display.
const formatHouseName = (houseName) =>
  houseName ? houseName.charAt(0).toUpperCase() + houseName.slice(1) : "House Not Found";

const houseDisplayName = formatHouseName(house);

// Update the page heading to show the selected house name.
document.querySelector("h1").textContent = houseDisplayName;
  
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("rosterGrid");
    const sortSelect = document.getElementById("sortSelect");

    // Render student cards into the roster grid.
    const render = (list) => {
        grid.innerHTML = "";
        // Loop through each student and create a card
        list.forEach((student, index) => {
            const col = document.createElement("div");
            col.className = "col-md-3 col-lg-3";
              // Card container for student info
            const card = document.createElement("div");
            card.className = "card h-100";
             // Fill the card with HTML content
            // NOTE: Uses template literals for readability
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

            // Add card into column, then column into grid
            col.appendChild(card);
            grid.appendChild(col);

             // Attach click listener to the "Fun Fact" button
            const funFactBtn = card.querySelector('.fun-fact-btn');
            funFactBtn.addEventListener('click', function () {
                 // Read which student this button belongs to
                const studentIndex = this.getAttribute('data-student-index');
                 // Find the matching student object from the list
                const selectedStudent = list[studentIndex];

                // Open modal with that student's details
                showStudentModal(selectedStudent);
            })
        });
    };
    render(students);

    // Re-sort the displayed students when the sort dropdown changes.
    // Listen for changes in the sort dropdown
    sortSelect.addEventListener("change", () => {

         // Clone array so original data is not mutated
        const sortedStudents = [...students];

        // Apply selected sorting method
        switch (sortSelect.value) {

            // Sort alphabetically by first name
            case "firstName-asc":
                sortedStudents.sort((a, b) =>
                    a.firstName.localeCompare(b.firstName)
                );
                break;

                 // Sort alphabetically by last name
            case "lastName-asc":
                sortedStudents.sort((a, b) =>
                    a.lastName.localeCompare(b.lastName)
                );
                break;

                // Sort numerically by age
            case "age-asc":
                sortedStudents.sort((a, b) =>
                    Number(a.age) - Number(b.age)
                );
                break;

                // Sort by year (string comparison assumes consistent formatting)
            case "year-asc":
                sortedStudents.sort((a, b) =>
                    a.year.localeCompare(b.year)
                );
                break;
        }

        render(sortedStudents);
    });
});

// Create or update and display a Bootstrap modal for the selected student.
const showStudentModal = (selectedStudent) => {
    let modalElement = document.getElementById('studentModal');

    // If the modal does not exist yet, create it once and append it to the document.
    if (!modalElement) {
        modalElement = document.createElement('div');
        modalElement.className = 'modal fade';
        modalElement.id = 'studentModal';
        // Required Bootstrap modal accessibility attributes
        modalElement.setAttribute('tabindex', '-1');
        modalElement.setAttribute('aria-labelledby', 'studentModalLabel');
        modalElement.setAttribute('aria-hidden', 'true');

        // Modal structure (Bootstrap layout)
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

            // Add modal to document once
        document.body.appendChild(modalElement);
    }

     // Grab modal title and body containers
    const studentModalLabel = document.getElementById('studentModalLabel');
    const studentModalBody = document.getElementById('studentModalBody');

    // Set modal title to the house name and fill the body with the student's details.
    studentModalLabel.textContent = houseDisplayName;

      // Fill modal body with selected student details
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
            // Initialize Bootstrap modal and show it
    const studentModal = new bootstrap.Modal(modalElement);
    studentModal.show();
};

