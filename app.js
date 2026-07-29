/* ==========================================================================
   Mesure Plus — page de présentation (landing)

   Reprend la logique de la maquette « Mesure Plus.dc.html » (classe DCLogic) :
     - state.lang    → bascule FR / EN
     - state.openFaq → un seul panneau de FAQ ouvert à la fois

   Les dictionnaires FR et EN sont recopiés mot pour mot depuis la maquette.
   Ce sont eux la source de vérité : le texte présent dans index.html n'est
   qu'un rendu initial (utile sans JavaScript et pour le référencement), et il
   est réécrit depuis ces dictionnaires dès le chargement. Un texte du HTML qui
   divergerait serait donc automatiquement corrigé, jamais affiché.
   ========================================================================== */

(function () {
  'use strict';

  /* --- Dictionnaires ----------------------------------------------------- */

  var FR = {
    navFeatures:'Fonctionnalités', navPricing:'Tarif', navContact:'Contact', navDownload:'Télécharger',
    eyebrow:'Pour les couturiers d’Afrique francophone',
    heroTitle:'Ne perds plus jamais les mesures de tes clients',
    heroSub:"L'appli qui remplace ton cahier de couture. Clients, mesures, commandes et reste à payer — tout est rangé, même sans connexion internet.",
    ctaFree:'Télécharger gratuitement', ctaScreens:'Voir l’appli', playPre:'BIENTÔT SUR',
    apkMeta:'Fichier APK · 37 Mo · Android 6 ou plus récent',
    reassure:'Gratuit jusqu’à 2 clients • Fonctionne hors-ligne • Sans carte bancaire',
    floatOrdersLabel:'Commande créée', floatOrderItem:'Chemise sur-mesure', floatPaidLabel:'Payé',
    floatOfflineTitle:'Mode hors-ligne', floatOfflineDesc:'Tu continues à travailler sans réseau.', floatOfflineStatus:'Synchro en attente',
    phTitle:'Fiche client', phName:'Amina N.', phOrder:'Robe wax — Col Claudine', phMeasures:'Mesures',
    phRows:[{l:'Tour de poitrine',v:'96 cm'},{l:'Tour de taille',v:'78 cm'},{l:'Tour de hanches',v:'102 cm'},{l:'Longueur robe',v:'140 cm'}],
    phPaidLabel:'Avance', phPaidVal:'10 000 F', phResteLabel:'Reste', phResteVal:'5 000 F',
    probTitle:'Le cahier, c’est fini', probSub:'Trois galères que tout couturier connaît — et qui coûtent cher.',
    prob1t:'Cahier perdu ou abîmé', prob1d:'Un cahier qui disparaît, prend l’eau ou se déchire — et toutes tes mesures avec.',
    prob2t:'Mesures introuvables', prob2d:'Impossible de remettre la main sur la bonne page au moment de couper le tissu.',
    prob3t:'Erreurs sur les avances', prob3d:'Un mauvais calcul du reste à payer, et c’est ta marge qui part.',
    benTitle:'Tout est rangé, tout est simple', benSub:'De la fiche client à la facture, Mesure Plus gère tout ton atelier.',
    ben1t:'Tes mesures en sécurité', ben1d:'Plus jamais de cahier perdu. Chaque client et ses mesures sont enregistrés en lieu sûr.',
    ben2t:'Le reste à payer calculé tout seul', ben2d:'L’appli calcule les avances et le reste dû. Zéro erreur, zéro dispute.',
    ben3t:'Marche sans internet', ben3d:'Travaille hors-ligne. Tout se synchronise automatiquement au retour du réseau.',
    ben4t:'Facture pro sur WhatsApp', ben4d:'Envoie une facture propre à ton client en un clic, directement sur WhatsApp.',
    bentoPhoneTitle:'Tout dans ta poche', bentoPhoneSub:'Client, mesures et paiement', bentoCard:'Fiche client', bentoR1:'Poitrine', bentoR2:'Taille',
    stepsEyebrow:'Comment ça marche', stepsTitle:'Trois étapes, et c’est réglé', stepsSub:'De l’enregistrement du client à la facture envoyée, tout se fait en quelques secondes.',
    step1t:'Enregistre le client', step1:'Ajoute ton client et prends ses mesures directement dans l’appli.',
    step2t:'Crée la commande', step2:'L’appli calcule l’avance et le reste à payer automatiquement.',
    step3t:'Envoie la facture', step3:'Partage une facture propre sur WhatsApp en un seul clic.',
    waInvoice:'Facture — Mesure Plus', waItem:'Robe wax',
    whyEyebrow:'Pourquoi Mesure Plus', whyTitle:'Pensée pour les ateliers d’Afrique francophone',
    whyDesc:'Une appli légère qui tourne sur les téléphones Android d’entrée de gamme, marche sans réseau et parle le langage des couturiers. Tu gagnes du temps et tu ne perds plus jamais un client.',
    whyStats:['Marche sans internet','Léger sur Android','Paiement Mobile Money / Orange Money'],
    socialTitle:'Ils ont rangé leur cahier',
    testimonials:[
      {name:'Amina',city:'Douala, Cameroun',initial:'A',quote:'Avant je cherchais mes mesures partout. Maintenant tout est dans mon téléphone, même quand le réseau coupe.'},
      {name:'Ismaël',city:'Abidjan, Côte d’Ivoire',initial:'I',quote:'Le calcul du reste à payer m’a sauvé. Mes clients voient exactement ce qu’ils doivent — et je gagne un temps fou.'},
      {name:'Chantal',city:'Dakar, Sénégal',initial:'C',quote:'J’envoie la facture sur WhatsApp et le client paie par Mobile Money. Je ne perds plus un seul client.'}
    ],
    trust:'Tes données et celles de tes clients sont protégées.',
    priceTitle:'Un tarif simple', priceSub:'Commence gratuitement. Passe en illimité quand ton atelier grandit.',
    freeName:'Gratuit', freePrice:'0 F', freePeriod:'pour toujours',
    freeFeatures:['2 clients','Toutes les fonctions','Fonctionne hors-ligne','Facture WhatsApp'], freeCta:'Télécharger',
    unlName:'Illimité', unlPrice:'500 F', unlPeriod:'/mois', unlAlt:'ou 5 000 F/an', unlBadge:'2 mois offerts',
    unlFeatures:['Clients illimités','Toutes les fonctions','Paiement Mobile Money / Orange Money','Support prioritaire'], unlCta:'Télécharger',
    faqTitle:'Questions fréquentes',
    faq1q:'Ça marche sans internet ?', faq1a:'Oui. Tu enregistres clients, mesures et commandes hors-ligne. Dès que le réseau revient, tout se synchronise automatiquement.',
    faq2q:'Comment je paie l’abonnement ?', faq2a:'Par Mobile Money ou Orange Money, directement depuis l’appli. 500 F par mois ou 5 000 F par an.',
    faq3q:'Ça marche sur mon téléphone ?', faq3a:'Oui. Mesure Plus est conçue pour les téléphones Android, même les modèles d’entrée de gamme.',
    faq4q:'Mes données sont-elles en sécurité ?', faq4a:'Tes données et celles de tes clients sont sauvegardées et protégées. Toi seul y as accès.',
    faq5q:'Comment installer le fichier téléchargé ?', faq5a:'Ouvre le fichier une fois le téléchargement terminé. Android va demander l’autorisation d’installer depuis cette source : accepte, puis appuie sur « Installer ». L’avertissement affiché est normal — il apparaît pour toute application qui ne vient pas du Play Store.',
    finalTitle:'Prêt à ranger ton cahier ?', finalCta:'Télécharger gratuitement',
    footColProduct:'Navigation', footLinks:['Fonctionnalités','Tarif','Contact WhatsApp','Confidentialité'],
    footTagline:'Fait pour les couturiers d’Afrique francophone.',

    // Ajouts hors maquette : la maquette laissait un emplacement photo dont le
    // texte d'attente n'existait qu'en français (attribut `placeholder`).
    photoPlaceholder:'Photo d’atelier de couture (pagne / wax)',
    photoAlt:'Atelier de couture'
  };

  var EN = {
    navFeatures:'Features', navPricing:'Pricing', navContact:'Contact', navDownload:'Download',
    eyebrow:'For tailors across French-speaking Africa',
    heroTitle:"Never lose your clients' measurements again",
    heroSub:'The app that replaces your tailoring notebook. Clients, measurements, orders and balance due — all organized, even without an internet connection.',
    ctaFree:'Download for free', ctaScreens:'See the app', playPre:'COMING SOON ON',
    apkMeta:'APK file · 37 MB · Android 6 or newer',
    reassure:'Free up to 2 clients • Works offline • No credit card',
    floatOrdersLabel:'Order created', floatOrderItem:'Custom shirt', floatPaidLabel:'Paid',
    floatOfflineTitle:'Offline mode', floatOfflineDesc:'Keep working with no network.', floatOfflineStatus:'Sync pending',
    phTitle:'Client file', phName:'Amina N.', phOrder:'Wax dress — Peter Pan collar', phMeasures:'Measurements',
    phRows:[{l:'Chest',v:'96 cm'},{l:'Waist',v:'78 cm'},{l:'Hips',v:'102 cm'},{l:'Dress length',v:'140 cm'}],
    phPaidLabel:'Deposit', phPaidVal:'10,000 F', phResteLabel:'Balance', phResteVal:'5,000 F',
    probTitle:'No more notebook', probSub:'Three headaches every tailor knows — and they cost money.',
    prob1t:'Lost or damaged notebook', prob1d:'A notebook that disappears, gets wet or tears — and all your measurements with it.',
    prob2t:"Measurements you can't find", prob2d:'Impossible to find the right page just when you need to cut the fabric.',
    prob3t:'Errors on deposits', prob3d:'One wrong balance calculation and your margin is gone.',
    benTitle:'Everything organized, everything simple', benSub:'From client file to invoice, Mesure Plus runs your whole workshop.',
    ben1t:'Your measurements, safe', ben1d:'No more lost notebook. Every client and their measurements are stored safely.',
    ben2t:'Balance due, auto-calculated', ben2d:'The app calculates deposits and balance due. Zero errors, zero disputes.',
    ben3t:'Works without internet', ben3d:'Work offline. Everything syncs automatically when the network returns.',
    ben4t:'Pro invoice on WhatsApp', ben4d:'Send a clean invoice to your client in one click, straight to WhatsApp.',
    bentoPhoneTitle:'All in your pocket', bentoPhoneSub:'Client, measurements & payment', bentoCard:'Client file', bentoR1:'Chest', bentoR2:'Waist',
    stepsEyebrow:'How it works', stepsTitle:'Three steps, and it’s done', stepsSub:'From saving the client to sending the invoice, it all takes seconds.',
    step1t:'Save the client', step1:'Add your client and record their measurements right in the app.',
    step2t:'Create the order', step2:'The app calculates the deposit and balance due automatically.',
    step3t:'Send the invoice', step3:'Share a clean invoice on WhatsApp in a single click.',
    waInvoice:'Invoice — Mesure Plus', waItem:'Wax dress',
    whyEyebrow:'Why Mesure Plus', whyTitle:'Built for workshops across French-speaking Africa',
    whyDesc:'A lightweight app that runs on entry-level Android phones, works with no network, and speaks tailors’ language. You save time and never lose a client again.',
    whyStats:['Works without internet','Light on Android','Mobile Money / Orange Money payment'],
    socialTitle:'They put away their notebook',
    testimonials:[
      {name:'Amina',city:'Douala, Cameroon',initial:'A',quote:'I used to search everywhere for my measurements. Now everything is in my phone, even when the network drops.'},
      {name:'Ismaël',city:'Abidjan, Ivory Coast',initial:'I',quote:'The balance calculation saved me. My clients see exactly what they owe — and I save so much time.'},
      {name:'Chantal',city:'Dakar, Senegal',initial:'C',quote:'I send the invoice on WhatsApp and the client pays by Mobile Money. I never lose a client anymore.'}
    ],
    trust:"Your data and your clients' data are protected.",
    priceTitle:'Simple pricing', priceSub:'Start free. Go unlimited when your workshop grows.',
    freeName:'Free', freePrice:'0 F', freePeriod:'forever',
    freeFeatures:['2 clients','All features','Works offline','WhatsApp invoice'], freeCta:'Download',
    unlName:'Unlimited', unlPrice:'500 F', unlPeriod:'/month', unlAlt:'or 5,000 F/year', unlBadge:'2 months free',
    unlFeatures:['Unlimited clients','All features','Mobile Money / Orange Money payment','Priority support'], unlCta:'Download',
    faqTitle:'Frequently asked questions',
    faq1q:'Does it work without internet?', faq1a:'Yes. You save clients, measurements and orders offline. As soon as the network returns, everything syncs automatically.',
    faq2q:'How do I pay for the subscription?', faq2a:'By Mobile Money or Orange Money, directly from the app. 500 F per month or 5,000 F per year.',
    faq3q:'Does it work on my phone?', faq3a:'Yes. Mesure Plus is built for Android phones, even entry-level models.',
    faq4q:'Is my data safe?', faq4a:"Your data and your clients' data are backed up and protected. Only you have access.",
    faq5q:'How do I install the downloaded file?', faq5a:'Open the file once the download finishes. Android will ask permission to install from this source: accept, then tap “Install”. The warning shown is normal — it appears for any app that does not come from the Play Store.',
    finalTitle:'Ready to put away your notebook?', finalCta:'Download for free',
    footColProduct:'Navigation', footLinks:['Features','Pricing','WhatsApp Contact','Privacy'],
    footTagline:'Made for tailors across French-speaking Africa.',

    photoPlaceholder:'Tailoring workshop photo (wax fabric)',
    photoAlt:'Tailoring workshop'
  };

  var DICTS = { fr: FR, en: EN };

  /* Les libellés du pied de page changent de langue, pas leurs destinations. */
  var FOOT_LINK_HREFS = ['#features', '#pricing', 'https://wa.me/237678305419', '#'];

  /* --- Petits utilitaires ------------------------------------------------ */

  var SVG_NS = 'http://www.w3.org/2000/svg';

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  /* Coche bleue/blanche réutilisée par les listes (construite en DOM plutôt
     qu'en innerHTML : rien de dynamique n'est injecté comme du HTML). */
  function checkIcon(size, stroke, strokeWidth) {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', stroke);
    svg.setAttribute('stroke-width', strokeWidth);
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', 'M20 6L9 17l-5-5');
    svg.appendChild(path);
    return svg;
  }

  function starIcon() {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', '#F59E0B');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', 'M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z');
    svg.appendChild(path);
    return svg;
  }

  /* --- Rendu des listes (équivalent des <sc-for> de la maquette) ---------- */

  var LIST_RENDERERS = {

    phRows: function (container, rows) {
      rows.forEach(function (r) {
        var row = el('div', 'phone-measure-row');
        row.appendChild(el('span', 'label', r.l));
        row.appendChild(el('span', 'value', r.v));
        container.appendChild(row);
      });
    },

    whyStats: function (container, stats) {
      stats.forEach(function (s) {
        var li = el('li');
        var check = el('span', 'check');
        check.appendChild(checkIcon('18', '#1D4ED8', '2.2'));
        li.appendChild(check);
        li.appendChild(el('span', 'text', s));
        container.appendChild(li);
      });
    },

    testimonials: function (container, items, dict, lang) {
      var starsLabel = lang === 'en' ? '5 out of 5 stars' : '5 étoiles sur 5';
      items.forEach(function (t) {
        var li = el('li');
        var fig = el('figure', 'card testimonial');
        fig.style.margin = '0';

        var stars = el('div', 'stars');
        stars.setAttribute('aria-label', starsLabel);
        for (var i = 0; i < 5; i++) stars.appendChild(starIcon());
        fig.appendChild(stars);

        fig.appendChild(el('blockquote', null, '“' + t.quote + '”'));

        var cap = el('figcaption');
        cap.appendChild(el('span', 'testimonial-avatar', t.initial));
        var who = el('div');
        who.appendChild(el('div', 'testimonial-name', t.name));
        who.appendChild(el('div', 'testimonial-city', t.city));
        cap.appendChild(who);
        fig.appendChild(cap);

        li.appendChild(fig);
        container.appendChild(li);
      });
    },

    freeFeatures: function (container, features) {
      features.forEach(function (f) {
        var li = el('li');
        li.appendChild(checkIcon('20', '#1D4ED8', '2.2'));
        li.appendChild(el('span', null, f));
        container.appendChild(li);
      });
    },

    unlFeatures: function (container, features) {
      features.forEach(function (f) {
        var li = el('li');
        li.appendChild(checkIcon('20', '#fff', '2.2'));
        li.appendChild(el('span', null, f));
        container.appendChild(li);
      });
    },

    footLinks: function (container, links) {
      links.forEach(function (label, i) {
        var li = el('li');
        var a = el('a', null, label);
        a.href = FOOT_LINK_HREFS[i] || '#';
        li.appendChild(a);
        container.appendChild(li);
      });
    }
  };

  /* --- Application d'une langue ------------------------------------------ */

  function applyLang(lang) {
    var dict = DICTS[lang] || FR;

    document.documentElement.lang = lang;

    // Textes simples.
    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      var key = node.getAttribute('data-i18n');
      var value = dict[key];
      if (typeof value === 'string') {
        node.textContent = value;
      } else if (window.console && console.warn) {
        // Filet de développement : signale une clé absente du dictionnaire
        // plutôt que de vider silencieusement l'élément.
        console.warn('[i18n] clé manquante ou non textuelle : ' + key + ' (' + lang + ')');
      }
    });

    // Listes.
    document.querySelectorAll('[data-list]').forEach(function (container) {
      var key = container.getAttribute('data-list');
      var render = LIST_RENDERERS[key];
      var items = dict[key];
      if (!render || !Array.isArray(items)) {
        if (window.console && console.warn) console.warn('[i18n] liste inconnue : ' + key);
        return;
      }
      container.textContent = '';
      render(container, items, dict, lang);
    });

    // Texte de repli de l'emplacement photo (attribut alt, si photo présente).
    var photo = document.querySelector('#atelier img');
    if (photo) photo.alt = dict.photoAlt;

    // État des boutons de langue.
    document.querySelectorAll('.lang-switch button').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });
  }

  /* --- FAQ (un seul panneau ouvert, comme dans la maquette) -------------- */

  function setupFaq() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll('.faq-q'));

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var willOpen = btn.getAttribute('aria-expanded') !== 'true';

        buttons.forEach(function (other) {
          var panel = document.getElementById(other.getAttribute('aria-controls'));
          var open = other === btn && willOpen;
          other.setAttribute('aria-expanded', String(open));
          if (panel) panel.hidden = !open;
        });
      });
    });
  }

  /* --- Photo d'atelier ---------------------------------------------------
     La maquette utilisait un <image-slot> (emplacement que l'on remplit en y
     glissant un fichier). Ici : si une image existe dans assets/, elle
     remplace le repli ; sinon le repli dessiné reste affiché. Aucune image
     cassée ne peut apparaître.                                             */

  function setupAtelierPhoto() {
    var figure = document.getElementById('atelier');
    if (!figure) return;

    var candidates = ['assets/atelier.webp', 'assets/atelier.jpg', 'assets/atelier.jpeg', 'assets/atelier.png'];

    (function tryNext(i) {
      if (i >= candidates.length) return;
      var probe = new Image();
      probe.onload = function () {
        figure.textContent = '';
        probe.alt = (DICTS[document.documentElement.lang] || FR).photoAlt;
        probe.loading = 'lazy';
        probe.decoding = 'async';
        figure.appendChild(probe);
      };
      probe.onerror = function () { tryNext(i + 1); };
      probe.src = candidates[i];
    })(0);
  }

  /* --- Démarrage --------------------------------------------------------- */

  function init() {
    document.querySelectorAll('.lang-switch button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(btn.getAttribute('data-lang'));
      });
    });

    setupFaq();
    setupAtelierPhoto();
    applyLang('fr'); // Le français est la langue par défaut, comme dans la maquette.
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
