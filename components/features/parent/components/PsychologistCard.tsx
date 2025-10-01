import React from "react";

const PsychologistCard: React.FC<{
  photo?: string;
  name: string;
  title: string;
  org: string;
  location: string;
  bio: string;
  languages?: string[];
  specialties?: string[];
  contact?: { email?: string; phone?: string; website?: string };
  bookingUrl?: string;
  isAvailable?: boolean;
  labels: { contact: string; viewProfile: string; book: string };
}> = ({
  photo,
  name,
  title,
  org,
  location,
  bio,
  languages,
  specialties,
  contact,
  bookingUrl,
  isAvailable = false,
  labels,
}) => {
  const src =
    photo && photo.length > 0
      ? photo
      : "https://via.placeholder.com/120/EEF2F7/111827?text=Photo";

  return (
    <div className="bg-card p-5 rounded-xl shadow-sm border border-border flex gap-4 hover:shadow-md transition">
      <img src={src} alt={`${name} portrait`} className="w-20 h-20 rounded-lg object-cover ring-2 ring-card" loading="lazy" />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-base font-bold text-foreground">{name}</h3>
            <p className="text-xs text-muted-foreground">{title}</p>
            <p className="text-xs text-muted-foreground">{org} • {location}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${isAvailable ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
            {isAvailable ? "Available" : "Waitlist"}
          </span>
        </div>

        <p className="mt-3 text-sm text-foreground/90">{bio}</p>

        <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
          {languages?.length ? <span>🗣 {languages.join(", ")}</span> : null}
          {specialties?.length ? <span>• 🎯 {specialties.join(", ")}</span> : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {contact?.email && (
            <a href={`mailto:${contact.email}`} className="px-3 py-1 rounded-full border border-border bg-background hover:bg-muted transition text-sm">
              {labels.contact}
            </a>
          )}
          {contact?.website && (
            <a href={contact.website} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full border border-border bg-background hover:bg-muted transition text-sm">
              {labels.viewProfile}
            </a>
          )}
          {bookingUrl && (
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition text-sm">
              {labels.book}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PsychologistCard;
