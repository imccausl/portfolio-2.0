const Router = {
  routes: [],
  mode: null,
  root: '/',

  clearSlashes: path => path.toString().replace(/\/$/, '').replace(/^\//, ''),

  config(options) {
    this.mode = options && options.mode && options.mode == 'history' 
           && !!(history.pushUpdate) ? 'history' : 'hash';
    this.root = options && options.root  ? '/' + this.clearSlashes(options.root) + '/' : '/';

    return this;
  },

  getFragment() {
    let fragment = '';

    if (this.mode === 'history') {
       fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
       fragment = fragment.replace(/\?(.*)$/, '');
       fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      let match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }

    return this.clearSlashes(fragment);
   },

  add(re, handler) {
    if(typeof re === 'function') {
      handler = re;
      re = '';
    }

    this.routes.push({re, handler});
    return this;
  },

  remove(param) {
    this.routes.forEach((route, index)=>{
      if(route.handler === param || route.re.toString() === param.toString()) {
        this.routes.splice(index, 1);
        return this;
      }
    });

    return this;
  },

  flush() {
    this.routes = [];
    this.mode = null;
    this.root = '/';

    return this;
  },

  check(f) {
    let fragment = f || this.getFragment();

    console.log(fragment);

    this.routes.forEach((route, index)=>{
      let match = fragment.match(route.re);

      if (match) {
        match.shift();
        route.handler.apply({}, match);
        return this;
      }
    });

    return this;
  },

  listen() {
    let self = this;
    let current = self.getFragment();
    let fn = () => {
      if (current !== self.getFragment()) {
        current = self.getFragment();
        self.check(current);
      }
    }
    clearInterval(this.interval);
    this.interval = setInterval(fn, 50);
    return this;
  },

  navigate(path) {
    path = path ? path : '';
    if (this.mode === 'history') {
      history.pushState(null, null, this.root + this.clearSlashes(path));
    } else {
      window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
    }

    return this;
  }
}; 

export default Router;