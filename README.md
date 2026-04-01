# Foto-Collage (PWA)

![Foto-Collage Icon](./icon-192.png)

Eine Progressive Web App zum Erstellen von Foto-Collagen direkt im Browser:

- Vorlage waehlen (z. B. 2x2, 3x3, flexibel konfigurierbar)
- Fotos hochladen
- Bildausschnitte pro Feld anpassen
- Reihenfolge der Bilder per Drag-and-drop aendern
- Collage als PNG exportieren

Die App laeuft komplett clientseitig und benoetigt kein Backend.

Repository: [https://github.com/marsrakete/fotocollage](https://github.com/marsrakete/fotocollage)

## Installation (PWA)

### Fuer normale Anwender (empfohlen)

1. App direkt im Browser oeffnen:

[https://marsrakete.github.io/fotocollage/](https://marsrakete.github.io/fotocollage/)

2. Als App installieren:
- Edge/Chrome Desktop: Adressleiste -> App installieren
- Android (Chrome/Edge): Menue -> App installieren / Zum Startbildschirm
- iOS (Safari): Teilen -> Zum Home-Bildschirm

### Fuer Nerds (lokal ueber localhost)

1. Server starten:

```powershell
.\start-server.ps1
```

2. App im Browser oeffnen:

`http://localhost:5000/`

Optional anderer Port:

```powershell
.\start-server.ps1 -Port 5050
```

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

## Hinweise fuer Programmierer: Presets konfigurieren

Die Vorlagen sind in `app.js` in `const PRESETS = [...]` definiert.

Jedes Preset hat:

- `id`: technische Kennung
- `label`: Anzeigename
- `rows` und `cols`: Basisraster
- `slots`: Liste der Bildflaechen mit Position und Ausdehnung

Ein Slot hat die Form:

```js
{ x: 0, y: 1, w: 2, h: 1 }
```

Bedeutung:

- `x`, `y`: Startzelle im Raster (0-basiert)
- `w`, `h`: Breite/Hoehe in Rasterzellen

Beispiel fuer ein asymmetrisches Preset:

```js
{
  id: "mosaic-top1-bottom2",
  label: "Oben 1, unten 2",
  rows: 2,
  cols: 2,
  slots: [
    { x: 0, y: 0, w: 2, h: 1 },
    { x: 0, y: 1, w: 1, h: 1 },
    { x: 1, y: 1, w: 1, h: 1 },
  ],
}
```

### Was `createGridSlots(rows, cols)` macht

`createGridSlots(...)` erzeugt automatisch ein gleichmaessiges Standardraster:  
Fuer jede Rasterzelle wird ein Slot mit `w: 1` und `h: 1` erstellt.

Beispiel:

```js
createGridSlots(2, 2)
```

ergibt sinngemaess:

```js
[
  { x: 0, y: 0, w: 1, h: 1 },
  { x: 1, y: 0, w: 1, h: 1 },
  { x: 0, y: 1, w: 1, h: 1 },
  { x: 1, y: 1, w: 1, h: 1 },
]
```

Das ist praktisch fuer klassische `2x2`, `3x3`, `2x3` usw., ohne die Slots einzeln zu schreiben.

## Update- und Versionierungslogik

- `version.json` enthaelt:
  - `appVersion`
  - `cacheVersion`
  - `label`
- In den Einstellungen kann ueber **Auf Update pruefen** eine neue Version erkannt werden.
- Bei neuer Version wird **Neu laden** angeboten.
- Der Service Worker cached statische Assets und behandelt `version.json` mit Netz-Prioritaet (Fallback auf Cache).

## Warum mindestens einmal ein Server noetig ist

Eine PWA basiert auf `manifest.json` und `service-worker.js`.  
Service Worker werden von Browsern nur in einem sicheren Kontext akzeptiert:

- `https://...` (normaler Betrieb, z. B. GitHub Pages)
- oder `http://localhost` (lokale Entwicklung)

Wenn du nur `index.html` direkt als Datei (`file://...`) oeffnest:
- kein Service Worker
- kein echtes Offline-Caching
- keine vollstaendige PWA-Installation

Deshalb muss die App mindestens einmal ueber HTTPS oder localhost geladen werden.

Lokalen Server starten (Nerd-Variante):

```powershell
.\start-server.ps1
```

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

## Urheber und Kontakt

- Urheber: millux
- Kontakt: [millux@marsrakete.de](mailto:millux@marsrakete.de)
