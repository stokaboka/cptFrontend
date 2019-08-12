
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: 'users', name: 'users', component: () => import('pages/UsersPage.vue') },
      { path: 'pipelines',
        name: 'pipelines',
        component: () => import('pages/PipelinesPage.vue'),
        children: [
          { path: 'pipeline-tasks', name: 'pipeline-tasks', component: () => import('pages/PipelineTasksPage.vue') }
        ]
      },
      { path: 'tasks', name: 'tasks', component: () => import('pages/TasksPage.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
