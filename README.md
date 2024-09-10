# My Wallet

My Wallet est une application web de gestion de portefeuille qui permet aux utilisateurs de s'inscrire, de se connecter et de gérer leurs finances personnelles. Cette application utilise Next.js pour le frontend et NextAuth.js pour l'authentification.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Contributions](#contributions)
- [Licence](#licence)

## Fonctionnalités

- Inscription et connexion des utilisateurs
- Gestion des sessions avec NextAuth.js
- Interface utilisateur réactive
- Redirection automatique après la connexion et la déconnexion

## Technologies utilisées

- [Next.js](https://nextjs.org/) - Framework React pour le développement d'applications web
- [NextAuth.js](https://next-auth.js.org/) - Solution d'authentification pour Next.js
- [PostgreSQL](https://www.postgresql.org/) - Système de gestion de base de données relationnelle
- [Vercel](https://vercel.com/) - Plateforme de déploiement pour les applications Next.js

## Installation

1. Clonez le dépôt :
   git clone https://github.com/ThimotheeT/my-wallet.git

2. Accédez au répertoire du projet :
   cd my-wallet

3. Installez les dépendances :
   npm install

## Configuration

Créez un fichier .env à la racine du projet et ajoutez les variables d'environnement suivantes :

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=VotreCléSecrète
DATABASE_URL=postgres://user:password@localhost:5432/votre_base_de_données

Remplacez user, password, et votre_base_de_données par vos informations de connexion PostgreSQL.
Exécutez les migrations de la base de données si nécessaire.

## Utilisation

1. Démarrez le serveur de développement :
    npm run dev

2. Ouvrez votre navigateur et accédez à http://localhost:3000.

3. Inscrivez-vous ou connectez-vous pour commencer à utiliser l'application.

## Contributions

Les contributions sont les bienvenues ! Si vous souhaitez contribuer à ce projet, veuillez suivre ces étapes:

1. Forkez le projet.

2. Créez une nouvelle branche (git checkout -b feature/nom-de-la-fonctionnalité).

3. Apportez vos modifications et validez-les (git commit -m 'Ajout d'une nouvelle fonctionnalité').

4. Poussez vos modifications (git push origin feature/nom-de-la-fonctionnalité).

5. Ouvrez une Pull Request.

## Contributions

Ce projet est sous licence MIT. Consultez le fichier LICENSE pour plus de détails.