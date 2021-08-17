import HomePage from '../pages/homepage/HomePage'
import Competition from '../pages/competition/Competition'
import Edit from '../pages/edit/Edit'
import Database from '../pages/database/Database'
import Settings from '../pages/settings/Settings'
import About from '../pages/about/About'

export default {
    routes :[
        {
            path: "/",
            name: 'homepage',
            component: HomePage
        },
        {
            path: "/",
            name: 'competition',
            component: Competition
        },
        {
            path: "/",
            name: 'edit',
            component: Edit
        },
        {
            path: "/",
            name: 'database',
            component: Database
        },
        {
            path: "/",
            name: 'settings',
            component: Settings
        },
        {
            path: "/",
            name: 'about',
            component: About
        },
    ]
}

