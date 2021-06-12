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

