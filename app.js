import { Router } from "./router/router.js";
import Layout from "./components/Layout.js";
import Home from "./page/Home.js"

//Routes
const router = new Router();
router.createRoute('/');
router.createRoute('/aboutus');
router.createRoute('/pricing');
router.createRoute('/contact');

//Templates
router.template('/', () => (
    Layout(Home``)
));