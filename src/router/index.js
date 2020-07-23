import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
    {
      path: '/route',
        component: Layout,
      redirect: '/route/list',
      name: '工艺线路管理',
      meta: { title: '工艺线路管理', icon: 'example' },
      children: [
        {
          path: 'list',
          name: '工艺线路列表',
          component: () => import('@/views/plm/route/index'),
        meta: { title: '工艺线路列表', icon: 'table' }
      },
  ]
  },
  {
    path: '/procedure',
    component: Layout,
    redirect: '/procedure/list',
    name: '工序管理',
    meta: { title: '工序管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '工序列表',
        component: () => import('@/views/plm/procedure/index'),
        meta: { title: '工序列表', icon: 'table' }
      },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/plm/procedure/tree'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
    ]
  },
    {
      path: '/productionLine',
      component: Layout,
      redirect: '/line/list',
      name: '生产线管理',
      meta: { title: '生产线管理', icon: 'example' },
      children: [
        {
          path: 'list',
          name: '生产线列表',
          component: () => import('@/views/plm/line/index'),
          meta: { title: '生产线列表', icon: 'table' }
        },
      ]
    },
    {
      path: '/material',
      component: Layout,
      redirect: '/material/list',
      name: '原料管理',
      meta: { title: '原料管理', icon: 'example' },
      children: [
        {
          path: 'add',
          name: '添加原料',
          component: () => import('@/views/plm/material/add'),
          meta: { title: '添加原料', icon: 'table' }
        },
        {
          path: 'list',
          name: '原料列表',
          component: () => import('@/views/plm/material/index'),
          meta: { title: '原料列表', icon: 'table' }
        },
      ]
    },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    name: '产品管理',
    meta: { title: '产品管理', icon: 'example' },
    children: [
      {
        path: 'add',
        name: '添加产品',
        component: () => import('@/views/plm/product/add'),
        meta: { title: '添加产品', icon: 'table' }
      },
      {
        path: 'list',
        name: '产品列表',
        component: () => import('@/views/plm/product/index'),
        meta: { title: '产品列表', icon: 'table' }
      },
      {
        path: 'addMaterial/:id',
        name: '添加原料',
        component: () => import('@/views/plm/product/addMaterialOfProduct'),
        meta: { title: '添加原料', icon: 'table' },
        hidden:true
      },
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
