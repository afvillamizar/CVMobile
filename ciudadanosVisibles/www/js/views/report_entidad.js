(function (FMS, Backbone, _, $) {
    _.extend(FMS, {
        ReportEntidadView: FMS.FMSView.extend({
            template: 'report_entidad',
            id: 'report_entidad-page',
            prev: 'login',
            
            events: {
                'pagehide': 'destroy',
                'pagebeforeshow': 'beforeDisplay',
                'pageshow': 'afterDisplay',
                'vclick .ui-btn-left': 'onClickButtonPrev',
                'vclick .ui-btn-right': 'onClickButtonNext',
                'vclick #buscarReporte': 'buscarReporte'
            },
           
               afterDisplay: function() 
               {
                  $('#nombreEntidad').html('Bienvenido ' + FMS.body);
                  this.listenTo(FMS.locator, 'search_located', this.searchSuccess );
                  this.listenTo(FMS.locator, 'search_failed', this.searchFail);
                  FMS.locator.lookup(FMS.body);
            },

               searchSuccess: function (info) {
                this.stopListening(FMS.locator, 'search_located');
                this.stopListening(FMS.locator, 'search_failed');
                FMS.coordenadas = info.coordinates;
                $('#nombreEntidad').html('Bienvenido ' + FMS.body);
                //$('#nombreEntidad').html('Bienvenido ' + FMS.body + "<br> Latitud: " + FMS.coordenadas.latitude + " Longitud: " + FMS.coordenadas.longitude);
                //var coords = info.coordinates;
                //if (fixmystreet.map) {
                //    fixmystreet.map.panTo(this.projectCoords(coords));
                //} else {
                //    this.setMapPosition(info);
                //    this.displayButtons(false);
                //}
            },

            searchFail: function (details) {
                event.preventDefault();//agregado por diana.
                // this makes sure any onscreen keyboard is dismissed
                 //$('#submit').focus();
                info.coordenadas = undefined;
                this.stopListening(FMS.locator, 'search_located');
                this.stopListening(FMS.locator, 'search_failed');
                if ( details.msg ) {
                    this.searchError( details.msg );
                } else if ( details.locations ) {
                    var multiple = '';
                    for ( var i = 0; i < details.locations.length; i++ ) {
                        var loc = details.locations[i];
                        var li = '<li><a class="address" id="location_' + i + '" data-lat="' + loc.lat + '" data-long="' + loc.long + '">' + loc.address + '</a></li>';
                        multiple = multiple + li;
                    }
                    $('#front-howto').html('<p>Multiple matches found</p><ul data-role="listview" data-inset="true">' + multiple + '</ul>');
                    $('.ui-page').trigger('create');
                    $('#relocate').hide();
                    $('#front-howto').show();
                } else {
                    this.searchError( FMS.strings.location_problem );
                }
            },
           

            _back: function () {
                navigator.app.exitApp();
            },

            setHeight: function (content, height) {
                content.css('min-height', content + 'px');
            },
            buscarReporte: function (e)
            {   e.preventDefault();
                $('#pcEntidad').focus();
                if (this.validate()) 
                {
                    this.BuscarCasosAbiertos();
                }
            },
            BuscarCasosAbiertos: function ()
            {
                var that = this;
                $.ajax({
                    url: CONFIG.FMS_URL + '/ajax/lat_long_open',
                    type: 'POST',
                    data: {
                        lat: FMS.coordenadas.latitude,
                        long: FMS.coordenadas.longitude,
                        busqueda: $('#pcEntidad').val()
                    },
                    dataType: 'json',
                    timeout: 30000,
                    success: function (data)
                    {
                        //that.model.set('numCasoAbierto', data.newproblems.length);
                        //that.model.save();

                        var index, len;
                        for (index = 0, len = data.newproblems.length; index < len; ++index)
                        {
                            var newDraftEntidad = new FMS.Draft();
                            newDraftEntidad.attributes.title = data.newproblems[index];
                            newDraftEntidad.attributes.details = data.descriptions[index];
                            newDraftEntidad.attributes.lat = data.locations[index].lat;
                            newDraftEntidad.attributes.lon = data.locations[index].long;
                            newDraftEntidad.id = data.id[index];
                            newDraftEntidad.url= data.url[index];
                            FMS.allDraftsEntidad.add(newDraftEntidad);
                        }
                        FMS.numCasosAbiertos = data.newproblems.length;
                        //that.navigate('details_entidad');
                        that.BuscarNuevosCasos();
                    },
                    error: function () {
                        FMS.printDebug('Se estalló');
                        FMS.printDebug(data);
                        FMS.printDebug(that.model.toJSON());
                    }
                });
            },
            BuscarNuevosCasos: function ()
            {
                var that = this;
                $.ajax({
                    url: CONFIG.FMS_URL + '/ajax/lat_long_new',
                    type: 'POST',
                    data: {
                        lat: FMS.coordenadas.latitude,
                        long: FMS.coordenadas.longitude,
                        busqueda: $('#pcEntidad').val()
                    },
                    dataType: 'json',
                    timeout: 30000,
                    success: function (data) {
                        var index, len;
                        for (index = 0, len = data.newproblems.length; index < len; ++index) {
                            var newReportEntidad = new FMS.Draft();
                            newReportEntidad.attributes.title = data.newproblems[index];
                            newReportEntidad.attributes.details = data.descriptions[index];
                            newReportEntidad.attributes.lat = data.locations[index].lat;
                            newReportEntidad.attributes.lon = data.locations[index].long;
                            newReportEntidad.id = data.id[index];
                            newReportEntidad.url = data.url[index];
                            FMS.allNewReportEntidad.add(newReportEntidad);
                            FMS.printDebug(that.model.toJSON());
                        }
                        FMS.numNewReportEntidad = data.newproblems.length;
                        that.BuscarCasosCerrados();
                    },
                    error: function () {
                        FMS.printDebug('Se estalló');
                        FMS.printDebug(that.model.toJSON());
                    }
                });
            },
            BuscarCasosCerrados: function ()
            {
                var that = this;
                $.ajax({
                    url: CONFIG.FMS_URL + '/ajax/lat_long_closed',
                    type: 'POST',
                    data: {
                        lat: FMS.coordenadas.latitude,
                        long: FMS.coordenadas.longitude,
                        busqueda: $('#pcEntidad').val()
                    },
                    dataType: 'json',
                    timeout: 30000,
                    success: function (data) {
                        var index, len;
                        for (index = 0, len = data.newproblems.length; index < len; ++index) {
                            var closedReportEntidad = new FMS.Draft();
                            closedReportEntidad.attributes.title = data.newproblems[index];
                            closedReportEntidad.attributes.details = data.descriptions[index];
                            closedReportEntidad.attributes.lat = data.locations[index].lat;
                            closedReportEntidad.attributes.lon = data.locations[index].long;
                            closedReportEntidad.id = data.id[index];
                            closedReportEntidad.url = data.url[index];
                            FMS.allClosedReportEntidad.add(closedReportEntidad);
                        }
                        FMS.numClosedReportEntidad = data.newproblems.length;
                        that.navigate('details_entidad');
                    },
                    error: function () {
                        FMS.printDebug('Se estalló');
                        FMS.printDebug(that.model.toJSON());
                    }
                });
            },
            validate: function ()
            {
                this.clearValidationErrors();
                var isValid = 1;
                if (!$('#pcEntidad').val())
                {
                    isValid = 0;
                    this.validationError('pcEntidad', FMS.validationStrings.search);
                }
                if (!isValid)
                {
                    // this makes sure the onscreen keyboard is dismissed
                    $('#pcEntidad').focus();
                }
                return isValid;
            },
            //lat: FMS.coordenadas.latitude,
            //long: FMS.coordenadas.longitude,
            //busqueda: $('#pcEntidad').val()
        })
    });
})(FMS, Backbone, _, $);