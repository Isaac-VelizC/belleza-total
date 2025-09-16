// src/scripts/contactForm.ts
export function initContactForm() {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  const successMessage = document.getElementById("success-message");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitButton.innerHTML;

    submitButton.innerHTML = `
      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Enviando...</span>
    `;
    submitButton.disabled = true;

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (successMessage) {
        successMessage.classList.remove("hidden");
        form.reset();
        setTimeout(() => successMessage.classList.add("hidden"), 5000);
      }
    } catch (error) {
      console.error("Error sending form:", error);
    } finally {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  });

  // Input animations
  const inputs = document.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => input.parentElement?.classList.add("focused"));
    input.addEventListener("blur", () => input.parentElement?.classList.remove("focused"));
  });

  // Phone formatting
  const phoneInput = document.getElementById("telefono") as HTMLInputElement | null;
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let value = (e.target as HTMLInputElement).value.replace(/\D/g, "");
      if (value.length >= 6) value = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      else if (value.length >= 3) value = value.replace(/(\d{3})(\d{0,3})/, "($1) $2");
      (e.target as HTMLInputElement).value = value;
    });
  }
}
