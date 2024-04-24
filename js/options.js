const cargar = () => {
    chrome.storage.sync.get({ proceso: '' }, (items) => {
        document.getElementById('proceso').value = items.proceso;
    });
};

const guardar = (e, x = null) => {
    const proceso = x ? x : document.getElementById('proceso').value;
    chrome.storage.sync.set({ proceso: proceso }, () => {
        const estado = document.getElementById('estado');
        estado.textContent = 'OK';
        setTimeout(() => { estado.textContent = '' }, 750);
    });
};

const restaurar = () => {
    if (confirm("RESTAURAR")) {
        guardar(null, 3085501648);
        cargar();
    }
};

document.addEventListener('DOMContentLoaded', cargar);
document.getElementById('guardar').addEventListener('click', guardar);
document.getElementById('restaurar').addEventListener('click', restaurar);