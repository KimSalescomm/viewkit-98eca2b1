# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/viewkit) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

## VIEW KIT 운영 매뉴얼

### 제품 활성화/비활성화 관리

현재 냉장고만 활성화되어 있고, 나머지 제품은 비활성화(흑백 처리, 클릭 불가) 상태입니다.

#### 모든 제품 활성화하기

`src/pages/ProductSelection.tsx` 파일에서 다음 코드를 수정합니다:

**현재 코드 (냉장고만 활성화):**
```tsx
const isEnabled = product.id === "refrigerator";
```

**모든 제품 활성화:**
```tsx
const isEnabled = true;
```

#### 특정 제품만 활성화하기

여러 제품을 활성화하려면 배열을 사용합니다:

```tsx
const enabledProducts = ["refrigerator", "tv", "styler"];
const isEnabled = enabledProducts.includes(product.id);
```

#### 사용 가능한 제품 ID 목록

| 제품 | ID |
|------|-----|
| TV | `tv` |
| 냉장고 | `refrigerator` |
| 의류관리기 | `styler` |
| 워시타워 | `washer` |
| 청소기 | `vacuum` |
| 휘센 에어컨 | `airconditioner` |
| PC | `pc` |
| 식기세척기 | `cooking` |
