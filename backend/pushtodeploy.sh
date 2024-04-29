#!/bin/zsh

# Compile l'API (ts -> js)
npx tsc

# Aller à la racine du repo
cd ..

# Push to repo
git add . && git commit -m "Push to deploy" && git push
