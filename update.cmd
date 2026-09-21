@echo off
rem 一键更新线上站点。
rem
rem   用法:  update.cmd "改了经历的时间"
rem
rem 会依次执行 git add / commit / push,推送后 GitHub Actions 自动重新构建部署,
rem 大约 1 分钟后 https://zhangwier.github.io/ 就会更新。
rem
rem 注意: 需要本机代理开着(git 已配置走 127.0.0.1:7897)。

setlocal
cd /d "%~dp0"

set "MSG=%~1"
if "%MSG%"=="" set "MSG=update content"

git add -A
if errorlevel 1 goto :fail

git diff --cached --quiet
if not errorlevel 1 (
  echo [i] 没有检测到改动,已跳过提交。
  goto :push
)

git commit -m "%MSG%"
if errorlevel 1 goto :fail

:push
git push origin main
if errorlevel 1 goto :fail

echo.
echo [ok] 已推送。GitHub Actions 正在构建,约 1 分钟后生效:
echo      https://zhangwier.github.io/
exit /b 0

:fail
echo.
echo [x] 出错了。检查:代理是否开启(127.0.0.1:7897)、GitHub 凭据是否有效。
exit /b 1
