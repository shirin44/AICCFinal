import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../App';
import { NARRATORS, LOCALIZED_CONTENT, STORY_CONTENT } from '@/constants';

interface Breadcrumb {
  path: string;
  label: string;
}

const Breadcrumbs: React.FC = () => {
  const { narratorRole, mode, language } = useContext(AppContext);
  const location = useLocation();

  const generateBreadcrumbs = (): Breadcrumb[] => {
    const homeCrumb = { path: '/', label: LOCALIZED_CONTENT.home[language] };
    const crumbs: Breadcrumb[] = [homeCrumb];

    if (location.pathname === '/about') {
      crumbs.push({ path: '/about', label: LOCALIZED_CONTENT.about[language] });
      return crumbs;
    }

    if (location.pathname === '/contact') {
      crumbs.push({ path: '/contact', label: LOCALIZED_CONTENT.contact[language] });
      return crumbs;
    }

    if (narratorRole) {
      const narratorName = NARRATORS[narratorRole].role;
      crumbs.push({ path: '/mode-selection', label: narratorName });
    }

    if (mode && narratorRole && location.pathname === '/dashboard') {
      const modeLabel = mode === 'practice'
        ? LOCALIZED_CONTENT.practiceMode[language]
        : STORY_CONTENT[narratorRole].title[language];
      crumbs.push({ path: '/dashboard', label: modeLabel });
    }
    
    return crumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on the homepage or if there's only one item
  if (location.pathname === '/' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="bg-card border-b border-border" aria-label="Breadcrumb">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 py-3 text-sm">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <li key={crumb.path + index} className="flex items-center">
                {isLast ? (
                  <span className="font-semibold text-black text-foreground" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link to={crumb.path} className="text-muted-foreground hover:text-primary hover:underline">
                    {crumb.label}
                  </Link>
                )}
                {!isLast && (
                  <svg className="ml-2 h-5 w-5 flex-shrink-0 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;