import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // Import MDI icon
import 'vuetify/styles'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // Ensure it uses MDI icons
    },
})
