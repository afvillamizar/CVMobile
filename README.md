FixMyStreet Mobile App
----------------------

This is the FixMyStreet mobile app for reporting problems to an instance of the
FixMyStreet platform - https://github.com/mysociety/fixmystreet.

**You *must* have your FixMyStreet webserver up and running first:** the mobile app
ultimately sends reports via that. It is not a standalone service. For more information
on FixMyStreet, see http://fixmystreet.org

It's still in development at the moment and only a small amount of time
has been spent on making it re-brandable/re-usable so if you want to
create your own version on top of it you may be in for a bumpy ride.

The FixMyStreet mobile app uses PhoneGap and has versions for Android and iOS.

Running
-------

To get it up and running you will need to create `www/js/config.js` based
on the `www/js/config.js-example` file. This has configuration for which FMS instance
to use etc.

You should also create a `config.xml` file based on `config.xml-example`.
The only change you should need to make is to add the hostname of your FMS installation
in an `<access origin=""/>` tag.

Setup
-----
This project uses Apache Cordova to produce Android and iOS apps. There is
some mildly complicated configuration and setup required to be able to develop
with it. The following all assumes you're working on a Mac.

1. Make sure you have the latest versions of XCode, the Android SDK, node and
npm installed. It's a very good idea to have installed the Intel HAXM versions
of the Android emulator because they're about 100 times faster to run. You need
to download it from the Android SDK Manager (run `android` on the command line)
and then actually run the `.dmg` that this creates in your sdk folder.

2. Install the cordova CLI with npm: `npm install -g cordova`
Note that this is not the same as the phonegap CLI and the two should not be
mixed up. The latter gives you access to Adobe's proprietary phonegap build
service, which we **don't** use!

3. Checkout the project, copy `config.xml-example` to `config.xml` and edit to suit.

4. `cd` into the project directory and install the Cordova platforms you need:
`cordova platform add android` and `cordova platform add ios`

5. Add the cordova plugins we use. As of writing the list is: (from `cordova plugin list`)

   ```
   cordova-plugin-camera 1.2.0 "Camera"
   cordova-plugin-device 1.0.1 "Device"
   cordova-plugin-dialogs 1.1.1 "Notification"
   cordova-plugin-file 2.1.0 "File"
   cordova-plugin-file-transfer 1.2.1 "File Transfer"
   cordova-plugin-geolocation 1.0.1 "Geolocation"
   cordova-plugin-inappbrowser 1.0.1 "InAppBrowser"
   cordova-plugin-media 1.0.1 "Media"
   cordova-plugin-media-capture 1.0.1 "Capture"
   cordova-plugin-network-information 1.0.1 "Network Information"
   cordova-plugin-splashscreen 2.1.0 "Splashscreen"
   cordova-plugin-statusbar 1.0.1 "StatusBar"
   cordova-plugin-whitelist 1.0.0 "Whitelist"
   ```

   So to install them: `cordova plugin add cordova-plugin-camera cordova-plugin-device cordova-plugin-dialogs cordova-plugin-file cordova-plugin-file-transfer cordova-plugin-geolocation cordova-plugin-inappbrowser cordova-plugin-media cordova-plugin-media-capture cordova-plugin-network-information cordova-plugin-splashscreen cordova-plugin-statusbar cordova-plugin-whitelist`

6. Copy `www/js/config.js-example` to `www/js/config.js` and edit if needed

7. To run the project on one of the platforms, use: `cordova emulate ios` or `cordova emulate android`
(You might need to `npm install -g ios-sim` to run it on ios)

You should then be able to build and run it like any other Cordova project.

- The `platforms`, `plugins` and `hooks` folders are auto-generated by Cordova
no need to check them in (hence why they're .gitignored), you should only need
to check in the `www` folder and `config.xml`, plus possibly `/merges` if you
ever use that functionality.

Basic structure
---------------
* `www` - JS, HTML, CSS and image files
* `templates` - templates with strings to be translated
* `locale` - gettext translation files
* `bin` - helper scripts for translation

`www` Stucture
------------
* `css` - css files
* `js` - project javascript files
* `js/views` - backbone view files
* `js/models` - backgone model files
* `jslib` - third party javascript libraries and files
* `templates` - underscore templates for the pages
* `cobrands` - template overrides and stylesheets for your own cobrand

Cobranding
----------

If you want to change the appearance of the app (e.g. to change the colour scheme, or provide
your own FAQ/help text), you can use your own templates and stylesheets to achieve this.

Rather than editing the existing templates in `www/templates/en`, you should override the default
template by placing your own version in `www/cobrands/<cobrand name>/templates/en` and set the
`CONFIG.COBRAND` value appropriately in `www/js/config.js`.

For example to change the intro text that's shown when you first launch the app, set
`CONFIG.COBRAND` to `mycobrand` and then copy `www/templates/en/initial_help.html` to
`www/cobrands/mycobrand/templates/en/initial_help.html` and edit it with your new text.

To change the colour theme or other styles used in the app, create
`www/cobrands/mycobrand/css/style.css` and add your own CSS rules. If `CONFIG.COBRAND` is set to
`mycobrand` then this new CSS file will be included in the page HTML automatically.

Translation
-----------
We use gettext for translation with a series of templated files that use the Template Toolkit
Perl module. The scripts are based on those used for the FixMyStreet website. In the templates
directory are a set of page templates marked up for translation. These are parsed by the scripts
and a set of strings to be translated are extracted. These strings are then used to generate a
a set of .po files for each language under locales, which in turn generate a set of translated
template files for use in the app. For more details see the translating file.

The app only supports one language at a time at the moment.