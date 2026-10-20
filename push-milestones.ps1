# Pushes each VibeTrack milestone to GitHub one at a time: commit first, then its tag.
# Run from the repo folder:   powershell -ExecutionPolicy Bypass -File .\push-milestones.ps1
# Add -Pause to stop after every tag (e.g. to watch the hackathon dashboard update).
param([switch]$Pause, [int]$DelaySeconds = 5)
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

# 1. Bring the milestone commits and tags in from the bundle.
git fetch .\vibetrack-milestones.bundle "refs/heads/main:refs/remotes/bundle/main" "refs/tags/*:refs/tags/*"
if ($LASTEXITCODE -ne 0) { throw "Could not read the bundle." }

# 2. Push in milestone order. Tags on the same commit go out together.
$steps = @(
  @('git-linked'),
  @('design-done'),
  @('data-model'),
  @('crud-modal'),
  @('tag-style'),
  @('task-owner'),
  @('due-tint'),
  @('context'),
  @('copy-prompt'),
  @('anchors', 'project-deliverables'),
  @('secret-sauce'),
  @('prd-done'),
  @('pitch-ready')
)

foreach ($tags in $steps) {
  $commit = (git rev-list -n 1 $tags[0]).Trim()
  Write-Host "`n==> $($tags -join ' + ')  ($($commit.Substring(0,7)))" -ForegroundColor Cyan
  git push origin "$($commit):refs/heads/main"
  if ($LASTEXITCODE -ne 0) { throw "Pushing the commit for $($tags[0]) failed - stopping here." }
  foreach ($t in $tags) {
    git push origin "refs/tags/$t"
    if ($LASTEXITCODE -ne 0) { throw "Pushing tag $t failed - stopping here." }
  }
  if ($Pause) { Read-Host "Pushed. Press Enter for the next milestone" | Out-Null }
  else { Start-Sleep -Seconds $DelaySeconds }
}

# 3. Move your local main (and your files) to the finished version.
git merge --ff-only refs/remotes/bundle/main
Write-Host "`nAll milestones pushed. Your local folder is up to date." -ForegroundColor Green
