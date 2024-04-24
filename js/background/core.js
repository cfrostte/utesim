chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    chrome.tabs.query({ active: true }, function (tabs) {

        if (message.step === -1) { // VERIFICAR

            var domain = message.domain;
            var control = message.control;

            if (!tabs[0].url.includes(domain)) {
                chrome.tabs.create({ url: `${control}/account` });
            }

        }

        if (message.step === 0) { // PREPARAR

            var control = message.control;
            var proceso = message.proceso;
            var desde = message.desde;
            var hasta = message.hasta;
            var tarifa = message.tarifa;
            var potencia = message.potencia;

            chrome.tabs.sendMessage(tabs[0].id, {

                step: 1, // LEER
                control: control,
                proceso: proceso,
                desde: desde,
                hasta: hasta

            }, function (response) {

                if (response && response.url) {
                    chrome.tabs.update(tabs[0].id, { url: response.url });
                } else {
                    console.log("error al LEER");
                }

            });

            chrome.tabs.onUpdated.addListener(function (tabId, info) {

                if (tabs[0].id === tabId && info.status === 'complete') {

                    chrome.tabs.sendMessage(tabs[0].id, {

                        step: 2, // MOSTRAR
                        control: control,
                        tarifa: tarifa,
                        desde: desde,
                        hasta: hasta,
                        potencia: potencia

                    }, function (response) {

                        if (response && response.url) {
                            chrome.tabs.update(tabs[0].id, { url: response.url });
                        } else {
                            console.log("error al MOSTRAR");
                        }

                    });

                }

            });

        }

    });

});