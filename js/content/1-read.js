chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.step === 1) { // LEER

        var control = message.control;
        var proceso = message.proceso;
        var desde = message.desde;
        var hasta = message.hasta;

        var data = [{
            name: "CONSUMO_ACTUAL",
            parms: {
                psId: proceso,
                fechaInicial: desde,
                fechaFinal: hasta
            }
        }];

        function params(data) {
            return Object.keys(data[0]).map(function (key) {
                var value = data[0][key];
                if (typeof value === 'object') {
                    return Object.keys(value).map(function (innerKey) {
                        return `graficas[0][${key}][${innerKey}]=${value[innerKey]}`;
                    }).join('&');
                } else {
                    return `graficas[0][${key}]=${value}`;
                }
            }).join('&');
        }

        sendResponse({ url: `${control}/cmgraficar?${params(data)}` });
        return true;

    }

});  