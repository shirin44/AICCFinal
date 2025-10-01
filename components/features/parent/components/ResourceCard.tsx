import React from "react";

const ResourceCard: React.FC<{
  name: string;
  desc: string;
  url: string;
}> = ({ name, desc, url }) => (
  <div className="p-4 bg-card border border-border rounded-lg hover:shadow-md transition">
    <h3 className="font-semibold text-lg text-primary">{name}</h3>
    <p className="text-sm text-muted-foreground mt-1">{desc}</p>
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-accent hover:underline mt-2 inline-block">
      Visit &rarr;
    </a>
  </div>
);

export default ResourceCard;
