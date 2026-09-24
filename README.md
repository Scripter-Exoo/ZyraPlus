# ZyraPlus

A local-first Lua/Luau source transformation web app with a deliberately bounded VM preview.

## Run

```bash
npm start
```

Open `http://localhost:3000`.

The app supports pasted source and `.lua`/`.luau` uploads, conservative local-variable renaming, comment removal, downloadable output, bytecode inspection, and VM execution for a restricted subset. It does not include anti-detection, executor bypasses, payload delivery, or security-evasion functionality.
