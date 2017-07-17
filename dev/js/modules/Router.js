function Router() {
  let routes = [],
      mode = null,
      root = '/';

  return {
    config(options) {
      mode = options && options.mode && options.mode == 'history' 
             && !!(history.pushUpdate) ? 'history' : 'hash';
      root = options && options.root  ? '/' + this.clearSlashes(options.root) + '/' : '/';

      return this;
    },

    getFragment() {
      let fragment = '';

      if (mode === 'history') {
        
      }
    }

  };

}3` `