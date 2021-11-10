function init() {
    // uncomment the below line for the typing animation
    new TypeIt("#welcome-text", {
        speed: 50,
        // lifeLike: true,
        waitUntilVisible: true,
        strings: 'Welcome <span class="bold text-light-green">detective</span>, it seems like you are here to learn more about the ethics behind <span class="bold text-light-green">DNA fingerprinting</span>...',
        afterComplete: async () => {
            // Will fire after the entire instance has completed typing.
            // NOTE: If "loop" is enabled, this will never fire.

            document.getElementById("navigation").classList.add("visible");
        },

    }).go();
}

init();