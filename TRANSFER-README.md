# ZShonz Portfolio 转接说明

## 在新电脑上运行

1. 安装 Node.js 22 LTS。
2. 解压转接包。
3. 在项目目录打开 PowerShell。
4. 运行 `npm install`。
5. 运行 `npm run dev`。
6. 打开 `http://localhost:4173/`。

## 更新 GitHub 网站

```powershell
git add .
git commit -m "Update portfolio"
git push
```

GitHub Actions 会自动重新构建并发布 GitHub Pages。

## 内容位置

- 页面内容：`src/App.jsx`
- 3D 渲染：`src/components/ModelStage.jsx`
- 案例模板：`src/components/ProjectDetail.jsx`
- 全局样式：`styles.css`
- 项目封面：`assets/`
- 网页模型：`public/assets/models/`
- 5200 案例图：`public/assets/cases/5200/`

`2025/` 中的 AI 和原始 GLB 文件体积较大，不包含在 GitHub 与转接包中，请单独备份。
