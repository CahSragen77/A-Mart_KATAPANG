@echo off
echo ============================================
echo  Backup Database MM AMANDAMART KATAPANG
echo ============================================
echo.

REM Set variables
set BACKUP_DIR=C:\backup\MM-AMANDAMART
set MYSQL_DIR=C:\xampp\mysql\bin
set DB_NAME=toko_sembako
set DB_USER=root
set DB_PASS=

REM Create backup directory if not exists
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

REM Generate filename with timestamp
set TIMESTAMP=%date:~10,4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%
set FILENAME=%BACKUP_DIR%\backup_%TIMESTAMP%.sql

REM Backup database
echo Backup database %DB_NAME% ke %FILENAME%...
"%MYSQL_DIR%\mysqldump" -u %DB_USER% %DB_NAME% > "%FILENAME%"

REM Compress backup (requires 7zip)
REM "C:\Program Files\7-Zip\7z.exe" a "%FILENAME%.7z" "%FILENAME%"
REM del "%FILENAME%"

echo Backup selesai!
echo File: %FILENAME%
echo.
pause