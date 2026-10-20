#!/usr/bin/env bash
# Pushes each VibeTrack milestone to GitHub one at a time: commit first, then its tag.
# Run in Git Bash from the repo folder:   bash push-milestones.sh
# It pauses after every milestone; press Enter to continue.
set -e
cd "$(dirname "$0")"

# 1. Bring the milestone commits and tags in from the bundle.
git fetch ./vibetrack-milestones.bundle "refs/heads/main:refs/remotes/bundle/main" "refs/tags/*:refs/tags/*"

# 2. Push in milestone order. Tags on the same commit go out together.
steps=(
  "git-linked"
  "design-done"
  "data-model"
  "crud-modal"
  "tag-style"
  "task-owner"
  "due-tint"
  "context"
  "copy-prompt"
  "anchors project-deliverables"
  "secret-sauce"
  "prd-done"
  "pitch-ready"
)

for step in "${steps[@]}"; do
  read -r -a tags <<< "$step"
  commit=$(git rev-list -n 1 "${tags[0]}")
  echo
  echo "==> ${tags[*]}  (${commit:0:7})"
  git push origin "$commit:refs/heads/main"
  for t in "${tags[@]}"; do
    git push origin "refs/tags/$t"
  done
  read -r -p "Pushed. Check the dashboard, then press Enter for the next milestone... "
done

# 3. Move your local main (and your files) to the finished version.
git merge --ff-only refs/remotes/bundle/main
echo
echo "All milestones pushed. Your local folder is up to date."
