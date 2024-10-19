getQuery("header").click(() => {
    window.location.href = ORIGIN;
});

getQuery(".login-btn").click(async e => {
    e.preventDefault();

    const username = getElm("username");
    const password = getElm("password");

    if (username.valIsEmpty() || password.valIsEmpty()) return customErrorField("Bitte fülle alle Felder aus.");

    const response = await post("/auth/submit", {
        username: username.val(),
        password: password.val()
    });

    if (!response.success) return customErrorField("Falscher Benutzername oder Passwort.");

    window.location.href = "/admin";
});

on(document, "keydown", e => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    getQuery(".login-btn").click();
});

function customField(message, variant, title, icon_name) {
    const div = createElm("sl-alert");
    div.variant = variant;
    div.closable = true;
    div.open = true;
    div.duration = 5000;

    const icon = createElm("sl-icon");
    icon.name = icon_name;
    icon.slot = "icon";

    const strong = createElm("strong");
    strong.text(title);

    const br = createElm("br");

    const span = createElm("span");
    span.text(message);

    div.append(icon, strong, br, span);
    getElm("alerts-graveyard").append(div);
}

function customErrorField(message) {
    customField(message, "danger", "Ein Fehler ist aufgetreten:", "exclamation-octagon");
}