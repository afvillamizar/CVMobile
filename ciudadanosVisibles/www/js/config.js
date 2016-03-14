var CONFIG = {
    // Language of templates to use ( should be name of directory under www/templates/ )
    LANGUAGE: 'en',

    // Name of app to use in alert dialog titles amongst other things
    APP_NAME: 'Ciudadanos Visibles',

    // URL of the fixmystreet install to report to. See also config.xml-example
    FMS_URL: 'http://ciudadanosvisibles2.cloudapp.net/',
    //FMS_URL: 'http://192.168.1.6/',
    //FMS_URL:  'http://www.fixmystreet.com/',
    //FMS_URL: 'http://ciudadanosvisibles.cloudapp.net/',
    // Name of the cobrand to use for templates, stylesheets etc.
    // Cobrand files should be placed in a new directory within www/cobrands/
    // Leave as null to use the default templates.
    COBRAND: null,

    // namespace for storing drafts etc in. Should not need to change
    NAMESPACE: 'fixmystreet',

    // directory to store draft photos in. Should not need to change
    FILES_DIR: 'photos',

    // accuracy in meters required before geolocation is successful
    ACCURACY: 100,

    // how long, in milliseconds, before photo uploads timeout. Defaults to 120000 ( 2 minutes )
    UPLOAD_TIMEOUT: 120000,

    // Set to 1 to log debug messages to the console
    DEBUG:1,

    // leave this at 0 otherwise it will use the fixmystreet tile set   
    // which only covers the UK
    isUK: 0
   
};
