(function (FMS, Backbone, _, $) {
    _.extend(FMS, {
        VerReportEntidadView: FMS.FMSView.extend({
            template: 'ver_report_entidad',
            id: 'ver_report_entidad-page',
            //next: 'details_entidad',
            prev: 'details_entidad',
            contentSelector: '#drafts',

            events: {
                'pagehide': 'destroy',
                'pagebeforeshow': 'beforeDisplay',
                'pageshow': 'afterDisplay',
                'vclick .del_report': 'deleteReport',
                'vclick .use_report': 'useReport',
                'vclick .ui-btn-left': 'onClickButtonPrev',
                'vclick .ui-btn-right': 'onClickButtonNext'
            },

            afterDisplay: function () {
                switch (FMS.tipoReporteEntidad) {
                    case 1:
                        $("#titulo_report").text("Nuevos Reportes");
                        break;
                    case 2:
                        $("#titulo_report").text("Reportes Abiertos");
                        break;
                    case 3:
                        $("#titulo_report").text("Casos Cerrados");
                        break;
                    case 4:
                        $("#titulo_report").text("Reportes proyecto regal\u00edas");
                        break;
                }

            },

            onClickButtonPrev: function (e) {
                $('#drafts').hide();
                $('body')[0].scrollTop = 0;
                e.preventDefault();
                this.navigate(this.prev, true);
            },

            onClickButtonNext: function (e) {
                $('#drafts').hide();
                $('body')[0].scrollTop = 0;
                e.preventDefault();
                this.navigate(this.next);
            },

            deleteReport: function (e) {
                e.preventDefault();
                var el = $(e.target);
                var id = el.parents('li').attr('id');
                var del = FMS.removeDraft(id, true);
                var that = this;
                del.done(function () { that.onRemoveDraft(el); });
                del.fail(function () { that.onRemoveDraft(el); });
            },

            setHeight: function (content, height) {
                content.css('min-height', content + 'px');
            },

            beforeDisplay: function () {
                $('#report-list').show();
                if (FMS.tipoReporteEntidad === 1)//Nuevo
                {
                    if (FMS.allNewReportEntidad.length === 0) {
                        $('#report-list').hide();
                        $('#noreports').show();
                    }
                }
                else if (FMS.tipoReporteEntidad === 2)//Abiertos
                {
                    if (FMS.allDraftsEntidad.length === 0) {
                        $('#report-list').hide();
                        $('#noreports').show();
                    }
                }
                else if (FMS.tipoReporteEntidad === 4)//Regalias
                {
                    if (FMS.allReporteRegalias.length === 0) {
                        $('#report-list').hide();
                        $('#noreports').show();
                    }
                }
                else //Cerrados
                {
                    if (FMS.allClosedReportEntidad.length === 0) {
                        $('#report-list').hide();
                        $('#noreports').show();
                    }
                }


            },

            useReport: function (e) {
                e.preventDefault();
                var el = $(e.target);
                var id = el.parents('li').attr('id');
                if (FMS.tipoReporteEntidad === 1)//Nuevo
                {
                    FMS.currentDraftEntidad = FMS.allNewReportEntidad.get(id);
                }
                else if (FMS.tipoReporteEntidad === 2)//Abiertos
                {
                    FMS.currentDraftEntidad = FMS.allDraftsEntidad.get(id);
                }
                else if (FMS.tipoReporteEntidad === 4)//Regalias
                {
                    FMS.currentDraftEntidad = FMS.allReporteRegalias.get(id);
                }
                else //Cerrados
                {
                    FMS.currentDraftEntidad = FMS.allClosedReportEntidad.get(id);
                }

                $('#drafts').hide();
                if (FMS.currentDraftEntidad && FMS.currentDraftEntidad.get('lat')) {
                    var coords = { latitude: FMS.currentDraftEntidad.get('lat'), longitude: FMS.currentDraftEntidad.get('lon') };
                    fixmystreet.latitude = coords.latitude;
                    fixmystreet.longitude = coords.longitude;

                    if (fixmystreet.map) {
                        var centre = new OpenLayers.LonLat(coords.longitude, coords.latitude);
                        centre.transform(
                            new OpenLayers.Projection("EPSG:4326"),
                            fixmystreet.map.getProjectionObject()
                        );

                        fixmystreet.map.panTo(centre);
                    }
                }
                this.navigate('details_report_entidad');
            },

            onRemoveDraft: function (el) {
                el.parents('li').remove();



                if (FMS.tipoReporteEntidad === 1)//Nuevo
                {
                    if (FMS.allNewReportEntidad.length === 0) {
                        $('#report-list').hide();
                        $('#noreports').show();
                    }
                }
                else if (FMS.tipoReporteEntidad === 2)//Abiertos
                {
                    if (FMS.allDraftsEntidad.length === 0) {
                        $('#report-list').hide();
                        $('#noreports').show();
                    }
                }
                else if (FMS.tipoReporteEntidad === 4)//Regalias
                {
                    if (FMS.allReporteRegalias.length === 0) {
                        $('#report-list').hide();
                        $('#noreports').show();
                    }
                }
                else //Cerrados
                {
                    if (FMS.allClosedReportEntidad.length === 0) {
                        $('#report-list').hide();
                        $('#noreports').show();
                    }
                }


            },

            render: function () {
                if (!this.template) {
                    FMS.printDebug('no template to render');
                    return;
                }
                template = _.template(tpl.get(this.template));
                if (this.model) {
                    if (FMS.tipoReporteEntidad === 1)//Nuevo
                    {
                        this.$el.html(template({ model: this.model.toJSON(), drafts: FMS.allNewReportEntidad }));
                    }
                    else if (FMS.tipoReporteEntidad === 2)//Abiertos
                    {
                        this.$el.html(template({ model: this.model.toJSON(), drafts: FMS.allDraftsEntidad }));
                    }
                    else if (FMS.tipoReporteEntidad === 4)//Abiertos
                    {
                        this.$el.html(template({ model: this.model.toJSON(), drafts: FMS.allReporteRegalias }));
                    }
                    else//Cerrados
                    {
                        this.$el.html(template({ model: this.model.toJSON(), drafts: FMS.allClosedReportEntidad }));
                    }

                } else {
                    this.$el.html(template());
                }
                this.afterRender();
                return this;
            }
        })
    });
})(FMS, Backbone, _, $);
