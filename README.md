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

## PWA installieren (Desktop + Mobil)

Die Installation erfolgt ueber den Browser, nachdem die App mindestens einmal per HTTP geladen wurde.

1. Lokalen Server starten:

```powershell
.\start-server.ps1
```

2. App im Browser oeffnen:

`http://localhost:5000/`

3. Installieren:
- Edge/Chrome Desktop: Adressleiste -> App installieren
- Android (Chrome/Edge): Menue -> App installieren / Zum Startbildschirm
- iOS (Safari): Teilen -> Zum Home-Bildschirm

### Warum mindestens einmal ein Server noetig ist

Eine PWA basiert auf `manifest.json` und `service-worker.js`.  
Service Worker werden von Browsern nur in einem sicheren Kontext akzeptiert:

- `https://...` (normaler Betrieb)
- oder `http://localhost` (lokale Entwicklung)

Wenn du nur `index.html` direkt als Datei (`file://...`) oeffnest:
- kein Service Worker
- kein echtes Offline-Caching
- keine vollstaendige PWA-Installation

Deshalb muss die App mindestens einmal ueber einen lokalen Server gestartet werden.

## Beispielfotos fuer Collagen

Kostenfreie Beispielbilder (Lorem Picsum), die du direkt fuer Tests nutzen kannst:

![Beispielfoto 1](https://picsum.photos/id/1015/1200/800)
![Beispielfoto 2](https://picsum.photos/id/1025/1200/800)
![Beispielfoto 3](https://picsum.photos/id/1035/1200/800)
![Beispielfoto 4](https://picsum.photos/id/1043/1200/800)

Tipps:
- Fuer `2 x 1` (oben/unten) funktionieren Landschaftsbilder gut.
- Fuer `1 x 2` (links/rechts) funktionieren Hochformate gut.

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
