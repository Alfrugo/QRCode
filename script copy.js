function generateQRCode() {
    var url = document.getElementById("urlInput").value;
    var resolution = document.getElementById("resolutionInput").value || 600; // Use default resolution if not specified
    var logoInput = document.getElementById("logoInput");
    var selectedLogo = document.querySelector('input[name="predefinedLogo"]:checked')?.value;

    var options = {
        text: url,
        width: parseInt(resolution),
        height: parseInt(resolution),
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    };

    // Clear any previously generated QR code
    document.getElementById("qrcode").innerHTML = "";

    if (logoInput.files && logoInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            options.logo = e.target.result;
            setLogoOptions(options, resolution);
            generateAndShowQRCode(options);
        };

        reader.readAsDataURL(logoInput.files[0]);
    } else if (selectedLogo) {
        options.logo = `./logos/${selectedLogo}`; // Adjust the path to your logos folder
        setLogoOptions(options, resolution);
        generateAndShowQRCode(options);
    } else {
        generateAndShowQRCode(options);
    }
}

function setLogoOptions(options, resolution) {
    options.logoWidth = parseInt(resolution) * 0.245;
    options.logoHeight = parseInt(resolution) * 0.245;
    options.logoBackgroundTransparent = false;
}

function generateAndShowQRCode(options) {
    // Generate QR code
    new QRCode(document.getElementById("modalQRCode"), options);
    // Show the modal
    document.getElementById("qrModal").style.display = "block";
}

var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    document.getElementById("qrModal").style.display = "none";
    // Reset input fields
    document.getElementById("urlInput").value = "";
    document.getElementById("resolutionInput").value = "600"; // Reset to default resolution
    document.getElementById("logoInput").value = ""; // Clear the file input
    
    // Clear the QR code by removing all child elements from the QR code container
    var qrcodeContainer = document.getElementById("qrcode");
    while (qrcodeContainer.firstChild) {
        qrcodeContainer.removeChild(qrcodeContainer.firstChild);
    }
    
    // If you're using the modalQRCode container in the modal for showing the QR code, clear it similarly
    var modalQRCodeContainer = document.getElementById("modalQRCode");
    while (modalQRCodeContainer.firstChild) {
        modalQRCodeContainer.removeChild(modalQRCodeContainer.firstChild);
    }
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    var modal = document.getElementById("qrModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
