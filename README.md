# Foto-Collage (PWA)

Eine Progressive Web App zum Erstellen von Foto-Collagen direkt im Browser:

- Vorlage waehlen (z. B. 2x2, 3x3, flexibel konfigurierbar)
- Fotos hochladen
- Bildausschnitte pro Feld anpassen
- Reihenfolge der Bilder per Drag-and-drop aendern
- Collage als PNG exportieren

Die App laeuft komplett clientseitig und benoetigt kein Backend.

## Features

- 4-Schritt-Workflow fuer schnelle Collage-Erstellung
- Flexible Raster (Zeilen/Spalten frei konfigurierbar)
- Drag-and-drop Upload
- Feinschliff des Bildausschnitts pro Feld
- Drag-and-drop Sortierung der Bildfelder
- PNG-Export (Exportbreite und Randabstand einstellbar)
- Mehrsprachig: Deutsch, Englisch, Franzoesisch
- Automatische Sprachwahl anhand der Browsersprache
- Einstellungen-Dialog mit Update-Pruefung
- PWA mit Service Worker und Offline-Cache

## Projektstruktur

- `index.html` - UI-Struktur
- `styles.css` - Styling und responsive Layout
- `app.js` - App-Logik (Wizard, Editing, i18n, Update-Check)
- `service-worker.js` - Caching und Update-Verhalten
- `manifest.json` - PWA-Metadaten
- `version.json` - App- und Cache-Version fuer Update-Pruefung
- `start-server.ps1` - Lokaler statischer Server (Port 5000)

## Lokaler Start

Voraussetzung: PowerShell unter Windows.

```powershell
.\start-server.ps1
```

Dann im Browser oeffnen:

`http://localhost:5000/`

Optional anderer Port:

```powershell
.\start-server.ps1 -Port 5050
```

## Update- und Versionierungslogik

- `version.json` enthaelt:
  - `appVersion`
  - `cacheVersion`
  - `label`
- In den Einstellungen kann ueber **Auf Update pruefen** eine neue Version erkannt werden.
- Bei neuer Version wird **Neu laden** angeboten.
- Der Service Worker cached statische Assets und behandelt `version.json` mit Netz-Prioritaet (Fallback auf Cache).

## GitHub-Publikation

Empfohlene Schritte:

```bash
git init
git add .
git commit -m "Initial release: Foto-Collage PWA"
git branch -M main
git remote add origin <DEIN_GITHUB_REPO_URL>
git push -u origin main
```

Falls bereits ein Git-Repository existiert, nur `add/commit/push` verwenden.

## Lizenz

Dieses Projekt steht unter der Apache License 2.0.
Siehe [LICENSE](./LICENSE).
