export const countries = [
  "India",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Canada",
  "Australia",
  "Singapore",
  "Germany",
  "France",
  "Netherlands",
  "Ireland",
  "New Zealand",
  "Japan",
  "South Korea",
  "China",
  "Hong Kong",
  "Malaysia",
  "Indonesia",
  "Thailand",
  "Philippines",
  "Saudi Arabia",
  "Qatar",
  "Oman",
  "South Africa",
  "Nigeria",
  "Kenya",
  "Brazil",
  "Mexico",
  "Sweden",
  "Switzerland",
  "Rest of World",
] as const;

export type Country = (typeof countries)[number];

export function isCountry(value: string): value is Country {
  return (countries as readonly string[]).includes(value);
}
