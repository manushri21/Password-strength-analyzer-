const passwordInput = document.getElementById("password");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const lengthCheck = document.getElementById("length");
const lowercaseCheck = document.getElementById("lowercase");
const uppercaseCheck = document.getElementById("uppercase");
const numberCheck = document.getElementById("number");
const specialCheck = document.getElementById("special");

const suggestionList = document.getElementById("suggestionList");

const togglePassword = document.getElementById("togglePassword");


// Analyze password whenever user types
passwordInput.addEventListener("input", analyzePassword);


function analyzePassword() {

    const password = passwordInput.value;

    let score = 0;

    let suggestions = [];


    // Empty password
    if (password.length === 0) {

        resetAnalyzer();

        return;
    }


    // Check password length
    if (password.length >= 8) {

        score++;

        markValid(lengthCheck);

    } else {

        markInvalid(lengthCheck);

        suggestions.push("Use at least 8 characters.");
    }


    // Check lowercase
    if (/[a-z]/.test(password)) {

        score++;

        markValid(lowercaseCheck);

    } else {

        markInvalid(lowercaseCheck);

        suggestions.push("Add lowercase letters.");
    }


    // Check uppercase
    if (/[A-Z]/.test(password)) {

        score++;

        markValid(uppercaseCheck);

    } else {

        markInvalid(uppercaseCheck);

        suggestions.push("Add uppercase letters.");
    }


    // Check number
    if (/[0-9]/.test(password)) {

        score++;

        markValid(numberCheck);

    } else {

        markInvalid(numberCheck);

        suggestions.push("Add numbers.");
    }


    // Check special character
    if (/[^A-Za-z0-9]/.test(password)) {

        score++;

        markValid(specialCheck);

    } else {

        markInvalid(specialCheck);

        suggestions.push("Add special characters such as @, #, $, or !.");
    }


    // Extra score for long passwords
    if (password.length >= 12) {
        score++;
    }


    updateStrength(score);


    // Display suggestions
    showSuggestions(suggestions);
}


function updateStrength(score) {

    if (score <= 2) {

        strengthText.textContent = "Weak";

        strengthBar.style.width = "30%";

    } else if (score <= 4) {

        strengthText.textContent = "Medium";

        strengthBar.style.width = "65%";

    } else {

        strengthText.textContent = "Strong";

        strengthBar.style.width = "100%";
    }
}


function markValid(element) {

    element.textContent = "✓ " + element.textContent.substring(2);

    element.classList.remove("invalid");

    element.classList.add("valid");
}


function markInvalid(element) {

    element.textContent = "✗ " + element.textContent.substring(2);

    element.classList.remove("valid");

    element.classList.add("invalid");
}


function showSuggestions(suggestions) {

    suggestionList.innerHTML = "";

    if (suggestions.length === 0) {

        const li = document.createElement("li");

        li.textContent = "Your password meets the basic requirements.";

        suggestionList.appendChild(li);

        return;
    }


    suggestions.forEach(function(suggestion) {

        const li = document.createElement("li");

        li.textContent = suggestion;

        suggestionList.appendChild(li);

    });
}


function resetAnalyzer() {

    strengthText.textContent = "Enter a password";

    strengthBar.style.width = "0%";

    lengthCheck.textContent = "✗ At least 8 characters";
    lowercaseCheck.textContent = "✗ Contains lowercase letter";
    uppercaseCheck.textContent = "✗ Contains uppercase letter";
    numberCheck.textContent = "✗ Contains a number";
    specialCheck.textContent = "✗ Contains special character";

    suggestionList.innerHTML =
        "<li>Enter a password to receive suggestions.</li>";

    document.querySelectorAll(".requirements p").forEach(function(element) {

        element.classList.remove("valid");

        element.classList.add("invalid");

    });
}


// Show / Hide password

togglePassword.addEventListener("click", function() {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.textContent = "Hide";

    } else {

        passwordInput.type = "password";

        togglePassword.textContent = "Show";
    }

});