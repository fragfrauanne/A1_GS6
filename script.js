const tasks = [
    { question: "Er ___ gestern viel gearbeitet.", answer: "hat" },
    { question: "Ich ___ gut geschlafen.", answer: "habe" },
    { question: "Sofia ___ eine Suppe gekocht.", answer: "hat" },
    { question: "Tim ___ nach Berlin gefahren.", answer: "ist" },
    { question: "Wann ___ Walter gekommen?", answer: "ist" },
    { question: "Am Samstag ___ ich Fußball gespielt.", answer: "habe" },
    { question: "Tim ___ eine E-Mail geschrieben.", answer: "hat" },
    { question: "Lili ___ um 21.30 Uhr ins Bett gegangen.", answer: "ist" },
    { question: "Am Sonntag ___ ich spazieren gegangen.", answer: "bin" },
    { question: "Was ___ er gestern gegessen?", answer: "hat" },
    { question: "Wo ___ Tim früher gewohnt?", answer: "hat" },
    { question: "Lara ___ Musik gehört.", answer: "hat" },
    { question: "Ich ___ nach Polen gefahren.", answer: "bin" },
    { question: "Ich ___ zwei Jahre in Paris gewohnt.", answer: "habe" },
    { question: "Ich ___ um 19 Uhr nach Hause gekommen.", answer: "bin" },
    { question: "Ich ___ Bananen gekauft.", answer: "habe" },
    { question: "Lili ___ die Hausaufgaben gemacht.", answer: "hat" },
    { question: "Gestern ___ ich sehr viel gegessen.", answer: "habe" }
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
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
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