#!/bin/zsh

# Check si un paramètre existe bien
if [ -z "$1" ]; then
    echo "Un message de commit est requis."
    exit 1
fi

# Compile l'API (ts -> js)
npx tsc

# Aller à la racine du repo
cd ..

# Push aussi sur cette branche
git add . && git commit -m "$1" && git push

# Obtenir le nom de la branche courante
current_branch=$(git rev-parse --abbrev-ref HEAD)

echo "Branche actuelle : $current_branch"

# Changement pour la branche backend_deploy
git checkout backend_deploy

# Mise à jour de la branche backend_deploy
git pull origin backend_deploy

# Fusion de la branche actuelle dans backend_deploy
git merge $current_branch

# Push to repo
git add . && git commit -m "$1" && git push

# Retour à la branche initiale
git checkout $current_branch

echo "Déploiement sur 'backend_deploy' terminé avec succès."

# Revenir dans le dossier backe
cd backend/