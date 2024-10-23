"use strict";

const body = getQuery("body").get(0);
const playButton = getQuery(".info-video-play-icon").get(0);
const commentsWrapper1 = getQuery(".reviews-wrapper").get(0);
const commentsWrapper2 = getQuery(".reviews-wrapper").get(1);
const transitionContainer = getQuery(".preloader-container").get(0);
const transitionBoxes = gsap.utils.toArray(".preloader-box");
const contactForm = getElm("contact");
const contactFile = getElm("contact-file");
const commentsForm = getElm("comments");
const commentsFile = getElm("comments-file");

let commentsAnimationStart = null;
let commentsAnimation1 = null;
let commentsAnimation2 = null;

var imgCompareDimensionsInterval = setInterval(imgCompareDimensions, 1000);

commentsWrapper2.innerHTML = commentsWrapper1.innerHTML;

gsap.registerPlugin(CustomEase);
CustomEase.create("transitionEase", "M0,0 C0.375,0.32 0.634,0.176 0.759,0.406 0.972,0.68 0.818,1.001 1,1");

getQuery("img").on("dragstart", () => false);

playButton.click(() => {
    const video = getQuery(".info-video").get(0);
    const playBackground = getQuery(".info-video-play").get(0);
    
    playBackground.hide();
    video.play();
    video.controls = true;

    video.on("ended", () => {
        playBackground.grid();
        video.controls = false;
    });

    video.on("pause", () => {
        playBackground.grid();
        video.controls = false;
    });
});

getQuery(".floating-card-wrapper").forEach(element => {
    const randomPositionY = Math.floor(Math.random() * 100) - 50;
    const randomPositionX = Math.floor(Math.random() * 20) - 10;
    const randomDuration = Math.floor(Math.random() * 10) + 5;

    element.style.zIndex = Math.floor(Math.random() * 10) + 1;

    gsap.to(element, {
        y: randomPositionY,
        x: randomPositionX,
        duration: randomDuration,
        repeat: -1,
        yoyo: true,
        ease: "none"
    });
});

contactFile.on("change", async () => {
    for (let i = 0; i < contactFile.files.length; i++) {
        try {
            const file = contactFile.files[i];
            const base64 = await toBase64Max(file, 1000000 /* 1MB */);
            createContactFile(file.name, base64);
        } catch (error) {
            console.error("Error reading file", error);
            customErrorField("Das hat leider nicht geklappt. Bitte versuche es erneut.");
        }
    }
});

commentsFile.on("change", async () => {
    try {
        const file = commentsFile.file();
        const base64 = await toBase64Max(file, 500000 /* 0.5MB */);
        createCommentsFile(file.name, base64);
    } catch (error) {
        console.error("Error reading file", error);
        customErrorField("Das hat leider nicht geklappt. Bitte versuche es erneut.");
    }
});

getElm("footer-copy-phone").click(async () => {
    const response = await GETText("/api/phone");
    navigator.clipboard.writeText(response);
    customInfoField("Telefonnummer kopiert.");
});


getElm("contact-submit").click(submitContactForm);
getElm("contact-close").click(contactOut);
getElm("comments-open").click(commentIn);
getElm("comments-close").click(commentOut);
getElm("comments-submit").click(submitCommentsForm);

getQuery(".open-contact-form").click(contactIn);
getQuery(".open-comment-form").click(commentIn);

getQuery(".scroll-to-contact").click(() => scrollToQuery("#scrollTo___contact"));
getQuery(".scroll-to-explore").click(() => scrollToQuery("#scrollTo___explore"));
getQuery(".scroll-to-top").click(() => scrollToQuery(".scrollTo___top"));
getQuery(".open-administration").click(() => window.location.href = "/admin");

commentsAnimation();

on(window, "resize", commentsAnimation);

on(window, "resize", imgCompareDimensions);
on(document, "sl-slide-change", imgCompareDimensions);

on(window, "resize", () => getQuery(".carousel").get(0).goToSlide(0));

ready(() => {
    const elements = getQuery(".miniature .socials-link");

    if (getDevice() === "mobile") {
        elements.get(0).addClass("hide-me");
    } else {
        elements.get(1).addClass("hide-me");
    }
});

function commentsAnimation() {
    if (commentsAnimationStart !== null) commentsAnimationStart.kill();
    if (commentsAnimation1 !== null) commentsAnimation1.kill();
    if (commentsAnimation2 !== null) commentsAnimation2.kill();

    commentsAnimationStart = null;
    commentsAnimation1 = null;
    commentsAnimation2 = null;

    gsap.set([commentsWrapper1, commentsWrapper2], {
        y: 0
    });

    commentsAnimationStart = gsap.to(commentsWrapper1, {
        y: -commentsWrapper1.y(),
        duration: commentsWrapper1.y() * 0.03,
        ease: "none",
        repeat: 0,
        onComplete: () => commentsAnimation1 = gsap.fromTo(commentsWrapper1, {
            y: commentsWrapper1.y()
        }, {
            y: -commentsWrapper1.y(),
            duration: commentsWrapper1.y() * 0.03 * 2,
            ease: "none",
            repeat: -1
        })
    });

    commentsAnimation2 = gsap.to(commentsWrapper2, {
        y: -commentsWrapper2.y() * 2,
        duration: commentsWrapper2.y() * 0.03 * 2,
        ease: "none",
        repeat: -1,
    });
}

function imgCompareDimensions() {
    getQuery("sl-image-comparer").forEach(element => {
        element.css({
            "--width": `${element.x()}px`,
            "--height": `${element.y()}px`
        });
    });
}

function transitionIn(callback = () => {}) {
    transitionContainer.show();

    gsap.fromTo(transitionBoxes, {
        "--path-in": "0%",
        "--path-out": "0%",
    }, {
        "--path-in": "100%",
        "--path-out": "0%",
        duration: 0.5,
        ease: "transitionEase",
        stagger: 0.1,
        onComplete: callback
    });
}

function transitionOut(callback = () => {}) {
    gsap.fromTo(transitionBoxes, {
        "--path-out": "0%",
        "--path-in": "100%",
    }, {
        "--path-out": "100%",
        "--path-in": "100%",
        duration: 0.5,
        ease: "transitionEase",
        stagger: 0.1,
        onComplete: () => {
            transitionContainer.hide();
            callback();
        }
    });
}

function contactIn() {
    if (contactForm.hasClass("open")) return;

    transitionIn(() => gsap.fromTo("#contact", {
        opacity: 0,
        y: -80,
        display: "none"
    }, {
        opacity: 1,
        y: 0,
        display: "block",
        duration: 0.5,
        ease: "power2.inOut"
    }));

    body.css({ overflow: "hidden" });

    contactForm.addClass("open");
}

function contactOut() {
    if (!contactForm.hasClass("open")) return;

    gsap.to("#contact", {
        opacity: 0,
        y: 80,
        display: "none",
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: transitionOut
    });

    body.css({ overflow: "auto" });

    contactForm.removeClass("open");
}

function createContactFile(name, data) {
    const div = createElm("div");
    div.addClass("contact-file-wrapper");

    const input = createElm("sl-input");
    input.addClass("contact-input");
    input.type = "text";
    input.value = name;
    input.disabled = true;
    input.data("data-base64", data);

    const button = createElm("sl-button");
    button.text("Löschen");
    button.data("variant", "danger");
    button.click(() => div.remove());

    div.append(input, button);
    getElm("contact-files").append(div);
}

async function submitContactForm(e) {
    e.preventDefault();

    const name = getElm("contact-name");
    const familyName = getElm("contact-family-name");
    const email = getElm("contact-email");
    const message = getElm("contact-message");
    const filesElement = getElm("contact-files").getQuery(".contact-input");
    const files = [];

    if (name.valIsEmpty()) return customErrorField("Bitte gib deinen Vornamen ein.");
    if (familyName.valIsEmpty()) return customErrorField("Bitte gib deinen Nachnamen ein.");
    if (email.valIsEmpty()) return customErrorField("Bitte gib deine E-Mail-Adresse ein.");
    if (message.valIsEmpty()) return customErrorField("Bitte gib eine Nachricht ein.");

    for (let i = 0; i < filesElement.length; i++) {
        const input = filesElement.get(i);
        files.push({
            name: input.val(),
            base64: input.data("data-base64")
        });
    }

    if (files.length === 0) return customErrorField("Bitte lade mindestens eine Datei hoch.");

    const response = await post("/api/contact", {
        name: name.val(),
        familyName: familyName.val(),
        email: email.val(),
        message: message.val(),
        files
    });
    
    if (response.error !== "OK") return customErrorField("Das hat leider nicht geklappt. Bitte versuche es erneut.");
    
    getElm("contact-submit").disabled = true;
    customSuccessField("Vielen Dank für deine Nachricht. Wir werden uns so schnell wie möglich bei dir melden.");
    contactOut();
}

function commentIn() {
    if (commentsForm.hasClass("open")) return;

    transitionIn(() => gsap.fromTo("#comments", {
        opacity: 0,
        y: -80,
        display: "none"
    }, {
        opacity: 1,
        y: 0,
        display: "block",
        duration: 0.5,
        ease: "power2.inOut"
    }));

    body.css({ overflow: "hidden" });

    commentsForm.addClass("open");
}

function commentOut() {
    if (!commentsForm.hasClass("open")) return;

    gsap.to("#comments", {
        opacity: 0,
        y: 80,
        display: "none",
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: transitionOut
    });

    body.css({ overflow: "auto" });

    commentsForm.removeClass("open");
}

function createCommentsFile(name, data) {
    const div = createElm("div");
    div.addClass("comments-file-wrapper");

    const input = createElm("sl-input");
    input.addClass("comments-input");
    input.type = "text";
    input.value = name;
    input.disabled = true;
    input.data("data-base64", data);

    const button = createElm("sl-button");
    button.text("Löschen");
    button.data("variant", "danger");
    button.click(() => div.remove());

    div.append(input, button);
    getElm("comments-files").html("");
    getElm("comments-files").append(div);
}

async function submitCommentsForm(e) {
    e.preventDefault();

    const name = getElm("comments-name");
    const familyName = getElm("comments-family-name");
    const email = getElm("comments-email");
    const message = getElm("comments-message");
    const file = getElm("comments-files").getQuery(".comments-input").get(0);
    let url = "/img/logo.jpg";

    if (name.valIsEmpty()) return customErrorField("Bitte gib deinen Vornamen ein.");
    if (familyName.valIsEmpty()) return customErrorField("Bitte gib deinen Nachnamen ein.");
    if (email.valIsEmpty()) return customErrorField("Bitte gib deine E-Mail-Adresse ein.");
    if (message.valIsEmpty()) return customErrorField("Bitte gib eine Nachricht ein.");

    if (file) url = file.data("data-base64");

    const response = await post("/api/comments", {
        name: name.val(),
        familyName: familyName.val(),
        email: email.val(),
        message: message.val(),
        rating: getElm("comments-rating").val(),
        file: url
    });
    
    if (response.error !== "OK") return customErrorField("Das hat leider nicht geklappt. Bitte versuche es erneut.");

    validateCommentsEmail();
}

function validateCommentsEmail() {
    commentsForm.html("");

    const h1 = createElm("h1");
    h1.text("E-Mail bestätigen");
    h1.addClass("main-title");

    const input = createElm("sl-input");
    input.type = "text";
    input.label = "Bestätigungscode";
    input.required = true;
    input.addClass("comments-input");

    const button = createElm("button");
    button.text("Bestätigen");
    button.addClass("primary-btn");
    button.click(() => submitCommentsValidation(input));
    button.type = "button";
    button.title = "Code bestätigen";

    const close = createElm("button");
    close.id = "comments-close";
    close.type = "button";
    close.addClass("close-btn");
    close.title = "Schliessen";
    close.click(commentOut);

    const img = createElm("img");
    img.src = "/img/close.svg";
    img.alt = "Ein X zum Schliessen";

    close.append(img);
    commentsForm.append(h1, input, button, close);
}

async function submitCommentsValidation(input) {
    if (input.valIsEmpty()) return customErrorField("Bitte gib den Bestätigungscode ein.");

    const code = input.val();

    if (Number(code) === NaN) return customErrorField("Der Bestätigungscode muss eine Zahl sein.");
    if (code.length !== 6) return customErrorField("Der Bestätigungscode besteht aus 6 Zahlen.");

    const response = await post("/api/commentsConfirm", {
        code
    });

    if (response.error !== "OK") return customErrorField("Der Bestätigungscode ist falsch.");

    customSuccessField("Vielen Dank für dein Feedback.");
    commentOut();
}

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

function customSuccessField(message) {
    customField(message, "success", "Das hat geklappt!", "check2-circle");
}

function customErrorField(message) {
    customField(message, "danger", "Ein Fehler ist aufgetreten:", "exclamation-octagon");
}

function customInfoField(message) {
    customField(message, "primary", "Info:", "info-circle");
}

timonjs_message();