(function (FMS, Backbone, _, $) {
    _.extend( FMS, {
        HomeView: FMS.FMSView.extend({
            template: 'home',
            id: 'front-page',

            afterRender: function() {
                $('#locating').show();
				//alert('hola');
            },

            afterDisplay: function() {
                $('#load-screen').hide();
                if ( FMS.isOffline ) {
                    this.navigate( 'offline' );
                } else if ( FMS.currentDraft && (
                    FMS.currentDraft.get('title') || FMS.currentDraft.get('lat') ||
                    FMS.currentDraft.get('details') || FMS.currentDraft.get('file') )
                ) {
                    this.navigate( 'existing' );
                } else {
                    this.navigate( 'around' );
                }
            }
        })
    });
})(FMS, Backbone, _, $);
