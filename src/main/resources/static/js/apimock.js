
var apimock = (function () {
    var mockData = {
        "johnconnor": [
            { name: "house", points: [{ x: 10, y: 20 }, { x: 30, y: 40 }] },
            { name: "gear", points: [{ x: 5, y: 15 }, { x: 25, y: 35 }] }
        ]
    };

    return {
        getBlueprintsByAuthor: function (author, callback) {
            console.log("Fetching blueprints for author:", author);
            callback(mockData[author] || []);
        },
        getBlueprintsByNameAndAuthor: function (author, name, callback) {
            console.log(`Fetching blueprint "${name}" for author "${author}"`);
            let blueprint = (mockData[author] || []).find(bp => bp.name === name);
            callback(blueprint || null);
        },
        updateBlueprints: function (author) {
            console.log(`Updating blueprints for author: ${author}`);
            // Aquí puedes agregar lógica para actualizar los planos si es necesario
        }
    };
})();


/*
Example of use:
var fun = function (list) {
    console.info(list);
};

apimock.getBlueprintsByAuthor("johnconnor", fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor", "house", fun);
*/
