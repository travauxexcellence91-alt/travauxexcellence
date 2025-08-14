# 🏗️ TRAVAUX EXCELLENCE

**Plateforme de mise en relation entre artisans et clients pour des travaux de rénovation**

## 📁 Structure du Projet

```
travauxexcellence/
├── 📱 web/           # Application React Frontend
├── ⚙️ backend/       # API Node.js + Express
└── 🛠️ admin/         # Interface d'administration
```

## 🚀 Technologies Utilisées

### Frontend (web/)
- **React 18** + **TypeScript**
- **Tailwind CSS** pour le design
- **React Router** pour la navigation
- **Socket.io** pour le temps réel

### Backend (backend/)
- **Node.js** + **Express**
- **MongoDB** avec **Mongoose**
- **JWT** pour l'authentification
- **API SIRET** pour la validation des entreprises

### Admin (admin/)
- **Interface d'administration** pour la gestion
- **Dashboard** pour les statistiques
- **Gestion des utilisateurs** et projets

## ✨ Fonctionnalités Principales

### 🔐 Authentification
- Inscription/Connexion **Clients** et **Artisans**
- Validation **SIRET** en temps réel
- Profils personnalisés

### 🏠 Gestion des Projets
- **Publication** de projets de rénovation
- **Catégorisation** intelligente (maçonnerie, électricité, etc.)
- **Système de devis** et de mise en relation

### 🎯 Dashboard Artisan
- **Gestion des leads** reçus
- **Profil professionnel** avec secteurs d'activité
- **Suivi** des projets acceptés

### 🏠 Dashboard Client
- **Suivi** des projets publiés
- **Gestion** des devis reçus
- **Historique** des travaux

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+
- MongoDB
- Git

### Installation
```bash
# Cloner le repository
git clone https://github.com/travauxexcellence91-alt/travauxexcellence.git
cd travauxexcellence

# Installer les dépendances
cd web && npm install
cd ../backend && npm install
cd ../admin && npm install

# Démarrer les services
cd ../backend && npm run dev
cd ../web && npm start
cd ../admin && npm start
```

## 🔧 Configuration

### Variables d'environnement (backend/.env)
```env
MONGODB_URI=mongodb://localhost:27017/travaux
JWT_SECRET=your_jwt_secret
PORT=3001
```

### Variables d'environnement (web/.env)
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_SOCKET_URL=http://localhost:3001
```

## 📱 Captures d'écran

- **Page d'accueil** avec recherche d'artisans
- **Interface de publication** de projets
- **Dashboard artisan** avec gestion des leads
- **Validation SIRET** en temps réel

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

- **Email** : contact@travaux-excellence.fr
- **Site web** : [TRAVAUX EXCELLENCE](https://travaux-excellence.fr)

---

**Développé avec ❤️ pour simplifier la rénovation immobilière**
