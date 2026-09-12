// ----------------------------------------------------------------------------
// Validators

function isValidEmailAddress(email) {
  if (typeof email !== "string" || email.length >= 255) {
    return false;
  }
  // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
  const simple_validation_pattern = /.+@.+\..+/;
  return simple_validation_pattern.test(email);
}

function isPasswordCompliant(password) {
  const min_pwd_size = 4;
  return typeof password === "string" && password.length >= min_pwd_size;
}

// ----------------------------------------------------------------------------
// UI

function updateValidationElementFeedback(element, isValid) {
  if (isValid) {
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
  }
}

function setInvalidCredentialsElementFeedback() {
  updateValidationElementFeedback(emailUserInput, false);
  updateValidationElementFeedback(passwordUserInput, false);
}

// ----------------------------------------------------------------------------
// Handlers

function emailValidationHandler() {
  const isValid = isValidEmailAddress(emailUserInput.value);
  updateValidationElementFeedback(emailUserInput, isValid);
  return isValid;
}

function passwordValidationHandler() {
  const isValid = isPasswordCompliant(passwordUserInput.value);
  updateValidationElementFeedback(passwordUserInput, isValid);
  return isValid;
}

function getTargetUrl() {
  const currentUrl = new URLSearchParams(window.location.search);
  const redirectTarget = currentUrl.get("redirect");

  if (redirectTarget) {
    return redirectTarget;
  }

  if (document.referrer) {
    newUrl = new URL(document.referrer);
    if (document.referrer && newUrl.origin === window.location.origin) {
      return document.referrer;
    }
  }

  return "../index.html";
}

// ----------------------------------------------------------------------------
// Listeners

// UI Elements
const loginForm = document.getElementById("id-login-form");
const emailUserInput = document.getElementById("id-login-email");
const passwordUserInput = document.getElementById("id-login-password");

emailUserInput.addEventListener("blur", emailValidationHandler);
passwordUserInput.addEventListener("blur", passwordValidationHandler);

loginForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const validEmail = emailValidationHandler();
  const validPassword = passwordValidationHandler();

  if (validEmail && validPassword) {
    console.log("Autenticando...");
    const res = fakeAuthCall(emailUserInput.value, passwordUserInput.value);

    if (res) {
      window.location.href = getTargetUrl();
    } else {
      setInvalidCredentialsElementFeedback();
    }
  }
});

function fakeAuthCall(email, password) {
  const validEmail = email.endsWith("@duocuc.cl") || email.endsWith("@duoc.cl");
  if (validEmail && password === "test") {
    return true;
  }
  return false;
}
