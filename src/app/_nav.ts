export const navItems = [
  // {
  //   name: 'Dashboard',
  //   url: '/dashboard',
  //   icon: 'icon-speedometer',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Theme'
  // },
  // {
  //   name: 'Colors',
  //   url: '/theme/colors',
  //   icon: 'icon-drop'
  // },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   icon: 'icon-pencil'
  // },
  // {
  //   title: true,
  //   name: 'Components'
  // },
  {
    name: 'Vista Mappa',
    url: '/map',
    icon: 'icon-map'
  },
  {
    name: 'Diagnostica Pali',
    url: '/diagnostics',
    icon: 'icon-screen-desktop'
  },
  {
    name: 'Accellerometro',
    url: '/accellerometer',
    icon: 'cui-speedometer'
  },
  {
    name: 'Controllo Punti Luce',
    url: '/lightpoints',
    icon: 'cui-lightbulb'
  },
  {
    name: 'Videosorveglianza',
    url: '/surveillance',
    icon: 'icon-camrecorder',
    children: [
      {
        name: 'Targhe',
        url: '/surveillance/license',
        icon: ''
      },
      {
        name: 'Indici di traffico',
        url: '/surveillance/traffic',
        icon: ''
      },
      {
        name: 'Controllo accessi',
        url: '/surveillance/check',
        icon: ''
      },
      {
        name: 'Sicurezza',
        url: '/surveillance/security',
        icon: ''
      },
      {
        name: 'Lettura targhe',
        url: '/surveillance/reading-license',
        icon: ''
      },
      {
        name: 'Riconoscimento facciale',
        url: '/surveillance/facial-recognition',
        icon: ''
      },
      {
        name: 'Smart parking',
        url: '/surveillance/smart-parking',
        icon: ''
      },
      {
        name: 'Analytics',
        url: '/surveillance/analytics',
        icon: ''
      },
      {
        name: 'Contapersone',
        url: '/surveillance/counting',
        icon: ''
      },
      {
        name: 'Analisi oggetti',
        url: '/surveillance/object-analysis',
        icon: ''
      }
    ]
  },
  {
    name: 'Monitoraggio ambientale',
    url: '/monitoring',
    icon: 'cui-magnifying-glass',
    children: [
      {
        name: 'Stazioni',
        url: '/monitoring/stations',
        icon: ''
      },
      {
        name: 'Qualità dell\'aria',
        url: '/monitoring/airquality',
        icon: ''
      },
      {
        name: 'Dati meteo',
        url: '/monitoring/meteo',
        icon: ''
      },
      {
        name: 'Intensita precipitazioni',
        url: '/monitoring/precipitation-intesity',
        icon: ''
      },
      {
        name: 'Analytics',
        url: '/monitoring/analytics',
        icon: ''
      }
    ]
  },
  {
    name: 'Net',
    url: '/net',
    icon: 'icon-globe',
    children: [
      {
        name: 'Network interconnessione',
        url: '/net/network/',
        icon: ''
      },
      {
        name: 'LTE/4G',
        url: '/net/lte',
        icon: ''
      },
      {
        name: 'Gateway LoRa',
        url: '/net/lora',
        icon: ''
      }
    ]
  },
  {
    name: 'Smart Building',
    url: '/smartbuilding',
    icon: 'fa fa-building-o fa-lg',
    children: [
      {
        name: 'Diagnostica',
        url: '/smartbuilding/diagnostic',
        icon: ''
      },
      {
        name: 'Potenza/tensione installata',
        url: '/smartbuilding/power',
        icon: ''
      },
      {
        name: 'Numero transazioni',
        url: '/smartbuilding/transaction',
        icon: ''
      },
      {
        name: 'kWh erogati',
        url: '/smartbuilding/kWh',
        icon: ''
      },
      {
        name: 'Modalità di pagamento',
        url: '/smartbuilding/payment',
        icon: ''
      },
      {
        name: 'Back office',
        url: '/smartbuilding/backoffice',
        icon: ''
      },
    ]
  },
  {
    name: 'Ricariche Elettriche',
    url: '/recharge',
    icon: 'icon-energy'
  },
  {
    name: 'Monitoraggio Infrastrutture',
    url: '/infrastructure',
    icon: 'fa fa-cubes fa-lg'
  },
  {
    name: 'Moduli Predittivi',
    url: '/predictive',
    icon: 'fa fa-line-chart fa-lg'
  },
  {
    name: 'Reportistica',
    url: '/report',
    icon: 'fa fa-file-text-o fa-lg'
  }

  

  // {
  //   name: 'Base',
  //   url: '/base',
  //   icon: 'icon-puzzle',
  //   children: [
  //     {
  //       name: 'Cards',
  //       url: '/base/cards',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Carousels',
  //       url: '/base/carousels',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Collapses',
  //       url: '/base/collapses',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Forms',
  //       url: '/base/forms',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Pagination',
  //       url: '/base/paginations',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Popovers',
  //       url: '/base/popovers',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Progress',
  //       url: '/base/progress',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Switches',
  //       url: '/base/switches',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tables',
  //       url: '/base/tables',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tabs',
  //       url: '/base/tabs',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tooltips',
  //       url: '/base/tooltips',
  //       icon: 'icon-puzzle'
  //     }
  //   ]
  // },
  // {
  //   name: 'Buttons',
  //   url: '/buttons',
  //   icon: 'icon-cursor',
  //   children: [
  //     {
  //       name: 'Buttons',
  //       url: '/buttons/buttons',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Dropdowns',
  //       url: '/buttons/dropdowns',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Brand Buttons',
  //       url: '/buttons/brand-buttons',
  //       icon: 'icon-cursor'
  //     }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   url: '/charts',
  //   icon: 'icon-pie-chart'
  // },
  // {
  //   name: 'Icons',
  //   url: '/icons',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'CoreUI Icons',
  //       url: '/icons/coreui-icons',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'success',
  //         text: 'NEW'
  //       }
  //     },
  //     {
  //       name: 'Flags',
  //       url: '/icons/flags',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Font Awesome',
  //       url: '/icons/font-awesome',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'secondary',
  //         text: '4.7'
  //       }
  //     },
  //     {
  //       name: 'Simple Line Icons',
  //       url: '/icons/simple-line-icons',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   icon: 'icon-bell',
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Modals',
  //       url: '/notifications/modals',
  //       icon: 'icon-bell'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   icon: 'icon-calculator',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   divider: true
  // },
  // {
  //   title: true,
  //   name: 'Extras',
  // },
  // {
  //   name: 'Pages',
  //   url: '/pages',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },
  // {
  //   name: 'Download CoreUI',
  //   url: 'http://coreui.io/angular/',
  //   icon: 'icon-cloud-download',
  //   class: 'mt-auto',
  //   variant: 'success'
  // },
  // {
  //   name: 'Try CoreUI PRO',
  //   url: 'http://coreui.io/pro/angular/',
  //   icon: 'icon-layers',
  //   variant: 'danger'
  // }
];
