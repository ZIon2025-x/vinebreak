<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1bjEuQ3S3fzg3LprGW75ksNQwwcKnIdgx

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. 可选：在项目根目录创建 `.env.local`，设置 `GEMINI_API_KEY=你的密钥`（不设置则 AI 顾问使用内置 Mock 回复）
3. 启动开发服务器：
   `npm run dev`

## 部署到 Vercel

1. 将项目推送到 GitHub（或 GitLab / Bitbucket）。
2. 打开 [vercel.com](https://vercel.com)，用 GitHub 登录，点击 **Add New → Project**，导入本仓库。
3. 保持默认配置（Vercel 会自动识别 Vite）：
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. 可选：若需使用真实 Gemini AI，在 Vercel 项目 **Settings → Environment Variables** 中添加：
   - 名称：`GEMINI_API_KEY`
   - 值：你的 Gemini API Key  
   （不添加则线上为 Mock 模式，无密钥泄露风险。）
5. 点击 **Deploy**，等待构建完成后即可获得预览/生产链接。

**一键部署**：也可在 [Vercel](https://vercel.com/new) 选择 “Import Git Repository”，粘贴本仓库地址后直接部署。
