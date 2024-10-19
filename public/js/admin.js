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

getQuery(".admin-change-submit").forEach(element => {
    element.click(() => updateInfos(element.id.replace(/submit-/g, "")));
});

getQuery(".comment-delete-btn").forEach(button => {
    button.click(() => deleteComment(button.data("data-comment-id")))
});

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