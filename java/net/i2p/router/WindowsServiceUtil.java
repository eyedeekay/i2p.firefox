package net.i2p.router;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import javax.swing.JOptionPane;

/*
 * Provides querying of Windows services in order to discover I2P Routers
 * running as a service and avoid launching jpackaged routers redundantly.
 * It will prompt a user to start their I2P service if one is discovered.
 *
 * see also:
 * https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/sc-query
 * https://learn.microsoft.com/en-us/dotnet/api/system.serviceprocess.servicecontrollerstatus?view=dotnet-plat-ext-6.0
 * https://stackoverflow.com/questions/10604844/how-to-verify-whether-service-exists-in-services-msc
 * C#, API ideas only
 * https://stackoverflow.com/questions/334471/need-a-way-to-check-status-of-windows-service-programmatically
 * https://stackoverflow.com/questions/5388888/find-status-of-windows-service-from-java-application
 * https://stackoverflow.com/questions/21566847/how-to-check-particular-windows-service-is-running-using
 * https://stackoverflow.com/questions/9792051/start-windows-service-with-java
 *
 * There's a chance we can't tell ServiceController to do anything so if
 * that is the case then we'll just launch services.msc and tell the user to
 * take it from there.
 *
 * @author idk
 * @since 1.9.7
 */

public class WindowsServiceUtil {
  public WindowsServiceUtil() {
  }

  public String queryService(String serviceName) {
    String result = "";
    String line;
    ProcessBuilder pb = new ProcessBuilder("sc", "query", serviceName);
    try {
      Process p = pb.start();
      try {
        p.waitFor(); // wait for process to finish then continue.
        BufferedReader bri = new BufferedReader(new InputStreamReader(p.getInputStream()));
        while ((line = bri.readLine()) != null) {
          result += line;
        }
      } catch (InterruptedException e) {
        System.err.println(e.toString());
      } catch (IOException e) {
        System.err.println(e.toString());
      }
    } catch (IOException e) {
      System.err.println(e.toString());
    }
    return result;
  }

  public String getStatePrefix(String qResult) {
    String statePrefix = "STATE              : ";
    // get the first occurrence of "STATE", then find the
    // next occurrence of of ":" after that. Count the
    // spaces between.
    int indexOfState = qResult.indexOf("STATE");
    if (indexOfState >= 0) {
      int indexOfColon = qResult.indexOf(":", indexOfState);
      statePrefix = "STATE";
      for (int f = indexOfState + 5; f < indexOfColon; f++) {
        statePrefix += " ";
      }
      statePrefix += ": ";
    }
    return statePrefix;
  }

  public int getServiceStateInt(String serviceName) {
    // String statePrefix = "STATE : ";
    String qResult = queryService(serviceName);
    String statePrefix = getStatePrefix(qResult);
    // check that the temp string contains the status prefix
    int ix = qResult.indexOf(statePrefix);
    if (ix >= 0) {
      // compare status number to one of the states
      String stateStr = qResult.substring(ix + statePrefix.length(),
          ix + statePrefix.length() + 1);
      int state = Integer.parseInt(stateStr);
      return state;
    }
    return -2;
  }

  public boolean isInstalled(String serviceName) {
    if (getServiceState(serviceName).equals("uninstalled")) {
      return false;
    }
    return true;
  }

  public boolean isStart(String serviceName) {
    if (getServiceState(serviceName).equals("started")) {
      return true;
    }
    if (getServiceState(serviceName).equals("starting")) {
      return true;
    }
    if (getServiceState(serviceName).equals("resuming")) {
      return true;
    }
    return false;
  }

  public boolean promptServiceStartIfAvailable(String serviceName) {
    if (osName() != "windows") {
      return true;
    }
    if (isInstalled(serviceName)) {
      if (!isStart(serviceName)) {
        int a;
        String message = "It appears you have an existing I2P service installed.\n";
        message += "However, it is not running yet. Please start it through `services.msc`.\n";
        message += "If you click \"No\", the jpackage router will be launched instead.\n";
        a = JOptionPane.showConfirmDialog(null, message,
            "I2P Service detected not running",
            JOptionPane.YES_NO_OPTION);
        if (a == JOptionPane.NO_OPTION) {
          // Do nothing here, this will continue on to launch a jpackaged router
          return true;
        } else {
          // We can't just call `net start` or `sc start` directly, that throws
          // a permission error. We can start services.msc though, where the
          // user can start the service themselves. OR maybe we ask for
          // elevation here? May need to refactor Elevator and Shell32X to
          // achieve it though
          ProcessBuilder pb = new ProcessBuilder("C:\\Windows\\System32\\services.msc");
          try {
            Process p = pb.start();
            int exitCode = p.waitFor();
            if (exitCode != 0) {
              return false;
            }
          } catch (IOException e) {
            return false;
          } catch (InterruptedException e) {
            return false;
          }
        }
        return isStart(serviceName);
      }
      return true;
    }
    return true;
  }

  public String getServiceState(String serviceName) {
    String stateString = "uninstalled";
    int state = getServiceStateInt(serviceName);
    switch (state) {
      case (1): // service stopped
        stateString = "stopped";
        break;
      case (2): // service starting
        stateString = "starting";
        break;
      case (3): // service stopping
        stateString = "stopping";
        break;
      case (4): // service started
        stateString = "started";
        break;
      case (5): // service resuming from pause
        stateString = "resuming";
        break;
      case (6): // service pausing
        stateString = "pausing";
        break;
      case (7): // service paused
        stateString = "paused";
        break;
    }
    return stateString;
  }

  /**
   * get the OS name(windows, mac, linux only)
   *
   * @return os name in lower-case, "windows" "mac" or "linux"
   */
  protected String osName() {
    String osName = System.getProperty("os.name").toLowerCase();
    if (osName.contains("windows"))
      return "windows";
    if (osName.contains("mac"))
      return "mac";
    return "linux";
  }

  public static void main(String args[]) {
    WindowsServiceUtil wsu = new WindowsServiceUtil();
    // when querying the I2P router service installed by the IzPack installer
    // this is the correct call.
    String state = wsu.getServiceState("i2p");
    int stateInt = wsu.getServiceStateInt("i2p");
    System.out.println("i2p state: " + state + " code: " + stateInt);
    wsu.promptServiceStartIfAvailable("i2p");
  }
}
