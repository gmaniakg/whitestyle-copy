@echo off
chcp 65001 >nul
title 화타펫 — 하야니 (Hayani) AI 데스크톱 펫 실행기 v2.1.0
echo ============================================================================
echo   [화타펫 — 하야니 (Hayani) v2.1.0] 강남역 화이트스타일치과의원 공식 AI 펫
echo   1994년 개원 33년 전통 · 치의학박사 김준헌 병원장 1:1 책임 진료
echo ============================================================================
echo.

if exist "%~dp0desktop\WhitePup.exe" (
    echo [실행] 로컬 포터블 앱 WhitePup.exe 를 시작합니다...
    start "" "%~dp0desktop\WhitePup.exe"
    exit /b 0
)

if exist "E:\antigravity\ai-pet\desktop\WhitePup.exe" (
    echo [실행] 로컬 데스크톱 앱 WhitePup.exe 를 시작합니다...
    start "" "E:\antigravity\ai-pet\desktop\WhitePup.exe"
    exit /b 0
)

echo [실행] 독립 창 모드(Standalone App Mode)로 하야니 데스크톱 펫을 시작합니다...
where msedge >nul 2>nul
if %errorlevel%==0 (
    start "" msedge --app="https://whinish.com/ai-pet/index.html" --window-size=540,840
    exit /b 0
)

where chrome >nul 2>nul
if %errorlevel%==0 (
    start "" chrome --app="https://whinish.com/ai-pet/index.html" --window-size=540,840
    exit /b 0
)

start "" "https://whinish.com/ai-pet/index.html"
exit /b 0
