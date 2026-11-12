"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useLanguage } from "@/components/language-provider";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [feedback, setFeedback] = useState<{ message: string; success: boolean } | null>(null);
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setFeedback(null);
    try {
      const response = await axios.post("/api/contact", data);
      if (response.status === 200 && response.data.success) {
        setFeedback({ message: isEnglish ? "Thanks for reaching out. Your message has been sent." : "Merci pour votre message. Il a bien été envoyé.", success: true });
        reset();
      } else {
        setFeedback({ message: isEnglish ? "Your message could not be sent. Please try again." : "Votre message n’a pas pu être envoyé. Veuillez réessayer.", success: false });
      }
    } catch (error) {
      const apiMessage = axios.isAxiosError(error) ? error.response?.data?.error : undefined;
      setFeedback({ message: apiMessage ?? (isEnglish ? "A sending error occurred. Please try again." : "Une erreur est survenue lors de l’envoi. Veuillez réessayer."), success: false });
    }
  };

  const messages = {
    nameRequired: isEnglish ? "Please enter your name." : "Veuillez saisir votre nom.",
    nameMin: isEnglish ? "Your name must contain at least 3 characters." : "Votre nom doit contenir au moins 3 caractères.",
    emailRequired: isEnglish ? "Please enter your email address." : "Veuillez saisir votre adresse e-mail.",
    emailInvalid: isEnglish ? "Enter a valid email address." : "Saisissez une adresse e-mail valide.",
    subjectRequired: isEnglish ? "Please enter a subject." : "Veuillez saisir un sujet.",
    subjectMin: isEnglish ? "The subject must contain at least 5 characters." : "Le sujet doit contenir au moins 5 caractères.",
    messageRequired: isEnglish ? "Please write a message." : "Veuillez écrire un message.",
    messageMin: isEnglish ? "Your message must contain at least 10 characters." : "Votre message doit contenir au moins 10 caractères.",
  };

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-grid">
        <div className="contact-copy">
          <p className="section-kicker">{isEnglish ? "Get in touch" : "Me contacter"}</p>
          <h2 id="contact-title">{isEnglish ? "Have a project in mind?" : "Un projet en tête ?"}</h2>
          <p>{isEnglish ? "Tell me what you’re working on. I’d be happy to talk." : "Parlez-moi de votre projet. Je serai ravie d’en discuter avec vous."}</p>
          <p>
            {isEnglish ? "Or write to me at " : "Ou écrivez-moi à "}
            <Link href="mailto:anthobelebele@gmail.com" className="text-link">anthobelebele@gmail.com</Link>
          </p>
          <p>
            {isEnglish ? "You can also view my " : "Vous pouvez aussi consulter mon "}
            <a href={isEnglish ? "/CV_Antho_Belebele_EN.pdf" : "/CV_Antho_Belebele_FR.pdf"} download={isEnglish ? "Antoinette_Belebele_CV_EN.pdf" : "Antoinette_Belebele_CV_FR.pdf"} className="text-link">{isEnglish ? "English CV" : "CV français"}</a>.
          </p>
          <div className="contact-socials">
            <a className="social-link" href="https://www.linkedin.com/in/antoinette-belebele-443943260/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn aria-hidden="true" /></a>
            <a className="social-link" href="https://github.com/AntoBbk9" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub aria-hidden="true" /></a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="contact-field">
            <label htmlFor="contact-name">{isEnglish ? "Name" : "Nom"}</label>
            <Controller name="name" control={control} defaultValue="" rules={{ required: messages.nameRequired, minLength: { value: 3, message: messages.nameMin } }} render={({ field }) => <input {...field} id="contact-name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />} />
            {errors.name && <p id="contact-name-error" className="form-error" role="alert">{errors.name.message}</p>}
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email">{isEnglish ? "Email" : "E-mail"}</label>
            <Controller name="email" control={control} defaultValue="" rules={{ required: messages.emailRequired, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: messages.emailInvalid } }} render={({ field }) => <input {...field} id="contact-email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />} />
            {errors.email && <p id="contact-email-error" className="form-error" role="alert">{errors.email.message}</p>}
          </div>
          <div className="contact-field">
            <label htmlFor="contact-subject">{isEnglish ? "Subject" : "Sujet"}</label>
            <Controller name="subject" control={control} defaultValue="" rules={{ required: messages.subjectRequired, minLength: { value: 5, message: messages.subjectMin } }} render={({ field }) => <input {...field} id="contact-subject" aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "contact-subject-error" : undefined} />} />
            {errors.subject && <p id="contact-subject-error" className="form-error" role="alert">{errors.subject.message}</p>}
          </div>
          <div className="contact-field">
            <label htmlFor="contact-message">{isEnglish ? "Message" : "Message"}</label>
            <Controller name="message" control={control} defaultValue="" rules={{ required: messages.messageRequired, minLength: { value: 10, message: messages.messageMin } }} render={({ field }) => <textarea {...field} id="contact-message" rows={5} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />} />
            {errors.message && <p id="contact-message-error" className="form-error" role="alert">{errors.message.message}</p>}
          </div>
          {feedback && <p className="form-status" data-success={feedback.success} role="status">{feedback.message}</p>}
          <button type="submit" className="form-submit" disabled={isSubmitting}>
            {isSubmitting ? (isEnglish ? "Sending…" : "Envoi en cours…") : (isEnglish ? "Send message" : "Envoyer le message")}
          </button>
        </form>
      </div>
      <footer className="contact-footer">
        <span>© {new Date().getFullYear()} Antoinette Belebele</span>
        <span>{isEnglish ? "Made with care" : "Créé avec soin"}</span>
      </footer>
    </section>
  );
}
