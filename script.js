function safeLog2(x) {
    if (x <= 1) return 0;
    return Math.max(0, Math.log2(x));
}

var algorithmDefinitions = {
    fibonacci: {
        name: "Fibonacci Ricorsivo Naive / Torri di Hanoi",
        formulaO: "O(2ⁿ)",
        formulaOmega: "Ω(2ⁿ)",
        formulaTheta: "Θ(2ⁿ)",
        fnO: function(x) { return Math.pow(2, x); },
        fnOmega: function(x) { return Math.pow(1.618, x); },
        fnTheta: function(x) { return Math.pow(2, x) * 0.7; },
        descO: "Limite massimo Esponenziale: l'albero di chiamate ricorsive raddoppia ad ogni livello N.",
        descOmega: "Limite minimo esponenziale: richiede comunque un numero enorme di passi ricorsivi.",
        descTheta: "Comportamento medio intrinsecamente esplosivo al crescere di N."
    },
    quicksort: {
        name: "Quick Sort",
        formulaO: "O(n²)",
        formulaOmega: "Ω(n log n)",
        formulaTheta: "Θ(n log n)",
        fnO: function(x) { return x * x * 0.5; },
        fnOmega: function(x) { return x * safeLog2(x); },
        fnTheta: function(x) { return x * safeLog2(x) * 1.39; },
        descO: "Limite massimo: si verifica quando il pivot è sempre il minimo/massimo (es. array già ordinato).",
        descOmega: "Limite minimo: il pivot divide sempre l'array in due metà perfette.",
        descTheta: "Comportamento medio su dati distribuiti in modo casuale."
    },
    mergesort: {
        name: "Merge Sort",
        formulaO: "O(n log n)",
        formulaOmega: "Ω(n log n)",
        formulaTheta: "Θ(n log n)",
        fnO: function(x) { return x * safeLog2(x) * 1.2; },
        fnOmega: function(x) { return x * safeLog2(x) * 0.8; },
        fnTheta: function(x) { return x * safeLog2(x); },
        descO: "Limite massimo: divide e fonde sempre l'array completo.",
        descOmega: "Limite minimo garantito: richiede sempre la scomposizione logaritmica.",
        descTheta: "Comportamento medio consistente in qualsiasi scenario di input."
    },
    insertionsort: {
        name: "Insertion Sort / Bubble Sort",
        formulaO: "O(n²)",
        formulaOmega: "Ω(n)",
        formulaTheta: "Θ(n²)",
        fnO: function(x) { return x * x * 0.5; },
        fnOmega: function(x) { return x; },
        fnTheta: function(x) { return x * x * 0.25; },
        descO: "Limite massimo: array ordinato al contrario (tutti gli elementi scalano).",
        descOmega: "Limite minimo: array già perfettamente ordinato (solo 1 scansione).",
        descTheta: "Comportamento medio con elementi disordinati a caso."
    },
    binarysearch: {
        name: "Ricerca Binaria",
        formulaO: "O(log n)",
        formulaOmega: "Ω(1)",
        formulaTheta: "Θ(log n)",
        fnO: function(x) { return safeLog2(x); },
        fnOmega: function(x) { return 1; },
        fnTheta: function(x) { return safeLog2(x) * 0.7; },
        descO: "Limite massimo: l'elemento è all'estremo o assente (dimezzamenti completi).",
        descOmega: "Limite minimo: l'elemento cercato si trova esattamente al centro al 1° tentativo.",
        descTheta: "Comportamento medio dei dimezzamenti per trovare l'elemento target."
    },
    linearsearch: {
        name: "Ricerca Lineare",
        formulaO: "O(n)",
        formulaOmega: "Ω(1)",
        formulaTheta: "Θ(n)",
        fnO: function(x) { return x; },
        fnOmega: function(x) { return x; },
        fnTheta: function(x) { return x * 0.5; },
        descO: "Limite massimo: l'elemento si trova alla fine o non c'è (scansione totale).",
        descOmega: "Limite minimo: l'elemento è in prima posizione.",
        descTheta: "Comportamento medio: l'elemento si trova a metà strada nell'array."
    },
    matrixmult: {
        name: "Moltiplicazione Matrici Standard",
        formulaO: "O(n³)",
        formulaOmega: "Ω(n³)",
        formulaTheta: "Θ(n³)",
        fnO: function(x) { return Math.pow(x, 3); },
        fnOmega: function(x) { return Math.pow(x, 3); },
        fnTheta: function(x) { return Math.pow(x, 3); },
        descO: "Limite massimo: richiede 3 cicli annidati completi indipendentemente dai valori.",
        descOmega: "Limite minimo: nessun dato può evitare la tripla iterazione sulle righe/colonne.",
        descTheta: "Comportamento medio: il numero di operazioni è matematicamente fisso a N³."
    }
};

window.onload = function() {
    var algorithmSelect = document.getElementById('algorithmSelect');
    var nInput = document.getElementById('nInput');
    var btnO = document.getElementById('btn-O');
    var btnOmega = document.getElementById('btn-Omega');
    var btnTheta = document.getElementById('btn-Theta');
    var modeDesc = document.getElementById('mode-desc');

    var currentMode = 'O';

    var ctx = document.getElementById('complexityChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 150 },
            plugins: {
                legend: { display: true, position: 'top' },
                tooltip: { 
                    mode: 'index', 
                    intersect: false,
                    callbacks: {
                        title: function(items) {
                            return 'Dimensione N = ' + Math.round(parseFloat(items[0].label));
                        }
                    }
                }
            },
            scales: {
                x: { 
                    title: { display: true, text: 'Dimensione Input N (Intero)', font: { size: 14, weight: 'bold' } },
                    ticks: {
                        callback: function(val, index) {
                            var rawVal = this.getLabelForValue(val);
                            var num = parseFloat(rawVal);
                            return Number.isInteger(num) ? num : null;
                        }
                    }
                },
                y: { 
                    title: { display: true, text: 'Operazioni Stimate', font: { size: 14, weight: 'bold' } }, 
                    beginAtZero: true,
                    min: 0
                }
            }
        }
    });

    function updateApp() {
        var algKey = algorithmSelect.value;
        var alg = algorithmDefinitions[algKey];
        var n = parseInt(nInput.value);
        if (isNaN(n) || n < 1) n = 1;
        
        if (algKey === 'fibonacci' && n > 30) {
            n = 30;
            nInput.value = 30;
        } else {
            nInput.value = n;
        }

        var valO_N = Math.round(alg.fnO(n));
        var valOmega_N = Math.round(alg.fnOmega(n));
        var valTheta_N = Math.round(alg.fnTheta(n));

        document.getElementById('val-O').innerText = alg.formulaO;
        document.getElementById('desc-O').innerText = alg.descO + ' (~' + valO_N.toLocaleString() + ' op)';
        
        document.getElementById('val-Omega').innerText = alg.formulaOmega;
        document.getElementById('desc-Omega').innerText = alg.descOmega + ' (~' + valOmega_N.toLocaleString() + ' op)';
        
        document.getElementById('val-Theta').innerText = alg.formulaTheta;
        document.getElementById('desc-Theta').innerText = alg.descTheta + ' (~' + valTheta_N.toLocaleString() + ' op)';

        var labels = [];
        var dataO = [], dataOmega = [], dataTheta = [];
        var numPoints = 60;
        var step = n / numPoints;

        for (var i = 0; i <= numPoints; i++) {
            var xDecimal = i * step;
            labels.push(xDecimal.toFixed(1));
            
            dataO.push(alg.fnO(xDecimal));
            dataOmega.push(alg.fnOmega(xDecimal));
            dataTheta.push(alg.fnTheta(xDecimal));
        }

        var datasets = [
            {
                label: 'Caso Peggiore: ' + alg.formulaO,
                data: dataO,
                borderColor: '#dc2626',
                borderWidth: currentMode === 'O' ? 4 : 1.5,
                borderDash: currentMode === 'O' ? [] : [4, 4],
                pointRadius: 0
            },
            {
                label: 'Caso Medio: ' + alg.formulaTheta,
                data: dataTheta,
                borderColor: '#16a34a',
                borderWidth: currentMode === 'Theta' ? 4 : 1.5,
                borderDash: currentMode === 'Theta' ? [] : [4, 4],
                pointRadius: 0
            },
            {
                label: 'Caso Migliore: ' + alg.formulaOmega,
                data: dataOmega,
                borderColor: '#2563eb',
                borderWidth: currentMode === 'Omega' ? 4 : 1.5,
                borderDash: currentMode === 'Omega' ? [] : [4, 4],
                pointRadius: 0
            }
        ];

        if (currentMode === 'O') {
            modeDesc.innerHTML = '<strong>' + alg.name + ' — Caso Peggiore (' + alg.formulaO + '):</strong> ' + alg.descO;
        } else if (currentMode === 'Omega') {
            modeDesc.innerHTML = '<strong>' + alg.name + ' — Caso Migliore (' + alg.formulaOmega + '):</strong> ' + alg.descOmega;
        } else {
            modeDesc.innerHTML = '<strong>' + alg.name + ' — Caso Medio (' + alg.formulaTheta + '):</strong> ' + alg.descTheta;
        }

        chart.data.labels = labels;
        chart.data.datasets = datasets;
        chart.update();
    }

    function setMode(mode) {
        currentMode = mode;
        btnO.className = 'mode-btn' + (mode === 'O' ? ' active' : '');
        btnOmega.className = 'mode-btn' + (mode === 'Omega' ? ' active' : '');
        btnTheta.className = 'mode-btn' + (mode === 'Theta' ? ' active' : '');
        
        document.getElementById('row-O').style.backgroundColor = mode === 'O' ? '#fef2f2' : 'transparent';
        document.getElementById('row-Omega').style.backgroundColor = mode === 'Omega' ? '#eff6ff' : 'transparent';
        document.getElementById('row-Theta').style.backgroundColor = mode === 'Theta' ? '#f0fdf4' : 'transparent';

        updateApp();
    }

    btnO.onclick = function() { setMode('O'); };
    btnOmega.onclick = function() { setMode('Omega'); };
    btnTheta.onclick = function() { setMode('Theta'); };

    algorithmSelect.onchange = updateApp;
    nInput.onchange = updateApp;
    nInput.oninput = updateApp;

    setMode('O');
};