// src/pages/ContactPage.tsx
import React, { useContext, useState, useEffect } from "react";
import Layout from "../components/Layout";
import { NARRATORS } from "@/constants";
import { CONTACT_PAGE_CONTENT } from "@/constants/Contact";
import { AppContext } from "../App";
import { NarratorRole, Language } from "../types";

// This informs TypeScript that the 'emailjs' object is available globally
// because it's loaded from a script tag in index.html.
declare const emailjs: any;

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;

/* ---------- Language Helper ---------- */
const normalizeLang = (l: unknown): Language =>
  l === Language.VN || l === "vi" || l === "VN" ? Language.VN : Language.EN;

/* ---------- Reusable Card ---------- */
const ContactInfoCard: React.FC<{
  title: string;
  email: string;
  children: React.ReactNode;
}> = ({ title, email, children }) => (
  <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
    <h3 className="font-display text-xl font-semibold text-primary">{title}</h3>
    <p className="mt-2 text-muted-foreground">{children}</p>
    <a
      href={`mailto:${email}`}
      className="mt-4 inline-block font-semibold text-accent hover:underline"
    >
      {email}
    </a>
  </div>
);

const ContactPage: React.FC = () => {
  const { language } = useContext(AppContext);
  const lang = normalizeLang(language);
  const C = CONTACT_PAGE_CONTENT;

  // Use a default narrator for this page
  const narratorData = NARRATORS[NarratorRole.Jobseeker];

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSuccessPopup(false);
      }
    };
    if (showSuccessPopup) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSuccessPopup]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    setError("");

    const serviceID = "service_82b993q";
    const templateID = "template_6hz721d";
    const publicKey = "u2Pl_xJ206WLmldI2";

    emailjs
      .send(
        serviceID,
        templateID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      )
      .then(() => {
        setShowSuccessPopup(true);
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err: any) => {
        setError(C.form.error[lang]);
        console.error("EmailJS Error:", err);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Form */}
        <div className="bg-card p-8 rounded-2xl shadow-lg">
          <h1 className="font-display text-4xl font-extrabold text-foreground">
            {C.title[lang]}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {C.subtitle[lang]}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-muted-foreground"
              >
                {C.form.fullName[lang]}
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                maxLength={MAX_NAME_LENGTH}
                className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-ring"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground"
              >
                {C.form.email[lang]}
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                maxLength={MAX_EMAIL_LENGTH}
                className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-ring"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-muted-foreground"
              >
                {C.form.message[lang]}
              </label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                maxLength={MAX_MESSAGE_LENGTH}
                className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-ring focus:border-ring"
                required
              />
              <div
                className={`text-right text-xs mt-1 ${
                  formData.message.length > MAX_MESSAGE_LENGTH - 100
                    ? "text-danger"
                    : "text-muted-foreground"
                }`}
              >
                {formData.message.length} / {MAX_MESSAGE_LENGTH}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3 px-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-md disabled:bg-muted"
            >
              {isSending ? C.form.sending[lang] : C.form.send[lang]}
            </button>

            {error && (
              <p className="text-sm text-center text-danger">{error}</p>
            )}
          </form>
        </div>

        {/* Right Column: Info & Avatar */}
        <div className="space-y-8">
          <div className="flex items-center space-x-4 p-6 bg-card rounded-2xl shadow-lg">
            <img
              src={narratorData.avatars.neutral}
              alt={narratorData.name[lang]}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <p className="text-lg font-semibold text-foreground">
                {C.narrator.header[lang]}
              </p>
              <p className="italic text-muted-foreground">
                “{C.narrator.quote[lang]}”
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <ContactInfoCard
              title={C.cards.general.title[lang]}
              email="neuropilotaicc@gmail.com"
            >
              {C.cards.general.text[lang]}
            </ContactInfoCard>

            <ContactInfoCard
              title={C.cards.partners.title[lang]}
              email="neuropilotaicc@gmail.com"
            >
              {C.cards.partners.text[lang]}
            </ContactInfoCard>
          </div>
        </div>
      </div>

      {showSuccessPopup && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowSuccessPopup(false)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="success-title"
            aria-describedby="success-desc"
            className="bg-card rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2
              id="success-title"
              className="mt-4 font-display text-2xl font-bold text-foreground"
            >
              {C.success.title[lang]}
            </h2>
            <p id="success-desc" className="mt-2 text-muted-foreground">
              {C.success.desc[lang]}
            </p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="mt-6 w-full py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90"
            >
              {C.success.close[lang]}
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ContactPage;
