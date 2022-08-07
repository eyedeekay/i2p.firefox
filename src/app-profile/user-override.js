/*
Overrides#
for Extension Preferences# Tor Browser Bundle# Do not edit this file.##This file is modified from a file included in the Tor Browser Bundle.##Copyright 2017 The Tor Project.See LICENSE.tor#
for licensing information.

HTTPS Everywhere Preferences:
*/
user_pref("extensions.https_everywhere._observatory.popup_shown", true);
user_pref("extensions.https_everywhere.toolbar_hint_shown", true);

/*
NoScript Preferences: #In order to disable all scripts by
default, uncomment the following line...#user_pref("capability.policy.maonoscript.javascript.enabled", "noAccess");#
and comment out the following line
*/
user_pref("capability.policy.maonoscript.javascript.enabled", "allAccess");
user_pref("capability.policy.maonoscript.sites", "[System+Principal] about: about:tbupdate about:tor chrome: resource: blob: mediasource: moz-extension: moz-safe-about: about:neterror about:certerror about:feeds about:tabcrashed about:cache");
user_pref("noscript.default", "[System+Principal] about: about:tbupdate about:tor chrome: resource: blob: mediasource: moz-extension: moz-safe-about: about:neterror about:certerror about:feeds about:tabcrashed about:cache");
user_pref("noscript.mandatory", "[System+Principal] about: about:tbupdate about:tor chrome: resource: blob: mediasource: moz-extension: moz-safe-about: about:neterror about:certerror about:feeds about:tabcrashed about:cache");
user_pref("noscript.ABE.enabled", false);
user_pref("noscript.ABE.notify", false);
user_pref("noscript.ABE.wanIpAsLocal", false);
user_pref("noscript.confirmUnblock", false);
user_pref("noscript.contentBlocker", true);
user_pref("noscript.firstRunRedirection", false);
user_pref("noscript.global", true);
user_pref("noscript.gtemp", "");
user_pref("noscript.opacizeObject", 3);
user_pref("noscript.forbidWebGL", true);
user_pref("noscript.forbidFonts", true);
user_pref("noscript.options.tabSelectedIndexes", "5,0,0");
user_pref("noscript.policynames", "");
user_pref("noscript.secureCookies", true);
user_pref("noscript.showAllowPage", false);
user_pref("noscript.showBaseDomain", false);
user_pref("noscript.showDistrust", false);
user_pref("noscript.showRecentlyBlocked", false);
user_pref("noscript.showTemp", false);
user_pref("noscript.showTempToPerm", false);
user_pref("noscript.showUntrusted", false);
user_pref("noscript.STS.enabled", false);
user_pref("noscript.subscription.lastCheck", -142148139);
user_pref("noscript.temp", "");
user_pref("noscript.untrusted", "");
user_pref("noscript.forbidMedia", true);
user_pref("noscript.allowWhitelistUpdates", false);
user_pref("noscript.fixLinks", false);
// Now handled by plugins.click_to_play // Not in this one.
user_pref("noscript.forbidFlash", true);
user_pref("noscript.forbidSilverlight", true);
user_pref("noscript.forbidJava", true);
user_pref("noscript.forbidPlugins", true);
// Usability tweaks
user_pref("noscript.showPermanent", false);
user_pref("noscript.showTempAllowPage", true);
user_pref("noscript.showRevokeTemp", true);
user_pref("noscript.notify", false);
user_pref("noscript.autoReload", true);
user_pref("noscript.autoReload.allTabs", false);
user_pref("noscript.cascadePermissions", true);
user_pref("noscript.restrictSubdocScripting", true);
user_pref("noscript.showVolatilePrivatePermissionsToggle", false);
user_pref("noscript.volatilePrivatePermissions", true);
user_pref("noscript.clearClick", 0);

user_pref("intl.locale.matchOS", false);

user_pref("extensions.https_everywhere._observatory.enabled", false);
user_pref("extensions.https_everywhere.options.autoUpdateRulesets", false);
user_pref("extensions.https_everywhere.globalEnabled", false);
user_pref("extensions.https_everywhere._observatory.submit_during_tor", false);
user_pref("extensions.https_everywhere._observatory.submit_during_nontor", false);
user_pref("extensions.https_everywhere._observatory.use_custom_proxy", true);
user_pref("extensions.https_everywhere._observatory.proxy_host", "127.0.0.1");
user_pref("extensions.https_everywhere._observatory.proxy_port", 4444);

user_pref("extensions.torbutton.use_nontor_proxy", true);

//For socket conversion: in the future, I'll need to make TBB communicate with
//i2p over a unix socket. Fortunately, this is how you do that. It will be
//configurable in a similar way to the host:port configuration when that happens.
//user_pref("extensions.torlauncher.socks_port_use_ipc", );
//user_pref("extensions.torlauncher.socks_ipc_path", "");

// TODO: this is a Tor Browser specific setting which is ignored on Firefox. If
// I make it true, the SOCKS outproxy will have something to connect to. But I
// need to test more to find out if that's prudent.
user_pref("extensions.torlauncher.start_tor", false);
//user_pref("extensions.torlauncher.default_bridge_type", "");
user_pref("extensions.torlauncher.prompt_at_startup", false);

// Resist-fingerprinting and first-party isolation enable

user_pref("privacy.resistFingerprinting", true);
user_pref("privacy.firstparty.isolate", true);

// Use i2p http proxy for all connections and set homepage to safe local form.

// DON'T allow access to the admin panel from the profile we browse i2p with.
user_pref("network.proxy.no_proxies_on", "127.0.0.1:7657,localhost:7657,127.0.0.1:7662,localhost:7662,127.0.0.1:7669,localhost:7669");
user_pref("network.proxy.type", 1);
user_pref("network.proxy.http", "127.0.0.1");
user_pref("network.proxy.http_port", 4444);
user_pref("network.proxy.ssl", "127.0.0.1");
user_pref("network.proxy.ssl_port", 4444);
user_pref("network.proxy.ftp", "127.0.0.1");
user_pref("network.proxy.ftp_port", 4444);
user_pref("network.proxy.socks", "127.0.0.1");
user_pref("network.proxy.socks_port", 4444);
user_pref("network.proxy.share_proxy_settings", true);
user_pref("browser.startup.homepage", "http://127.0.0.1:7657/home");

// Privacy-harden and disable irrelevant features.
user_pref("app.normandy.api_url", "");
user_pref("app.normandy.enabled", false);
user_pref("app.update.auto", false);
user_pref("app.update.enabled", false);
user_pref("beacon.enabled", false);
user_pref("browser.aboutHomeSnippets.updateUrl", "");
user_pref("browser.cache.disk_cache_ssl", false);
user_pref("browser.cache.disk.enable", false);
user_pref("browser.cache.offline.enable", false);
user_pref("browser.disableResetPrompt", true);
user_pref("browser.display.use_document_fonts", 0);
user_pref("browser.fixup.alternate.enabled", false);
user_pref("browser.formfill.enable", false);
user_pref("browser.library.activity-stream.enabled", false);
user_pref("browser.newtabpage.activity-stream.disableSnippets", true);
user_pref("browser.newtabpage.activity-stream.enabled", false);
user_pref("browser.newtabpage.activity-stream.feeds.section.highlights", false);
user_pref("browser.newtabpage.activity-stream.feeds.snippets", false);
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.feeds.topsites", false);
user_pref("browser.newtabpage.activity-stream.prerender", false);
user_pref("browser.newtabpage.activity-stream.showSearch", false);
user_pref("browser.newtabpage.enhanced", false);
user_pref("browser.newtabpage.introShown", true);
user_pref("browser.newtab.preload", false);
user_pref("browser.onboarding.enabled", false);
user_pref("browser.pagethumbnails.capturing_disabled", true);
user_pref("browser.safebrowsing.appRepURL", "");
user_pref("browser.safebrowsing.blockedURIs.enabled", false);
user_pref("browser.safebrowsing.downloads.enabled", false);
user_pref("browser.safebrowsing.downloads.remote.enabled", false);
user_pref("browser.safebrowsing.downloads.remote.url", "");
user_pref("browser.safebrowsing.enabled", false);
user_pref("browser.safebrowsing.malware.enabled", false);
user_pref("browser.safebrowsing.phishing.enabled", false);
user_pref("browser.search.geoip.timeout", 1);
user_pref("browser.search.suggest.enabled", false);
user_pref("browser.selfsupport.url", "");
user_pref("browser.send_pings", false);
user_pref("browser.shell.checkDefaultBrowser", false);
user_pref("browser.startup.homepage_override.mstone", "ignore");
user_pref("browser.startup.page", 0);
user_pref("browser.toolbarbuttons.introduced.pocket-button", true);
user_pref("browser.urlbar.speculativeConnect.enabled", false);
user_pref("browser.urlbar.trimURLs", false);
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("dom.battery.enabled", false);
user_pref("dom.enable_performance", false);
user_pref("dom.enable_performance_navigation_timing", false);
user_pref("dom.enable_resource_timing", false);
user_pref("dom.event.clipboardevents.enabled", false);
user_pref("dom.gamepad.enabled", false);
user_pref("dom.indexedDB.enabled", false);
user_pref("dom.min_timeout_value", 400);
user_pref("dom.push.connection.enabled", false);
user_pref("dom.push.enabled", false);
user_pref("dom.serviceWorkers.enabled", false);
user_pref("dom.serviceWorkers.interception.enabled", false);
user_pref("dom.storage.enabled", false);
user_pref("dom.webaudio.enabled", false);
user_pref("extensions.autoDisableScopes", 14);
user_pref("extensions.getAddons.cache.enabled", false);
user_pref("extensions.getAddons.showPane", false);
user_pref("extensions.pocket.enabled", false);
user_pref("extensions.screenshots.disabled", true);
user_pref("extensions.webservice.discoverURL", "");
user_pref("geo.enabled", false);
user_pref("geo.wifi.uri", "");
user_pref("gfx.downloadable_fonts.disable_cache", true);
user_pref("javascript.options.shared_memory", false);
user_pref("layout.css.visited_links_enabled", false);
user_pref("media.autoplay.enabled", false);
user_pref("media.cache_size", 0);
user_pref("media.navigator.enabled", false);
user_pref("media.peerconnection.ice.no_host", true);
user_pref("media.video_stats.enabled", false);
user_pref("captivedetect.canonicalURL", "");
user_pref("network.captive-portal-service.enabled", false);
user_pref("network.cookie.cookieBehavior", 1);
user_pref("network.cookie.lifetimePolicy", 2);
user_pref("network.dns.disablePrefetch", true);
user_pref("network.http.referer.spoofSource", true);
user_pref("network.http.referer.trimmingPolicy", 2);
user_pref("network.http.referer.XOriginPolicy", 2);
user_pref("network.prefetch-next", false);
user_pref("privacy.donottrackheader.enabled", true);
user_pref("privacy.donottrackheader.value", 1);
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.coverage.opt-out", true);
user_pref("toolkit.telemetry.enabled", false);
user_pref("toolkit.telemetry.server", "");
user_pref("toolkit.telemetry.unified", false);
user_pref("webgl.disabled", true);
user_pref("browser.chrome.errorReporter.infoURL", "");
user_pref("breakpad.reportURL", "");
//user_pref("browser.newtabpage.activity-stream.default.sites", "");
user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);
user_pref("browser.newtabpage.activity-stream.showSponsored", false);
user_pref("services.sync.prefs.sync.browser.newtabpage.activity-stream.showSponsored", false);
user_pref("browser.newtabpage.enabled", true);
user_pref("browser.newtabpage.activity-stream.default.sites", "http://planet.i2p/,http://legwork.i2p/,http://i2pwiki.i2p/,http://i2pforums.i2p/,http://zzz.i2p/");
user_pref("dom.security.https_only_mode", false);
user_pref("keyword.enabled", false);
user_pref("extensions.allowPrivateBrowsingByDefault", true);
user_pref("extensions.PrivateBrowsing.notification", false);
user_pref("browser.newtabpage.activity-stream.feeds.topsites", true);
user_pref("ui.use_standins_for_native_colors", true);
user_pref("webgl.disable-extensions", true);
user_pref("webgl.min_capability_mode", true);
user_pref("webgl.disable-fail-if-major-performance-caveat", true);
user_pref("webgl.enable-webgl2", false);
user_pref("dom.w3c_touch_events.enabled", false);
user_pref("browser.privatebrowsing.autostart", false);
user_pref("browser.display.use_system_colors", false);