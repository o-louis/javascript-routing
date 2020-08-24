import Header from "./Header.js"
import Footer from "./Footer.js";

const Layout = (children) => {
    return (
        `<div class="container">
            ${Header``}
            ${children``}
            ${Footer``}
        </div>`
    )
}

export default Layout;