
SET MYPATH=%~dp0
call "%MYPATH%common.bat"

if exist "%LOCALAPPDATA%\I2PBrowser-Launcher\firefox.profile.i2p\" (
  echo "profile is configured, updating extensions"
  xcopy /s /i /y "%I2PPath%\I2PBrowser-Launcher\firefox.profile.i2p\extensions" "%LOCALAPPDATA%\I2PBrowser-Launcher\firefox.profile.i2p\extensions"
) else (
  echo "configuring profile"
  xcopy /s /i /y "%I2PPath%\I2PBrowser-Launcher\firefox.profile.i2p" "%LOCALAPPDATA%\I2PBrowser-Launcher\firefox.profile.i2p"
)

xcopy /s /i /y "%I2PPath%\I2PBrowser-Launcher\firefox.profile.i2p\user.js" "%LOCALAPPDATA%\I2PBrowser-Launcher\firefox.profile.i2p\user.js"
xcopy /s /i /y "%I2PPath%\I2PBrowser-Launcher\firefox.profile.i2p\prefs.js" "%LOCALAPPDATA%\I2PBrowser-Launcher\firefox.profile.i2p\prefs.js"
