import { Router } from "./router/router.js";

import Home from "./page/Home.js";
import Aboutus from "./page/Aboutus.js";
import Pricing from "./page/Pricing.js";
import Contact from "./page/Contact.js";
import Layout from "./components/Layout.js";

const router = new Router();


//Routes
router.createRoute('/');
router.createRoute('/aboutus');
router.createRoute('/pricing');
router.createRoute('/contact');

//Templates
router.template('/', () => Layout(Home));
router.template('/aboutus', () => Layout(Aboutus));
router.template('/pricing', () => Layout(Pricing));
router.template('/contact', () => Layout(Contact));