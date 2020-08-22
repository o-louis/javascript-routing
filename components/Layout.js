import Header from "./Header.js"

const Layout = (children) => {
    return (
        `<div class="container">
            ${Header``}
            ${children}
        </div>`
    )
}

export default Layout;