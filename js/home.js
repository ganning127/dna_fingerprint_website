function init() {
    // uncomment the below line for the typing animation
    new TypeIt("#ending-text", {
        speed: 50,
        // lifeLike: true,
        waitUntilVisible: true,
        strings: 'Good job, you have reached the end. We hope you have enjoyed the learning more about <span class="bold text-light-green">DNA fingerprinting</span>.',

        afterComplete: async () => {
            // Will fire after the entire instance has completed typing.
            // NOTE: If "loop" is enabled, this will never fire.
            console.log('show navbar');
            document.getElementById("navbar").style.top = "0";

            document.getElementById("bottom").classList.add("visible");
        },

    }).go();
}

init();