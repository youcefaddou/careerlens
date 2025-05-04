# CareerLens

CareerLens est une application de portfolio/CV adaptative qui personnalise le contenu en fonction du profil du visiteur. Développée avec Next.js, Tailwind CSS et MongoDB.

## Fonctionnalités

- Interface utilisateur adaptative selon le profil du visiteur
- Système d'authentification complet
- Design moderne et responsive
- Système de blocs modulaires pour présenter les compétences, projets, etc.
- Support du mode clair/sombre

## Démarrage rapide

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- MongoDB Atlas (pour la base de données)

### Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/youcefaddou/careerlens.git
cd careerlens
```

2. Installer les dépendances :
```bash
npm install
# ou
yarn install
```

3. Configurer les variables d'environnement :
- Créer un fichier `.env.local` à la racine du projet
- Ajouter les variables suivantes :
```
MONGODB_URI=votre_uri_mongodb
NEXTAUTH_SECRET=votre_secret_pour_nextauth
NEXTAUTH_URL=http://localhost:3000
```

4. Lancer le serveur de développement :
```bash
npm run dev
# ou
yarn dev
```

5. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Structure du projet

```
careerlens/
├── public/         # Fichiers statiques
├── src/
│   ├── app/        # Routes et pages (App Router)
│   ├── components/ # Composants React
│   ├── context/    # Contextes React
│   ├── hooks/      # Hooks personnalisés
│   ├── lib/        # Utilitaires et fonctions
│   ├── models/     # Modèles Mongoose
│   ├── providers/  # Providers (NextAuth, etc.)
│   ├── types/      # Types TypeScript
│   └── utils/      # Fonctions utilitaires
```

## Commandes importantes du projet

### Gestion du projet
```bash
# Création du projet
npx create-next-app@latest careerlens
cd careerlens

# Installation des dépendances
npm install next-auth bcrypt mongoose
npm install @geist-ui/core geist geist-ui

# Lancement du serveur de développement
npm run dev
```

### Commandes Git utilisées
```bash
# Création et changement de branches
git checkout -b feature/backend-setup
git checkout develop

# Vérification de l'état
git status

# Ajout et commit des modifications
git add .
git commit -m "Description du commit"

# Pousser les modifications
git push origin feature/backend-setup

# Fusionner une branche
git merge feature/backend-setup

# Pousser la branche develop
git push origin develop
```
