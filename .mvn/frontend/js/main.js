const apiBase = "http://localhost:8000/api"; // prilagodi adresu backendu

// Elementi
const loginSection = document.getElementById("login-register-section");
const tretmaniSection = document.getElementById("tretmani-section");
const zakazivanjeSection = document.getElementById("zakazivanje-section");
const mojiTerminiSection = document.getElementById("moji-termini-section");
const tretmaniList = document.getElementById("tretmani-list");
const terminiTabela = document.getElementById("termini-tabela");
const btnLogout = document.getElementById("btn-logout");

// Token i korisnik
let token = localStorage.getItem("token");
let korisnikId = localStorage.getItem("korisnikId");

// Prikazi/skrivanje sekcija
function showSection(section) {
    loginSection.style.display = "none";
    tretmaniSection.style.display = "none";
    zakazivanjeSection.style.display = "none";
    mojiTerminiSection.style.display = "none";

    section.style.display = "block";
}

if (token) {
    showSection(tretmaniSection);
    btnLogout.style.display = "inline-block";
    fetchTretmani();
} else {
    showSection(loginSection);
    btnLogout.style.display = "none";
}

// Logout
btnLogout.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("korisnikId");
    token = null;
    korisnikId = null;
    showSection(loginSection);
    btnLogout.style.display = "none";
});

// Login forma
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const lozinka = document.getElementById("login-password").value;

    try {
        const res = await fetch(`${apiBase}/korisnik/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, lozinka})
        });

        if (!res.ok) throw new Error("Pogrešni kredencijali");

        const data = await res.json();
        token = data.token;
        korisnikId = data.korisnikId;
        localStorage.setItem("token", token);
        localStorage.setItem("korisnikId", korisnikId);

        showSection(tretmaniSection);
        btnLogout.style.display = "inline-block";
        fetchTretmani();
    } catch (error) {
        alert(error.message);
    }
});

// Registracija forma
document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const ime = document.getElementById("register-ime").value;
    const email = document.getElementById("register-email").value;
    const lozinka = document.getElementById("register-password").value;

    try {
        const res = await fetch(`${apiBase}/korisnik/register`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ime, email, lozinka})
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(err || "Greška pri registraciji");
        }

        alert("Uspešno registrovan korisnik! Sada se možete prijaviti.");
        document.getElementById("register-form").reset();
    } catch (error) {
        alert(error.message);
    }
});

// Fetch tretmana i prikaz kartica
async function fetchTretmani() {
    try {
        const res = await fetch(`${apiBase}/tretmani`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Greška pri učitavanju tretmana");

        const tretmani = await res.json();
        tretmaniList.innerHTML = "";

        tretmani.forEach(tretman => {
            const kartica = document.createElement("div");
            kartica.className = "tretman-kartica";

            kartica.innerHTML = `
                <h3>${tretman.naziv}</h3>
                <p>${tretman.opis}</p>
                <p><strong>Cena:</strong> ${tretman.cena} RSD</p>
                <button data-id="${tretman.id}">Zakaži</button>
            `;

            kartica.querySelector("button").addEventListener("click", () => {
                zakazivanjeSection.style.display = "block";
                tretmaniSection.style.display = "none";
                document.getElementById("tretman-id").value = tretman.id;
            });

            tretmaniList.appendChild(kartica);
        });
    } catch (error) {
        alert(error.message);
    }
}

// Zakazivanje tretmana
document.getElementById("zakazi-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const datum = document.getElementById("datum").value;
    const tretmanId = document.getElementById("tretman-id").value;

    try {
        const res = await fetch(`${apiBase}/termini`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                korisnikId: parseInt(korisnikId),
                tretmanId: parseInt(tretmanId),
                datum
            })
        });

        if (!res.ok) throw new Error("Greška pri zakazivanju");

        alert("Termin uspešno zakazan!");
        zakazivanjeSection.style.display = "none";
        tretmaniSection.style.display = "block";
        fetchTermine();
    } catch (error) {
        alert(error.message);
    }
});

// Fetch moji termini
async function fetchTermine() {
    try {
        const res = await fetch(`${apiBase}/termini/korisnik/${korisnikId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Greška pri učitavanju termina");

        const termini = await res.json();
        terminiTabela.innerHTML = "";

        termini.forEach(t => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${t.tretman.naziv}</td>
                <td>${new Date(t.datum).toLocaleString()}</td>
                <td><button data-id="${t.id}">Otkaži</button></td>
            `;

            tr.querySelector("button").addEventListener("click", () => {
                otkaziTermin(t.id);
            });

            terminiTabela.appendChild(tr);
        });
    } catch (error) {
        alert(error.message);
    }
}

// Otkaži termin
async function otkaziTermin(id) {
    if (!confirm("Da li ste sigurni da želite da otkažete termin?")) return;

    try {
        const res = await fetch(`${apiBase}/termini/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Greška pri otkazivanju");

        alert("Termin otkazan");
        fetchTermine();
    } catch (error) {
        alert(error.message);
    }
}

// Navigacija linkovi
document.getElementById("link-tretmani").addEventListener("click", () => {
    showSection(tretmaniSection);
    fetchTretmani();
});

document.getElementById("link-moji-termini").addEventListener("click", () => {
    showSection(mojiTerminiSection);
    fetchTermine();
});
