const form = document.getElementById("appointmentForm");

const resultBox = document.getElementById("resultBox");

const automationButton =
    document.getElementById("automationButton");

const automationResult =
    document.getElementById("automationResult");


/* =========================
   FECHA ACTUAL
========================= */

const now = new Date();

const today =
    new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );


/* =========================
   EJECUTAR CASO DE PRUEBA
========================= */

form.addEventListener("submit", function (event) {

    event.preventDefault();


    const petName =
        document.getElementById("petName").value.trim();

    const petType =
        document.getElementById("petType").value;

    const appointmentDate =
        document.getElementById("appointmentDate").value;

    const appointmentTime =
        document.getElementById("appointmentTime").value;

    const reason =
        document.getElementById("reason").value.trim();


    /* CASO: CAMPOS VACÍOS */

    if (
        !petName ||
        !petType ||
        !appointmentDate ||
        !appointmentTime ||
        !reason
    ) {

        showResult(
            "error",
            "✕",
            "FAIL",
            "Existen campos obligatorios sin completar."
        );

        return;
    }


    /* CONVERTIR FECHA SELECCIONADA */

    const selectedDate =
        new Date(
            appointmentDate + "T00:00:00"
        );


    /* CASO: FECHA ANTERIOR */

    if (selectedDate < today) {

        showResult(
            "error",
            "✕",
            "FAIL",
            "La fecha seleccionada es anterior a la fecha actual."
        );

        return;
    }


    /* CASO: DATOS CORRECTOS */

    showResult(
        "success",
        "✓",
        "PASS",
        "La cita puede registrarse correctamente."
    );

});


/* =========================
   MOSTRAR RESULTADO
========================= */

function showResult(
    type,
    symbol,
    title,
    message
) {

    resultBox.className =
        `result ${type}`;

    resultBox.innerHTML = `

        <div class="result-icon">
            ${symbol}
        </div>

        <div>

            <strong>
                ${title}
            </strong>

            <p>
                ${message}
            </p>

        </div>

    `;
}


/* =========================
   AUTOMATIZACIÓN
========================= */

automationButton.addEventListener(
    "click",
    function () {

        automationButton.disabled = true;

        automationButton.textContent =
            "Ejecutando...";

        automationResult.classList.remove(
            "hidden"
        );

        automationResult.innerHTML = `
            <div>
                > Iniciando prueba automatizada...
            </div>
        `;


        setTimeout(() => {

            automationResult.innerHTML += `
                <div>✓ Abrir PetCare</div>
            `;

        }, 500);


        setTimeout(() => {

            automationResult.innerHTML += `
                <div>✓ Ingresar datos</div>
            `;

        }, 1000);


        setTimeout(() => {

            automationResult.innerHTML += `
                <div>✓ Seleccionar fecha</div>
            `;

        }, 1500);


        setTimeout(() => {

            automationResult.innerHTML += `
                <div>✓ Ejecutar reserva</div>
            `;

        }, 2000);


        setTimeout(() => {

            automationResult.innerHTML += `
                <div>✓ Verificar resultado</div>

                <strong>
                    ✓ TEST PASSED
                </strong>
            `;

            automationButton.disabled = false;

            automationButton.textContent =
                "↻ Ejecutar nuevamente";

        }, 2500);

    }
);