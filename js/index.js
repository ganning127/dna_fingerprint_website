function init() {
    // uncomment the below line for the typing animation
    new TypeIt("#welcome-text", {
        speed: 50,
        // lifeLike: true,
        waitUntilVisible: true,
        strings: 'Welcome <span class="bold text-light-green">detective</span>, it seems like you are here to learn more about the ethics behind <span class="bold text-light-green">DNA fingerprinting</span>...'
    }).go();
}

init();