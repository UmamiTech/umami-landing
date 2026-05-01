export type DemoItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  emoji: string;
  tag?: string;
  available?: boolean;
};

export type DemoCategory = {
  id: string;
  name: string;
  items: DemoItem[];
};

export const demoMenu: DemoCategory[] = [
  {
    id: "coffee",
    name: "Coffee",
    items: [
      {
        id: "i1",
        name: "Iced Spanish Latte",
        desc: "Double shot, condensed milk, oat or whole",
        price: 180,
        emoji: "☕",
        tag: "Bestseller",
        available: true,
      },
      {
        id: "i2",
        name: "Dirty Matcha",
        desc: "Ceremonial matcha, espresso, milk of choice",
        price: 195,
        emoji: "🍵",
        available: true,
      },
      {
        id: "i3",
        name: "Cold Brew",
        desc: "16-hour steep, smooth and bold",
        price: 160,
        emoji: "🧊",
        available: true,
      },
    ],
  },
  {
    id: "bites",
    name: "Bites",
    items: [
      {
        id: "i4",
        name: "Truffle Mushroom Toast",
        desc: "Sourdough, wild mushrooms, truffle oil",
        price: 280,
        emoji: "🥪",
        available: true,
      },
      {
        id: "i5",
        name: "Smoked Salmon Bagel",
        desc: "Cream cheese, capers, red onion, dill",
        price: 320,
        emoji: "🥯",
        tag: "New",
        available: true,
      },
      {
        id: "i6",
        name: "Pesto Chicken Panini",
        desc: "Grilled chicken, mozzarella, basil pesto",
        price: 290,
        emoji: "🥖",
        available: true,
      },
    ],
  },
  {
    id: "pastries",
    name: "Pastries & Sweets",
    items: [
      {
        id: "i7",
        name: "Butter Croissant",
        desc: "72-hour laminated dough, French butter",
        price: 110,
        emoji: "🥐",
        available: true,
      },
      {
        id: "i8",
        name: "Basque Burnt Cheesecake",
        desc: "Caramelized top, creamy center",
        price: 180,
        emoji: "🍰",
        available: true,
      },
      {
        id: "i9",
        name: "Pistachio Cookie",
        desc: "Chewy, brown butter, sea salt",
        price: 95,
        emoji: "🍪",
        available: true,
      },
    ],
  },
];
