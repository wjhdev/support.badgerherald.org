import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'

export const config: Config = {
  namespace: 'badgerheraldorg',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null, // disable service workers,
      buildDir: './bin/wp-content/themes/badgerherald.org',
      copy: [
        { src: 'style.css' },
        { src: 'index.php' },
        { src: 'theme-definition.json' },
        { src: '../node_modules/@webpress/core/dist/webpresscore/theme-overlay/functions.php', dest: 'functions.php'},
        { src: '../node_modules/@webpress/core/dist/webpresscore/theme-overlay/etc', dest: 'etc'}
      ]
    }
  ]
};

config.plugins = [ 
  sass({injectGlobalPaths: [
    'src/global/foundations.scss',
  ]})
]

