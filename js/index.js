function init() {
    // uncomment the below line for the typing animation
    new TypeIt("#welcome-text", {
        speed: 50,
        // lifeLike: true,
        waitUntilVisible: true,
    }).go();
}

init();