(function($) {
    const CHARS = "abcdefghijklmnopqrstuyvwxzABCDEFGHIJKLMNOPQRSTUYVWXZ1234567890";
    const MAX_LENGTH = 30;
    const REFRESH_RATE = 5000;

    /**
     * Generate password.
     */
    const generate = () => (
        Array.from({ length: MAX_LENGTH })
            .map(() => select())
            .reduce((pass, val) => pass += val)
    );

    /**
     * Select a random character for the new password.
     */
    const select = () => CHARS[Math.floor(Math.random() * Math.floor(CHARS.length-1))];

    /**
     * Start & refresh the password generation timer.
     */
    const refresh = (refreshId = null) => {
        refreshId && clearInterval(refreshId);
        return setInterval((() => {
            $(".password").text(generate());
            console.log("Refreshed the password.");
        }), REFRESH_RATE);
    };

    /**
     * Create the first password and start the refresh timer.
     */
    $(document).ready(() => {
        $(".password").text(generate());
        console.info("Initialized password generator.");
    });

    let refreshId = refresh();

    /**
     * Use clipboard.js to copy the generated password to user's clipboard.
     */
    const clipboard = new ClipboardJS(".password");

    // clipboard.js was successful
    clipboard.on("success", (e) => {
        document.getSelection().removeAllRanges();      // remove all selections from the page
        console.info("Successfully copied password to your clipboard.");

        $(".password").css("color", "#50001D");
        $(".password").text("Copied to Clipboard!");
        setTimeout(() => {
            $(".password").text(e.text);
            $(".password").css("color", "#000");
        }, 3000);

        refreshId = refresh(refreshId);
    });

    // clipboard.js encountered an error
    clipboard.on("error", (e) => {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
    });
}(jQuery))




