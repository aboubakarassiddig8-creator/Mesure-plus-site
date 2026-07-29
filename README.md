# Page de présentation (site web)

Page vitrine bilingue **FR / EN** de Mesure Plus. C'est un site statique
(3 fichiers, aucune dépendance, aucun outil de build) — **rien à voir avec le
code de l'application Flutter**, qui vit dans un dépôt séparé.

Source : projet Claude Design « Première version bilingue complète »,
fichier `Mesure Plus.dc.html`.

> ⚠️ **À ne pas confondre avec le `Mesure Plus.dc.html` du dépôt de
> l'application.** Celui-là est la maquette des **écrans de l'appli** (écrans
> 1b, 2d, 2f…), citée un peu partout dans son `docs/PROGRESS.md` comme
> référence. Les deux fichiers portent le même nom mais n'ont aucun rapport.

**Pourquoi un dépôt séparé** : GitHub Pages n'est gratuit que sur un dépôt
**public**. Loger le site avec l'appli aurait obligé à rendre public tout le
reste — migrations SQL, Edge Functions de paiement, compteur anti-contournement.
Ici, il n'y a que du contenu destiné à être vu de tous.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | La page. Contient le texte **français** en dur (utile sans JavaScript et pour le référencement) |
| `styles.css` | Tous les styles. La maquette les avait en ligne ; les regrouper ici est ce qui permet aux effets `:hover`, `:focus` et aux media queries de fonctionner réellement |
| `app.js` | Dictionnaires FR/EN, bascule de langue, accordéon de la FAQ |
| `assets/logo.jpeg` | Le logo, copié depuis le dépôt de l'appli (`docs/Logo.jpeg`) |

## Regarder la page

Un double-clic sur `index.html` suffit. Pour être au plus près d'un vrai
hébergement :

```
cd "/Users/easycash/Downloads/mesure-plus-site"
python3 -m http.server 8000
```

puis ouvrir <http://localhost:8000>.

## Mettre le site en ligne

Le contenu de ce dépôt se dépose tel quel chez n'importe quel hébergeur de fichiers
statiques (Netlify, Vercel, GitHub Pages, Cloudflare Pages). Aucune étape de
compilation.

## Modifier les textes

**Les dictionnaires `FR` et `EN` de `app.js` font foi.** Ils sont réappliqués à
chaque chargement : un texte modifié uniquement dans `index.html` serait écrasé
au démarrage. Pour changer une phrase, la changer dans `app.js` — et dans
`index.html` si l'on tient à ce que le rendu sans JavaScript soit à jour lui
aussi.

Une clé absente d'un dictionnaire est signalée dans la console du navigateur
(`[i18n] clé manquante…`) plutôt que d'effacer le texte en silence.

## 📷 La photo d'atelier

Elle est en place, dans la section « Pourquoi Mesure Plus ».

`app.js` cherche au chargement, **dans cet ordre**, `assets/atelier.webp`,
`.jpg`, `.jpeg` puis `.png`, et retient le premier qui se charge. Si aucun
n'existe, un repli dessiné (cadre bleu clair + libellé) reste affiché :
**aucune image cassée ne peut apparaître**.

### ⚠️ Deux règles à respecter si vous remplacez la photo

1. **Nom en minuscules.** macOS ne distingue pas `Atelier.png` de
   `atelier.png`, mais **les serveurs web si**. Une majuscule marche donc sur
   votre Mac et échoue une fois le site en ligne — panne invisible en local.
2. **Format web, pas PNG.** La photo d'origine pesait 2,4 Mo en PNG ; en WebP
   à 1200 × 800 elle fait 122 Ko, soit **20 fois moins**, pour un rendu
   identique à l'écran. Les visiteurs visés sont souvent en connexion faible :
   une page de 2,4 Mo est une page qu'ils ne verront pas.

Commande de conversion (nécessite Pillow, déjà installé) :

```
cd "/Users/easycash/Downloads/mesure-plus-site/assets"
python3 -c "
from PIL import Image
src = Image.open('VOTRE-PHOTO.png').convert('RGB').resize((1200, 800))
src.save('atelier.webp', 'WEBP', quality=82, method=6)
src.save('atelier.jpg', 'JPEG', quality=82, optimize=True, progressive=True)
"
```

Le `.jpg` est le filet de sécurité pour un très vieux navigateur qui ne lirait
pas le WebP ; il n'est téléchargé que dans ce cas.

## Liens encore à brancher

Les boutons de téléchargement pointent sur `#` : l'application n'est pas encore
publiée sur le Play Store. Quand elle le sera, remplacer les `href="#"` des
boutons « Télécharger » et « Google Play » par l'adresse de la fiche. Le lien
« Contact WhatsApp » du pied de page est déjà branché sur le numéro de support
(`237678305419`, celui de `AppConstants.supportWhatsAppNumber`).

## Écarts assumés vis-à-vis de la maquette

Le contenu (les 95 clés de texte FR et EN) est repris **mot pour mot**.
Les différences sont uniquement techniques :

- **Deux clés ajoutées** (`photoPlaceholder`, `photoAlt`) : dans la maquette, le
  texte d'attente de l'emplacement photo n'existait qu'en français, en dur.
  Il est maintenant traduit.
- **Accessibilité** — absente d'une maquette, indispensable sur une vraie page :
  `aria-expanded` / `aria-controls` sur la FAQ, `aria-pressed` sur le sélecteur
  de langue, `lang` de la page mis à jour à la bascule, anneau de focus au
  clavier, images décoratives masquées aux lecteurs d'écran, et respect de
  `prefers-reduced-motion` (les blocs qui flottent s'immobilisent).
- **`scroll-margin-top`** sur les ancres : sans cela l'en-tête collant recouvre
  la section vers laquelle on vient de sauter.
- **Repli du bloc de statistiques** sous 520 px : il chevauche la photo en
  position absolue et serait sorti de l'écran ; il repasse dans le flux.
