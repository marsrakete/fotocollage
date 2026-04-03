# Foto-Collage (PWA)

![Foto-Collage Icon](./icon-192.png)

Eine Progressive Web App zum Erstellen von Foto-Collagen direkt im Browser:

- Vorlage waehlen (z. B. 2x2, 3x3, flexibel konfigurierbar)
- Fotos laden
- Bildausschnitte pro Feld anpassen
- Reihenfolge der Bilder per Drag-and-drop aendern
- Text pro Bildfeld platzieren und verschieben
- Wasserzeichen im Export einblenden
- Collage als PNG, JPEG, PDF oder GIF exportieren

Die App laeuft komplett clientseitig und benoetigt kein Backend.
Die Fotos werden nirgends hochgeladen. Sie bleiben auf deinem Geraet!

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
- Viele Presets inkl. asymmetrischer Layouts und freier Einheiten-Presets
- Flexible Raster (Zeilen/Spalten frei konfigurierbar)
- Drag-and-drop Upload
- Upload-Limit passend zur Anzahl der benoetigten Felder
- Feinschliff des Bildausschnitts pro Feld
- Drag-and-drop Sortierung der Bildfelder
- Feld-Textoverlay (Schriftart, Groesse, Fett/Kursiv, Farbe, Position)
- Wasserzeichen (Text, Position, Schriftart, Groesse, Farbe, persistent speicherbar)
- Export in PNG/JPEG/PDF/GIF inkl. Teilen-Funktion
- Export-Presets (freie Formate + Social-Media-Formate)
- Mehrsprachig: Deutsch, Englisch, Franzoesisch
- Automatische Sprachwahl anhand der Browsersprache
- Einstellungen-Dialog mit Update-Pruefung
- PWA mit Service Worker und Offline-Cache

## Export-Formate

In Schritt 4 kann zwischen folgenden Formaten gewechselt werden:

- `PNG`: verlustfrei, gut fuer Nachbearbeitung
- `JPEG`: kleinere Datei, leichte Kompression
- `PDF`: Einzelseite mit eingebettetem Bild
- `GIF`: animiert, zeigt Bilder nacheinander

Hinweise zu GIF:

- Die GIF-Breite ist fest auf `800 px` gesetzt, damit Dateigroesse und Renderzeit besser kontrollierbar bleiben.
- Die Option `Sekunden zwischen Frames` ist nur bei GIF aktiv.
- Bei GIF wird jeweils ein Bild pro Frame zentriert dargestellt.

## Export-Presets

Schritt 4 enthaelt Export-Presets in zwei Gruppen:

- `Freie Formate`: z. B. `1:1`, `4:5`, `3:4`, `9:16`, `16:9`, `1:3`, `3:1`, `1:4`, `4:1`
- `Social Media`: z. B. Instagram Feed/Square/Landscape, Story/Reel, Facebook Feed, X, LinkedIn, Pinterest

Wichtig:

- `Frei` ist der Standard.
- Freie Formate lassen die Exportbreite weiterhin einstellbar.
- Social-Media-Presets setzen ein fixes Seitenverhaeltnis und eine sinnvolle Zielbreite.

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
- `label`: technischer Fallback-Name (falls keine Lokalisierung vorhanden ist)
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

### Preset-Lokalisierung

Die sichtbaren Preset-Texte werden ueber `const PRESET_LABELS = { ... }` in `app.js` lokalisiert.

Beispiel:

```js
"grid-1x4-square": {
  de: "1 x 4 (quadratisch)",
  en: "1 x 4 (square)",
  fr: "1 x 4 (carre)",
}
```

Fuer neue Presets:

1. Preset in `PRESETS` anlegen.
2. Passenden Eintrag mit gleicher `id` in `PRESET_LABELS` ergaenzen (`de`, `en`, `fr`).
3. Optional `label` im Preset als technischer Fallback belassen.

Wenn ein Sprachwert fehlt, faellt die App auf `de` und danach auf `label` zurueck.

Export-Presets sind separat in `const EXPORT_PRESET_LABELS = { ... }` lokalisiert (ebenfalls `de/en/fr`).

### Neue freie Einheiten-Presets

Es gibt freie Presets mit asymmetrischen Einheiten, zum Beispiel:

- `grid-3x1-tall3` -> 3 Bilder, jeweils 3 Einheiten hoch
- `grid-1x3-wide3` -> 3 Bilder, jeweils 3 Einheiten breit
- `grid-4x1-tall4` -> 4 Bilder, jeweils 4 Einheiten hoch
- `grid-1x4-wide4` -> 4 Bilder, jeweils 4 Einheiten breit

Weitere hinzugefuegte Vorlagen:

- `grid-1x4-square`, `grid-4x1-square`
- `grid-4x1-tall2`, `grid-1x4-wide2`
- `triptych-vertical`, `triptych-horizontal`

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
