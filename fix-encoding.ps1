$file = "content\blog\3d-building-designer-skills-tools-workflow-career-growth-2025.json"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

Write-Host "Original size: $($content.Length) chars" -ForegroundColor Cyan

# Fix all malformed UTF-8 sequences
$fixed = $content
$fixed = $fixed.Replace('—€"', '—')  # em-dash corruption
$fixed = $fixed.Replace('—†'', '→')  # arrow corruption  
$fixed = $fixed.Replace('—£', '£')   # pound corruption
$fixed = $fixed.Replace('—‚¹', '₹')  # rupee corruption
$fixed = $fixed.Replace('2.3', '2.3×')  # multiply sign

Write-Host "After fix: $($fixed.Length) chars" -ForegroundColor Green

# Save with UTF-8 encoding
[System.IO.File]::WriteAllText($file, $fixed, [System.Text.Encoding]::UTF8)

Write-Host "✅ File saved!" -ForegroundColor Green

# Verify
$json = Get-Content $file | ConvertFrom-Json
Write-Host "`nTitle: $($json.title.Substring(0,50))..." -ForegroundColor Yellow
Write-Host "✅ JSON is valid!" -ForegroundColor Green
