let queue = [];
let queueNumber = 1;
let totalServed = 0;

function addPatient() {

    let name = document.getElementById("patientName").value.trim();
    let reason = document.getElementById("reason").value;

    if (name === "" || reason === "") {
        alert("Please complete the patient information.");
        return;
    }

    let patient = {
        number: queueNumber,
        name: name,
        reason: reason
    };

    queue.push(patient);
    queueNumber++;

    document.getElementById("patientName").value = "";
    document.getElementById("reason").value = "";

    showNotification("Patient added to the queue! 🎉");

    displayQueue();
    updateStats();
}

function displayQueue(list = queue) {

    let queueList = document.getElementById("queueList");
    let emptyMessage = document.getElementById("emptyMessage");

    queueList.innerHTML = "";

    if (list.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    list.forEach(function(patient) {

        let div = document.createElement("div");

        div.className = "patient";

        div.innerHTML = `
            <div class="patient-info">

                <div class="number">
                    ${patient.number}
                </div>

                <div>
                    <h3>${patient.name}</h3>
                    <p>${patient.reason}</p>
                </div>

            </div>

            <button class="remove-btn"
                onclick="removePatient(${patient.number})">
                Remove
            </button>
        `;

        queueList.appendChild(div);
    });
}

function serveNext() {

    if (queue.length === 0) {
        alert("There are no patients waiting.");
        return;
    }

    let patient = queue.shift();

    document.getElementById("servingNumber").textContent =
        patient.number;

    document.getElementById("servingName").textContent =
        patient.name;

    document.getElementById("servingReason").textContent =
        patient.reason;

    totalServed++;

    showNotification(
        "Now serving " + patient.name + " 🦷"
    );

    displayQueue();
    updateStats();
}

function removePatient(number) {

    queue = queue.filter(function(patient) {
        return patient.number !== number;
    });

    showNotification("Patient removed from queue.");

    displayQueue();
    updateStats();
}

function searchPatient() {

    let search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let results = queue.filter(function(patient) {

        return patient.name
            .toLowerCase()
            .includes(search);

    });

    displayQueue(results);
}

function updateStats() {

    document.getElementById("totalPatients").textContent =
        queue.length + totalServed;

    document.getElementById("waitingPatients").textContent =
        queue.length;

    document.getElementById("servedPatients").textContent =
        totalServed;
}

function showNotification(message) {

    let notification =
        document.getElementById("notification");

    notification.textContent = message;

    notification.classList.add("show");

    setTimeout(function() {
        notification.classList.remove("show");
    }, 2500);
}

displayQueue();
updateStats();


