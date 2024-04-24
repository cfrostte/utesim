chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.step === 2) { // MOSTRAR

        var control = message.control;
        var desde = message.desde;
        var hasta = message.hasta;
        var tarifa = message.tarifa;
        var potencia = message.potencia;

        var object = JSON.parse(document.body.firstChild.innerHTML);
        var datasets = object.CONSUMO_ACTUAL.consumoActualTramoHorario.data.datasets;

        var data = {
            inputTarifa: tarifa,
            inputFechaInicial: desde,
            inputFechaFinal: hasta,
            inputPotenciaContratada: potencia
        };

        datasets.forEach(function (dataset) {

            var x = Math.round(dataset.data[0]);

            if (tarifa == 'TRT') {
                if (dataset.label == 'Punta') data.Read9 = x;
                if (dataset.label == 'Valle') data.Read4 = x;
                if (dataset.label == 'Llano') data.Read1 = x;
                data.Read8 = 0; // (fijo para esta tarifa)
            }

            if (tarifa == 'TRD') {
                if (dataset.label == 'Xxx') data.ReadM = x;
                data.ReadN = 0; // (fijo para esta tarifa?)
            }

            if (tarifa == 'TRS') {
                if (dataset.label == 'Xxx') data.ReadM = x;
                data.ReadN = 0; // (fijo para esta tarifa?)
            }

            if (tarifa == 'TGS') {
                if (dataset.label == 'Xxx') data.ReadM = x;
                data.ReadN = 0; // (fijo para esta tarifa?)
            }

            if (tarifa == 'THE') {
                if (dataset.label == 'Xxx') data.ReadM = x;
                data.ReadN = 0; // (fijo para esta tarifa?)
            }

            if (tarifa == 'MC1') {
                if (dataset.label == 'Xxx') data.ReadM = x;
                data.ReadN = 0; // (fijo para esta tarifa?)
            }

        });

        function params(objeto) {
            return Object.keys(objeto).map(function (key) {
                return encodeURIComponent(key) + "=" + encodeURIComponent(objeto[key]);
            }).join("&");
        }

        sendResponse({ url: `${control}/detallesimulaciondefactura?${params(data)}` });
        return true;

    }

});