import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const targetUrl = location.state?.from || "/";

  async function handleSubmit(ev) {
    ev.preventDefault();
    setError(null);
    setEmailError(null);

    const formData = new FormData(ev.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!ev.target.elements.email.checkValidity()) {
      setEmailError("Debe ingresar un correo válido");
      ev.target.elements.email.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      await login({ email, password });
      // replace to true so replace login from user history
      navigate(targetUrl, { replace: true });
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { error, emailError, isSubmitting, handleSubmit };
}

export default useLogin;
