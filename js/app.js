document.addEventListener('DOMContentLoaded', function() {

    const caja = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputCopia = document.querySelector('#copia');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#enviar-mail');
    const btnSubmit = document.querySelector('#enviar-mail button[type="submit"]')
    const btnReset = document.querySelector('#enviar-mail button[type="reset"]')
    const spin = document.querySelector('#spin');

    // Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    inputCopia.addEventListener('input', validarCC);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', (e) => {
        e.preventDefault();

        resetFormulario();
    });

    function enviarEmail(e) {
        e.preventDefault();

        spin.classList.add('flex');
        spin.classList.remove('hidden');

        setTimeout(() => {
            spin.classList.remove('flex');
            spin.classList.add('hidden');

            resetFormulario();

            // Crear una alerta
            const exito = document.createElement('P');
            exito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            exito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(exito);

            setTimeout(() => {
                exito.remove();
            }, 3000);
        }, 3000);
    }

    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es requerido`, e.target.parentElement);
            caja[e.target.id] = '';
            comprobarEmail();
            return;
        }
        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            caja[e.target.id] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar los valores
        caja[e.target.id] = e.target.value.trim().toLowerCase();
    
        // Comprobar el objeto de email
        comprobarEmail();
    }

    function validarCC(e) {
        if(e.target.value.trim() !== '' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            return;
        }
        limpiarAlerta(e.target.parentElement);
    }

    function mostrarAlerta(msj, referencia) {
        limpiarAlerta(referencia);

        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = msj;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        // Inyectar el error al formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(ref) {
        // Comprueba si ya existe una alerta
        const alerta = ref.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if (Object.values(caja).includes('')) {
            btnSubmit.classList.add('opacity-50', 'cursor-not-allowed');
            btnSubmit.disabled = true;
            return
        }
        btnSubmit.classList.remove('opacity-50', 'cursor-not-allowed');
        btnSubmit.disabled = false;
    }

    function resetFormulario() {
        // reiniciar el objeto
        caja.email = '';
        caja.asunto = '';
        caja.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }
});