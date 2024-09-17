# My Wallet V1

My Wallet est une application web de gestion de portefeuille qui permet aux utilisateurs de s'inscrire, de se connecter et de gérer leurs finances personnelles. Cette application utilise Next.js et NextAuth.js pour l'authentification.

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
- Gestion du portefeuille, ajout, retrait, reset

## Technologies utilisées

- [Next.js](https://nextjs.org/) - Framework React pour le développement d'applications web
- [NextAuth.js](https://next-auth.js.org/) - Solution d'authentification pour Next.js
- [PostgreSQL](https://www.postgresql.org/) - Système de gestion de base de données relationnelle
- [Vercel](https://vercel.com/) - Plateforme de déploiement pour les applications Next.js

## Installation

1. Clonez le dépôt :
   'git clone https://github.com/ThimotheeT/my-wallet.git'

2. Accédez au répertoire du projet :
   'cd my-wallet'

3. Installez les dépendances :
   'npm install'

## Configuration

Créez un fichier .env à la racine du projet et ajoutez les variables d'environnement suivantes :

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=VotreCléSecrète
DATABASE_URL=postgres://user:password@localhost:5432/votre_base_de_données

Remplacez user, password, et votre_base_de_données par vos informations de connexion PostgreSQL.
Exécutez les migrations de la base de données si nécessaire.

## Utilisation

1. Démarrez le serveur de développement :
    'npm run dev'

2. Ouvrez votre navigateur et accédez à http://localhost:3000.

3. Inscrivez-vous ou connectez-vous pour commencer à utiliser l'application.

## Contributions

Les contributions sont les bienvenues ! Si vous souhaitez contribuer à ce projet, veuillez suivre ces étapes:

1. Forkez le projet.

2. Créez une nouvelle branche ('git checkout -b feature/nom-de-la-fonctionnalité').

3. Apportez vos modifications et validez-les ('git commit -m "Ajout d'une nouvelle fonctionnalité"').

4. Poussez vos modifications ('git push origin feature/nom-de-la-fonctionnalité').

5. Ouvrez une Pull Request.

## Licence

Ce projet est sous licence MIT. Consultez le fichier LICENSE pour plus de détails.



# My Wallet V1

My Wallet is a web application for portfolio management that allows users to sign up, log in, and manage their personal finances. This application uses Next.js and NextAuth.js for authentication.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributions](#contributions)
- [License](#license)

## Features

- User registration and login
- Session management with NextAuth.js
- Responsive user interface
- Automatic redirection after login and logout
- Wallet management, add funds, withdraw funds, reset wallet

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for web application development
- [NextAuth.js](https://next-auth.js.org/) - Authentication solution for Next.js
- [PostgreSQL](https://www.postgresql.org/) - Relational database management system
- [Vercel](https://vercel.com/) - Deployment platform for Next.js applications

## Installation

1. Clone the repository:
   'git clone https://github.com/ThimotheeT/my-wallet.git'

2. Navigate to the project directory:
   'cd my-wallet'

3. Install the dependencies:
   'npm install'

## Configuration

Create a .env file at the root of the project and add the following environment variables:

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=YourSecretKey
DATABASE_URL=postgres://user:password@localhost:5432/your_database_name

Replace user, password, and your_database_name with your PostgreSQL connection information. Run the database migrations if necessary.

## Usage

1. Start the development server:
   'npm run dev'

2. Open your browser and go to http://localhost:3000.

3. Sign up or log in to start using the application.

## Contributions

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the project.

2. Create a new branch ('git checkout -b feature/feature-name').

3. Make your changes and commit them ('git commit -m "Add a new feature"').

4. Push your changes ('git push origin feature/feature-name').

5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.