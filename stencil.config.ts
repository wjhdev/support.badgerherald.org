import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'

export const config: Config = {
  namespace: 'badgerheraldorg',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null, // disable service workers,
      buildDir: 'app',
      dir: 'bin/wp-content/themes/support.badgerherald.org',
      copy: [
        { src: 'style.css' },
        { src: 'index.php' },
        { src: 'theme-definition.json' },
        { src: 'theme/', dest: '' },
        {
          src: '../node_modules/@webpress/core/dist/collection/theme-overlay/functions.php',
          dest: 'functions.php',
        },
        {
          src: '../node_modules/@badgerherald/donate/dist/donate/functions',
          dest: 'etc',
        },
        {
          src: '../node_modules/@webpress/core/dist/collection/theme-overlay/etc',
          dest: 'etc',
        },
      ],
    },
    {
      type: 'stats',
      file: './bin/stencil-stats.json',
    },
  ],
}

config.plugins = [sass({ injectGlobalPaths: ['src/global/foundations.scss'] })]
