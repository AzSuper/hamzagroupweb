export interface Feature {
  id: number; // Unique identifier
  icon: string; // Icon source (could be a URL or an icon class name)
  count: number; // The count (e.g., +200)
  description: string; // Feature description
  translationKey:string;
}

// Example static data for development/testing purposes
export const featuresData: Feature[] = [
  {
    id: 1,
    icon: "/assets/clients.png", // Replace with the actual icon name or URL
    count: 100,
    description: "Client Depend on our Services",
    translationKey:"landing.stats.clients",
  },
  {
    id: 2,
    icon: "/assets/meterial.png", // Replace with the actual icon name or URL
    count: 80,
    description: "High Quality Material We Import",
    translationKey:"landing.stats.materials",

  },
  {
    id: 3,
    icon: "/assets/factory.png", // Replace with the actual icon name or URL
    count: 20,
    description: "Industry in market lay on our material",
    translationKey:"landing.stats.industries",

  },
  {
    id: 4,
    icon: "/assets/country.png", // Replace with the actual icon name or URL
    count: 4,
    description: "Country we import material from",
    translationKey:"landing.stats.countries",

  },
];
