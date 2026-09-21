const WIFI_NAME = "3NGO-Building_F7";
const WIFI_PASSWORD = "20270107";

const wifiName = document.getElementById("wifi-name");
const wifiPassword = document.getElementById("wifi-password");

if (wifiName) {
    wifiName.textContent = WIFI_NAME;
}

if (wifiPassword) {
    wifiPassword.textContent = WIFI_PASSWORD;
}

const copyButton = document.getElementById("copy-button");
const copyText = document.getElementById("copy-text");

function fallbackCopy(text) {

    const textarea = document.createElement("textarea");

    textarea.value = text;

    textarea.style.position = "fixed";

    textarea.style.opacity = "0";

    document.body.appendChild(textarea);

    textarea.select();

    let success = false;

    try {

        success = document.execCommand("copy");

    } catch (error) {

        console.error("Copy failed:", error);

    }

    document.body.removeChild(textarea);

    return success;

}

async function copyPassword() {

    try {

        if (navigator.clipboard && window.isSecureContext) {

            await navigator.clipboard.writeText(WIFI_PASSWORD);

        } else if (!fallbackCopy(WIFI_PASSWORD)) {

            throw new Error("Copy method unavailable");

        }

        showCopied();

    } catch (error) {

        console.error("Copy failed:", error);

    }

}

function showCopied() {

    if (!copyButton || !copyText) {
        return;
    }

    copyText.textContent = "បានចម្លង!";

    copyButton.classList.add("copied");

    setTimeout(function () {

        copyText.textContent = "ចម្លង";

        copyButton.classList.remove("copied");

    }, 2000);

}

if (copyButton) {
    copyButton.addEventListener("click", copyPassword);
}