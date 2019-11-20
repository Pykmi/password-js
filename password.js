(function($) {
    const CHARS = "abcdefghijklmnopqrstuyvwxzABCDEFGHIJKLMNOPQRSTUYVWXZ1234567890";
    const MAX_LENGTH = 30;

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
     * Use clipboard.js to copy the generated password to user's clipboard.
     */
    const clipboard = new ClipboardJS("#password");

    clipboard.on("success", function(e) {
        document.getSelection().removeAllRanges();      // remove all selections from the page
        console.info("Successfully copied password to your clipboard.");

        $("#password").css("color", "#50001D");
        $("#password").text("Copied to Clipboard!");
        setTimeout(() => {
            $("#password").text(e.text);
            $("#password").css("color", "#000");
        }, 3000);
    });

    /**
     * Generate new random password when the page is refreshed.
     */
    $(document).ready(function() {
        $("#password").text(generate());
    });
}(jQuery))




