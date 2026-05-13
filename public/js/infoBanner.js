function closeInfoBanner() {
    gsap.fromTo(".info-banner-wrapper", {
        opacity: "100%",
    }, {
        opacity: "0%",
        duration: 1,
        ease: "power3.out",
        onComplete: () => getQuery(".info-banner-wrapper").get(0).addClass("hidden")
    });
}

getQuery(".info-banner-close-button").click(closeInfoBanner);
getQuery(".info-banner-wrapper").click(closeInfoBanner);
getQuery(".info-banner").click((event) => {
    event.stopPropagation();
})