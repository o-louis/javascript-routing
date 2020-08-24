export class Router {
    constructor() {
        this.routes = [];
        this.path = null;
        this.loadedTemplates = 0;
        this.currentUrl = window.location.href;
        this.locationOnChange();
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
                if (this.loadedTemplates++ === this.routes.length-1) {
                    this.updateView();
                }
                return currentRoute;
            }
        }
        return null;
    }

    locationOnChange() {
        window.addEventListener("hashchange", () => {
            if (window.location.href !== this.currentUrl) {
                this.currentUrl = window.location.href;
                this.updateView();
            }
        })
    }

    updateView() {
        const { href, origin, hash, pathname } = window.location;
        const url = (href === `${origin}${pathname}`) || (href === `${origin}${pathname}#`) ? '/' : `/${hash.split('#')[1]}`;
        const currentRoute = this.findSectionByPath(url);
        if (currentRoute.template) {
            document.querySelector('body').innerHTML = currentRoute.template();
        }
    }

    setTitle(href) {
        let title = href.split('/'); title.shift(); title = title.join('-');
        return title;
    }

    findSectionByPath(path) {
        const currentPage = this.routes.findIndex(element => element.path === path);
        return this.routes[currentPage];
    }
};