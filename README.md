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
| `assets/logo.png` | Le logo (512 px), **copie exacte de la pastille de l'appli** (`assets/app_logo.png`, produite par `tool/generate_launcher_icons.py`). Carré bleu bord à bord, coins transparents — surtout pas un JPEG posé sur du blanc, comme celui utilisé jusqu'au 2026-07-31 |
| `assets/favicon.png` | La même image en 96 px, pour l'onglet du navigateur |

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

## 📦 L'APK téléchargeable

L'application se télécharge **directement depuis le site**, sans passer par le
Play Store : `telechargements/mesure-plus-1.0.3-arm64.apk` (22 Mo).

Les **6 boutons** « Télécharger » de la page pointent dessus, avec l'attribut
`download` pour que le navigateur enregistre le fichier au lieu de tenter de
l'afficher.

### 64 bits uniquement (changé le 2026-08-02)

L'APK ne contient plus que `arm64-v8a`. Il pèse **22 Mo au lieu de 39** —
44 % de moins à télécharger, ce qui compte pour des visiteurs souvent en
connexion faible et en données mobiles.

⚠️ **Contrepartie assumée** : les téléphones **32 bits uniquement** (bas de
gamme d'avant ~2016) ne peuvent plus installer l'application. Ils reçoivent
un « Application non installée » net. C'est le choix inverse de celui pris
initialement, où l'on préférait un fichier universel pour n'exclure personne.

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

Le fichier sort dans `build/app/outputs/flutter-apk/app-release.apk`.

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
une application signée différemment. Les utilisateurs devraient désinstaller,
et perdraient leurs données locales non synchronisées.

### Publier une nouvelle version

1. Reconstruire et vérifier la signature (ci-dessus).
2. Copier l'APK sous un **nouveau nom versionné**
   (`telechargements/mesure-plus-1.1.0.apk`) — le nom versionné évite qu'un
   navigateur ressorte l'ancien fichier de son cache.
3. Remplacer les 6 occurrences de l'ancien nom dans `index.html`, et le poids
   dans la clé `apkMeta` de `app.js` (FR **et** EN).
4. Supprimer l'ancien APK, puis `git add -A`, `git commit`, `git push`.
5. Penser à mettre à jour `latest_version` dans la table `app_config` de
   Supabase, sinon le portail de mise à jour de l'appli ne signalera rien.

### 📌 Limite à surveiller

Chaque APK ajouté pèse ~22 Mo **définitivement** dans l'historique git, même
après suppression du fichier. Deux ou trois versions passent sans problème ;
au-delà, basculer la distribution vers les **GitHub Releases** (fichiers
attachés à une version, hors historique) et ne garder ici que le lien.

Pour mémoire : GitHub avertit à 50 Mo par fichier et bloque à 100 Mo.

### Le bloc « Google Play »

L'appli n'étant pas encore publiée, le badge du bas de page affiche
**« BIENTÔT SUR Google Play »** et n'est **pas cliquable** (c'est un `<span>`,
pas un lien mort). Le jour de la publication : le repasser en `<a>` vers la
fiche du store et remettre la clé `playPre` à « DISPONIBLE SUR » / « GET IT ON ».

### L'avertissement d'Android

Installer hors Play Store demande à l'utilisateur d'autoriser « les sources
inconnues », et Chrome affiche un avertissement au téléchargement. C'est normal
et inévitable. La **5ᵉ question de la FAQ** l'explique en clair — sans elle,
beaucoup d'utilisateurs abandonneraient à cet écran.

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

- **Les boutons « Télécharger »** sont branchés sur l'APK (voir plus haut) — ils
  ne pointent plus sur `#`.
- **« Confidentialité »** (pied de page) pointe encore sur `#` : la page reste à
  écrire. C'est le seul lien mort de la page.
- **« Contact WhatsApp »** est branché sur le numéro de support
  (`237699386130`, celui de `AppConstants.supportWhatsAppNumber`).
- **« Google Play »** n'est volontairement pas un lien tant que l'appli n'est
  pas publiée (voir la section APK).

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
