import { Page } from "@playwright/test";
import { Home } from "./home.page";
import { Login } from "./login.page";

export const App = (page: Page) => ({
    login: Login(page),
    home: Home(page)
})


