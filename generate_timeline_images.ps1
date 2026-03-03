# Downloads AI-generated timeline images into assets/timeline-ai with fixed filenames.
# Run from the SecretForAnniversary folder:
#   powershell -ExecutionPolicy Bypass -File .\generate_timeline_images.ps1

$ErrorActionPreference = 'Stop'

$outDir = Join-Path $PSScriptRoot 'assets\timeline-ai'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$items = @(
  @{ File='01-first-meeting.png'; Prompt='Romantic illustration of one young man and one young woman meeting in a temple, both faces clear, full body, warm pastel colors, no text' },
  @{ File='02-he-said-yes.png'; Prompt='Romantic illustration of a boy and girl smiling and saying yes, full body characters, emotional expressions, soft pink background, no text' },
  @{ File='03-first-held-hands.png'; Prompt='Romantic illustration of one young man and one young woman holding hands, clear faces, full body, dreamy pastel style, no text' },
  @{ File='04-first-kiss.png'; Prompt='Elegant romantic illustration of a boy and girl sharing their first kiss, full body, tasteful pose, cinematic pastel lighting, no text' },
  @{ File='05-engaged.png'; Prompt='Romantic engagement scene, man and woman exchanging rings, both clearly visible, full body, warm celebratory style, no text' },
  @{ File='06-married.png'; Prompt='Wedding illustration of bride and groom standing together happily, full body, clear faces, romantic soft lighting, no text' },
  @{ File='07-moshika-born.png'; Prompt='Family illustration of father, mother, and one baby girl together, loving expressions, full body, warm pastel style, no text' }
)

function Get-AiUrl([string]$prompt, [int]$seed) {
  $enc = [System.Uri]::EscapeDataString($prompt)
  # Note: This uses an online AI image endpoint. If your network blocks it, downloads will fail.
  return "https://image.pollinations.ai/prompt/$enc?width=1024&height=1024&seed=$seed&model=flux&enhance=true&nologo=true&format=png"
}

$seedBase = 1200

foreach ($it in $items) {
  $filePath = Join-Path $outDir $it.File
  $url = Get-AiUrl -prompt $it.Prompt -seed ($seedBase++)

  Write-Host "Generating $($it.File)" -ForegroundColor Cyan
  Write-Host "  $url" -ForegroundColor DarkGray

  $ok = $false
  for ($try = 1; $try -le 3; $try++) {
    try {
      Invoke-WebRequest -Uri $url -OutFile $filePath -MaximumRedirection 5 -TimeoutSec 120
      $len = (Get-Item $filePath).Length
      if ($len -lt 5000) {
        throw "Downloaded file too small ($len bytes)."
      }
      $ok = $true
      break
    } catch {
      Write-Host "  Attempt $try failed: $($_.Exception.Message)" -ForegroundColor Yellow
      Start-Sleep -Seconds (2 * $try)
    }
  }

  if (-not $ok) {
    Write-Host "FAILED: $($it.File)" -ForegroundColor Red
  } else {
    $sizeKb = [math]::Round(((Get-Item $filePath).Length / 1KB), 0)
    Write-Host "  Saved -> $filePath ($sizeKb KB)" -ForegroundColor Green
  }
}

Write-Host "Done." -ForegroundColor Green
