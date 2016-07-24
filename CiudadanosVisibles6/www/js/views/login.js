(function (FMS, Backbone, _, $) {
    _.extend( FMS, {
        LoginView: FMS.FMSView.extend({
            template: 'login',
            id: 'login',
            next: 'around',
            prev: 'around',

            events: {
                'pagehide': 'destroy',
                'pagebeforeshow': 'beforeDisplay',
                'pageshow': 'afterDisplay',
                'vclick #login': 'onClickLogin',
                'submit #signinForm': 'onClickLogin',
                'vclick #logout': 'onClickLogout',
                'vclick .ui-btn-left': 'onClickButtonPrev',
                'vclick .ui-btn-right': 'onClickButtonNext',
                'vclick #entidades_territoriales': 'onClickEntidades'
            },

            afterDisplay: function ()
            {
                if (FMS.isOffline)
                {
                    $('#locating').hide();
                    this.navigate('offline');
                }
                else if (FMS.isLoggedIn && FMS.currentUser !== null && FMS.currentUser.get('body') !== undefined) {
                    
                    var that = this;
                    that.model.set('password', FMS.currentUser.get('password'));
                    that.model.set('email', FMS.currentUser.get('email'));
                    that.model.set('name', FMS.currentUser.get('name'));
                    that.model.set('from_body', FMS.currentUser.get('from_body'));
                    that.model.set('body', FMS.currentUser.get('body'));
                    that.model.save();
                    FMS.body = FMS.currentUser.get('body');
                    FMS.isLoggedIn = 1;
                    this.$('#botonEntidad_login').show();
                }
                else if (FMS.isLoggedIn && FMS.currentUser !== null && FMS.currentUser.get('email') !== undefined  && FMS.currentUser.get('password') !== undefined ) // Caso sin body
                {
                    this.validateUser(FMS.currentUser.get('email'), FMS.currentUser.get('password'));
                }
                this.setupHelp();
            },

            onClickLogin: function(e) {
                // prevent form submission from onscreen keyboard
                e.preventDefault();
                $('#login').focus();
                if (this.validate()) {
                    this.validateUser($('#form_email').val(), $('#form_password').val());
                }
            },
            onClickLogout: function(e) {
                e.preventDefault();
                var that = this;
                $.ajax( {
                    url: CONFIG.FMS_URL + '/auth/ajax/sign_out',
                    type: 'GET',
                    dataType: 'json',
                    timeout: 30000,
                    success: function( data, status ) {
                        FMS.isLoggedIn = 0;
                        that.model.set('password', '');
                        that.model.save();
                        that.$('#form_email').val('');
                        that.$('#form_password').val('');
                        that.$('#success_row').hide();
                        that.$('#signed_in_row').hide();
                        that.$('#password_row').show();
                        that.setupHelp();
                    },
                    error: function() {
                        that.validationError('err', FMS.strings.logout_error);
                    }
                });
                
            },
            onClickEntidades: function(e) {
                e.preventDefault();
                var a = this;
                a.navigate('report_entidad');
            },
            validate: function() {
                this.clearValidationErrors();
                var isValid = 1;

                if ( !$('#form_password').val() ) {
                    isValid = 0;
                    this.validationError('form_password', FMS.validationStrings.password );
                }

                var email = $('#form_email').val();
                if ( !email ) {
                    isValid = 0;
                    this.validationError('form_email', FMS.validationStrings.email.required);
                // regexp stolen from jquery validate module
                } else if ( ! /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email) ) {
                    isValid = 0;
                    this.validationError('form_email', FMS.validationStrings.email.email);
                }

                if ( !isValid ) {
                    // this makes sure the onscreen keyboard is dismissed
                    $('#login').focus();
                }

                return isValid;
            },
            validateUser: function (emailUser, password)
            {
                var that = this;
                $.ajax({
                    url: CONFIG.FMS_URL + '/auth/ajax/sign_in',
                    type: 'POST',
                    data: {
                        email: emailUser,
                        password_sign_in: password,
                        remember_me: 1
                        
                    },
                    dataType: 'json',
                    timeout: 30000,
                    success: function (data, status) {
                        if (data.name) {
                            that.model.set('password', password);
                            that.model.set('email', emailUser);
                            that.model.set('name', data.name);
                            that.model.set('from_body', data.from_body);
                            that.model.set('body', data.body);
                            that.model.save();
                            FMS.body = data.body;
                            FMS.isLoggedIn = 1;
                            //validacion del usuario como perteneciente a entidad territorial
                            if (data.from_body !== undefined) {
                                that.$('#password_row').hide();
                                that.$('#success_row').show();
                                that.$('#botonEntidad').show();
                            }
                            else {
                                that.$('#password_row').hide();
                                that.$('#success_row').show();
                                that.$('#botonEntidad').hide();

                            }
                            that.setupHelp();
                        } else {
                            that.validationError('signinForm', FMS.strings.login_details_error);
                        }
                    },
                    error: function () {
                        that.validationError('signinForm', FMS.strings.login_error);
                    }
                });
            },
            setupHelp: function ()
            {
                var help = $('#help'),
                helpContent = $('#helpContent'),
                viewWidth = $(window).width();
                var template;
                if (FMS.body == undefined || FMS.isLoggedIn==0)
                {
                 template = _.template(tpl.get('help'));
                }
                else
                {
                   template = _.template(tpl.get('help_entidades'));
                }
                helpContent.html(template());
            }
        })
    });
})(FMS, Backbone, _, $);
