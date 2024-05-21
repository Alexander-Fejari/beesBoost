#!/bin/zsh

# Check si un paramètre existe bien
if [ -z "$1" ]; then
    echo "Un message de commit est requis."
    exit 1
fi

echo "Compiling:"

# Compile l'API (ts -> js)
npx tsc
npx ts-node ./src/api-docs/merge.api-docs.ts

echo "Compiling successfull and merging yaml files \n"

# Aller à la racine du repo
cd ..

# Obtenir le nom de la branche courante
current_branch=$(git rev-parse --abbrev-ref HEAD)

echo "Pushing to $current_branch :"

# Push aussi sur cette branche
git add . 
git commit -m "$1" 
git push origin $current_branch

echo "\n"

echo "Pushing on backend_deploy:" 

# Changement pour la branche backend_deploy
git checkout backend_deploy

# Mise à jour de la branche backend_deploy
git pull origin backend_deploy

# Fusion de la branche actuelle dans backend_deploy
git merge $current_branch --strategy-option theirs

# Push to repo
git push origin backend_deploy

echo "\n"

# Retour à la branche initiale
git checkout $current_branch

echo "Deployment on deploy_backend succesfull"

# Revenir dans le dossier backend
cd backend/