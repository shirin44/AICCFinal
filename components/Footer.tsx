
import React from 'react';
//import logoUrl from "logo.png"; 

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
            <img
              src={`${import.meta.env.BASE_URL}images/logo.png`}           
              alt="AICC Logo"
              className="h-12 md:h-12 w-auto align-middle"
              loading="eager"
              fetchPriority="high"
            />
            
          
                
            </div>
            <p className="text-center text-sm text-muted-foreground max-w-2xl">
                <strong>Accessibility Statement & Disclaimer:</strong> NeuroPilot AICC provides AI-powered guidance and is not a substitute for clinical advice. We are committed to creating an accessible experience for all users.
            </p>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} NeuroPilot. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;