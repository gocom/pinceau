# Changelog

## 0.14.0

* Disable the **Welcome to Firefox** onboarding modal that appears on the first launch.

## 0.13.0

* Remove "Play tab" button from tabs.

## 0.12.0

* Disable drag-to-pin tab feature. The drop zone that appears at the start of horizontal tab bar when dragging a
  tab, causes content shifting and makes it harder to drag a tab at the beginning of the tab bar. Tabs can be pinned
  from the tab's context menu.

## 0.11.0

* Disable AI tab grouping. Disabling  AI and machine learning features, running on the background, improves performance,
  as the models are ran locally on the user's system, causing high resource usage, degrading user experience.
* Disable AI link hover preview.
* Disable AI chat panel. AI chat's can be used through their own website's and services and do not need to be integrated
  in the browser UI.
* Disable URL bar's picture-in-picture button.

## 0.10.0

* Firefox 142 new tab page compatibility.

## 0.9.0

* Firefox 139 new tab page compatibility.

## 0.8.0

* Firefox 136 new tab page compatibility.
* Enable "Add search engine" button in the search settings. Allows adding new search engines.
* Enable adaptive history sorting for the URL bar history results.
* Disable picture-in-picture due to memory usage issues.

## 0.7.0

* Disable password saving, preferring external password managers.
* Disable tab hover images.
* Disable recent searches from URL bar suggestions.
* Add support for custom user.js file. Custom user.js file can be placed inside custom directory, which
  is then appended to the built user.js file.
* Improve new tab page's "Add Shortcut" tile's styles.
* Improve new tab page's shortcut grid styling on rows that do not have enough items to fill the whole row.

## 0.6.0

* Remove weather widget from the new tab page.
* Fix new tab page tile hover styling on recent Firefox versions. The hover background used to be disabled, and
  is now again.
* Disable Pocket extension.

## 0.5.0

* Remove overflow menu's main hamburger menu replacement feature. Firefox >= 109 has a separate extension menu
  where extension icons go, making the additional overflow less useful. As such, we no longer are able to reduce
  the number of menus to just one; instead we can now display the more feature rich main menu instead and have an
  option for a third additional overflow menu.

## 0.4.2

* Disable search engine suggestion row in address bar.
* Disable CFR recommendations.

## 0.4.1

* Disable ads in address bar on Firefox >= 94.

## 0.4.0

* Reduce pre-tab spacing on Windows.

## 0.3.0

* Enable native macOS fullscreen.
* Add Makefile wrapper.

## 0.2.0

* New tab page top sites **Custom Image URL** support.
  Image now covers the whole thumbnail area.
* Disable Firefox after update homepage override.
* Disable sponsored top sites.
* Remove fixed top sites count.
* Fix compatibility with Firefox >= 89.
* Now requires Firefox 89 or newer.

## 0.1.5

* Remove outdated tab overflow arrow shadow styles.

## 0.1.4

* Re-publish 0.1.3 build artifact.

## 0.1.3

* Fix compatibility with Firefox >= 73, root was changed to HTML from XUL.

## 0.1.2

* Enable user stylesheets by default on Firefox >= 69.

## 0.1.1

* Resolves compatibility issues with Firefox >= 69 new tab page.

## 0.1.0

* Initial release.
