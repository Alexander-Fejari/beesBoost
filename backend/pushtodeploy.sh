#!/bin/zsh

# Compile l'API (ts -> js)
npx tsc

# Aller à la racine du repo
cd ..

# Obtenir le nom de la branche courante
current_branch=$(git rev-parse --abbrev-ref HEAD)

echo "Branche actuelle : $current_branch"

# Vérification pour s'assurer qu'on n'est pas déjà sur 'backend_deploy'
if [[ "$current_branch" == "backend_deploy" ]]; then
  echo "Vous êtes déjà sur la branche 'backend_deploy'"
  exit 1
fi

# Changement pour la branche backend_deploy
git checkout backend_deploy

# Mise à jour de la branche backend_deploy
git pull origin backend_deploy

# Fusion de la branche actuelle dans backend_deploy
git merge $current_branch

# Push to repo
git add . && git commit -m "Push to deploy" && git push

# Retour à la branche initiale
git checkout $current_branch

echo "Déploiement sur 'backend_deploy' terminé avec succès."