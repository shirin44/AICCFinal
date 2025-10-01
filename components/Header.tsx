// components/Header.tsx
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { HEADER_CONTENT } from "@/constants/Header";
import { Language, NarratorRole } from "../types";
import Tooltip from "./Tooltip";

//import logoUrl from "logo.png"; 
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
        className="flex items-center space-x-2 px-3 py-2 border border-border rounded-full text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
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

  const handleSelectRole = (role: NarratorRole) => {
    setNarratorRole(role);
    setMode(null);
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

  return (
    <header className="force-light-theme bg-card/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}              
              alt="AICC Logo"
              className="h-14 w-auto block object-contain"
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
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
                className={`font-medium transition-colors text-muted-foreground ${link.colorClass}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Language toggle */}
          <div className="flex items-center">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
