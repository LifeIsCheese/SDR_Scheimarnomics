# Social Democracy: An Alternate History

An interactive fiction game written in [Dendry](https://github.com/aucchen/dendry)
and built with [DendryNexus](https://github.com/aucchen/dendrynexus).

This repository is the *Scheimarnomics* submod of the game. Notes on what the
submod adds (assassination plots, the Reichsbank / interest rate and devaluation
systems, the spy network, the 1930s civil war) are in the in-game "Mod info"
screen, whose text lives in `source/scenes/mod_info.scene.dry`. A list of
changes is kept in `changes.txt`.

All story and game data lives in `source/`:

- `source/info.dry` - title, author, IFID
- `source/scenes/**/*.scene.dry` - scenes (including `scenes/events/` for
  triggered events and `scenes/advisors/` for advisor cards)
- `source/qdisplays/*.qdisplay.dry` - number-to-text display tables

## Included Libraries

[jquery v1.11.1](https://releases.jquery.com/)

[d3.js v7](https://d3js.org)

[d3-parliament](https://github.com/geoffreybr/d3-parliament)

## Requirements

- [Node.js](https://nodejs.org/) (built and tested with v24.12.0)
- Git - `dendrynexus` is installed as a git dependency

## Building the game

1. Install the dependencies (this fetches `dendrynexus` from GitHub):

   ```
   npm install
   ```

   Windows note: if PowerShell refuses to run npm with *"File npm.ps1 cannot be
   loaded because running scripts is disabled on this system"*, the execution
   policy is blocking `npm.ps1`. Call `npm.cmd` directly instead, or run the
   command in `cmd.exe`:

   ```
   npm.cmd install
   ```

2. Build the HTML game. This compiles the `.dry` sources into `out/game.json`
   and writes the playable page into `out/html/`:

   ```
   npx dendrynexus make-html --pretty
   ```

   The equivalent npm script (the one CI runs) is:

   ```
   npm run dendrynexus make-html -- --pretty
   ```

3. Copy the compiled game data next to the HTML page so the browser can fetch
   it (the same step CI performs):

   ```
   copy out\game.json out\html\          (cmd.exe)
   Copy-Item out/game.json out/html/     (PowerShell)
   ```

4. Open `out/html/index.html` in a browser, or serve `out/html/` with any
   static file server.

### Useful build commands

| Command | Purpose |
| --- | --- |
| `npx dendrynexus compile -f` | Recompile every `.dry` source into `out/game.json`, even if it looks up to date |
| `npx dendrynexus make-html --pretty` | Compile, then build the HTML page into `out/html/` |
| `npx dendrynexus make-html --pretty --overwrite` | Also overwrite the files meant for customization (`out/html/index.html`, `out/html/game.js`, `out/html/game.css`). This **replaces** the dark-mode tweaks and content currently in `out/html/`, so use it deliberately |
| `npx dendrynexus <COMMAND> --help` | Options for `compile`, `make-html`, `make-book`, `new`, `run`, `random-test`, `view-content`, ... |

Note: a normal `make-html` only refreshes `out/game.json`, `out/html/core.js`
and `out/html/jquery-1.11.1.min.js`. The page loads the game data from
`out/html/game.json` (step 3), which is why the copy step is needed.

### Line endings matter (`.dry` files must stay LF)

The dendrynexus content parser mis-parses **CRLF** files: its blank-line regex
(`^[ \t]*\n`) also matches the `\n` half of a CRLF pair, so every line break
inside a multi-line conditional (`[? if condition : ... ?]`) is treated as a
paragraph break. The build then aborts with

```
TypeError: Cannot read properties of undefined (reading 'type')
    at _extractPredicate (.../dendrynexus/lib/parsers/content.js)
```

printed above the offending scene text. `.gitattributes` pins `*.dry` to
`text eol=lf` so this cannot come back on Windows checkouts (where
`core.autocrlf=true` would otherwise convert the LF blobs to CRLF). If that
error appears, check `git config core.autocrlf` and re-check out the sources so
the `.dry` files are LF again.

### CI

`.github/workflows/build.yaml` builds on every push to `main`
(`npm install`, `npm run dendrynexus make-html -- --pretty`,
`cp out/game.json out/html/`) and deploys `out/html` to GitHub Pages.

## Debugging

The UI bundle is `out/html/game.js` and the engine is `out/html/core.js`. The
live state is available in the browser console:

```javascript
dendryUI.dendryEngine.state            // all state
dendryUI.dendryEngine.state.qualities  // game qualities (Q.*)
```

## Updating dendrynexus

To update dendrynexus in `package-lock.json`, run:

```
npm install --upgrade https://github.com/aucchen/dendrynexus
```