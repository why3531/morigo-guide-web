#!/usr/bin/env bash
set -euo pipefail

message="${*:-Update site}"

git add .

if git diff --cached --quiet; then
  echo "No staged changes to commit."
else
  git commit -m "$message"
fi

git push origin main
