// components/Header.tsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { HEADER_CONTENT } from "@/constants/Header";
import { Language, NarratorRole } from "../types";
import Tooltip from "./Tooltip";

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useContext(AppContext);
  const toggleLanguage = () => {
    setLanguage(language === Language.EN ? Language.VN : Language.EN);
  };
  return (
    <Tooltip
      tip={language === Language.EN ? "Chuyển sang tiếng Việt" : "Switch to English"}
      position="bottom"
    >
      <button
        onClick={toggleLanguage}
        className="
          flex items-center gap-2 px-3 py-2
          border border-border rounded-full
          text-sm font-medium text-muted-foreground
          hover:bg-muted transition-colors
          focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40
        "
        aria-label="Toggle language"
      >
        <span className={language === Language.EN ? "font-bold text-primary" : ""}>EN</span>
        <span>/</span>
        <span className={language === Language.VN ? "font-bold text-primary" : ""}>VN</span>
      </button>
    </Tooltip>
  );
};

const Header: React.FC = () => {
  const { language, setNarratorRole, setMode } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleSelectRole = (role: NarratorRole) => {
    setNarratorRole(role);
    setMode(null);
    setOpen(false);
    navigate("/mode-selection");
  };

  const navLinks = [
    { path: "/", label: HEADER_CONTENT.nav.home[language] },
    { path: "/about", label: HEADER_CONTENT.nav.about[language] },
    { path: "/contact", label: HEADER_CONTENT.nav.contact[language] },
    { path: "/OurStory", label: HEADER_CONTENT.nav.ourStory[language] },
  ];

  const roleNavLinks = [
    { role: NarratorRole.Jobseeker, label: HEADER_CONTENT.roles.jobseeker[language], colorClass: "hover:text-brand-blue-400" },
    { role: NarratorRole.Employer, label: HEADER_CONTENT.roles.employer[language], colorClass: "hover:text-brand-purple-400" },
    { role: NarratorRole.CareGiver, label: HEADER_CONTENT.roles.CareGiver[language], colorClass: "hover:text-brand-red-300" },
    { role: NarratorRole.Volunteer, label: HEADER_CONTENT.roles.volunteer[language], colorClass: "hover:text-brand-green-400" },
  ];

  // Close sheet on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Click outside to close (mobile)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      const target = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(target) && buttonRef.current !== target) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <header className="force-light-theme bg-card/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div
        className="
          container mx-auto
          px-4 sm:px-6 lg:px-8
          pt-[env(safe-area-inset-top)]
        "
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="AICC Logo"
              className="h-12 sm:h-14 w-auto block object-contain"
              width={112}
              height={56}
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors py-2
                  ${
                    location.pathname === link.path
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-6 w-px bg-border" />
            {roleNavLinks.map((link) => (
              <button
                key={link.role}
                onClick={() => handleSelectRole(link.role)}
                aria-label={`Select ${link.label} role`}
                className={`font-medium transition-colors text-muted-foreground ${link.colorClass} py-2
                            focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 rounded`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side: language + hamburger (mobile) */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <LanguageToggle />
            </div>

            {/* Mobile menu button */}
            <button
              ref={buttonRef}
              type="button"
              className="
                md:hidden inline-flex items-center justify-center
                w-11 h-11 rounded-xl
                border border-border bg-card
                focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40
                transition-colors
              "
              aria-label="Open menu"
              aria-controls="mobile-menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className={`
          md:hidden
          ${open ? "pointer-events-auto" : "pointer-events-none"}
        `}
      >
        {/* Backdrop */}
        <div
          className={`
            fixed inset-0 bg-black/30
            transition-opacity duration-200
            ${open ? "opacity-100" : "opacity-0"}
          `}
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <div
          ref={panelRef}
          className={`
            fixed right-0 top-0 h-screen w-[82%] max-w-xs
            bg-card shadow-2xl border-l border-border
            pt-[calc(env(safe-area-inset-top)+0.75rem)]
            pb-[calc(env(safe-area-inset-bottom)+1rem)]
            px-4
            transition-transform duration-200 ease-out
            ${open ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Close button (top-right) */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-sm text-muted-foreground">
              {HEADER_CONTENT.nav.menu?.[language] ?? "Menu"}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  w-full text-left rounded-lg px-3 py-3
                  font-medium transition-colors
                  ${location.pathname === link.path ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"}
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40
                `}
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 h-px bg-border" />

            {roleNavLinks.map((link) => (
              <button
                key={link.role}
                onClick={() => handleSelectRole(link.role)}
                aria-label={`Select ${link.label} role`}
                className={`
                  text-left rounded-lg px-3 py-3
                  font-medium text-muted-foreground ${link.colorClass}
                  hover:bg-muted transition-colors
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40
                `}
              >
                {link.label}
              </button>
            ))}

            <div className="mt-3">
              <LanguageToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
