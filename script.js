const tasks = [
    { question: "Möchtest du e___ Cola?", answer: "ein / eine" },
    { question: "Wo ist d___ Buch?", answer: "das" },
    { question: "Ich habe e___ Sohn und e___ Tochter.", answer: "einen - eine" },
    { question: "Hast du e___ Buch?", answer: "ein" },
    { question: "Wir haben k___ Milch mehr.", answer: "keine" },
    { question: "Hast du e___ Fußball dabei?", answer: "einen" },
    { question: "Ich hätte gern e___ Apfelkuchen.", answer: "einen" },
    { question: "Wir brauchen e___ neuen Kühlschrank.", answer: "einen" },
    { question: "Ich hätte gern e___ Hamburger.", answer: "einen" },
    { question: "Sind Sie d___ Vater von Maria?", answer: "der" },
    { question: "Ich frage d___ Vater von Maria.", answer: "den" },
    { question: "Möchten Sie e___ Kaffee?", answer: "einen" },
    { question: "Wo ist bitte d___ Verkäufer?", answer: "der" },
    { question: "Haben Sie d___ Hausaufgaben dabei?", answer: "die" },
    { question: "Trinkst du noch e___ Apfelsaft?", answer: "einen" },
    { question: "Trinkst du auch e___ Tee?", answer: "einen" },
    { question: "D___ Tee ist kalt.", answer: "der" },
    { question: "Tut mir leid, wir haben k___ Bananen mehr.", answer: "keine" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        // card.addEventListener("click", () => {
        //     if (!card.classList.contains("flipped")) {
        //         card.classList.add("flipped");
        //     }
        // });


        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });


        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Prevent card flip
            card.classList.add("fade-out"); // fades out a card when you click the "checked" sign

            // Wait for the transition to finish before removing
            setTimeout(() => {
                card.remove();
                checkEnd();
            }, 600); // Match the CSS transition duration
        };


        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}



// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);

// layout toggling logic

const toggleBtn = document.getElementById("toggleLayoutBtn");
let isStacked = false;

toggleBtn.addEventListener("click", () => {
    isStacked = !isStacked;
    container.classList.toggle("stack-mode", isStacked);
    container.classList.toggle("grid-mode", !isStacked);
});
