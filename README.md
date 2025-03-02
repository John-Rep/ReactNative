# Bienvenue à l'application React Native qui est liée au projet Symfony-Library-API

## Avant de commencer

Vous aurez besoin de NodeJS pour lancer cette application sur votre ordinateur.
- https://nodejs.org/fr/download


Il faudra télécharger l'application Expo Go pour afficher cette application sur votre téléphone portable.
- https://expo.dev/go

  
Et finalement il faut créer un compte et installer ngrok - vous pouvez choisir votre système d'exploitation et suivre les étapes dans ce lien :
- https://dashboard.ngrok.com/get-started/setup/windows


## Préparer et lancer l'application

Avant de lancer l'application React Native, il faut avoir le lien pour l'API, donc vous pouvez d'abord lancer l'application dans le repository Symfony-Library-API avant de revenir ici pour la suite.

1. Pour installer les dépendances

   ```bash
   npm install
   ```

2. Copier le lien de l'API ngrok

   - Quand vous avez lancé l'application de l'API, vous avez reçu un lien qui termine avec .ngrok-free.app/
   - Copiez ce lien et collez-le dans le fichier index.tsx (app/(tabs)/index.tsx) pour remplacer la définition de la variable refURI de la ligne 7.

4. Pour démarrer l'application

   ```bash
    npx expo start --tunnel
   ```
   - Vous allez recevoir un code QR dans le texte qui s'affiche après cette commande. Scannez-le et ouvrez avec l'application Expo Go
