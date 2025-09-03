// 1️⃣ Setup Zoho form on load
document.addEventListener("DOMContentLoaded", function () {
    if (typeof setupSF === "function") {
        setupSF(
            "zohoCantinaSignUpForm", // form ID
            "ZCFORMVIEW",             // Zoho tracking
            false,                    // custom theme
            "dark",                   // color scheme
            false,                    // unknown optional
            "1"                        // unknown optional
        );
    }
});

// 2️⃣ Pre-submit hook for custom code
function runOnFormSubmit_zohoCantinaSignUpForm(th) {
    console.log("Zoho form is about to submit", th);

    // Example: Custom validation or analytics
    // if (!someCheck) return false; // stops submission
}

// 3️⃣ Optional: handle success message
document.getElementById("zcWebOptin")?.addEventListener("click", function () {
    // Trigger Zoho submission
    const form = document.getElementById("zcampaignOptinForm");
    if (form) form.submit();
});
