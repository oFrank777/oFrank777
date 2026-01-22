// Importación del módulo de sistema de archivos de Node.js
const fs = require('fs');

/**
 * Función asíncrona que selecciona una frase aleatoria de quotes.json
 * y actualiza el archivo README.md con un diseño de tarjeta premium.
 */
async function updateQuote() {
    try {
        // Carga el archivo de frases desde el directorio local
        const quotes = require('./quotes.json');

        // Selecciona un índice aleatorio basado en la longitud del arreglo de frases
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const { quote, author } = quotes[randomIndex];

        // Define la estructura HTML de la tarjeta que se incrustará en el README
        // Utiliza parámetros de URL para personalizar el fondo (azul oscuro #00112b) y el texto (#00d4ff)
        const cardDesign = `
<!--STARTS_HERE_QUOTE_CARD-->
<p align="center">
    <img src="https://readme-daily-quotes.vercel.app/api?author=${encodeURIComponent(author)}&quote=${encodeURIComponent(quote)}&theme=dark&bg_color=00112b&author_color=00d4ff&accent_color=ffffff">
</p>
<!--ENDS_HERE_QUOTE_CARD-->
`;

        const readmePath = './README.md';
        // Lee el contenido actual del archivo README.md en formato UTF-8
        let readmeContent = fs.readFileSync(readmePath, 'utf-8');

        // Define las etiquetas que sirven como marcadores de posición en el README
        const startTag = '<!--STARTS_HERE_QUOTE_CARD-->';
        const endTag = '<!--ENDS_HERE_QUOTE_CARD-->';

        // Crea una expresión regular para encontrar todo el contenido entre las etiquetas de marcador
        const regex = new RegExp(`${startTag}[\\s\\S]*${endTag}`);

        // Si se encuentran los marcadores, reemplaza el contenido antiguo con la nueva frase
        if (regex.test(readmeContent)) {
            console.log(`Actualizando con la frase de: ${author}`);
            readmeContent = readmeContent.replace(regex, cardDesign.trim());
        } else {
            console.log("Etiquetas de marcador no encontradas en README.md");
            return;
        }

        // Guarda los cambios de vuelta en el archivo README.md
        fs.writeFileSync(readmePath, readmeContent);
        console.log("¡Frase actualizada con éxito!");
    } catch (error) {
        // Captura y muestra cualquier error que ocurra durante el proceso
        console.error('Error al actualizar la frase:', error);
    }
}

// Ejecuta la función principal
updateQuote();
