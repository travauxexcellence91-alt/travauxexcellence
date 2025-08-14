# Guide de test - Système de secteurs et filtrage des projets

## 🎯 **Fonctionnalités ajoutées**

### **1. Sélection des secteurs lors de l'inscription des artisans**

- ✅ Composant `SectorSelector` avec checkboxes pour les secteurs
- ✅ Validation obligatoire (au moins 1 secteur)
- ✅ Icônes visuelles pour chaque secteur
- ✅ Intégration dans le formulaire d'inscription

### **2. Filtrage automatique des projets par secteur**

- ✅ Les artisans ne voient que les projets dans leurs secteurs
- ✅ Filtrage par ville en plus des secteurs
- ✅ Pagination des résultats
- ✅ Interface moderne avec cartes de projets

### **3. Sidebar artisan avec navigation**

- ✅ Tableau de bord avec statistiques
- ✅ Demandes de devis (projets disponibles)
- ✅ Projets acceptés (projets réservés)
- ✅ Gestion du profil

## 🚀 **Comment tester**

### **1. Configuration de l'API SIRENE**

```bash
# Dans le dossier backend/
cp src/env.example .env

# Remplir les variables dans .env :
SIRENE_CLIENT_ID=votre_client_id_ici
SIRENE_CLIENT_SECRET=votre_client_secret_ici
```

### **2. Démarrer le backend**

```bash
cd backend
npm install
npm run dev
```

### **3. Démarrer le frontend**

```bash
cd web
npm install
npm start
```

### **4. Tester l'inscription d'un artisan**

1. Aller sur `/register-artisan`
2. Saisir un SIRET valide (14 chiffres)
3. Vérifier que l'entreprise est trouvée
4. Sélectionner au moins un secteur d'activité
5. Compléter l'inscription

### **5. Tester le filtrage des projets**

1. Se connecter en tant qu'artisan
2. Aller dans "Demandes de devis"
3. Vérifier que seuls les projets dans ses secteurs sont visibles
4. Tester le filtrage par ville
5. Tester la réservation d'un projet

## 🔧 **Endpoints API modifiés**

### **POST /api/auth/register-artisan**

```json
{
  "email": "artisan@example.com",
  "password": "password123",
  "siret": "12345678901234",
  "companyInfo": {
    "companyName": "Entreprise Test",
    "addressLine1": "123 Rue Test",
    "city": "Paris",
    "postalCode": "75001"
  },
  "sectorIds": ["sector_id_1", "sector_id_2"]
}
```

### **GET /api/auth/search-company?siret=12345678901234**

```json
{
  "companyName": "Entreprise Test",
  "addressLine1": "123 Rue Test",
  "city": "Paris",
  "postalCode": "75001"
}
```

### **GET /api/leads?sectorIds[]=sector1&sectorIds[]=sector2&city=Paris**

- Filtre les projets par secteurs et ville
- Retourne uniquement les projets dans les secteurs de l'artisan

### **GET /api/me/leads?city=Paris&page=1&limit=10**

- Liste les projets acceptés par l'artisan
- Avec pagination et filtrage par ville

## 🎨 **Secteurs disponibles**

- 🎨 **Peinture** - `paint`
- 🔧 **Plomberie** - `pipe`
- ⚡ **Électricité** - `bolt`
- 🧱 **Maçonnerie** - `bricks`
- 🔲 **Carrelage** - `grid`
- 🏠 **Toiture** - `roof`
- 🔥 **Chauffage** - `fire`
- 🌿 **Jardin / Espaces verts** - `leaf`

## 🐛 **Dépannage**

### **Erreur "Missing SIRENE_CLIENT_ID/SECRET"**

- Vérifier que le fichier `.env` existe dans `backend/`
- Vérifier que les variables sont correctement remplies

### **Aucun projet visible**

- Vérifier que l'artisan a bien des secteurs sélectionnés
- Vérifier qu'il y a des projets créés dans ces secteurs
- Vérifier que les projets ont le statut "NEW"

### **Erreur de compilation TypeScript**

- Vérifier que `npm install` a été exécuté
- Vérifier que les types sont correctement importés

## 📱 **Interface utilisateur**

### **Inscription Artisan**

- Formulaire avec validation SIRET en temps réel
- Sélection des secteurs avec checkboxes visuelles
- Affichage des informations de l'entreprise trouvée

### **Dashboard Artisan**

- Sidebar avec navigation claire
- Tableau de bord avec statistiques
- Filtrage des projets par ville
- Cartes de projets avec actions (réserver/acheter)

## 🔄 **Flux de travail**

1. **Client crée un projet** → Sélectionne des secteurs
2. **Artisan s'inscrit** → Choisit ses secteurs d'activité
3. **Système filtre** → Montre uniquement les projets dans ses secteurs
4. **Artisan réserve** → Projet passe en statut "RESERVED"
5. **Artisan achète** → Projet passe en statut "SOLD"

## 📊 **Statistiques disponibles**

- Nombre de demandes disponibles dans ses secteurs
- Nombre de projets acceptés
- Nombre de secteurs actifs
- Vue d'ensemble de l'activité
