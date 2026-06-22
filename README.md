# Portrait Prompt Studio 🎨

[Читати українською (UA)](#українська-версія-ua) | [Read in English (EN)](#english-version-en)

---

## Українська версія (UA)

Ласкаво просимо до **Portrait Prompt Studio** — професійного автономного (offline-first) PWA-інструменту для зручної побудови та збереження складних промптів для генерації портретів за допомогою візуальних тегів та унікальних баз даних!

Ми повністю підготували цей проект до швидкого деплою на **GitHub** та публікації на **Netlify**.

### 🛠️ Що було зроблено для оптимізації деплою:
1. **Конфігурація `netlify.toml`**: Додано файл автонастроювання збірщика Netlify (команда `npm run build`, вихідна директорія `dist`, а також правила редиректів для SPA).
2. **Упорядкування PWA**: `manifest.json` та `sw.js` (Service Worker) були перенесені до директорії `/public`, щоб при компіляції (`vite build`) вони повністю копіювалися у фінальну збірку.
3. **PWA Працездатність**: На Netlify додаток автоматично отримає сертифікат SSL (HTTPS), який є обов'язковою умовою для стійкої автономної роботи Service Worker на вашому пристрої.

---

### 💻 Локальний запуск додатка
Для локального запуску на комп'ютері:
```bash
# 1. Встановити залежності
npm install

# 2. Запустити в режимі розробки
npm run dev
```

---

### 🚀 Покрокова інструкція для деплою в GitHub

#### Крок 1. Ініціалізація Git та перший комміт
Перетворіть папку з вашим завантаженим проектом на Git-репозиторій:
```bash
# Перейдіть до папки проекту та ініціалізуйте Git
git init

# Додайте всі файли до індексу
git add .

# Створіть перший комміт
git commit -m "feat: init Portrait Prompt Studio with Netlify configuration"

# Перейменуйте головну гілку у "main"
git branch -M main
```

#### Крок 2. Публікація на GitHub
1. Перейдіть на свій аккаунт [GitHub](https://github.com/) і створіть новий порожній публічний або приватний репозиторій (наприклад, з назвою `portrait-prompt-studio`).
2. Скопіюйте посилання на репозиторій.
3. Пов'яжіть локальний проект із GitHub та опублікуйте його:
```bash
# Зв'язати локальний Git з вашим GitHub репозиторієм (Замініть URL на ваш копійований)
git remote add origin https://github.com/ВАШ_ЛОГІН/НАЗВА_РЕПОЗИТОРІЮ.git

# Надіслати файли у хмару
git push -u origin main
```

---

### 🌐 Покрокова публікація на Netlify (Рекомендована)

Завдяки налаштуванню `netlify.toml`, деплой на Netlify виконується всього за 3 простих кроки без необхідності прописувати налаштування вручну:

1. **Увійдіть у кабінет Netlify**:
   Перейдіть на [Netlify.com](https://www.netlify.com/) та увійдіть за допомогою свого аккаунту **GitHub**.
2. **Підключіть репозиторій**:
   * На панелі керування натисніть кнопку **"Add new site"** ➜ **"Import an existing project"**.
   * Оберіть провайдера **GitHub**.
   * Знайдіть і виберіть ваш створений репозиторій `portrait-prompt-studio`.
3. **Автоматичний запуск**:
   * Netlify автоматично зчитає файл `netlify.toml`, визначить команду збірки (`npm run build`) та директорію (`dist`).
   * Натисніть **"Deploy portrait-prompt-studio"**.
   * Через 30-40 секунд додаток з'явиться в інтернеті за унікальною захищеною (HTTPS) адресою!

---

## English Version (EN)

Welcome to **Portrait Prompt Studio** — a professional, offline-first PWA workspace designed to compile, organize, and export advanced portrait generation prompts using visual tags and custom category trees.

This project is pre-configured and optimized for a zero-friction deployment to **GitHub** and **Netlify**.

### 🛠️ Optimization implemented for production:
1. **Unified `netlify.toml`**: Automatic Netlify parameters configured (command: `npm run build`, output target: `dist`, redirects: SPA routing friendly).
2. **PWA Restructuring**: `manifest.json` and `sw.js` (Service Worker) moved into the `/public` static folder, avoiding bundling errors and copying smoothly into `/dist` on compile.
3. **Full SSL Support**: Deployed on Netlify, the application enjoys secure HTTPS transmission, a hard requirement for clean service worker installations.

---

### 💻 Running Locally
```bash
# 1. Install dependencies
npm install

# 2. Spin up internal Vite server
npm run dev
```

---

### 🚀 Step-by-Step GitHub Deployment

#### Step 1. Initialize Git and Commit
```bash
# Initialize local repo
git init

# Stage all files
git add .

# Create active commit
git commit -m "feat: init Portrait Prompt Studio with Netlify configuration"

# Force branch main
git branch -M main
```

#### Step 2. Push to GitHub
1. Open your [GitHub](https://github.com/) account and create a new repository (e.g. `portrait-prompt-studio`).
2. Map local copy and upload files:
```bash
# Add active remote reference (Replace with your actual repo destination)
git remote add origin https://github.com/YOUR_GITHUB_USER/YOUR_REPO_NAME.git

# Push changes
git push -u origin main
```

---

### 🌐 Direct Publishing to Netlify

Thanks to our embedded `netlify.toml` layout, configurations are fully automated:

1. **Log in to Netlify**:
   Sign up on [Netlify.com](https://www.netlify.com/) using your **GitHub** account.
2. **Import Repo**:
   * Click **"Add new site"** ➜ **"Import an existing project"**.
   * Link with GitHub, authenticate, and select `portrait-prompt-studio`.
3. **Automated Launch**:
   * Netlify reads `netlify.toml` directly, filling default build settings (compilation line `npm run build` with static output folder `dist`).
   * Click **"Deploy"** — your live application will be built and deployed securely in less than a minute!
