# HyReveal Frontend

Interface moderne React pour la plateforme d'exploration hydrogène HyReveal.

## 🚀 Installation Rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configuration
cp .env.example .env

# 3. Lancer le serveur de développement
npm run dev
```

**Application disponible sur:** http://localhost:5173

---

## 🔐 Connexion

**Identifiants par défaut:**
```
Email: admin@hyreveal.com
Mot de passe: Admin123!
```

---

## 📚 Technologies et Bibliothèques

### Core Framework & Language

#### **React 18.2.0**
- Bibliothèque JavaScript pour construire des interfaces utilisateur
- Utilise les hooks modernes (useState, useEffect, useMemo, etc.)
- Composants fonctionnels avec TypeScript

#### **TypeScript 5.3.3**
- Typage statique pour JavaScript
- Améliore la maintenabilité et la détection d'erreurs
- Configuration dans `tsconfig.json` et `tsconfig.node.json`

#### **Vite 5.0.11**
- Build tool ultra-rapide pour le développement frontend
- Hot Module Replacement (HMR) instantané
- Build optimisé pour la production
- Configuration dans `vite.config.ts` avec proxy API

---

### Routing & Navigation

#### **React Router DOM 6.21.1**
- Gestion des routes côté client
- Navigation programmatique avec `useNavigate`
- Paramètres de route avec `useParams`
- Routes protégées via `ProtectedRoute`

**Routes principales:**
- `/login` - Authentification
- `/dashboard` - Tableau de bord
- `/datasets` - Liste des datasets
- `/datasets/upload` - Upload de fichiers
- `/datasets/:id` - Détails d'un dataset
- `/projects` - Liste des projets
- `/projects/new` - Création de projet
- `/projects/:id` - Détails d'un projet avec carte interactive
- `/projects/:id/edit` - Édition d'un projet

---

### State Management

#### **TanStack Query (React Query) 5.17.9**
- Gestion du state serveur (server state)
- Cache automatique des requêtes
- Synchronisation et invalidation intelligente
- Gestion du loading et des erreurs
- Configuration: refetchOnWindowFocus désactivé, staleTime de 5 minutes

**Utilisation:**
- `useQuery` pour les requêtes GET
- `useMutation` pour POST/PUT/DELETE
- `useQueryClient` pour invalider le cache

#### **Zustand 4.4.7**
- Store global léger pour le state client
- Utilisé pour l'authentification (`useAuth.ts`)
- API simple et performante
- Pas de boilerplate comme Redux

---

### HTTP Client

#### **Axios 1.6.5**
- Client HTTP pour les requêtes API
- Intercepteurs pour ajouter le token JWT automatiquement
- Gestion centralisée des erreurs (401 → redirection login)
- Configuration dans `src/lib/api.ts`

**Fonctionnalités:**
- Intercepteur de requête: ajoute `Authorization: Bearer <token>`
- Intercepteur de réponse: gère les erreurs 401

---

### UI Components & Styling

#### **Tailwind CSS 3.4.1**
- Framework CSS utility-first
- Configuration personnalisée avec couleurs HyReveal
- Classes utilitaires pour un développement rapide
- Configuration dans `tailwind.config.js`

**Couleurs HyReveal:**
- Orange principal: `#FF6333` (hyreveal-500)
- Palette complète: hyreveal-50 à hyreveal-900

#### **Radix UI** (via Shadcn/ui)
- Composants accessibles et non-stylés
- Utilisés comme base pour les composants UI:

**@radix-ui/react-dialog 1.0.5**
- Modals et dialogues
- Utilisé pour les formulaires et confirmations

**@radix-ui/react-label 2.0.2**
- Labels accessibles pour les formulaires

**@radix-ui/react-select 2.0.0**
- Composants de sélection (dropdowns)

**@radix-ui/react-slot 1.0.2**
- Composition de composants flexibles

**@radix-ui/react-tabs 1.1.13**
- Navigation par onglets
- Utilisé dans `DataAnalysisPanel` pour statistiques/distribution

#### **Shadcn/ui Components**
- Bibliothèque de composants React réutilisables
- Basée sur Radix UI et Tailwind CSS
- Composants personnalisables

**Composants utilisés:**
- `Button` - Boutons avec variants (default, outline, ghost, etc.)
- `Card` - Cartes avec header, content, description
- `Dialog` - Modals
- `Input` - Champs de saisie
- `Label` - Labels de formulaire
- `Textarea` - Zones de texte multilignes
- `Tabs` - Navigation par onglets

#### **Lucide React 0.309.0**
- Bibliothèque d'icônes SVG
- Plus de 1000 icônes disponibles
- Icônes utilisées: ArrowLeft, Layers, Plus, Eye, EyeOff, Trash2, Palette, MapPin, BarChart3, Square, ChevronDown, ChevronUp, GripVertical

#### **Class Variance Authority 0.7.0**
- Gestion des variants de classes CSS
- Utilisé pour les composants Shadcn/ui
- Permet de créer des variants de composants facilement

#### **clsx 2.1.0**
- Utilitaire pour construire des noms de classes conditionnellement
- Combiné avec `tailwind-merge` pour éviter les conflits

#### **tailwind-merge 2.2.0**
- Fusion intelligente des classes Tailwind
- Évite les conflits de classes utilitaires
- Utilisé dans les composants UI

#### **tailwindcss-animate 1.0.7**
- Animations Tailwind CSS supplémentaires
- Keyframes pour accordion, etc.

---

### Form Management

#### **React Hook Form 7.49.3**
- Gestion performante des formulaires
- Validation avec peu de re-renders
- Intégration avec Zod pour la validation

#### **@hookform/resolvers 3.3.4**
- Résolveurs pour React Hook Form
- Permet d'utiliser Zod avec React Hook Form

#### **Zod 3.22.4**
- Bibliothèque de validation de schémas TypeScript-first
- Validation côté client des formulaires
- Types générés automatiquement

---

### File Handling

#### **React Dropzone 14.2.3**
- Composant drag-and-drop pour l'upload de fichiers
- Support multi-fichiers
- Validation de type et taille
- Utilisé dans `DatasetUpload.tsx`

#### **SheetJS (xlsx) 0.18.5**
- Parsing de fichiers Excel (XLS, XLSX)
- Lecture des colonnes et données
- Utilisé pour l'analyse automatique des datasets
- Détection automatique des colonnes longitude/latitude

---

### Maps & Geospatial

#### **Leaflet 1.9.4**
- Bibliothèque JavaScript open-source pour cartes interactives
- Support des marqueurs, popups, rectangles
- Tiles OpenStreetMap et CARTO

#### **React Leaflet 4.2.1**
- Bindings React pour Leaflet
- Composants React pour la carte
- Hooks: `useMap` pour accéder à l'instance de carte

**Composants utilisés:**
- `MapContainer` - Conteneur principal de la carte
- `TileLayer` - Couche de tuiles (CARTO Light)
- `CircleMarker` - Marqueurs circulaires pour les points
- `Popup` - Popups d'information
- `Rectangle` - Rectangle de sélection d'aire
- `useMap` - Hook pour accéder à l'instance Leaflet

**Fonctionnalités:**
- Affichage de points géolocalisés
- Sélection d'aire par drag-and-drop
- Légende interactive
- Zoom automatique sur les données
- Popups avec informations des points

---

### Drag & Drop

#### **@hello-pangea/dnd 16.5.0**
- Bibliothèque de drag-and-drop pour React
- Fork maintenu de react-beautiful-dnd
- Utilisé pour réorganiser les layers dans `ProjectDetail`

**Composants:**
- `DragDropContext` - Contexte pour le drag-and-drop
- `Droppable` - Zone de dépôt
- `Draggable` - Élément draggable

---

### Build Tools & Development

#### **@vitejs/plugin-react 4.2.1**
- Plugin Vite pour React
- Support JSX et Fast Refresh

#### **PostCSS 8.4.33**
- Traitement CSS avec plugins
- Configuration dans `postcss.config.js`

#### **Autoprefixer 10.4.16**
- Ajout automatique des préfixes vendor CSS
- Compatibilité navigateurs

#### **Type Definitions**
- `@types/leaflet 1.9.8` - Types TypeScript pour Leaflet
- `@types/react 18.2.48` - Types React
- `@types/react-dom 18.2.18` - Types React DOM

---

## 📂 Structure du Projet

```
src/
├── components/
│   ├── ui/                    # Composants Shadcn/ui de base
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── tabs.tsx
│   │   └── textarea.tsx
│   ├── project/               # Composants spécifiques aux projets
│   │   ├── AreaSelector.tsx   # Sélecteur d'aire sur la carte
│   │   ├── MapUpdater.tsx     # Mise à jour automatique des bounds
│   │   ├── MapLegend.tsx      # Légende de la carte
│   │   ├── MapMarkers.tsx     # Rendu des marqueurs
│   │   ├── DataAnalysisPanel.tsx  # Panel d'analyse des données
│   │   ├── StyleDialog.tsx    # Dialog de style des layers
│   │   ├── LayerList.tsx      # Liste draggable des layers
│   │   ├── AddLayerDialog.tsx # Dialog d'ajout de layer
│   │   └── ProjectSidebar.tsx # Sidebar du projet
│   └── ProtectedRoute.tsx     # Protection des routes
├── hooks/
│   └── useAuth.ts             # Hook Zustand pour l'authentification
├── lib/
│   ├── api.ts                 # Client API Axios + endpoints
│   └── utils.ts               # Utilitaires (cn, etc.)
├── pages/
│   ├── Login.tsx              # Page de connexion
│   ├── Dashboard.tsx         # Tableau de bord
│   ├── Datasets.tsx           # Liste des datasets
│   ├── DatasetUpload.tsx      # Upload avec analyse Excel
│   ├── DatasetDetail.tsx     # Détails d'un dataset
│   ├── Projects.tsx           # Liste des projets
│   ├── ProjectForm.tsx       # Création/édition projet
│   └── ProjectDetail.tsx      # Détails projet avec carte (refactorisé)
├── App.tsx                    # Routes principales
└── main.tsx                   # Point d'entrée React
```

---

## ✨ Fonctionnalités Implémentées

### 🔑 Authentification
- ✅ Page de connexion avec design HyReveal
- ✅ Gestion JWT token (localStorage)
- ✅ Auto-déconnexion sur erreur 401
- ✅ Routes protégées
- ✅ Persistence de session

### 📊 Dashboard
- ✅ Vue d'ensemble des datasets et projets
- ✅ Statistiques en temps réel
- ✅ Accès rapide aux fonctionnalités
- ✅ Design moderne avec logos HyReveal

### 📁 Datasets
- ✅ Liste des datasets avec recherche
- ✅ Upload de fichiers Excel/CSV
- ✅ **Analyse automatique des colonnes** (SheetJS)
- ✅ **Sélection longitude/latitude/altitude**
- ✅ Aperçu des données avant import
- ✅ Auto-détection des coordonnées
- ✅ Support 2D/3D/NON_GEO
- ✅ Tags et métadonnées
- ✅ Suppression de datasets

### 🗂️ Projets
- ✅ Liste des projets
- ✅ Création de nouveaux projets
- ✅ Édition des projets
- ✅ Suppression de projets
- ✅ Support projets 2D et 3D
- ✅ **Visualisation carte interactive** (Leaflet)
- ✅ **Gestion des layers** avec drag-and-drop
- ✅ **Style personnalisable** des layers
- ✅ **Analyse statistique** des données
- ✅ **Sélection d'aire** sur la carte

---

## 🎨 Design System

### Couleurs HyReveal
- **Orange principal:** `#FF6333` (hyreveal-500)
- **Dégradés:** hyreveal-50 à hyreveal-900
- **Interface moderne** avec Shadcn/ui
- **Logos:** Icon et full logo inclus

### Composants UI
- Button (5 variants: default, outline, ghost, destructive, link)
- Input & Textarea
- Card (6 sub-components: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- Dialog (modals)
- Label
- Tabs (navigation par onglets)
- Toast notifications

---

## 🔧 Configuration Technique

### Vite Configuration
```typescript
// vite.config.ts
- Port: 5173
- Proxy API: /api → http://localhost:3001
- Alias: @ → ./src
- Plugin React avec Fast Refresh
```

### Tailwind Configuration
```javascript
// tailwind.config.js
- Couleurs HyReveal personnalisées
- Dark mode support (class-based)
- Animations avec tailwindcss-animate
- Border radius variables
```

### TypeScript Configuration
- Strict mode activé
- Path aliases configurés (@/*)
- Types pour React, React DOM, Leaflet

---

## 📝 Scripts

```bash
npm run dev       # Dev server (port 5173)
npm run build     # Build production (TypeScript + Vite)
npm run preview   # Preview build production
```

---

## 🎯 Architecture des Composants

### Refactoring ProjectDetail

Le fichier `ProjectDetail.tsx` (1022 lignes) a été restructuré en composants modulaires:

1. **AreaSelector** - Sélection d'aire par drag-and-drop sur la carte
2. **MapUpdater** - Mise à jour automatique des bounds de la carte
3. **MapLegend** - Légende interactive des layers visibles
4. **MapMarkers** - Rendu des marqueurs sur la carte
5. **DataAnalysisPanel** - Panel d'analyse avec statistiques et distribution
6. **StyleDialog** - Dialog pour personnaliser le style des layers
7. **LayerList** - Liste draggable des layers avec actions
8. **AddLayerDialog** - Dialog pour ajouter un nouveau layer
9. **ProjectSidebar** - Sidebar avec informations du projet

**Avantages:**
- ✅ Code plus maintenable et testable
- ✅ Réutilisabilité des composants
- ✅ Séparation des responsabilités
- ✅ Meilleure lisibilité

---

## 🌐 Internationalisation

Tous les textes sont en **français** :
- Interface utilisateur
- Messages d'erreur
- Labels de formulaires
- Descriptions
- Notifications

---

## 🐛 Troubleshooting

### Port déjà utilisé
```bash
# Changer le port dans vite.config.ts
server: { port: 3000 }
```

### CORS Errors
Vérifier que le backend autorise `http://localhost:5173`

### Upload ne fonctionne pas
1. Backend running sur port 3001 ?
2. Vérifier la taille max upload backend
3. Check console browser pour erreurs

### Colonnes non détectées
La détection automatique cherche:
- **Longitude:** lon, longitude, lng, x, centroid_lon
- **Latitude:** lat, latitude, y, centroid_lat  
- **Altitude:** alt, altitude, z, elevation, height

### Erreurs Leaflet
Assurez-vous que `leaflet/dist/leaflet.css` est importé dans le composant qui utilise la carte.

---

## 🚀 Build Production

```bash
# Build
npm run build

# Output
dist/
```

**Déploiement:**
- Vercel (recommandé)
- Netlify
- AWS S3 + CloudFront
- Serveur Nginx/Apache

---

## 📦 Dépendances Complètes

### Dependencies (Production)
```json
{
  "@hello-pangea/dnd": "^16.5.0",        // Drag & drop
  "@hookform/resolvers": "^3.3.4",      // Form validation resolvers
  "@radix-ui/react-dialog": "^1.0.5",    // Dialog component
  "@radix-ui/react-label": "^2.0.2",     // Label component
  "@radix-ui/react-select": "^2.0.0",   // Select component
  "@radix-ui/react-slot": "^1.0.2",      // Slot composition
  "@radix-ui/react-tabs": "^1.1.13",     // Tabs component
  "@tanstack/react-query": "^5.17.9",    // Server state management
  "axios": "^1.6.5",                     // HTTP client
  "class-variance-authority": "^0.7.0", // CSS variants
  "clsx": "^2.1.0",                      // Class name utility
  "leaflet": "^1.9.4",                   // Map library
  "lucide-react": "^0.309.0",            // Icons
  "react": "^18.2.0",                    // UI framework
  "react-dom": "^18.2.0",                // React DOM
  "react-dropzone": "^14.2.3",           // File upload
  "react-hook-form": "^7.49.3",          // Form management
  "react-leaflet": "^4.2.1",             // React bindings for Leaflet
  "react-router-dom": "^6.21.1",         // Routing
  "tailwind-merge": "^2.2.0",            // Tailwind class merger
  "xlsx": "^0.18.5",                     // Excel parser
  "zod": "^3.22.4",                      // Schema validation
  "zustand": "^4.4.7"                    // Client state management
}
```

### DevDependencies (Development)
```json
{
  "@types/leaflet": "^1.9.8",            // Leaflet types
  "@types/react": "^18.2.48",            // React types
  "@types/react-dom": "^18.2.18",       // React DOM types
  "@vitejs/plugin-react": "^4.2.1",     // Vite React plugin
  "autoprefixer": "^10.4.16",            // CSS vendor prefixes
  "postcss": "^8.4.33",                  // CSS processing
  "tailwindcss": "^3.4.1",               // CSS framework
  "tailwindcss-animate": "^1.0.7",      // Tailwind animations
  "typescript": "^5.3.3",                // TypeScript compiler
  "vite": "^5.0.11"                      // Build tool
}
```

---

## 🎨 Variables CSS HyReveal

```css
--primary: 16 100% 60%;  /* Orange #FF6333 */
--primary-foreground: 0 0% 100%;
--accent: 16 100% 95%;
--ring: 16 100% 60%;
```

**Classes Tailwind:**
```html
<div className="bg-hyreveal-500">Orange</div>
<div className="text-hyreveal-600">Text orange</div>
<div className="border-hyreveal-200">Border</div>
```

---

## 🔜 Prochaines Étapes

### À ajouter prochainement:
- [ ] Export de données
- [ ] Filtres avancés sur la carte
- [ ] Partage de datasets/projets
- [ ] Graphiques avancés (Chart.js ou Recharts)
- [ ] Mode sombre complet
- [ ] Tests unitaires (Vitest)
- [ ] Tests E2E (Playwright)

---

**Projet prêt à l'emploi ! Bon développement ! 🚀**
