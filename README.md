# Page de présentation (site web)

Page vitrine bilingue **FR / EN** de Mesure Plus, en ligne sur
<https://mesureplus.com>. **Rien à voir avec le code de l'application
Flutter**, qui vit dans un dépôt séparé.

Depuis la refonte de novembre 2026 (branche `refonte-premium`), le site est un
projet **Next.js 16 + Tailwind CSS v4**, exporté en **fichiers statiques**
(`output: "export"`) : `npm run build` produit un dossier `out/` qui se dépose
chez n'importe quel hébergeur, comme avant. L'ancienne version (3 fichiers
`index.html` / `styles.css` / `app.js`) reste dans l'historique git.

**Pourquoi un dépôt séparé** : GitHub Pages n'est gratuit que sur un dépôt
**public**. Loger le site avec l'appli aurait obligé à rendre public tout le
reste — migrations SQL, Edge Functions de paiement, compteur anti-contournement.
Ici, il n'y a que du contenu destiné à être vu de tous.

## Direction artistique

« La table de coupe, où le patron devient la fiche client » : papier patron
kraft, grille de tapis de coupe, coutures en pointillés, ruban mètre, étiquettes
de vêtement pour les tarifs. Polices **Gloock** (titres, rappelle le M du logo)
et **Figtree** (texte). Palette : papier `#F6F1E7`, encre `#0E1A33`, bleu
Mesure `#1D4ED8` ; vert « Payé » et orange « Reste » gardent le sens qu'ils ont
dans l'appli. Thème clair et sombre (le système décide, bouton dans la nav).

**Signature du hero** : un ruban mètre se déroule à côté du vrai écran de
l'appli, un repère passe sur chaque mesure, puis « Reste à payer 5 000 FCFA »
est entouré à la craie et une étiquette tombe dessus. Avec « mouvement réduit »
activé, tout s'affiche directement dans l'état final.

## Fichiers

| Fichier | Rôle |
|---|---|
| `lib/content.ts` | **Tous les textes, FR et EN**, dans l'ordre des sections, plus le lien de l'APK, de l'appli web et du WhatsApp |
| `app/page.tsx` | L'ordre des sections |
| `app/layout.tsx` | Polices, titre, description, aperçu WhatsApp / Facebook |
| `app/globals.css` | Couleurs (clair et sombre), tailles de titres, textures |
| `components/` | Une brique par section (`hero.tsx`, `sections-story.tsx`, `sections-offer.tsx`…) |
| `app/opengraph-image.jpg` | Aperçu 1200 × 630 affiché quand on partage le lien (même image en `twitter-image.jpg`) |
| `public/captures/` | Les **vrais écrans de l'appli** (FR et EN), voir plus bas |
| `public/assets/` | Logo, favicon, photo d'atelier |
| `public/telechargements/` | L'APK |
| `vercel.json` | Redirection du webhook de paiement KPay vers Supabase — **ne pas supprimer** |

## Regarder la page

```
cd "/Users/easycash/Downloads/mesure-plus-site"
npm install        # une seule fois
npm run dev        # puis ouvrir http://localhost:3000
```

Pour voir exactement ce qui sera mis en ligne :

```
npm run build
cd out && python3 -m http.server 8000   # puis http://localhost:8000
```

## Mettre le site en ligne

Vercel reconstruit le site tout seul à chaque `git push` sur `main`
(framework détecté : Next.js). Ailleurs : `npm run build`, puis déposer le
contenu de `out/`.

Avant de pousser, ces trois commandes doivent passer :

```
npm run typecheck && npm run lint && npm run build
```

## Modifier les textes

**Uniquement dans `lib/content.ts`**, en français (`fr`) **et** en anglais
(`en`). Les composants ne contiennent aucune phrase. TypeScript refuse le build
si une clé existe en français et manque en anglais.

En français, garder une espace insécable (` `) avant `?`, `!`, `:` et à
l'intérieur des guillemets « », sinon le signe peut se retrouver seul en début
de ligne sur téléphone.

## 📷 Les écrans de l'appli (`public/captures/`)

Ce ne sont pas des maquettes : ils ont été produits **par le code Flutter de
l'appli**, avec un test de widget temporaire qui affiche les vrais écrans
(liste des clients, commande, liste des commandes, facture) avec des données
factices, sans aucun accès à Supabase. Taille téléphone 390 × 844, exportés en
WebP 720 px (25 à 50 Ko chacun).

| Fichier | Où il apparaît |
|---|---|
| `order-fr/en.webp` | Hero (avec la signature) et dernier appel |
| `clients-fr/en.webp` | Carte bleue « Tout dans ta poche » |
| `invoice-fr/en.webp` | « Trois étapes » |
| `orders-fr/en.webp` | Au-dessus de la photo d'atelier |

⚠️ Si l'écran de commande change dans l'appli, les repères de la signature
(positions des lignes de mesures et de « Reste à payer », en % de la hauteur de
l'image) sont dans `components/hero.tsx`, constantes `ROWS` et `RESTE`.

📌 Dans `order-en.webp`, la ligne d'aide « The screen stays on while you read
the measurements » a été effacée : en anglais, elle déborde de l'écran sur un
téléphone de 390 px (bandeau de débordement Flutter). **C'est un vrai défaut de
l'appli**, à corriger côté Flutter.

## 📦 L'APK téléchargeable

L'application se télécharge **directement depuis le site**, sans passer par le
Play Store : `public/telechargements/mesure-plus-1.0.9-arm64.apk` (22 Mo),
servi à l'adresse `/telechargements/mesure-plus-1.0.9-arm64.apk`.

Tous les boutons « Télécharger » lisent l'adresse dans **une seule constante**,
`APK_URL` de `lib/content.ts`, avec l'attribut `download` pour que le
navigateur enregistre le fichier au lieu de tenter de l'afficher.

Sur **iPhone / iPad**, où un APK ne s'installe pas, la barre collante du bas
ouvre l'appli web (`https://app.mesureplus.com`) à la place.

### 64 bits uniquement (changé le 2026-08-02)

L'APK ne contient plus que `arm64-v8a`. Il pèse **22 Mo au lieu de 39** —
44 % de moins à télécharger, ce qui compte pour des visiteurs souvent en
connexion faible et en données mobiles.

⚠️ **Contrepartie assumée** : les téléphones **32 bits uniquement** (bas de
gamme d'avant ~2016) ne peuvent plus installer l'application. Ils reçoivent
un « Application non installée » net.

📌 **Le refus net n'est pas gratuit, il est CONSTRUIT.** `--target-platform
android-arm64` seul ne suffit pas : certains greffons déposent quand même de
petites bibliothèques dans `armeabi-v7a`, Android juge alors l'APK compatible,
l'installe sur un téléphone 32 bits… qui **plante au démarrage** faute de
moteur Flutter. C'est le bloc `ndk { abiFilters "arm64-v8a" }` du
`android/app/build.gradle` de l'appli qui garantit le refus propre. **Ne pas
le retirer** sans revenir à un APK universel.

Commande de construction (depuis le dépôt de l'appli) :

```
cd "/Users/easycash/Downloads/Mesure Plus"
export ANDROID_HOME="$HOME/Library/Android/sdk"
~/development/flutter/bin/flutter build apk --release \
  --target-platform android-arm64
```

Contrôle rapide après build — une seule ligne doit sortir, `lib/arm64-v8a/` :

```
unzip -l build/app/outputs/flutter-apk/app-release.apk \
  | grep -o "lib/[a-z0-9_-]*/" | sort -u
```

### ⚠️ Toujours vérifier la signature avant de publier

Si `android/key.properties` est absent, le build retombe **silencieusement**
sur la clé de débogage et l'APK produit n'est pas distribuable. À contrôler :

```
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
"$HOME/Library/Android/sdk/build-tools/36.0.0/apksigner" verify --print-certs \
  build/app/outputs/flutter-apk/app-release.apk
```

Doit afficher `CN=Mesure Plus` et l'empreinte SHA-1
`8ce91de25a6a69670c3cf7f5b383aa425baf2f56`. Toute autre valeur = mauvaise clé.

⚠️ **Ne jamais changer de clé de signature** : Android refuse de mettre à jour
une application signée différemment.

### Publier une nouvelle version

1. Reconstruire et vérifier la signature (ci-dessus).
2. Copier l'APK sous un **nouveau nom versionné** dans
   `public/telechargements/` (ex. `mesure-plus-1.1.0-arm64.apk`) — le nom
   versionné évite qu'un navigateur ressorte l'ancien fichier de son cache.
3. Changer `APK_URL` dans `lib/content.ts` (un seul endroit), et le poids dans
   `apkMeta` (FR **et** EN) s'il a changé.
4. Supprimer l'ancien APK, `npm run build` pour vérifier, puis `git add -A`,
   `git commit`, `git push`.
5. Penser à mettre à jour `latest_version` dans la table `app_config` de
   Supabase, sinon le portail de mise à jour de l'appli ne signalera rien.

### 📌 Limite à surveiller

Chaque APK ajouté pèse ~22 Mo **définitivement** dans l'historique git, même
après suppression du fichier. Au-delà de deux ou trois versions, basculer la
distribution vers les **GitHub Releases** et ne garder ici que le lien.
GitHub avertit à 50 Mo par fichier et bloque à 100 Mo.

### Le bloc « Google Play »

L'appli n'étant pas encore publiée, le dernier appel affiche
**« BIENTÔT SUR Google Play »**, non cliquable (`<span>`, pas un lien mort).
Le jour de la publication : le passer en `<a>` vers la fiche du store
(`components/sections-offer.tsx`, `FinalCta`) et remplacer `playPre` par
« DISPONIBLE SUR » / « GET IT ON ».

### L'avertissement d'Android

Installer hors Play Store demande d'autoriser « les sources inconnues », et
Chrome affiche un avertissement au téléchargement. C'est normal. La **5ᵉ
question de la FAQ** l'explique en clair — sans elle, beaucoup d'utilisateurs
abandonneraient à cet écran.

## 📷 La photo d'atelier

`public/assets/atelier.webp` (1200 × 800, 122 Ko). Pour la remplacer : même
nom, **en minuscules** (les serveurs distinguent `Atelier.webp` de
`atelier.webp`, pas macOS), et **en WebP** plutôt qu'en PNG — les visiteurs
visés sont souvent en connexion faible.

```
cd "/Users/easycash/Downloads/mesure-plus-site/public/assets"
python3 -c "
from PIL import Image
src = Image.open('VOTRE-PHOTO.png').convert('RGB').resize((1200, 800))
src.save('atelier.webp', 'WEBP', quality=82, method=6)
"
```

## Liens encore à brancher

- **« Confidentialité »** (pied de page) pointe encore sur `#` : la page reste à
  écrire. C'est le seul lien mort de la page (`FOOTER_HREFS` dans
  `lib/content.ts`).
- **« Contact WhatsApp »** est branché sur le numéro de support
  (`237699386130`, celui de `AppConstants.supportWhatsAppNumber`).

## Ce qui a changé à la refonte (novembre 2026)

- Textes FR et EN repris **mot pour mot** de l'ancien `app.js`.
- **Retirés** : les trois témoignages (Amina, Ismaël, Chantal), qui n'étaient
  pas de vrais utilisateurs. À remettre seulement avec de vrais retours
  (prénom, ville, accord de la personne).
- Les maquettes de téléphone dessinées en HTML sont remplacées par les vrais
  écrans de l'appli.
- La langue n'est plus gardée en mémoire d'une visite à l'autre : la page
  s'ouvre en français, comme avant.
