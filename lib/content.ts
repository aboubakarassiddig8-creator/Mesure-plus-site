// All page copy lives here, in section order. Texts are taken word for word
// from the previous site's FR/EN dictionaries (app.js); only the structure
// changed. The fake testimonials were removed on purpose.

export type Lang = "fr" | "en";

/** Bump the file name here when a new APK ships (versioned name = no stale cache). */
export const APK_URL = "/telechargements/mesure-plus-1.1.2-arm64.apk";
export const WEB_APP_URL = "https://app.mesureplus.com";
export const WHATSAPP_URL = "https://wa.me/237699386130";
export const SITE_URL = "https://mesureplus.com";

/** Real app screens, rendered from the Flutter widgets (390 × 844 logical px). */
export const SCREENS = {
  order: { w: 720, h: 1558 },
  clients: { w: 720, h: 1343 },
  invoice: { w: 720, h: 1034 },
  orders: { w: 720, h: 751 },
} as const;
export type Screen = keyof typeof SCREENS;
export const screenSrc = (screen: Screen, lang: Lang) => `/captures/${screen}-${lang}.webp`;

const fr = {
  nav: {
    features: "Fonctionnalités",
    pricing: "Tarif",
    contact: "Contact",
    download: "Télécharger",
    langLabel: "Langue / Language",
    themeToDark: "Passer en mode sombre",
    themeToLight: "Passer en mode clair",
  },
  hero: {
    eyebrow: "Pour les couturiers d’Afrique francophone",
    title: { before: "Ne perds plus jamais les", em: "mesures", after: "de tes clients" },
    sub: "L'appli qui remplace ton cahier de couture. Clients, mesures, commandes et reste à payer — tout est rangé, sur ton téléphone comme sur ordinateur.",
    ctaFree: "Télécharger gratuitement",
    reassure: ["Gratuit jusqu’à 2 clients", "Hors-ligne sur Android", "Sans carte bancaire"],
    phoneAlt: "Aperçu de l'application : fiche client avec ses mesures et le reste à payer",
    resteLabel: "Reste",
    resteVal: "5 000 F",
    resteTag: "Le reste à payer calculé tout seul",
    offlineTitle: "Mode hors-ligne",
    offlineDesc: "Tu continues à travailler sans réseau.",
    offlineStatus: "Synchro en attente",
    measures: ["96 cm", "78 cm", "102 cm", "140 cm"],
  },
  problem: {
    title: "Le cahier, c’est fini",
    sub: "Trois galères que tout couturier connaît — et qui coûtent cher.",
    items: [
      { t: "Cahier perdu ou abîmé", d: "Un cahier qui disparaît, prend l’eau ou se déchire — et toutes tes mesures avec." },
      { t: "Mesures introuvables", d: "Impossible de remettre la main sur la bonne page au moment de couper le tissu." },
      { t: "Erreurs sur les avances", d: "Un mauvais calcul du reste à payer, et c’est ta marge qui part." },
    ],
  },
  benefits: {
    title: "Tout est rangé, tout est simple",
    sub: "De la fiche client à la facture, Mesure Plus gère tout ton atelier.",
    items: [
      { t: "Tes mesures en sécurité", d: "Plus jamais de cahier perdu. Chaque client et ses mesures sont enregistrés en lieu sûr." },
      { t: "Le reste à payer calculé tout seul", d: "L’appli calcule les avances et le reste dû. Zéro erreur, zéro dispute." },
      { t: "Marche sans internet", d: "Travaille hors-ligne. Tout se synchronise automatiquement au retour du réseau." },
      { t: "Facture pro sur WhatsApp", d: "Envoie une facture propre à ton client en un clic, directement sur WhatsApp." },
    ],
    phoneTitle: "Tout dans ta poche",
    phoneSub: "Client, mesures et paiement",
    phoneAlt: "Liste des clients dans Mesure Plus, avec le reste à payer de chacun",
  },
  steps: {
    eyebrow: "Comment ça marche",
    title: "Trois étapes, et c’est réglé",
    sub: "De l’enregistrement du client à la facture envoyée, tout se fait en quelques secondes.",
    items: [
      { t: "Enregistre le client", d: "Ajoute ton client et prends ses mesures directement dans l’appli." },
      { t: "Crée la commande", d: "L’appli calcule l’avance et le reste à payer automatiquement." },
      { t: "Envoie la facture", d: "Partage une facture propre sur WhatsApp en un seul clic." },
    ],
    phoneAlt: "Facture Mesure Plus prête à être envoyée à une cliente sur WhatsApp",
  },
  why: {
    eyebrow: "Pourquoi Mesure Plus",
    title: "Pensée pour les ateliers d’Afrique francophone",
    desc: "Une appli légère qui tourne sur les téléphones Android d’entrée de gamme, marche sans réseau et parle le langage des couturiers. Tu gagnes du temps et tu ne perds plus jamais un client.",
    stats: ["Marche sans internet", "Léger sur Android", "Paiement Mobile Money / Orange Money"],
    trust: "Tes données et celles de tes clients sont protégées.",
    photoAlt: "Atelier de couture",
    ordersAlt: "Liste des commandes dans Mesure Plus",
  },
  pricing: {
    title: "Un tarif simple",
    sub: "Commence gratuitement. Passe en illimité quand ton atelier grandit.",
    free: {
      name: "Gratuit",
      price: "0 F",
      period: "pour toujours",
      features: ["2 clients", "Toutes les fonctions", "Hors-ligne sur Android", "Facture WhatsApp"],
      cta: "Télécharger",
    },
    unlimited: {
      name: "Illimité",
      price: "1 000 F",
      period: "/mois",
      alt: "ou 10 000 F/an",
      badge: "2 mois offerts",
      features: ["Clients illimités", "Toutes les fonctions", "Paiement Mobile Money / Orange Money", "Support prioritaire"],
      cta: "Télécharger",
    },
    planWeb: "ou utiliser sur ordinateur / iPhone",
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      { q: "Ça marche sans internet ?", a: "Oui, avec l’appli Android : tu enregistres clients, mesures et commandes hors-ligne, et tout se synchronise dès que le réseau revient. Sur ordinateur et sur iPhone, Mesure Plus s’utilise dans le navigateur : il faut alors une connexion Internet." },
      { q: "Comment je paie l’abonnement ?", a: "Par Mobile Money ou Orange Money, directement depuis l’appli ou depuis le navigateur. 1 000 F par mois ou 10 000 F par an." },
      { q: "Ça marche sur mon téléphone ?", a: "Oui. Sur Android, installe l’appli : elle tourne même sur les modèles d’entrée de gamme. Sur iPhone, ouvre app.mesureplus.com dans Safari, sans rien installer." },
      { q: "Mes données sont-elles en sécurité ?", a: "Tes données et celles de tes clients sont sauvegardées et protégées. Toi seul y as accès." },
      { q: "Comment installer le fichier téléchargé ?", a: "Ouvre le fichier une fois le téléchargement terminé. Android va demander l’autorisation d’installer depuis cette source : accepte, puis appuie sur « Installer ». L’avertissement affiché est normal — il apparaît pour toute application qui ne vient pas du Play Store." },
      { q: "Je peux l’utiliser sur ordinateur ?", a: "Oui. Ouvre app.mesureplus.com dans Chrome, Firefox ou Safari et connecte-toi avec ton compte habituel : tu retrouves les clients, mesures et commandes de ton téléphone. Sur un ordinateur de cybercafé, coche « Ordinateur partagé », utilise une fenêtre de navigation privée et déconnecte-toi en partant." },
    ],
  },
  final: {
    title: "Prêt à ranger ton cahier ?",
  },
  platforms: {
    downloadFor: "Télécharger pour",
    useOn: "Utiliser sur",
    computer: "Ordinateur",
    apkMeta: "Android : fichier APK de 23 Mo, Android 6 ou plus récent",
    webMeta: "iPhone et ordinateur : dans le navigateur, sans rien installer",
  },
  footer: {
    tagline: "Fait pour les couturiers d’Afrique francophone.",
    colTitle: "Navigation",
    links: ["Fonctionnalités", "Tarif", "Contact WhatsApp", "Confidentialité"],
    legal: "© 2026 Mesure Plus",
  },
  mobile: { cta: "Télécharger gratuitement", web: "Utiliser Mesure Plus" },
};

export type Content = typeof fr;

const en: Content = {
  nav: {
    features: "Features",
    pricing: "Pricing",
    contact: "Contact",
    download: "Download",
    langLabel: "Langue / Language",
    themeToDark: "Switch to dark mode",
    themeToLight: "Switch to light mode",
  },
  hero: {
    eyebrow: "For tailors across French-speaking Africa",
    title: { before: "Never lose your clients'", em: "measurements", after: "again" },
    sub: "The app that replaces your tailoring notebook. Clients, measurements, orders and balance due — all organized, on your phone and on your computer.",
    ctaFree: "Download for free",
    reassure: ["Free up to 2 clients", "Offline on Android", "No credit card"],
    phoneAlt: "App preview: client file with measurements and balance due",
    resteLabel: "Balance",
    resteVal: "5,000 F",
    resteTag: "Balance due, auto-calculated",
    offlineTitle: "Offline mode",
    offlineDesc: "Keep working with no network.",
    offlineStatus: "Sync pending",
    measures: ["96 cm", "78 cm", "102 cm", "140 cm"],
  },
  problem: {
    title: "No more notebook",
    sub: "Three headaches every tailor knows — and they cost money.",
    items: [
      { t: "Lost or damaged notebook", d: "A notebook that disappears, gets wet or tears — and all your measurements with it." },
      { t: "Measurements you can't find", d: "Impossible to find the right page just when you need to cut the fabric." },
      { t: "Errors on deposits", d: "One wrong balance calculation and your margin is gone." },
    ],
  },
  benefits: {
    title: "Everything organized, everything simple",
    sub: "From client file to invoice, Mesure Plus runs your whole workshop.",
    items: [
      { t: "Your measurements, safe", d: "No more lost notebook. Every client and their measurements are stored safely." },
      { t: "Balance due, auto-calculated", d: "The app calculates deposits and balance due. Zero errors, zero disputes." },
      { t: "Works without internet", d: "Work offline. Everything syncs automatically when the network returns." },
      { t: "Pro invoice on WhatsApp", d: "Send a clean invoice to your client in one click, straight to WhatsApp." },
    ],
    phoneTitle: "All in your pocket",
    phoneSub: "Client, measurements & payment",
    phoneAlt: "Client list in Mesure Plus, with each client's balance due",
  },
  steps: {
    eyebrow: "How it works",
    title: "Three steps, and it’s done",
    sub: "From saving the client to sending the invoice, it all takes seconds.",
    items: [
      { t: "Save the client", d: "Add your client and record their measurements right in the app." },
      { t: "Create the order", d: "The app calculates the deposit and balance due automatically." },
      { t: "Send the invoice", d: "Share a clean invoice on WhatsApp in a single click." },
    ],
    phoneAlt: "Mesure Plus invoice ready to send to a client on WhatsApp",
  },
  why: {
    eyebrow: "Why Mesure Plus",
    title: "Built for workshops across French-speaking Africa",
    desc: "A lightweight app that runs on entry-level Android phones, works with no network, and speaks tailors’ language. You save time and never lose a client again.",
    stats: ["Works without internet", "Light on Android", "Mobile Money / Orange Money payment"],
    trust: "Your data and your clients' data are protected.",
    photoAlt: "Tailoring workshop",
    ordersAlt: "Order list in Mesure Plus",
  },
  pricing: {
    title: "Simple pricing",
    sub: "Start free. Go unlimited when your workshop grows.",
    free: {
      name: "Free",
      price: "0 F",
      period: "forever",
      features: ["2 clients", "All features", "Offline on Android", "WhatsApp invoice"],
      cta: "Download",
    },
    unlimited: {
      name: "Unlimited",
      price: "1,000 F",
      period: "/month",
      alt: "or 10,000 F/year",
      badge: "2 months free",
      features: ["Unlimited clients", "All features", "Mobile Money / Orange Money payment", "Priority support"],
      cta: "Download",
    },
    planWeb: "or use on computer / iPhone",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      { q: "Does it work without internet?", a: "Yes, with the Android app: you save clients, measurements and orders offline, and everything syncs as soon as the network returns. On a computer or an iPhone, Mesure Plus runs in the browser, so an internet connection is required." },
      { q: "How do I pay for the subscription?", a: "By Mobile Money or Orange Money, directly from the app or from your browser. 1,000 F per month or 10,000 F per year." },
      { q: "Does it work on my phone?", a: "Yes. On Android, install the app: it runs even on entry-level models. On iPhone, open app.mesureplus.com in Safari, nothing to install." },
      { q: "Is my data safe?", a: "Your data and your clients' data are backed up and protected. Only you have access." },
      { q: "How do I install the downloaded file?", a: "Open the file once the download finishes. Android will ask permission to install from this source: accept, then tap “Install”. The warning shown is normal — it appears for any app that does not come from the Play Store." },
      { q: "Can I use it on a computer?", a: "Yes. Open app.mesureplus.com in Chrome, Firefox or Safari and sign in with your usual account: you get the same clients, measurements and orders as on your phone. On a cybercafé computer, tick “Shared computer”, use a private browsing window and sign out when you leave." },
    ],
  },
  final: {
    title: "Ready to put away your notebook?",
  },
  platforms: {
    downloadFor: "Download for",
    useOn: "Use on",
    computer: "Computer",
    apkMeta: "Android: 23 MB APK file, Android 6 or newer",
    webMeta: "iPhone and computer: in your browser, nothing to install",
  },
  footer: {
    tagline: "Made for tailors across French-speaking Africa.",
    colTitle: "Navigation",
    links: ["Features", "Pricing", "WhatsApp Contact", "Privacy"],
    legal: "© 2026 Mesure Plus",
  },
  mobile: { cta: "Download for free", web: "Use Mesure Plus" },
};

export const content: Record<Lang, Content> = { fr, en };

/** Footer link targets: labels change with the language, destinations do not. */
export const FOOTER_HREFS = ["#features", "#pricing", WHATSAPP_URL, "#"];
