const fs = require('fs');
const path = require('path');

// Rutas a las carpetas y archivos
const resultadosDir = path.join(__dirname, 'Resultados');
const reglamentosDir = path.join(__dirname, 'Reglamentos');
const resultsFile = path.join(__dirname, 'results.html');
const regulationsFile = path.join(__dirname, 'regulations.html');

// 1. GENERAR RESULTADOS
if (fs.existsSync(resultadosDir)) {
    console.log('Generando resultados...');
    const years = fs.readdirSync(resultadosDir)
        .filter(file => fs.statSync(path.join(resultadosDir, file)).isDirectory())
        .sort((a, b) => b - a); // Ordenar años de mayor a menor

    let resultadosHTML = '';

    years.forEach((year, index) => {
        const yearPath = path.join(resultadosDir, year);
        const files = fs.readdirSync(yearPath).filter(file => file.endsWith('.pdf'));
        
        if (files.length === 0) return;

        const isActive = index === 0 ? ' active' : '';
        
        resultadosHTML += `
            <!-- ${year} -->
            <div class="accordion-item${isActive}">
                <button class="accordion-header" onclick="this.parentElement.classList.toggle('active')">
                    ${year} <i class="fas fa-chevron-down icon"></i>
                </button>
                <div class="accordion-content">
                    <ul class="results-list">`;

        files.forEach(file => {
            const fileName = file.replace('.pdf', '');
            // Codificar el nombre para que la URL funcione correctamente si tiene espacios
            const encodedFile = encodeURIComponent(file);
            resultadosHTML += `
                        <li><a href="Resultados/${year}/${encodedFile}" target="_blank" rel="noopener noreferrer" class="result-link"><i class="fas fa-file-pdf"></i> ${fileName}</a></li>`;
        });

        resultadosHTML += `
                    </ul>
                </div>
            </div>\n`;
    });

    // Inyectar en results.html
    if (fs.existsSync(resultsFile)) {
        let content = fs.readFileSync(resultsFile, 'utf8');
        content = content.replace(
            /(<!-- RESULTADOS_INICIO -->)[\s\S]*?(<!-- RESULTADOS_FIN -->)/,
            `$1\n${resultadosHTML}            $2`
        );
        fs.writeFileSync(resultsFile, content);
        console.log('✔ results.html actualizado correctamente.');
    }
} else {
    console.warn('La carpeta Resultados no existe.');
}

// 2. GENERAR REGLAMENTOS
if (fs.existsSync(reglamentosDir)) {
    console.log('Generando reglamentos...');
    const files = fs.readdirSync(reglamentosDir).filter(file => file.endsWith('.pdf'));
    
    let reglamentosHTML = '';

    files.forEach(file => {
        const fileName = file.replace('.pdf', '');
        const encodedFile = encodeURIComponent(file);
        
        reglamentosHTML += `
            <div style="padding: 30px; border: 1px solid #ddd; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; transition: var(--transition-smooth); cursor: pointer;" onmouseover="this.style.borderColor='var(--primary-blue)'" onmouseout="this.style.borderColor='#ddd'" onclick="window.open('Reglamentos/${encodedFile}', '_blank')">
                <div>
                    <h3 style="color: var(--primary-blue); font-size: 1.3rem;">${fileName}</h3>
                    <p style="color: #666; font-size: 0.9rem;">Documento oficial.</p>
                </div>
                <div style="color: var(--accent-red); font-weight: 800;">PDF</div>
            </div>\n`;
    });

    // Inyectar en regulations.html
    if (fs.existsSync(regulationsFile)) {
        let content = fs.readFileSync(regulationsFile, 'utf8');
        content = content.replace(
            /(<!-- REGLAMENTOS_INICIO -->)[\s\S]*?(<!-- REGLAMENTOS_FIN -->)/,
            `$1\n${reglamentosHTML}            $2`
        );
        fs.writeFileSync(regulationsFile, content);
        console.log('✔ regulations.html actualizado correctamente.');
    }
} else {
    console.warn('La carpeta Reglamentos no existe.');
}

console.log('¡Construcción finalizada!');
