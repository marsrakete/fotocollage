# Foto-Collage (PWA)

![Foto-Collage Icon](./icon-192.png)

Eine Progressive Web App zum Erstellen von Foto-Collagen direkt im Browser:

- Vorlage waehlen (z. B. 2x2, 3x3, Hero-Layouts, Hex-Layouts)
- Fotos laden
- Bildausschnitte pro Feld anpassen
- Reihenfolge der Bilder per Drag-and-drop aendern
- Text pro Bildfeld platzieren und verschieben
- Wasserzeichen im Export einblenden
- Collage als PNG, JPEG, PDF oder GIF exportieren

Die App laeuft komplett clientseitig und benoetigt kein Backend.
Die Fotos verlassen dein Geraet nicht.

Repository: [https://github.com/marsrakete/fotocollage](https://github.com/marsrakete/fotocollage)

## Schnellstart in 30 Sekunden

### Fuer Anwender

1. Oeffnen: [https://marsrakete.github.io/fotocollage/](https://marsrakete.github.io/fotocollage/)
2. Vorlage waehlen -> Fotos laden -> Feinschliff -> Export
3. Optional als PWA installieren (Browser-Menue: App installieren / Zum Home-Bildschirm)

### Fuer lokale Entwicklung

1. In PowerShell im Projektordner: `.\start-server.ps1`
2. Im Browser oeffnen: `http://localhost:5000/`
3. Preset-Builder (visuell): `http://localhost:5000/preset-builder.html`

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

Optional fuer Nerds:

- Preset-Builder (visuell): `http://localhost:5000/preset-builder.html`

## Features

- 4-Schritt-Workflow fuer schnelle Collage-Erstellung
- Viele Presets inkl. asymmetrischer Layouts und freier Einheiten-Presets
- Layout-Modi: `Raster` und `Hex-Pack` (kompakter Hex-Raster)
- Slot-Formen pro Feld: `rect`, `rounded-rect`, `circle`, `diamond`, `hexagon`
- Drag-and-drop Laden
- Lade-Limit passend zur Anzahl der benoetigten Felder
- Feinschliff des Bildausschnitts pro Feld direkt in der Vorschau
- Sortiermodus zum Umordnen der Bildfelder (Tap Quelle, Tap Ziel)
- Feld-Textoverlay (Schriftart, Groesse, Fett/Kursiv, Farbe, Position)
- Wasserzeichen (Text, Position, Schriftart, Groesse, Farbe, persistent speicherbar)
- EXIF-Metadaten (optional, fuer JPEG-Export)
- Export in PNG/JPEG/PDF/GIF inkl. Teilen-Funktion
- Export-Presets (freie Formate + Social-Media-Formate)
- Mehrsprachig: Deutsch, Englisch, Franzoesisch
- Automatische Sprachwahl anhand der Browsersprache
- Einstellungen-Dialog mit Update-Pruefung
- PWA mit Service Worker und Offline-Cache

## Schritt-fuer-Schritt (1 bis 4)

### Schritt 1: Vorlage waehlen

- Waehle ein Preset fuer die Collage (z. B. 2x2, 3x3, asymmetrische Vorlagen, Hex-Vorlagen).
- Waehle den Layout-Modus: `Raster` oder `Hex-Pack`.
- Stelle Abstand, Randabstand und Hintergrundfarbe ein.

### Schritt 2: Fotos laden

- Lade genau so viele Bilder, wie die gewaehlte Vorlage Felder hat.
- Auf Desktop geht auch Drag-and-drop in die Ladeflaeche.
- In der Slot-Uebersicht kannst du die Reihenfolge bereits anpassen.

### Schritt 3: Feinschliff

- Bearbeite direkt in der Vorschau:
- Ziehen verschiebt den Bildausschnitt.
- Mausrad (Desktop) oder Pinch (Mobil) aendert den Zoom.
- Text im Feld kann per Drag-and-drop frei positioniert werden.
- Nutze den Button `Sortieren`, um Bilder umzutauschen (Quelle antippen, Ziel antippen).
- Im Bereich `Aktives Feld` steuerst du Text/Formatierung sowie `Ausschnitt zuruecksetzen` und `Zoom zuruecksetzen`.
- Bei `Hex-Pack` stehen zusaetzlich 4 Slider (X/Y-Abstand und X/Y-Feldgroesse) sowie `Hex-Layout zuruecksetzen` bereit.

### Schritt 4: Export

- Waehle Export-Preset, Format (PNG/JPEG/PDF/GIF) und Breite.
- GIF nutzt einen Breitenbereich von `480 bis 800 px` und bietet die Frame-Dauer in Sekunden.
- Wenn in den Einstellungen `EXIF Felder schreiben` aktiv ist, werden beim JPEG-Export EXIF-Daten geschrieben.
- Teile die Collage direkt oder speichere sie als Datei.

## Export-Formate

In Schritt 4 kann zwischen folgenden Formaten gewechselt werden:

- `PNG`: verlustfrei, gut fuer Nachbearbeitung
- `JPEG`: kleinere Datei, leichte Kompression
- `PDF`: Einzelseite mit eingebettetem Bild
- `GIF`: animiert, zeigt Bilder nacheinander

Hinweise zu GIF:

- Die GIF-Breite ist per Slider auf `480 bis 800 px` begrenzt, damit Dateigroesse und Renderzeit besser kontrollierbar bleiben.
- Die Option `Sekunden zwischen Frames` ist nur bei GIF aktiv.
- Bei GIF wird jeweils ein Bild pro Frame zentriert dargestellt.

Hinweise zu EXIF (JPEG):

- EXIF wird nur fuer `JPEG` geschrieben (wenn aktiviert).
- Felder aus den Einstellungen:
  - `Artist` (Autor)
  - `Copyright`
  - `ImageDescription` (Bildbeschreibung)
  - `Software`
- `UserComment` wird aus dem Wasserzeichen-Text uebernommen.
- `DateTime`, `DateTimeOriginal` und `DateTimeDigitized` werden beim Export automatisch auf den aktuellen Zeitstempel gesetzt.

Hinweis zu `og:image` / `twitter:image`:

- Dafuer gibt es ein eigenes Export-Preset `Open Graph / Twitter` mit `1200 x 630`.
- Das ist ein Seitenverhaeltnis von `1.91:1`, optimiert fuer Link-Vorschauen.

## Layout- und Slot-Formate

- `Raster`: klassische rechteckige Platzierung.
- `Hex-Pack`: kompakter Hex-Raster mit reduzierten Leerraeumen.
- Slot-Formen je Feld: `rect`, `rounded-rect`, `circle`, `diamond`, `hexagon`.

## Export-Presets

Schritt 4 enthaelt Export-Presets in zwei Gruppen:

- `Freie Formate`: z. B. `1:1`, `4:5`, `3:4`, `9:16`, `16:9`, `1:3`, `3:1`, `1:4`, `4:1`
- `Social Media`: z. B. Instagram Feed/Square/Landscape, Story/Reel, Facebook Feed, Open Graph/Twitter, X, LinkedIn, Pinterest

Wichtig:

- `Frei` ist der Standard.
- Freie Formate lassen die Exportbreite weiterhin einstellbar.
- Social-Media-Presets setzen ein fixes Seitenverhaeltnis und eine sinnvolle Zielbreite.

Empfohlene Vorlagen je Export-Preset:

- `Frei`: alle Vorlagen; ideal zum exakten Beibehalten deines aktuellen Collage-Layouts.
- `Quadratisch (1:1)`: `2x2`, `3x3`, `1x1 links/rechts`, symmetrische Raster.
- `Portrait (4:5)` und `Portrait klassisch (3:4)`: `1x2`, `2x1 (2 Einheiten Hoehe)`, `oben 1 / unten 2`, `oben 1 / unten 3`.
- `Story Hochformat (9:16)`: vertikale Vorlagen wie `1x3`, `1x4`, `triptych-vertical`.
- `Breitbild (16:9)`: horizontale Vorlagen wie `3x1`, `4x1`, `triptych-horizontal`.
- `3x1 hoch (1:3)` und `4x1 hoch (1:4)`: sehr hohe Story- oder Pin-Motive mit wenigen, grossen Feldern.
- `1x3 breit (3:1)` und `1x4 breit (4:1)`: Banner, Header, Timeline-Motive.
- `Instagram Feed (4:5)`: Portrait-lastige Vorlagen (`oben 1 / unten 2`, `2x3`, `1x2`).
- `Instagram Quadrat (1:1)`: `2x2`, `3x3`, quadratische Misch-Layouts.
- `Instagram Quer (1,91:1)`: `3x1`, `4x1`, breite Mosaik-Vorlagen.
- `Story / Reel (9:16)`: `1x3`, `1x4`, vertikale Split-Layouts.
- `Facebook Feed (4:5)`: analog zu Instagram Feed; gut fuer Portrait-Collagen.
- `Open Graph / Twitter (1200x630)`: breite Vorlagen (`3x1`, `4x1`, `oben 3 / unten 1`) fuer Link-Cards.
- `X / Twitter (16:9)`: breite Vorlagen mit klarer Motivmitte, z. B. `3x1` oder `4x1`.
- `LinkedIn (1,91:1)`: breite Business-Layouts, z. B. `3x1`, `4x1`, `oben 3 / unten 1`.
- `Pinterest Pin (2:3)`: vertikale Vorlagen (`1x2`, `1x3`, `oben 1 / unten 2`).

## Projektstruktur

- `index.html` - UI-Struktur
- `styles.css` - Styling und responsive Layout
- `app.js` - App-Logik (Wizard, Editing, i18n, Update-Check)
- `service-worker.js` - Caching und Update-Verhalten
- `manifest.json` - PWA-Metadaten
- `version.json` - App- und Cache-Version fuer Update-Pruefung
- `start-server.ps1` - Lokaler statischer Server (Port 5000)

## Hinweise fuer Programmierer: Presets konfigurieren

Fuer schnelles Erstellen neuer Vorlagen gibt es einen visuellen Builder:

- Lokal: `http://localhost:5000/preset-builder.html`
- Erzeugt Copy-Paste-Code fuer `PRESETS` und `PRESET_LABELS`

### Preset-Builder (visuell)

Die Seite `preset-builder.html` ist ein separates Hilfstool (ohne PWA-Flow), um neue Vorlagen schnell zu bauen.

So funktioniert der Builder:

1. `rows` und `cols` einstellen und `Raster anwenden` klicken.
2. Im Raster per Drag ein Rechteck ziehen, um einen Slot zu erzeugen.
3. Im Bereich `Slots`:
   - Slot-Nummern einsehen (`#1`, `#2`, ...)
   - einzelne Slots entfernen
   - zwei Slots auswaehlen und mit `Auswahl verbinden` zusammenfuehren
4. Unten die erzeugten Codebloecke kopieren:
   - `PRESETS-Objekt`
   - `PRESET_LABELS-Eintrag`

Regeln fuer `Auswahl verbinden`:

- Es muessen genau 2 Slots ausgewaehlt sein.
- Verbinden geht nur, wenn Slots exakt angrenzen:
  - horizontal: gleiche `y` und `h`
  - vertikal: gleiche `x` und `w`
- Ueberlappungen mit anderen Slots sind nicht erlaubt.

Einbau in die App:

1. Preset-Objekt in `PRESETS` in `config/templates.config.js` einfuegen.
2. Sprachtexte in `PRESET_LABELS` in `config/templates.config.js` mit derselben `id` ergaenzen (`de`, `en`, `fr`).

Die Vorlagen sind in `config/templates.config.js` in `PRESETS` definiert.

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

Die sichtbaren Preset-Texte werden ueber `PRESET_LABELS` in `config/templates.config.js` lokalisiert.

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

Export-Presets sind separat in `config/export.config.js` ueber `EXPORT_PRESET_LABELS` lokalisiert (ebenfalls `de/en/fr`).

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
