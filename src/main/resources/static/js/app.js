var App = (function () {
    // Variables privadas (estado)
    var blueprints = [];
    var author = "";

    // Función privada para actualizar la tabla con los planos del autor
    function updateBlueprintsTable() {
        let tableBody = $("#blueprintsTable tbody");
        tableBody.empty(); // Limpiar la tabla antes de actualizar

        let totalPoints = blueprints.reduce((sum, bp) => sum + bp.points.length, 0);

        blueprints.forEach(function (bp) {
            let row = `<tr>
                <td>${bp.name}</td>
                <td>${bp.points.length}</td>
            </tr>`;
            tableBody.append(row);
        });

        // Actualizar el total de puntos en la UI
        $("#totalUserPoints").text("Total user points: " + totalPoints);
    }

    // Métodos públicos expuestos
    return {
        setAuthor: function (newAuthor) {
            console.log("Setting author to:", newAuthor);
            author = newAuthor;
        },

        getBlueprints: function () {
            if (!author) {
                console.error("No author specified");
                return;
            }

            apimock.getBlueprintsByAuthor(author, function (data) {
                if (!data || data.length === 0) {
                    console.warn("No blueprints found for author:", author);
                    return;
                }
                blueprints = data; // Guardar los planos obtenidos
                console.log("Planos obtenidos:", blueprints);
                updateBlueprintsTable();
            });
        },

        openBlueprint: function (name) {
            let blueprint = blueprints.find(bp => bp.name === name);
            if (!blueprint) {
                console.error("Blueprint not found:", name);
                return;
            }

            console.log("Opening blueprint:", blueprint);
            // Aquí podrías agregar código para dibujar el blueprint en un canvas
        },

        updateBlueprints: function (authorName) {
            if (!authorName) {
                console.error("No author name provided for updateBlueprints");
                return;
            }

            apimock.getBlueprintsByAuthor(authorName, function (data) {
                if (!data || data.length === 0) {
                    console.warn("No blueprints found for author:", authorName);
                    return;
                }

                // 1️⃣ Transformar los datos (sólo nombre y cantidad de puntos)
                let transformedBlueprints = data.map(bp => ({
                    name: bp.name,
                    pointsCount: bp.points.length
                }));

                // 2️⃣ Limpiar la tabla y agregar nuevas filas con jQuery
                let tableBody = $("#blueprintsTable tbody");
                tableBody.empty();

                transformedBlueprints.forEach(bp => {
                    tableBody.append(`<tr><td>${bp.name}</td><td>${bp.pointsCount}</td></tr>`);
                });

                // 3️⃣ Calcular total de puntos con reduce y actualizar el DOM
                let totalPoints = transformedBlueprints.reduce((sum, bp) => sum + bp.pointsCount, 0);
                $("#totalUserPoints").text("Total user points: " + totalPoints);
            });
        }
    };
})();

// Esperar a que el DOM cargue completamente antes de asignar eventos
$(document).ready(function () {
    // Asocia la función `updateBlueprints` al botón de consulta
    $("#getBlueprintsButton").on("click", function () {
        let authorInput = $("#authorInput").val().trim(); // Obtener el valor del input

        if (!authorInput) {
            alert("Please enter an author name."); // Validar entrada vacía
            return;
        }

        App.setAuthor(authorInput);      // Establecer el autor en la app
        App.updateBlueprints(authorInput); // Actualizar planos para ese autor
    });
});

