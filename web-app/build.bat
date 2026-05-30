@echo off
title 八字万年历 Web 构建脚本
cd /d "%~dp0"
echo ========================================
echo   八字万年历 Web 版 - 一键构建
echo ========================================
echo.

echo [1/3] 正在安装依赖...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [错误] 依赖安装失败，请确保已安装 Node.js
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo [2/3] 正在构建项目...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo [错误] 构建失败，请检查代码错误
    pause
    exit /b 1
)

echo.
echo [3/3] 构建完成！
echo.
echo ========================================
echo   构建成功！
echo ========================================
echo.
echo 生成的静态文件位于: dist 文件夹
echo.
echo 下一步：
echo 1. 打开 EdgeOne Pages 控制台
echo 2. 上传 dist 文件夹内容
echo 3. 完成部署！
echo.
pause
