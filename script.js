const WIFI_NETWORKS = [
    {
        title: "Wi-Fi ជាន់ទី ៧",
        name: "3NGO-Building_F7",
        password: "01062026",
        qrImage: "Images/WiFi-QR.png"
    },
    {
        title: "Wi-Fi ជាន់ទី ៩",
        name: "A.M.T.OFFICE",
        password: "AMT@2026",
        qrImage: "Images/AMT_OFFICE.png"
    }
];

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

}

function buildQrHtml(wifi) {

    const name = escapeHTML(wifi.name);

    if (wifi.qrImage) {

        return (
            '<div class="qr-card">' +
            '<img src="' + escapeHTML(wifi.qrImage) + '" alt="Wi-Fi QR Code ' + name + '" class="qr-image">' +
            '</div>'
        );

    }

    return (
        '<div class="qr-placeholder">' +
        '<span class="qr-placeholder-icon" aria-hidden="true">\u2706</span>' +
        '<p class="qr-placeholder-text">ដាក់ QR Code របស់អ្នកនៅទីនេះ</p>' +
        '</div>'
    );

}

function buildWifiCard(wifi) {

    const title = escapeHTML(wifi.title);
    const name = escapeHTML(wifi.name);
    const password = escapeHTML(wifi.password);

    return (
        '<article class="wifi-network-card">' +

        '<div class="qr-section">' +

        buildQrHtml(wifi) +

        '<p class="qr-instruction">' +
        'បើក Camera រួចស្កេន QR Code' +
        '<br>' +
        'ដើម្បីភ្ជាប់ Wi-Fi' +
        '</p>' +

        '</div>' +

        '<div class="wifi-info-card">' +

        '<h2 class="wifi-network-title">' + title + '</h2>' +

        '<div class="wifi-info">' +

        '<div>' +
        '<span class="info-label">ឈ្មោះ Wi-Fi</span>' +
        '<strong class="wifi-value">' + name + '</strong>' +
        '</div>' +

        '</div>' +

        '<div class="divider"></div>' +

        '<div class="wifi-info">' +

        '<div>' +
        '<span class="info-label">ពាក្យសម្ងាត់</span>' +
        '<strong class="wifi-value password">' + password + '</strong>' +
        '</div>' +

        '<button type="button" class="copy-button" data-password="' + password + '">' +
        '<span class="copy-text">ចម្លង</span>' +
        '</button>' +

        '</div>' +

        '</div>' +

        '</article>'
    );

}

const wifiList = document.getElementById("wifi-list");

if (wifiList) {
    wifiList.innerHTML = WIFI_NETWORKS.map(buildWifiCard).join("");
}

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

async function copyPassword(event) {

    const button = event.target.closest(".copy-button");

    if (!button) {
        return;
    }

    const password = button.getAttribute("data-password");

    const copyText = button.querySelector(".copy-text");

    if (!password) {
        return;
    }

    try {

        if (navigator.clipboard && window.isSecureContext) {

            await navigator.clipboard.writeText(password);

        } else if (!fallbackCopy(password)) {

            throw new Error("Copy method unavailable");

        }

        showCopied(button, copyText);

    } catch (error) {

        console.error("Copy failed:", error);

    }

}

function showCopied(button, copyText) {

    if (!button || !copyText) {
        return;
    }

    copyText.textContent = "បានចម្លង!";

    button.classList.add("copied");

    setTimeout(function () {

        copyText.textContent = "ចម្លង";

        button.classList.remove("copied");

    }, 2000);

}

const wifiListContainer = document.getElementById("wifi-list");

if (wifiListContainer) {
    wifiListContainer.addEventListener("click", copyPassword);
}