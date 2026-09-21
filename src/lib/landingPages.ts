/**
 * Content for every keyword landing page. One page = one search phrase.
 *
 * Rules for editing this file:
 * - Every claim must be true of the live product today. If a feature needs a
 *   paid plan, say which one.
 * - Umami runs ALONGSIDE the restaurant's POS. Never write that it replaces one.
 * - Offline: benefit only ("keeps taking orders when the internet drops"). Never
 *   describe how it works.
 * - A new page here also needs its own `src/app/<slug>/page.tsx` and a line in
 *   `public/sitemap-pages.xml`, or Google will not find it.
 */

export type LandingSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

export type LandingFaq = { q: string; a: string };

export type LandingPageContent = {
  slug: string;
  /** <title>. Lead with the search phrase. */
  title: string;
  /** Meta description, ~150 characters. */
  description: string;
  eyebrow: string;
  h1: string;
  lede: string;
  sections: LandingSection[];
  faqs: LandingFaq[];
  /** Render the live pricing cards on this page. */
  showPricing?: boolean;
};

const RB_AYALA = "https://umami.com.ph/store/romantic-baboy-ayala-malls-the-30th";
const RB_LIGHT = "https://umami.com.ph/store/romantic-baboy-light-mall";

export const PROOF_LINKS = [
  { label: "Romantic Baboy — Ayala Malls The 30th", href: RB_AYALA },
  { label: "Romantic Baboy — Light Mall", href: RB_LIGHT },
];

const COMMON_FAQS: LandingFaq[] = [
  {
    q: "Does Umami replace my POS?",
    a: "No. Umami is a digital ordering system. It takes the orders and sends them to your kitchen, dining and cashier screens. Keep your POS for receipts, BIR and whatever else it already does.",
  },
  {
    q: "Do customers need to download an app?",
    a: "No. They scan the QR code on the table with their phone camera and the menu opens in the browser.",
  },
  {
    q: "How much does it cost?",
    a: "The Starter plan is free for the first 100 restaurants, and ₱99 a month after that. Paid plans add vouchers, takeaway, reservations and multi-branch tools.",
  },
];

export const LANDING_PAGES: Record<string, LandingPageContent> = {
  "what-is-umami": {
    slug: "what-is-umami",
    title: "What is Umami? A digital ordering system for restaurants",
    description:
      "Umami in one page: QR table ordering that sends orders to your kitchen, dining and cashier screens. Works alongside your POS. Free to start.",
    eyebrow: "What is Umami",
    h1: "Umami is a digital ordering system for restaurants.",
    lede: "It is not a POS, and it does not replace yours. Umami takes the orders; your POS keeps doing what it already does.",
    sections: [
      {
        heading: "How it works",
        body: [
          "Customers scan the QR code on their table, see your menu in their language, and order from their own phone. The order goes straight to your kitchen and dining screens. The cashier sees the running bill for every table. You watch sales live from your phone.",
          "Nothing to install and no hardware to buy. It runs in the browser on the phones, tablets and computers you already own.",
        ],
      },
      {
        heading: "What it does",
        bullets: [
          "QR table ordering — no app for the customer to download",
          "Kitchen, dining, cashier and order-taker screens that update in real time",
          "Owner dashboard with live sales",
          "Multi-branch view for chains",
          "AI menu scan: photograph your menu, get a digital one",
          "Menus in 6 languages: English, Chinese, Japanese, Korean, Vietnamese, Thai",
          "Vouchers, discounts and service charges",
          "Pax pricing for unlimited and buffet restaurants",
          "Keeps taking orders when the internet drops (Pro plan)",
        ],
      },
      {
        heading: "What it is not",
        bullets: [
          "Not a POS — keep yours for receipts and BIR",
          "Not a payment terminal",
          "Not a delivery app",
        ],
      },
      {
        heading: "Who uses it",
        body: [
          "Restaurants in Metro Manila, including Romantic Baboy at Ayala Malls The 30th and Light Mall. Built in the Philippines by a restaurant owner.",
        ],
      },
      {
        heading: "Price",
        body: [
          "Free for the first 100 restaurants, then ₱99 a month for the Starter plan. Growth, Pro and Chain plans add more.",
        ],
      },
    ],
    faqs: COMMON_FAQS,
  },

  "qr-ordering": {
    slug: "qr-ordering",
    title: "QR Code Ordering System for Restaurants in PH | Umami",
    description:
      "Let customers scan, browse and order from their own phone. No app, 6 languages, orders straight to the kitchen. Free QR ordering for Philippine restaurants.",
    eyebrow: "QR code ordering",
    h1: "QR code ordering for restaurants in the Philippines.",
    lede: "Customers scan the code on the table and order from their own phone. No app to download, no waiting to flag down a server, no paper menus to reprint.",
    sections: [
      {
        heading: "From scan to kitchen in seconds",
        body: [
          "Every table gets its own QR code. A customer scans it with the phone camera, the menu opens in the browser, and they order. The order appears on your kitchen screen immediately, tagged with the table number, and your dining staff see what is ready to serve.",
          "Customers can keep ordering through the meal, see their running bill, call for service and ask for the bill — all from the same page.",
        ],
      },
      {
        heading: "A menu that is always right",
        body: [
          "Change a price, mark an item sold out or add a special, and customers see it within seconds. No reprinting, no stickers over old prices.",
        ],
        bullets: [
          "Photos, descriptions, allergens and dietary tags",
          "Add-ons and choices (size, doneness, extra toppings)",
          "Menus in English, Chinese, Japanese, Korean, Vietnamese and Thai",
          "AI menu scan: take a photo of your printed menu and get a digital one to review",
        ],
      },
      {
        heading: "Your staff stay in control",
        body: [
          "QR ordering does not remove your team from the floor. Kitchen, dining and cashier each have their own screen, and staff can still take an order at the table for guests who prefer it. You decide which tables, menus and hours are open.",
        ],
      },
      {
        heading: "Works with the POS you already have",
        body: [
          "Umami handles ordering. Keep your POS for receipts, BIR and payments you already process there. There is nothing to rip out and nothing to migrate.",
        ],
      },
    ],
    faqs: [
      ...COMMON_FAQS,
      {
        q: "What if a customer doesn't want to use their phone?",
        a: "Your staff can take the order on a phone or tablet from the order-taker screen, and it goes to the same kitchen queue.",
      },
      {
        q: "How long does setup take?",
        a: "Most restaurants add their menu in an afternoon — faster with AI menu scan. Print the table QR codes and you are live.",
      },
    ],
  },

  "works-with-your-pos": {
    slug: "works-with-your-pos",
    title: "Digital Ordering That Works With Your POS | Umami",
    description:
      "Add QR table ordering without replacing your POS. Umami takes the orders and runs the kitchen screens; your POS keeps receipts and BIR. Free to start.",
    eyebrow: "Keep your POS",
    h1: "Add digital ordering. Keep your POS.",
    lede: "You already paid for a POS, trained your cashiers on it and filed your BIR permits with it. Umami adds ordering on top — it does not ask you to start over.",
    sections: [
      {
        heading: "What Umami handles",
        bullets: [
          "Taking orders — from the customer's phone or from your staff",
          "Sending each order to the kitchen and dining screens",
          "Tracking what is being prepared, ready and served",
          "Showing the running bill per table",
          "Live sales for the owner, per branch",
        ],
      },
      {
        heading: "What your POS keeps doing",
        bullets: [
          "Official receipts and BIR requirements",
          "Card terminals and the payment setup you already have",
          "Anything else it does well today",
        ],
      },
      {
        heading: "Why ordering should be separate",
        body: [
          "Most restaurant POS systems were built around the cashier. Ordering was added later — usually as a tablet at the counter or a handheld for staff. The result is a queue: every order waits for a person to key it in.",
          "Umami moves ordering to where the customer is sitting. Your cashier stops being the bottleneck and your POS goes back to doing its actual job.",
        ],
      },
      {
        heading: "No migration, no hardware",
        body: [
          "There is no data to move and nothing to install. Umami runs in the browser on the phones and tablets you already own. Try it next to your current setup for a week; if it doesn't help, you have lost nothing.",
        ],
      },
    ],
    faqs: [
      ...COMMON_FAQS,
      {
        q: "Does Umami connect to my POS automatically?",
        a: "Not today. Umami and your POS run side by side: Umami runs ordering and the kitchen, and your cashier closes the bill on your POS as usual. Talk to us if you need a specific integration.",
      },
    ],
  },

  pricing: {
    slug: "pricing",
    title: "Pricing — Free QR Ordering for Restaurants | Umami",
    description:
      "Umami pricing: Starter is free for the first 100 restaurants, then ₱99/month. Growth, Pro and Chain plans for busier restaurants and multi-branch groups.",
    eyebrow: "Pricing",
    h1: "Start free. Pay only when you grow.",
    lede: "No hardware to buy, no setup fee and no contract. The Starter plan is free for the first 100 restaurants and stays free for them.",
    sections: [
      {
        heading: "What every plan includes",
        bullets: [
          "Unlimited menu items, tables and QR codes",
          "Unlimited staff accounts with custom roles",
          "Kitchen, dining, cashier and order-taker screens",
          "Owner dashboard with live sales",
          "Menus in 6 languages",
        ],
      },
      {
        heading: "Cancel any time",
        body: [
          "Cancel any time and keep access to the end of the period you paid for. Yearly plans cost 10 months, so you get 2 months free.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the free plan really free?",
        a: "Yes. The first 100 restaurants get Starter at ₱0 and keep that price for as long as they stay. After that, Starter is ₱99 a month.",
      },
      {
        q: "Do I need a credit card to start?",
        a: "No card is needed for the free Starter plan.",
      },
      {
        q: "Does Umami replace my POS?",
        a: "No. Umami handles ordering and runs alongside the POS you already have.",
      },
    ],
    showPricing: true,
  },

  "for-samgyupsal": {
    slug: "for-samgyupsal",
    title: "Ordering System for Unlimited Samgyupsal Restaurants | Umami",
    description:
      "Built for unlimited samgyupsal and Korean BBQ: pax pricing, unlimited refills ordered from the table, grill change and service calls. Used by Romantic Baboy.",
    eyebrow: "Unlimited & samgyupsal",
    h1: "The ordering system built for unlimited samgyupsal.",
    lede: "Unlimited restaurants live on refills. Umami lets every table order the next round of meat from their own phone — and sends it straight to the kitchen.",
    sections: [
      {
        heading: "Made for how unlimited actually works",
        bullets: [
          "Pax pricing: set the price per person and the number of guests; unlimited items cost nothing extra",
          "Unlimited items and paid add-ons on the same menu",
          "Refills ordered from the table, straight to the kitchen screen",
          "Service calls from the phone: change grill, water refill, call a server",
          "Optional limits per order or per table to control waste (Growth plan)",
        ],
      },
      {
        heading: "Less running, more serving",
        body: [
          "In a busy samgyupsal place, servers spend the night walking to tables to take the same refill order again and again. With table ordering, the order is already in the kitchen by the time a server would have reached the table. Your team spends that time grilling, clearing and turning tables.",
        ],
      },
      {
        heading: "Trusted by Romantic Baboy",
        body: [
          "Romantic Baboy runs Umami at Ayala Malls The 30th and Light Mall. Their customers order, call for service and ask for the bill from the table every night.",
        ],
      },
      {
        heading: "Works with your POS",
        body: [
          "Keep your existing POS for receipts and BIR. Umami handles the ordering and the kitchen.",
        ],
      },
    ],
    faqs: [
      ...COMMON_FAQS,
      {
        q: "Can I charge a price per person?",
        a: "Yes. Set a pax price on the menu, and Umami counts the unlimited items at no extra charge while still billing add-ons, drinks and extras.",
      },
    ],
  },

  "multi-branch": {
    slug: "multi-branch",
    title: "Multi-Branch Restaurant Management, PH | Umami",
    description:
      "Run every branch from one screen: live sales per branch, one menu pushed to all stores, chain-wide vouchers and roles. For restaurant groups and franchises.",
    eyebrow: "Chains & franchises",
    h1: "Every branch. One screen. Live.",
    lede: "Stop collecting end-of-day spreadsheets from each store. See every branch's sales as they happen and change the menu everywhere at once.",
    sections: [
      {
        heading: "What a chain operator gets",
        bullets: [
          "Live sales across all branches, and per branch",
          "One master menu, pushed to the branches you choose",
          "Chain-wide vouchers and promotions",
          "Roles for area managers, with access per branch",
          "Add a new branch by copying an existing one",
        ],
      },
      {
        heading: "Each branch still runs its own floor",
        body: [
          "Every branch gets its own QR ordering, kitchen, dining and cashier screens. Branch staff only see their own store; you see all of them.",
        ],
      },
      {
        heading: "Keeps running when the internet doesn't",
        body: [
          "Mall and street branches lose their connection. On the Pro plan and above, each branch keeps taking orders when the internet drops, and catches up when it comes back.",
        ],
      },
      {
        heading: "Works with your POS",
        body: [
          "Umami handles ordering and reporting on top of whatever POS each branch already uses.",
        ],
      },
    ],
    faqs: [
      ...COMMON_FAQS,
      {
        q: "How is a chain priced?",
        a: "The Chain plan is ₱4,999 a month for 3 branches plus ₱1,999 for each additional branch. Talk to us for groups of 10 or more.",
      },
    ],
  },

  "free-trial": {
    slug: "free-trial",
    title: "Free Restaurant Ordering System — Start in Minutes | Umami",
    description:
      "Start Umami free: QR table ordering, kitchen and cashier screens, live sales. Just your email — your login arrives in minutes. No card, no hardware.",
    eyebrow: "Free trial",
    h1: "Try Umami free. Your login arrives in minutes.",
    lede: "Enter your email below and we create your restaurant and email you the login. No card, no hardware, no sales call.",
    sections: [
      {
        heading: "What you can do today",
        bullets: [
          "Add your menu, or photograph it and let AI menu scan build it",
          "Print a QR code for each table",
          "Take real orders on the kitchen, dining and cashier screens",
          "Watch sales live on the owner dashboard",
        ],
      },
      {
        heading: "Or try it as a customer first",
        body: [
          "Scan the demo code below with your phone to order from a real demo restaurant and see what your customers will see.",
        ],
      },
    ],
    faqs: COMMON_FAQS,
  },
  "for-cafes": {
    slug: "for-cafes",
    title: "QR Menu and Table Ordering for Cafés | Umami",
    description:
      "A QR menu for cafés that takes the order too: sizes, milk and add-ons picked on the customer's phone, straight to the barista. Free for Philippine cafés.",
    eyebrow: "For cafés",
    h1: "A QR menu for your café that takes the order too.",
    lede: "Customers scan, pick their drink exactly how they like it, and the order lands on the bar screen. No line at the counter, no shouted orders, no wrong milk.",
    sections: [
      {
        heading: "Built for how café orders really look",
        body: [
          "A café order is rarely just \"one latte\". It is iced or hot, a size, oat or full cream, an extra shot, less sugar. Umami puts every one of those choices on the customer's screen, so the order reaches your barista complete and in writing.",
        ],
        bullets: [
          "Sizes, milk, sweetness and extra shots as simple choices",
          "Required choices pre-selected, so one tap adds the drink",
          "Paid add-ons priced automatically",
          "Photos that sell the pastry case",
          "Notes for anything unusual",
        ],
      },
      {
        heading: "Shorter line, faster tables",
        body: [
          "Guests who can order from their seat don't queue. Your counter staff stop taking orders and start making them, and a second round of coffee is one tap away instead of a trip back to the counter.",
        ],
      },
      {
        heading: "Change the board in seconds",
        body: [
          "Out of croissants? Mark them sold out and customers stop ordering them straight away. New seasonal drink? Add it with a photo in a minute. Your menu stays right without reprinting a single card.",
        ],
      },
      {
        heading: "Ready for tourists and students",
        body: [
          "Menus show in English, Chinese, Japanese, Korean, Vietnamese and Thai. A customer who can't read English still orders exactly what they want.",
        ],
      },
      {
        heading: "Works with your POS",
        body: [
          "Keep your POS for receipts and BIR. Umami handles the ordering and sends it to the bar and kitchen screens.",
        ],
      },
    ],
    faqs: [
      ...COMMON_FAQS,
      {
        q: "Can customers order ahead for pickup?",
        a: "Yes, on the Growth plan: takeaway and pickup ordering gives your café its own online ordering page.",
      },
      {
        q: "Can I run a happy-hour or breakfast-only item?",
        a: "Yes. On the Growth plan you can set the days and hours a product is available, and it appears and disappears from the menu on its own.",
      },
    ],
  },

  "how-to-set-up-a-qr-menu": {
    slug: "how-to-set-up-a-qr-menu",
    title: "How to Set Up a QR Menu for Your Restaurant | Umami",
    description:
      "A step-by-step guide to setting up a QR code menu for a Philippine restaurant or café in one afternoon — menu, table QR codes, staff screens, going live.",
    eyebrow: "Guide",
    h1: "How to set up a QR menu for your restaurant.",
    lede: "You can go from a printed menu to customers ordering from their phones in one afternoon. Here is the whole process, step by step.",
    sections: [
      {
        heading: "Before you start: a QR menu vs. QR ordering",
        body: [
          "A basic QR menu is a PDF behind a code: customers can read it, but they still have to call a server to order, and every price change means a new PDF.",
          "QR ordering goes further. The customer orders from the menu itself and the order goes straight to your kitchen. The menu is live, so changes appear instantly. This guide sets up QR ordering, which also gives you everything a plain QR menu does.",
        ],
      },
      {
        heading: "Step 1 — Create your account",
        body: [
          "Sign up with your email on the free trial page. Your restaurant is created and the login arrives in your inbox within minutes. No card is needed on the free Starter plan.",
        ],
      },
      {
        heading: "Step 2 — Add your menu",
        body: [
          "Type your categories and items in, or save time with AI menu scan: take a clear photo of your printed menu (or upload the PDF) and Umami turns it into a digital menu for you to review. Check every price before you save.",
        ],
        bullets: [
          "Add a photo to your best sellers — pictures sell",
          "Set up choices once (size, doneness, add-ons) and reuse them across items",
          "Tag allergens and dietary options so customers know what is in each dish",
        ],
      },
      {
        heading: "Step 3 — Add your tables and print the QR codes",
        body: [
          "Add each table and Umami creates a unique QR code for it, so every order arrives with the right table number. Print them and put one on every table.",
        ],
        bullets: [
          "Use table tents or stickers at eye level, not flat under the plates",
          "Add a short line such as \"Scan to order — no app needed\"",
          "Laminate or use a stand; sauce and water will find them",
        ],
      },
      {
        heading: "Step 4 — Set up your staff screens",
        body: [
          "Give each station a screen: kitchen, dining (for serving) and cashier. Any phone, tablet or computer with a browser works — use what you already own. Create an account for each staff member so you can see who did what.",
        ],
      },
      {
        heading: "Step 5 — Test it yourself",
        body: [
          "Sit at a table, scan the code with your own phone and place an order. Watch it arrive in the kitchen, mark it ready, serve it, and close the bill. Ten minutes of testing saves you an awkward first night.",
        ],
      },
      {
        heading: "Step 6 — Go live",
        body: [
          "Brief your team: orders will appear on their screens, and they still greet guests and help anyone who prefers to order the usual way. Keep your POS for receipts as you do today — QR ordering sits alongside it.",
        ],
      },
      {
        heading: "Common mistakes to avoid",
        bullets: [
          "Using one QR code for the whole restaurant — you lose the table number",
          "Leaving sold-out items on the menu during a rush",
          "Blurry or missing photos on your top sellers",
          "Hiding the QR code where guests can't see it",
        ],
      },
    ],
    faqs: [
      ...COMMON_FAQS,
      {
        q: "How long does it take to set up a QR menu?",
        a: "Most restaurants finish in one afternoon. The menu takes the longest; AI menu scan cuts that down a lot.",
      },
      {
        q: "Do I need special hardware?",
        a: "No. Customers use their own phones, and your staff screens run in the browser on devices you already have.",
      },
    ],
  },
};

export const LANDING_SLUGS = Object.keys(LANDING_PAGES);
