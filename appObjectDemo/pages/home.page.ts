import { Page } from "@playwright/test";

export const Home = (page: Page) => ({    
    async open() {
        await page.goto('/home')
    }
})

