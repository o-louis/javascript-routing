export class Router {
    constructor() {
        this.routes = [];
        this.path = null;
        this.firstLoad = false;
        this.currentUrl = window.location.href;
        this.enableRelocation();
        this.locationChange();
    }

    createAllRoutes(paths) {
        if (paths && Array.isArray(paths) && paths.length > 0) {
            const newRoutes = paths.map(({ path, template }) => {
                if (path) {
                    return { path, name: this.setTitle(path), template: (template || null) }
                }
            });
            this.routes = [...this.routes, ...newRoutes];
        }

        return this.routes;
    }

    createRoute(path, template) {
        if (path) {
            const newRoute = {
                path,
                name: this.setTitle(path),
                template: (template || null)
            };
            this.routes.push(newRoute);
        }

        return this.routes;
    }

    template(path, template) {
        if (path) {
            const currentRoute = this.findSectionByPath(path);
            if (currentRoute && typeof template === 'function') {
                currentRoute.template = template;
                if (!this.firstLoad) {
                    this.updateView();
                }
                return currentRoute;
            }
        }
        return null;
    }

    enableRelocation() {
        let links = document.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', (e) => {
                e.preventDefault();
                const href = e.target.getAttribute('href');
                const url = href;
                const title = this.setTitle(href);
                const state = { 'pageID': href };
                window.history.pushState(state, title, url);
            });
        }
    }

    locationOnChange() {
        setInterval(() => {
            if (window.location.href !== this.currentUrl) {
                this.currentUrl = window.location.href;
                this.updateView();
            }
        }, 50);
    }

    locationChange() {
        window.addEventListener("hashchange", () => {
            if (window.location.href !== this.currentUrl) {
                this.currentUrl = window.location.href;
                this.updateView();
            }
        });
    }
    updateView() {
        this.firstLoad = true;
        const defaultIndex = `${window.location.origin}/`;
        const url = (window.location.href === defaultIndex) ? '/' : `/${window.location.href.split('#/')[1]}`;
        const currentRoute = this.findSectionByPath(url);
        if (currentRoute.template) document.querySelector('body').innerHTML = currentRoute.template();
    }



    setTitle(href) {
        let title = href.split('/'); title.shift(); title = title.join('-');
        return title;
    }

    findSectionByPath(path) {
        const currentPage = this.routes.findIndex(element => element.path === path);
        return this.routes[currentPage];
    }
}