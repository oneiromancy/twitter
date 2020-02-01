// Client-side validation

(() => {
    window.addEventListener(
        "load",
        () => {
            const authForm = document.querySelector(".needs-validation");

            authForm.addEventListener(
                "submit",
                event => {
                    if (authForm.checkValidity() === false) {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                    authForm.classList.add("was-validated");
                },
                false
            );
        },
        false
    );
})();
