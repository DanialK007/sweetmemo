export type Theme = "rose" | "lavender" | "gold";
export type TemplateIcon =
  | "heart"
  | "flower"
  | "sparkles"
  | "mail"
  | "star"
  | "ring";

export interface Template {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  theme: Theme;
  icon: TemplateIcon;
  price: number;
}

export const templates: Template[] = [
  {
    slug: "petal-letter",
    title: "Petal Letter",
    subtitle: "A little note, kept close.",
    category: "Love note",
    theme: "rose",
    icon: "flower",
    price: 5000,
  },
  {
    slug: "anniversary-classic",
    title: "Classic Anniversary",
    subtitle: "For all the years ahead.",
    category: "Anniversary",
    theme: "gold",
    icon: "sparkles",
    price: 5000,
  },
  {
    slug: "soft-confetti",
    title: "Soft Confetti",
    subtitle: "Make their day feel extra.",
    category: "Birthday",
    theme: "gold",
    icon: "star",
    price: 5000,
  },
  {
    slug: "dear-you",
    title: "Dear You",
    subtitle: "Say the words that matter.",
    category: "Love note",
    theme: "rose",
    icon: "mail",
    price: 5000,
  },
  {
    slug: "little-forever",
    title: "Little Forever",
    subtitle: "A beautiful yes, remembered.",
    category: "Wedding",
    theme: "gold",
    icon: "ring",
    price: 30000,
  },
  {
    slug: "bloom-together",
    title: "Bloom Together",
    subtitle: "A memory still unfolding.",
    category: "Memory",
    theme: "lavender",
    icon: "flower",
    price: 8000,
  },
  {
    slug: "first-light",
    title: "First Light",
    subtitle: "A little celebration of us.",
    category: "Monthsary",
    theme: "rose",
    icon: "heart",
    price: 5000,
  },
  {
    slug: "say-it-softly",
    title: "Say It Softly",
    subtitle: "For the feeling you have been keeping.",
    category: "Confession",
    theme: "lavender",
    icon: "mail",
    price: 5000,
  },
  {
    slug: "sorry-pon",
    title: "Sorry-Pon",
    subtitle: "A small step back toward each other.",
    category: "Apology",
    theme: "rose",
    icon: "heart",
    price: 8000,
  },
  {
    slug: "sunday-stroll",
    title: "Sunday Stroll",
    subtitle: "A sweet invitation to spend the day together.",
    category: "Date invite",
    theme: "gold",
    icon: "sparkles",
    price: 5000,
  },
  {
    slug: "little-lantern",
    title: "Little Lantern",
    subtitle: "Keep a favorite day glowing.",
    category: "Memory",
    theme: "gold",
    icon: "flower",
    price: 8000,
  },
  {
    slug: "a-year-of-us",
    title: "A Year of Us",
    subtitle: "Twelve months, a thousand little things.",
    category: "Anniversary",
    theme: "lavender",
    icon: "heart",
    price: 5000,
  },
  {
    slug: "genies-wish",
    title: "Genie's Wish",
    subtitle: "A bright wish for their birthday.",
    category: "Birthday",
    theme: "gold",
    icon: "star",
    price: 10000,
  },
  {
    slug: "butterfly",
    title: "Butterfly",
    subtitle: "Celebrate the beginning of forever.",
    category: "Wedding",
    theme: "rose",
    icon: "ring",
    price: 30000,
  },
  {
    slug: "bluebird",
    title: "Bluebird",
    subtitle: "A gentle note when words are hard.",
    category: "Apology",
    theme: "lavender",
    icon: "flower",
    price: 10000,
  },
  {
    slug: "come-with-me",
    title: "Come With Me",
    subtitle: "Ask them out with a little more heart.",
    category: "Date invite",
    theme: "rose",
    icon: "mail",
    price: 5000,
  },
  {
    slug: "favorite-hello",
    title: "Favorite Hello",
    subtitle: "Make another month feel like the first.",
    category: "Monthsary",
    theme: "gold",
    icon: "heart",
    price: 5000,
  },
  {
    slug: "all-my-tomorrows",
    title: "All My Tomorrows",
    subtitle: "A promise made for a lifetime.",
    category: "Wedding",
    theme: "lavender",
    icon: "ring",
    price: 30000,
  },
];

export const categories = [
  "All moments",
  "Anniversary",
  "Birthday",
  "Monthsary",
  "Confession",
  "Apology",
  "Memory",
  "Date invite",
  "Wedding",
  "Love note",
];
