const carouselArray = getElm("carousel-array");
let currentSlide= {
    index: 0,
    slide: document.querySelector(".carousel-item")
};



on(document, "sl-slide-change", e => {
    currentSlide = e.detail;
});

getElm("submit-password").click(async () => {
    const input = getElm(`change-password`);
    
    const really = await confirm(`Willst du wirklich dein Passwort zu ${input.val()} ändern?`);

    if (!really) return;

    if (input.valIsEmpty()) return alert("Bitte fülle das Feld aus.");

    const response = await post("/api/setPassword", {
        password: input.val().toString()
    });

    if (!response?.valid) return alert("Etwas hat nicht geklappt. Bitte versuche es später erneut.");

    input.placeholder = input.val();
    input.val("");

    alert("Erfolgreich geändert.");
});

getElm("carousel-delete").click(async () => {
    const really = confirm(`Willst du wirklich Nummer ${currentSlide.index + 1} vom Carousel löschen?`);

    if (!really) return;

    const array = JSON.parse(carouselArray.text());

    array.splice(currentSlide.index, 1);

    const response = await post("/api/changeDB", {
        name: "before_after",
        value: JSON.stringify(array)
    });

    if (!response?.valid) return alert("Etwas hat nicht geklappt. Bitte versuche es später erneut.");

    carouselArray.text(JSON.stringify(array));
    currentSlide.slide.remove();

    alert("Erfolgreich gelöscht.");
});

getElm("carousel-add").on("change", async () => {
    const input = getElm("carousel-add");

    if (input.files.length !== 2) return alert("Bitte lade genau zwei Bilder hoch.");

    const array = JSON.parse(carouselArray.text());

    array.push([
        await toBase64(input.files[1]),
        await toBase64(input.files[0])
    ]);

    const response = await post("/api/uploadCarousel", {
        array
    });

    if (!response?.valid) return alert("Etwas hat nicht geklappt. Bitte versuche es später erneut.");

    carouselArray.text(JSON.stringify(array));

    alert("Erfolgreich hinzugefügt.");

    const wrapper = createElm("sl-carousel-item");
    wrapper.classList.add("carousel-item");

    const comparer = createElm("sl-image-comparer");
    comparer.addClass("image-comparer");

    const before = createElm("img");
    const after = createElm("img");
    const handle = createElm("img");

    before.addClass("compare-img");
    after.addClass("compare-img");
    handle.addClass("compare-handle");

    before.src = array[array.length - 1][0];
    after.src = array[array.length - 1][1];
    handle.src = "/img/three-dots.svg";

    before.alt = "Vorher";
    after.alt = "Nachher";
    handle.alt = "Vergleichen";

    before.slot = "before";
    after.slot = "after";
    handle.slot = "handle";

    comparer.append(before, after, handle);
    wrapper.append(comparer);
    getQuery(".carousel").get(0).append(wrapper);
});

getQuery(".admin-change-submit").forEach(element => {
    element.click(() => updateInfos(element.id.replace(/submit-/g, "")));
});

getQuery(".comment-delete-btn").forEach(button => {
    button.click(() => deleteComment(button.data("data-comment-id")))
});

["hero", "more", "contact", "Nachhaltig", "Vor-Ort", "Professionell"].forEach(type => {
    getElm(`submit-text-${type}`).click(() => updateText(type.replace(/-/g, " ")));
});

getElm("submit-info-banner").click(updateInfoBanner);

async function updateInfoBanner() {
    const titleInput = getElm("change-info-banner-title");
    const textInput = getElm("change-info-banner-text");

    const really = await confirm(`Willst du wirklich den Titel von "${titleInput.placeholder}" zu "${titleInput.val()}" und den Text von "${textInput.placeholder}" zu "${textInput.val()}" ändern?`);

    if (!really) return;

    // Don't check if the value is empty since an empty string is needed to clear the banner

    const response = await post("/api/changeDB", {
        name: "info_banner",
        value: JSON.stringify({
            title: titleInput.val(),
            text: textInput.val()
        })
    })

    if (!response?.valid) return alert("Etwas hat nicht geklappt. Bitte versuche es später erneut.");

    titleInput.placeholder = titleInput.val();
    titleInput.val("");
    textInput.placeholder = textInput.val();
    textInput.val("");

    alert("Erfolgreich geändert.");
}

async function updateInfos(type) {
    const input = getElm(`change-${type}`);

    const change = input.parentElement.parentElement.querySelector("h3").innerText;
    
    const really = await confirm(`Willst du wirklich ${change} von ${input.placeholder} zu ${input.val()} ändern?`);

    if (!really) return;

    if (input.valIsEmpty()) return alert("Bitte fülle das Feld aus.");

    const response = await post("/api/changeDB", {
        name: type.replace(/-/, "_"),
        value: input.val().toString()
    });

    if (!response?.valid) return alert("Etwas hat nicht geklappt. Bitte versuche es später erneut.");

    input.placeholder = input.val();
    input.val("");

    alert("Erfolgreich geändert.");
}

async function updateText(type) {
    const commonType = type.replace(/hero/, "Untertitel ganz oben").replace(/more/, "Mehr Erfahren").replace(/contact/, "Anleitung zur Kontaktaufnahme");
    const input = getElm(`change-text-${type}`);
    const text = JSON.parse(getElm("text-obj").text());

    const really = await confirm(`Willst du wirklich "${commonType}" zu "${input.val()}" ändern?`);

    if (!really) return;

    if (input.valIsEmpty()) return alert("Bitte fülle das Feld aus.");

    if (["hero", "more", "contact"].includes(type)) text[type] = input.val();
    else text.wave[type] = input.val();

    const response = await post("/api/changeDB", {
        name: "text",
        value: JSON.stringify(text)
    });

    if (!response?.valid) return alert("Etwas hat nicht geklappt. Bitte versuche es später erneut.");

    input.placeholder = input.val();
    input.val("");

    alert("Erfolgreich geändert.");

    getElm("text-obj").text(JSON.stringify(text));
}

async function deleteComment(id) {
    const name = getElm(`comment-name-id-${id}`).text();
    const rating = getElm(`comment-rating-id-${id}`).text();

    const really = await confirm(`Willst du wirklich den Kommentar von ${name} mit ${rating} Sterne Bewertung löschen?`);

    if (!really) return;

    const response = await post("/api/deleteComment", {
        id: Number(id)
    });

    if (!response?.valid) return alert("Etwas hat nicht geklappt. Bitte versuche es später erneut.");

    getElm(`comment-id-${id}`).remove();

    alert("Erfolgreich gelöscht.");
}