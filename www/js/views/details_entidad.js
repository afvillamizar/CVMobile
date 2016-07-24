(function (FMS, Backbone, _, $) {
    _.extend(FMS, {
        DetailsEntidadView: FMS.FMSView.extend({
            template: 'details_entidad',
            id: 'details_entidad-page',
            prev: 'report_entidad',

            events: {
                'pagehide': 'destroy',
                'pagebeforeshow': 'beforeDisplay',
                'pageshow': 'afterDisplay',
                'vclick .ui-btn-left': 'onClickButtonPrev',
                'vclick #new_report': 'onClickNewReport',
                'vclick #view-open-reports': 'onClickOpenReport',
                'vclick #view-new-reports': 'onClickNewReport',
                'vclick #view-regalias': 'onClickNewReportRegalias',
                'vclick #view-close-reports': 'onClickCloseReport'
            },

            afterDisplay: function () {
                if (!(FMS.numCasosAbiertos == undefined || FMS.numCasosAbiertos == 0)) {
                    $("#view-open-reports #open-reports").text(FMS.numCasosAbiertos);
                }
                else {
                    $("#view-open-reports #open-reports").text("0");
                }
                if (!(FMS.allReporteRegalias == undefined || FMS.numReporteRegalias == 0)) {
                    $("#view-regalias #regalias-reports").text(FMS.numReporteRegalias);
                }
                else {
                    $("#view-regalias #regalias-reports").text("0");
                }
                if (!(FMS.numNewReportEntidad == undefined || FMS.numNewReportEntidad == 0)) {
                    $("#view-new-reports #new-reports").text(FMS.numNewReportEntidad);
                }
                else {
                    $("#view-new-reports #new-reports").text("0");
                }
                if (!(FMS.numClosedReportEntidad == undefined || FMS.numClosedReportEntidad == 0)) {
                    $("#view-close-reports #close-reports").text(FMS.numClosedReportEntidad);
                }
                else {
                    $("#view-close-reports #close-reports").text("0");
                }
            },

            onClickNuevoReporte: function (e) {
                e.preventDefault();
                this.navigate('ver_report_entidad');
            },
            onClickNewReport: function (e) {
                e.preventDefault();
                FMS.tipoReporteEntidad = 1;
                this.navigate('ver_report_entidad');
            },
            onClickOpenReport: function (e) {
                e.preventDefault();
                FMS.tipoReporteEntidad = 2;
                this.navigate('ver_report_entidad');
            },
            onClickCloseReport: function (e) {
                e.preventDefault();
                FMS.tipoReporteEntidad = 3;
                this.navigate('ver_report_entidad');
            },
            onClickNewReportRegalias: function (e) {
                e.preventDefault();
                FMS.tipoReporteEntidad = 4;
                this.navigate('ver_report_entidad');
            },
        })
    });
})(FMS, Backbone, _, $);