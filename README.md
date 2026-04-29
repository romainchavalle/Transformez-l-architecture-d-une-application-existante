# 📝 Notes App - Refonte Architecturale (API REST & React SPA)

## 📖 Description du Projet
Ce projet est le résultat de la refonte architecturale d'une application de prise de notes (initialement conçue comme un monolithe Laravel avec Blade et Livewire). 
L'application a été entièrement réécrite pour adopter une architecture moderne, découplée et évolutive :
- Un **Back-end API REST** sécurisé et robuste.
- Un **Front-end Single Page Application (SPA)** dynamique.

## 🚀 Architecture Cible & Technologies

### 1. Back-End (API REST)
- **Framework :** Laravel 12
- **Base de données :** SQLite
- **Sécurité :** Authentification par jetons via **Laravel Sanctum** (Bearer Tokens).
- **Conception :** Application des principes **SOLID** :
  - Routage API isolé (`routes/api.php`).
  - Validation déportée dans des `FormRequests` dédiés.
  - Logique métier encapsulée dans des `Services` (SRP).
  - Contrôleurs allégés (Skinny Controllers).

### 2. Front-End (SPA Client)
- **Environnement :** React + Vite (pour des performances de développement optimales).
- **State Management :** **Zustand**, utilisé pour sa légèreté et sa simplicité dans la gestion de l'état global.
- **Client HTTP :** **Axios**, configuré avec un système d'intercepteurs pour l'injection automatique et transparente des tokens de sécurité.
- **Routage :** React Router avec mise en place de "Guards" pour protéger l'accès aux routes privées.
- **Structure :** Architecture "Feature-based" (regroupement par domaine fonctionnel : Notes, Auth) favorisant la maintenabilité.

## 🛠️ Installation & Démarrage Local

L'application étant découplée, le serveur API et le client Front-end doivent être démarrés séparément dans deux terminaux.

### Étape 1 : Démarrer le Backend (API Laravel)
Depuis la racine du projet :

```bash
# 1. Installer les dépendances PHP
composer install

# 2. Configurer le fichier d'environnement
cp .env.example .env
php artisan key:generate

# 3. Initialiser la base de données SQLite
touch database/database.sqlite
php artisan migrate --seed

# 4. Lancer le serveur local
php artisan serve

### Étape 2 : Démarrer le FrontEnd (react)

# 1. Se rendre dans le répertoire front
cd frontend

# 2. Installer les dépendances Node.js
npm install

# 3. Lancer le serveur de développement Vite
npm run dev
