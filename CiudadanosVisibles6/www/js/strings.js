(function (FMS, _) {
    _.extend( FMS, {
        validationStrings: {
            update: 'Por favor, escribe un mensaje',
            title: 'Por favor, escribe un asunto',
            detail: 'Por favor, escribe algunos detalles',
            search: 'Por favor, ingresa los criterios de b\u00FAsqueda',
            name: {
                required: 'Por favor, escribe tu nombre',
                validName: 'Por favor, escribe tu nombre completo, las entidades necesitan esta informaci\u00F3n - si no deseas que tu nombre sea mostrado en el sitio, desmarca la casilla de abajo'
            },
            category: 'Por favor, selecciona una categor\u00EDa',
            rznvy: {
                required: 'Por favor, ingresa tu Correo electr\u00F3nico',
                email: 'Por favor, valida tu Correo electr\u00F3nico'
            },
            email: {
                required: 'Por favor, ingresa tu Correo electr\u00F3nico',
                email: 'Por favor, valida tu Correo electr\u00F3nico'
            },
            password: 'Por favor, ingresa tu contrase\u00F1a'
        },
        strings: {
            login_error: 'Hubo un problema al iniciar sesi\u00F3n. Por favor int\u00E9ntalo de nuevo m\u00E1s tarde.',
            logout_error: 'Hubo un problema al cerrar sesi\u00F3n. Por favor int\u00E9ntalo de nuevo m\u00E1s tarde.',
            login_details_error: 'Hubo un problema al iniciar sesi\u00F3n. Por favor revisa tu correo electr\u00F3nico y contrase\u00F1a y que hayas confirmado tu contrase\u00F1a.',
            password_problem: 'Hubo un problema con tu combinaci\u00F3n de correo electr\u00F3nico / contrase\u00F1a. Si has olvidado tu contrase\u00F1a, o si no tienes una, puedes establecer una regresando a la pantalla de correo electr\u00F3nico y seleccionando la opci\u00F3n de contrase\u00F1a establecida. Las contrase\u00F1as no se activan hasta que se hace clic en el enlace del correo electr\u00F3nico de confirmaci\u00F3n.',
            search_placeholder: 'B\u00FAsqueda por un lugar o c\u00F3digo postal',
            location_error: 'Error de localizaci\u00F3n',
            location_problem: 'Hubo un problema al buscar tu ubicaci\u00F3n.',
            multiple_locations: 'M\u00E1s de una ubicaci\u00F3n coincide con ese nombre. Selecciona una abajo o trata de introducir el nombre de la calle y zona, o un c\u00F3digo postal.',
            sync_error: 'Se encontr\u00F3 un error al presentar tu reporte: ',
            unknown_sync_error: 'Hubo un problema al enviar tu reporte. Por favor, int\u00E9ntalo de nuevo m\u00E1s tarde.',
            report_send_error: 'Hubo un problema al enviar tu informe. Por favor, vuelve a intentarlo.',
            missing_location: 'Por favor, escribe una ubicaci\u00F3n',
            location_check_failed: 'Hubo un problema verificando cobertura en esta ubicaci\u00F3n. Por favor, int\u00E9ntalo de nuevo m\u00E1s tarde.',
            category_extra_check_error: 'Hubo un problema al confirmar si tenemos todos los detalles que necesitamos. Por favor, int\u00E9ntalo de nuevo m\u00E1s tarde.',
            locate_dismissed: 'Por favor, buscar un nombre de la calle y zona, o c\u00F3digo postal.',
            geolocation_failed: "Lo sentimos, pero no hemos podido establecer su ubicaci\u00F3n con precisi\u00F3n suficiente para mostrarte un mapa. Por favor, introduzca una ubicaci\u00F3n en el cuadro de b\u00FAsqueda.",
            geolocation_denied: 'No se pudo acceder a los servicios de localizaci\u00F3n. Por favor, compruebe los permisos.',
            select_category: '-- Elija una categor\u00EDa --',
            offline_got_position: 'Tiene ubicaci\u00F3n',
            offline_failed_position: 'No se pudo obtener la ubicaci\u00F3n.',
            required: 'requerido',
            invalid_email: 'Correo inv\u00E1lido',
            invalid_report: 'Reporte inv\u00E1lido',
            photo_failed: 'Hubo un problema al tomar la foto.',
            photo_added: 'Foto A\u00F1adida',
            photo_loading: 'Carga de im\u00E1genes puede tardar alg\u00FAn tiempo, por favor, sea paciente',
            upload_aborted: 'Hubo un problema al subir tu reporte.',
            try_again: 'Int\u00E9ntalo de nuevo',
            save_for_later: 'Guardar para m\u00E1s adelante',
            no_connection: 'No hay conexi\u00F3n de red disponible para el env\u00EDo de su reporte. Por favor, int\u00E9ntalo de nuevo m\u00E1s tarde.',
            more_details: 'M\u00E1s detalles'
        }
    });
})(FMS, _);
