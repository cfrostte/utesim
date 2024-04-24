document.addEventListener('DOMContentLoaded', function () {

    var hoy = new Date(); hoy.setMonth(hoy.getMonth() - 1);

    document.getElementById("desde").valueAsDate = hoy;
    document.getElementById("hasta").valueAsDate = new Date();

    var domain = 'https://autoservicio.ute.com.uy';
    var control = `${domain}/SelfService/SSvcController`;

    chrome.runtime.sendMessage({
        step: -1, // VERIFICAR
        domain: domain,
        control: control
    });

    function fecha(d) { return document.getElementById(d).value.split("-").reverse().join("-"); }
    function valor(s) { return document.getElementById(s).value; }

    document.getElementById('simular').addEventListener('click', function () {

        chrome.storage.sync.get({ proceso: '' }, (i) => {

            chrome.runtime.sendMessage({
                step: 0, // PREPARAR
                control: control,
                proceso: i.proceso,
                desde: fecha('desde'),
                hasta: fecha('hasta'),
                tarifa: valor('tarifa'),
                potencia: valor('potencia'),
            });

        });

    });

});