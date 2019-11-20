(function($) {
    const CHARS = "abcdefghijklmnopqrstuyvwxzABCDEFGHIJKLMNOPQRSTUYVWXZ1234567890";
    const MAX_LENGTH = 30;

    function generate() {
        let password = "";

        for(let i=0; i<MAX_LENGTH; i++) {
            password += pick();
        }

        return password;
    }

    function pick() {
        return CHARS[random(CHARS.length-1)];
    }

    function random(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    /**
     * Use clipboard.js to copy the generated password to user's clipboard.
     */
    const clipboard = new ClipboardJS("#password");

    clipboard.on("success", function(e) {
        document.getSelection().removeAllRanges();      // remove all selections from the page
        console.info("Successfully copied password to your clipboard.");
    });

    /**
     * Generate new random password when the page is refreshed.
     */
    $(document).ready(function() {
        $("#password").text(generate());
    });
}(jQuery))




