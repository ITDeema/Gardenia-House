if (document.body.id === "providerDashboard") {
  const tableBody = document.querySelector(".servicess-table tbody");
  const modal = document.getElementById("editModal");
  const closeBtn = modal.querySelector(".close-btn");
  const editForm = document.getElementById("editServiceForm");

  let services = JSON.parse(localStorage.getItem("services")) || [];

  function loadServices() {
    services = JSON.parse(localStorage.getItem("services")) || [];
    tableBody.innerHTML = "";

    if (services.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:20px;">No services added yet.</td></tr>`;
      return;
    }

    services.forEach((service, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${service.name}</td>
        <td><img class="service-thumb" src="${service.photo}" alt="${service.name}"></td>
        <td>${service.price} SAR</td>
        <td><button class="edit-btn" data-index="${index}">Edit</button></td>
      `;
      tableBody.appendChild(row);
    });

    attachEditEvents();
  }

  function attachEditEvents() {
    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.onclick = () => openEditMode(btn.dataset.index);
    });
  }

  function openEditMode(index) {
    const service = services[index];

    document.getElementById("editName").value = service.name;
    document.getElementById("editPrice").value = service.price;
    document.getElementById("editDesc").value = service.desc || "";
    document.getElementById("editPhotoPreview").src = service.photo;

    modal.style.display = "flex";

    document.getElementById("saveEditBtn").onclick = function() {
    let saved = saveChanges(index);
    if (saved) {
        modal.style.display = "none";
    }
};


  document.getElementById("deleteEdit").onclick = function() {
    if (confirm("Are you sure you want to delete this service?")) {
        services.splice(index, 1); 
        saveToLocalStorage(); 
        modal.style.display = "none"; 
    }
};

  }

function saveChanges(index) {
    let newName = document.getElementById("editName").value.trim();
    let newPrice = document.getElementById("editPrice").value.trim();
    let newDesc = document.getElementById("editDesc").value.trim();
    let photoInput = document.getElementById("editPhoto");

    if (/^[0-9]/.test(newName)) {
      alert("⚠ Name must NOT start with a number.");
      return false;
    }

    if (isNaN(newPrice) || newPrice === "") {
    alert("Please enter a numeric price.");
    return false;
}


    services[index].name = newName;
    services[index].price = newPrice;
    services[index].desc = newDesc;

    if (photoInput.files.length > 0) {
      let reader = new FileReader();
      reader.onload = function() {
        services[index].photo = reader.result;
        saveToLocalStorage();
      };
      reader.readAsDataURL(photoInput.files[0]);
    } else {
      saveToLocalStorage();
    }

    return true; 
}


  function saveToLocalStorage() {
    localStorage.setItem("services", JSON.stringify(services));
    alert("Service Updated Successfully!");
    loadServices(); 
  }

  closeBtn.onclick = () => modal.style.display = "none";
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  loadServices(); 
}

// ========= ADD NEW SERVICE PAGE SCRIPT =========
if (document.body.id === "addServicePage") {
  const form = document.getElementById("serviceForm");

  form.addEventListener("submit", function(e) {
    e.preventDefault(); 

    let name = document.getElementById("serviceName").value.trim();
    let price = document.getElementById("servicePrice").value.trim();
    let desc = document.getElementById("serviceDesc").value.trim();
    let photoInput = document.getElementById("servicePhoto");

    if (!name || !price || !desc || photoInput.files.length === 0) {
      alert("⚠ All fields are required.");
      return;
    }

    if (/^[0-9]/.test(name)) {
      alert("⚠ Name must NOT start with a number.");
      return;
    }

    if (isNaN(price)) {
    alert("Please enter a numeric price.");
      return;
    }

    let services = JSON.parse(localStorage.getItem("services")) || [];

    let reader = new FileReader();
    reader.onload = function () {
      let newService = {
        name,
        price,
        desc,
        photo: reader.result
      };

      services.push(newService);
      localStorage.setItem("services", JSON.stringify(services));

     alert(`The service "${name}" has been added successfully!`);

      form.reset();

      window.location.href = "provider-dashboard.html";
    };

    reader.readAsDataURL(photoInput.files[0]);
  });
}


// ==================== MANAGE STAFF MEMBERS PAGE SCRIPT ====================
if (document.body.id === "manageMembersPage") {

    const staffListDiv = document.getElementById("staffList");
    const deleteBtn = document.getElementById("deleteBtn");

    let staffMembers = JSON.parse(localStorage.getItem("staffMembers")) || [
        { name: "Abdullah Hassan", photo: "images/staf1.jpg" },
        { name: "Sara Al-Harbi", photo: "images/staf2.jpg" },
        { name: "Sophia Lee", photo: "images/staf3.jpg" },
        { name: "Michael Roberts", photo: "images/staf4.jpeg" }
    ];

    function renderStaff() {
        staffListDiv.innerHTML = "";

        staffMembers.forEach((member, index) => {
            staffListDiv.innerHTML += `
                <div class="staff-member">
                    <div class="staff-img">
                        <img src="${member.photo}" alt="${member.name}">
                    </div>
                    <div class="staff-details">
                        <p><strong>Name:</strong> ${member.name}</p>
                    </div>
                    <div class="delete-checkbox">
                        <input type="checkbox" class="delete-check" data-index="${index}">
                    </div>
                </div>
            `;
        });
    }

    renderStaff();


    deleteBtn.addEventListener("click", () => {
        const checkboxes = document.querySelectorAll(".delete-check");
        let selected = [];

        checkboxes.forEach(ch => {
            if (ch.checked) selected.push(parseInt(ch.dataset.index));
        });

        if (selected.length === 0) {
            alert("Please select at least one member");
            return;
        }

        if (confirm("Are you sure you want to delete selected members?")) {
            staffMembers = staffMembers.filter((_, i) => !selected.includes(i));
            localStorage.setItem("staffMembers", JSON.stringify(staffMembers));
            renderStaff();
        }
    });


    const addForm = document.getElementById("addStaffForm");

    addForm.addEventListener("submit", function(e){
        e.preventDefault();

        let name = document.getElementById("staffName").value.trim();
        let photoInput = document.getElementById("staffPhoto");
        let dob = document.getElementById("staffDOB").value;
        let email = document.getElementById("staffEmail").value.trim();
        let expertise = document.getElementById("staffExpertise").value.trim();
        let skills = document.getElementById("staffSkills").value.trim();
        let education = document.getElementById("staffEducation").value.trim();

        // VALIDATION
        if (!name || !dob || !email || !expertise || !skills || !education || photoInput.files.length === 0) {
            alert("All fields are required.");
            return;
        }

        if (/^[0-9]/.test(name)) {
            alert("Name must NOT start with a number.");
            return;
        }

        let reader = new FileReader();
        reader.onload = function() {

            let newMember = {
                name,
                photo: reader.result
            };

            staffMembers.push(newMember);
            localStorage.setItem("staffMembers", JSON.stringify(staffMembers));

            alert("Staff member added successfully!");

            addForm.reset();
            renderStaff();
        };

        reader.readAsDataURL(photoInput.files[0]);
    });

}
