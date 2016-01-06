export function configRouter (router) {

  router.map({
    '/home': {
      component: require('./views/home.vue')
    },

    '/grid': {
      component: require('./views/grid-view.vue')
    },
    '/login': {
      component: require('./views/login.vue')
    },

    '/about': {
      component: require('./views/about.vue')
    },

    '/user': {
      component: require('./views/user.vue')
    },

    '*': {
      component: require('./views/not-found.vue')
    }
  });

  // redirect
  router.redirect({
    '/': '/user'
  });

  // global before
  // 3 options:
  // 1. return a boolean
  // 2. return a Promise that resolves to a boolean
  // 3. call transition.next() or transition.abort()
  router.beforeEach((transition) => {
    if (transition.to.path === '/forbidden') {
      router.app.authenticating = true;
      setTimeout(() => {
        router.app.authenticating = false;
        alert('this route is forbidden by a global before hook');
        transition.abort();
      }, 3000);
    } else {
      transition.next();
    }
  });
}
