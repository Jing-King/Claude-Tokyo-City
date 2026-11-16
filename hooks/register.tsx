import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Tokyo City Night: a late-night skyline palette after the Tokyo Night editor
// theme (enkia/tokyonight) - deep indigo surfaces, soft periwinkle text, with
// neon blue, purple and cyan picking out the city lights.
const BLUE = '#7aa2f7'
const CYAN = '#7dcfff'
const PURPLE = '#bb9af7'
const GREEN = '#9ece6a'
const AMBER = '#e0af68'
const RED = '#f7768e'
const ORANGE = '#ff9e64'

const { theme: COLORS, problems: COLOR_PROBLEMS } = makeColors({
  label: 'Tokyo City Night',
  only: 'dark',
  roles: { accent: BLUE, danger: RED, success: GREEN, warning: AMBER, pro: PURPLE },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#15161e',
        'surface-1': '#1a1b26',
        'surface-2': '#1f2335',
        'surface-3': '#232736',
        'text-primary': '#c0caf5',
        'text-secondary': '#a9b1d6',
        'text-muted': '#9099c6',
      },
    },
    git: {
      added: GREEN,
      removed: RED,
      modified: CYAN,
      merged: PURPLE,
      closed: ORANGE,
      conflicting: AMBER,
      draft: '#737aa2',
    },
  },
})

// Colors only: no backdrop behind the conversation.
const THEME: ThemeSetArgs = { colors: COLORS }

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'tokyo-on', description: 'Turn on the Tokyo City Night colors' })
    await $.command.register({ name: 'tokyo-off', description: 'Turn off the Tokyo City Night colors' })
    const unpainted = COLOR_PROBLEMS.find(line => line.startsWith("Desktop won't paint"))
    if (unpainted !== undefined) {
      $.ui.toast(`tokyo-city-night: ${unpainted}`)
    }
    const set = await $.theme.set(THEME)
    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }
    return next(e)
  })

  on('command.run', { command: 'tokyo-on' }, async $ => {
    await $.theme.set(THEME)
    return { text: 'Tokyo City Night colors on.' }
  })

  on('command.run', { command: 'tokyo-off' }, async $ => {
    await $.theme.clear()
    return { text: 'Tokyo City Night colors off.' }
  })
}
