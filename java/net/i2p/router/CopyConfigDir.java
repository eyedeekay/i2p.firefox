package net.i2p.router;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

public class CopyConfigDir {

  public boolean copyDirectory(String baseDir, String workDir) {
    File baseFile = new File(baseDir);
    File workFile = new File(workDir);
    return copyDirectory(baseFile, workFile);
  }
  public boolean copyDirectory(File baseDir, File workDir) {
    for (File file : baseDir.listFiles()) {
      System.out.println(file.getAbsolutePath());
    }
    return true;
  }

  public boolean copyFileNeverOverwrite(String basePath, String workPath) {
    File baseFile = new File(basePath);
    File workFile = new File(workPath);
    return copyFileNeverOverwrite(baseFile, workFile);
  }

  public boolean copyFileNeverOverwrite(File basePath, File workPath) {
    return copyFile(basePath, workPath, false);
  }

  public boolean copyFile(File basePath, File workPath, boolean overWrite) {
    if (!basePath.exists()) {
      return false;
    }
    if (!overWrite && workPath.exists()) {
      return false;
    }
    try (InputStream in =
             new BufferedInputStream(new FileInputStream(basePath));
         OutputStream out =
             new BufferedOutputStream(new FileOutputStream(workPath))) {

      byte[] buffer = new byte[1024];
      int lengthRead;
      while ((lengthRead = in.read(buffer)) > 0) {
        out.write(buffer, 0, lengthRead);
        out.flush();
      }
      in.close();
      out.close();
      return true;
    } catch (Throwable e) {
      return false;
    }
  }
}