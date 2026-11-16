# Tokyo City Night — a color theme for the Claude desktop app

A [Claude Code mod](https://code.claude.com/docs/en/plugins/mods/overview) that repaints the **Code tab** of the Claude desktop app in a late-night Tokyo skyline palette: deep indigo surfaces, soft periwinkle text, and neon blue, purple and cyan picking out the city lights. The palette follows the [Tokyo Night editor theme](https://github.com/enkia/tokyo-night-vscode-theme).

## Palette

| Role | Color |
| --- | --- |
| Main text | `#c0caf5` periwinkle |
| Secondary text | `#a9b1d6` muted periwinkle |
| Muted text | `#9099c6` lavender-gray |
| Accent (toggles, bars, buttons) | `#7aa2f7` blue |
| Pro | `#bb9af7` purple |
| Surfaces | `#15161e` -> `#232736` deep indigo |
| Danger / success / warning | `#f7768e` / `#9ece6a` / `#e0af68` |
| Git added / removed / modified | `#9ece6a` / `#f7768e` / `#7dcfff` |

## Requirements

- Claude desktop app with **Claude Code 2.1.324 or later** in the Code tab. To check, start a local session in the Code tab, run `/status`, and read the **Claude Code** row.
- The theme is dark mode only. It changes colors only: no fonts, no background image.

## Install

**In the desktop app:** click **+** next to the prompt box, then **Plugins** -> **Add marketplace**, enter `Jing-King/Claude-Tokyo-City`, then **Add plugin** and pick **tokyo-city-night**.

**From the CLI:**

```
/plugin install tokyo-city-night --marketplace Jing-King/Claude-Tokyo-City
```

Open a fresh Code-tab session in dark mode to see the repaint.

## Commands

- `/tokyo-on` — turn the Tokyo City Night colors on
- `/tokyo-off` — turn them off (restores the app's own theme)

## How it works

`hooks/register.tsx` builds the palette with `makeColors` (from the bundled `make-colors.js`) and sends it once with `$.theme.set` at `session.start`. The two colors `make-colors` names that the design system validates are kept dark enough to paint: `surface-3` and `text-muted` were tuned so the theme renders without contrast blockers.

## License

MIT — see [LICENSE](./LICENSE).
