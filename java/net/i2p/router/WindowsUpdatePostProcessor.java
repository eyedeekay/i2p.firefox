package net.i2p.router;

import java.io.*;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.*;


import net.i2p.crypto.*;
import static net.i2p.update.UpdateType.*;
import net.i2p.I2PAppContext;
import net.i2p.update.UpdateType;
import net.i2p.update.UpdatePostProcessor;
import net.i2p.util.Log;
import net.i2p.util.SystemVersion;

import java.lang.ProcessBuilder;
import java.lang.Process;
import java.lang.InterruptedException;


public class WindowsUpdatePostProcessor implements UpdatePostProcessor {
    private final Log _log = I2PAppContext.getGlobalContext().logManager().getLog(WindowsUpdatePostProcessor.class);
    private final RouterContext ctx;
    protected static Router i2pRouter = null;
    private final AtomicBoolean hook = new AtomicBoolean();
    private volatile String version;
    WindowsUpdatePostProcessor() {
    	this.ctx = null;
    }

    WindowsUpdatePostProcessor(RouterContext ctx) {
        this.ctx = ctx;
    }

    public String getVersion() {
        return version;
    }

    public void updateDownloadedandVerified(UpdateType type, int fileType, String version, File file) throws IOException {
        _log.info("Got an update to post-process");

        if (type != UpdateType.ROUTER_SIGNED_SU3 && type != UpdateType.ROUTER_DEV_SU3) {
            _log.warn("Unsupported update type " + type);
            return;
        }

        if (fileType != SU3File.TYPE_EXE) {
            _log.warn("Unsupported file type " + fileType);
            return;
        }

        File positionedFile = moveUpdateInstaller(file);
        
        this.version = version;
        
        if (!hook.compareAndSet(false,true)) {
            _log.info("shutdown hook was already set");
            return;
        }

        _log.info("adding shutdown hook");
        ctx.addFinalShutdownTask(new WinUpdateProcess(ctx, this::getVersion, positionedFile));

    }
    
    private File moveUpdateInstaller(File file) throws IOException{
        RouterContext i2pContext = i2pRouter.getContext();
        if (i2pContext != null) {
            File appDir = i2pContext.getAppDir();
            File newFile = new File(workDir(), file.getName());
            file.renameTo(newFile);
            return newFile;
        }
        return null;
    }

    private File workDir() throws IOException{
        RouterContext i2pContext = i2pRouter.getContext();
        if (i2pContext != null) {
            File workDir = new File(i2pContext.getAppDir().getAbsolutePath(), "i2p_update_win");
            if (workDir.exists()) {
                if (workDir.isFile())
                    throw new IOException(workDir + " exists but is a file, get it out of the way");
                    return null;
            } else {
                workDir.mkdirs();
            }
            return workDir;
        }
        return null;
    }


    protected File selectProgramFile() {
        if (SystemVersion.isWindows()) {
            File jrehome = new File(System.getProperty("java.home"));
            File programs = jrehome.getParentFile();
            System.out.println("Windows portable jpackage wrapper started, using: " + programs + " as working config");            
            return programs.getAbsoluteFile();
        } else {
            File jrehome = new File(System.getProperty("java.home"));
            File programs = new File(jrehome.getParentFile().getParentFile(), "i2p");
            System.out.println("Linux portable jpackage wrapper started, using: " + programs + " as working config");            
            return programs.getAbsoluteFile();
        }
    }

    protected File selectProgramFileExe() {
        File pfpath = selectProgramFile();
        if (SystemVersion.isWindows()) {
            File app = new File(pfpath, "I2P.exe");
            return app.getAbsoluteFile();
        } else {
            File app = new File(pfpath, "bin/I2P");
            return app.getAbsoluteFile();
        }
    }

}