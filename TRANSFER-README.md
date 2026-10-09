# ZShonz Portfolio 转接说明

## 推荐：从 GitHub 转接到新电脑

1. 安装 Node.js 22 LTS。
2. 在 PowerShell 运行：

```powershell
git clone https://github.com/ZShonz/zshonz-portfolio.git
cd zshonz-portfolio
npm install
npm run dev
```

3. 打开 `http://localhost:4173/`。

这样下载的项目已保留 GitHub 版本记录，可直接继续提交更新。

## 使用转接压缩包

解压后进入 `zshonz-portfolio` 文件夹，运行 `npm install` 与 `npm run dev`。压缩包用于离线转接与备份，本身不包含 `.git` 版本记录。

## 更新 GitHub 网站

```powershell
git add .
git commit -m "Update portfolio"
git push
```

GitHub Actions 会自动重新构建并发布 GitHub Pages。

线上地址：<https://zshonz.github.io/zshonz-portfolio/>

## 内容位置

- 页面内容：`src/App.jsx`
- 3D 渲染：`src/components/ModelStage.jsx`
- 案例模板：`src/components/ProjectDetail.jsx`
- 全局样式：`styles.css`
- 项目封面：`assets/`
- 网页模型：`public/assets/models/`
- 5200 案例图：`public/assets/cases/5200/`

`2025/` 中的 AI 和原始 GLB 文件体积较大，不包含在 GitHub 与转接包中，请单独备份。
