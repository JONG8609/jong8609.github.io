document.addEventListener("DOMContentLoaded", () => {
    const footerPlaceholder = document.querySelector("footer");
    if (!footerPlaceholder) {
        console.error("Footer placeholder not found in the DOM.");
        return;
    }

    fetch("footer.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load footer.html: ${response.statusText}`);
            }
            return response.text();
        })
        .then((html) => {
            footerPlaceholder.innerHTML = html;
            console.log("Footer loaded successfully.");
        })
        .catch((error) => {
            console.error("Error loading footer1:", error);
        });
});
