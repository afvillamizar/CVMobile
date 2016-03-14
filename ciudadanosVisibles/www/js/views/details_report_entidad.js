(function (FMS, Backbone, _, $) {
    _.extend(FMS, {
        DetailsReportEntidadView: FMS.FMSView.extend({
            template: 'details_report_entidad',
            id: 'details_report_entidad-page',
            prev: 'ver_report_entidad',
            //next: 'submit-start',
            bottomMargin: -20,

            events: {
                'pagehide': 'destroy',
                //'pagebeforeshow': 'beforeDisplay',
                'pageshow': 'afterDisplay',
                'vclick .ui-btn-left': 'onClickButtonPrev',
                //'vclick .ui-btn-right': 'onClickButtonNext',
                'vclick #gestion':'onClickGestion'
                //'blur textarea': 'updateCurrentReport',
                //'change select': 'updateSelect',
                //'blur input': 'updateCurrentReport'
            },

            afterDisplay: function () {
                //$('#cabecera').html('<h2>' + FMS.currentDraftEntidad.attributes.title + '</h2>');
                $('#titulo').html('<h2> Reporte </h2>' +'<p>' + FMS.currentDraftEntidad.attributes.title + '</p>');
                $('#detalle').html('<h2> Detalle </h2>' + '<p>' + FMS.currentDraftEntidad.attributes.details + '</p>');
                $('#url').html('<h2>Url:</h2>' + '<a href="'+FMS.currentDraftEntidad.url+'">' + FMS.currentDraftEntidad.url + '</a>');
            },

            afterRender: function () {
                this.$('#form_category').attr('data-role', 'none');

                if (this.model.get('category')) {
                    this.$('#form_category').val(this.model.get('category'));
                }
                this.setSelectClass();

            },
            //beforeDisplay: function () {
            //    this.fixPageHeight();
            //    var header = this.$("div[data-role='header']:visible"),
            //    detail = this.$('#form_detail'),
            //    top = detail.position().top,
            //    viewHeight = $(window).height(),
            //    contentHeight = viewHeight - header.outerHeight() + 15;

            //    detail.height(contentHeight - top);
            //},

            onClickButtonPrev: function (e) {
                e.preventDefault();
                this.updateCurrentReport();
                this.navigate(this.prev, true);
            },

            onClickButtonNext: function (e) {
                e.preventDefault();
                // dismiss on screen keyboard
                $('.ui-btn-right').focus();
                this.clearValidationErrors();
                var valid = 1;

                if (!$('#form_title').val()) {
                    valid = 0;
                    this.validationError('form_title', FMS.validationStrings.title);
                }

                if (!$('#form_detail').val()) {
                    valid = 0;
                    this.validationError('form_detail', FMS.validationStrings.detail);
                }

                var cat = $('#form_category').val();
                if (cat == '-- Pick a category --') {
                    valid = 0;
                    this.validationError('form_category', FMS.validationStrings.category);
                }

                if (valid) {
                    this.clearValidationErrors();
                    this.updateCurrentReport();
                    if (FMS.isOffline) {
                        this.navigate('save_offline');
                    } else {
                        var that = this;
                        $.ajax({
                            url: CONFIG.FMS_URL + '/report/new/category_extras',
                            type: 'POST',
                            data: {
                                category: this.model.get('category'),
                                latitude: this.model.get('lat'),
                                longitude: this.model.get('lon')
                            },
                            dataType: 'json',
                            timeout: 30000,
                            success: function (data, status) {
                                if (data && data.category_extra && data.category_extra.length > 0) {
                                    that.model.set('category_extras', data.category_extra);
                                    that.navigate('details_extra');
                                } else {
                                    that.navigate(that.next);
                                }
                            },
                            error: function () {
                                that.displayAlert(FMS.strings.category_extra_check_error);
                            }
                        });
                    }
                }
            },

            validationError: function (id, error) {
                var el_id = '#' + id;
                var el = $(el_id);

                el.addClass('error');
                if (el.val() === '') {
                    el.attr('orig-placeholder', el.attr('placeholder'));
                    el.attr('placeholder', error);
                }
            },

            clearValidationErrors: function () {
                $('.error').removeClass('error');
                $('.error').each(function (el) { if (el.attr('orig-placeholder')) { el.attr('placeholder', el.attr('orig-placeholder')); } });
            },

            setSelectClass: function () {
                var cat = this.$('#form_category');
                if (cat.val() !== "" && cat.val() !== '-- Pick a category --') {
                    cat.removeClass('noselection');
                } else {
                    cat.addClass('noselection');
                }
            },

            updateSelect: function () {
                this.updateCurrentReport();
                this.setSelectClass();
            },

            updateCurrentReport: function () {
                var category = $('#form_category').val();
                if (category === '-- Pick a category --') {
                    category = '';
                }
                if (category && $('#form_title').val() && $('#form_detail').val()) {
                    $('#next').addClass('page_complete_btn');
                } else {
                    $('#next').removeClass('page_complete_btn');
                }
                this.model.set('category', category);
                this.model.set('title', $('#form_title').val());
                this.model.set('details', $('#form_detail').val());
                FMS.saveCurrentDraft();
            },
            onClickGestion: function (e) {
                e.preventDefault();
                this.navigate('details_gestion_entidad');
            },
        })
    });
})(FMS, Backbone, _, $);