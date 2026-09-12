from pathlib import Path
from PIL import Image

SOURCE = Path("/home/ubuntu/webdev-static-assets/dr-vickis-tech-talk")
TARGET = Path(__file__).resolve().parents[1] / "pages-assets"
TARGET.mkdir(parents=True, exist_ok=True)

FILES = {
    "hero-editorial.jpg": "hero-editorial.jpg",
    "ai-excel-formulas.jpg": "ai-excel-formulas.jpg",
    "ai-spreadsheet-analysis.jpg": "ai-spreadsheet-analysis.jpg",
    "git-time-machine.jpg": "git-time-machine.jpg",
    "terminal-workflow.jpg": "terminal-workflow.jpg",
    "ai-agents.jpg": "ai-agents.jpg",
    "privacy.jpg": "privacy.jpg",
    "spatial-computing.jpg": "spatial-computing.jpg",
}

for source_name, target_name in FILES.items():
    source_path = SOURCE / source_name
    target_path = TARGET / target_name
    if not source_path.exists():
        raise FileNotFoundError(f"Missing source image: {source_path}")

    with Image.open(source_path) as image:
        image = image.convert("RGB")
        image.thumbnail((1600, 1200), Image.Resampling.LANCZOS)
        image.save(target_path, "JPEG", quality=82, optimize=True, progressive=True)
        print(f"Prepared {target_path.name}: {image.width}x{image.height}, {target_path.stat().st_size} bytes")
