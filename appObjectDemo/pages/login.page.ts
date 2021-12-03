import { Page } from "@playwright/test";

export const Login = (page: Page) => ({
    emailField: page.locator('input'),

    async open() {
        await page.goto('/home')
    },

    async doLogin(email: string) {
        await this.emailField.type(email)
    }
})
