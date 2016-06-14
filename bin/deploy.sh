#!/bin/bash -e

npm run build && \
  cd dist && \
  git init && \
  git remote add origin git@github.com:mjmlio/mjml-app.git && \
  git add . && \
  git commit -m "deploy" && \
  git push -f origin master:gh-pages
  printf '\n> everything has been done, master.\n'
