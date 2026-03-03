// DOM Elements
const header = document.getElementById('main-header');
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
const toast = document.getElementById('toast');
const statNums = document.querySelectorAll('.stat-num[data-count]');

// Scroll State
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 50;
    document.body.setAttribute('data-scroll', scrolled ? '1' : '0');
});

// Intersection Observer for Reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

scrollRevealElements.forEach(el => revealObserver.observe(el));

// Stat Counter Animation
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const countTo = parseInt(target.getAttribute('data-count'));
            animateValue(target, 0, countTo, 1500);
            countObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNums.forEach(num => countObserver.observe(num));

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Copy Functionality
const blockTexts = {
    block1: document.getElementById('block1')?.innerText || '',
    block2: document.getElementById('block2')?.innerText || '',
    block3: document.getElementById('block3')?.innerText || '',
    block4: document.getElementById('block4')?.innerText || '',
};

function copyBlock(id) {
    const text = blockTexts[id];
    if (text) {
        copyToClipboard(text);
    }
}

function copyMaster() {
    const text = document.getElementById('master-prompt-text')?.innerText || '';
    if (text) {
        copyToClipboard(text);
    }
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast();
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

// Hover Effect for Orbs (Subtle mouse follow)
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    document.querySelectorAll('.orb').forEach((orb, index) => {
        const speed = (index + 1) * 20;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// --- CHATBOT LOGIC ---
const chatbotTrigger = document.getElementById('chatbot-trigger');
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input-field');
const chatbotSend = document.getElementById('chatbot-send');

let saasData = null;

// Load analytical data
async function loadAnalyticsData() {
    try {
        const response = await fetch('saas_data.json');
        saasData = await response.json();
    } catch (err) {
        console.error("Error loading analytics data:", err);
    }
}

loadAnalyticsData();

// Toggle Chatbot
chatbotTrigger.addEventListener('click', () => {
    chatbotContainer.classList.add('active');
    chatbotTrigger.style.display = 'none';
});

chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
    setTimeout(() => {
        chatbotTrigger.style.display = 'flex';
    }, 400);
});

// Send Message
function sendMessage() {
    const text = chatbotInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatbotInput.value = '';

    // Simulate AI Processing
    showTyping();
    setTimeout(() => {
        const response = generateAIResponse(text);
        removeTyping();
        addMessage(response, 'ai');
    }, 1500);
}

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Suggestion Pills
function sendSuggestion(text) {
    addMessage(text, 'user');
    showTyping();
    setTimeout(() => {
        const response = generateAIResponse(text);
        removeTyping();
        addMessage(response, 'ai');
    }, 1200);
}

function addMessage(text, side) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${side}`;
    msgDiv.innerHTML = text;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai typing-bubble';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function removeTyping() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

// Profesor DataSocio - Pedagogical Analytical Engine
function generateAIResponse(query) {
    if (!saasData) return "Clase en preparación. Estoy cargando los datasets académicos...";

    const q = query.toLowerCase();
    const { metrics, sales_trend, top_segments } = saasData;

    // Pedagogy: Explanation with Data
    if (q.includes('mrr') || q.includes('venta') || q.includes('dinero')) {
        const lastMonth = sales_trend[sales_trend.length - 1].revenue;
        const prevMonth = sales_trend[sales_trend.length - 2].revenue;
        const diff = ((lastMonth - prevMonth) / prevMonth * 100).toFixed(1);

        return `
            <div class="professor-lesson">
                <strong>Lección 01: Monthly Recurring Revenue (MRR)</strong><br>
                El MRR es la métrica de salud vital en un SaaS. Permítame explicarle con sus datos:<br><br>
                • <strong>Concepto:</strong> Representa los ingresos predecibles que recibe cada mes.<br>
                • <strong>Su Dato:</strong> Su MRR actual es de <code>$${lastMonth.toLocaleString()}</code>.<br>
                • <strong>Comportamiento:</strong> Ha crecido un <strong>${diff}%</strong> comparado con los $${prevMonth.toLocaleString()} del mes de Enero.<br><br>
                <em>Conclusión Académica:</em> Un crecimiento del ${diff}% indica una tracción positiva, pero debemos vigilar si este viene de nuevos logos o de expansión. 
                <br><br>¿Entiende cómo esta métrica impacta en su valoración de mercado?
            </div>
        `;
    }

    if (q.includes('churn') || q.includes('retención') || q.includes('baja')) {
        return `
            <div class="professor-lesson">
                <strong>Lección 02: Churn Rate (Tasa de Abandono)</strong><br>
                En Business Intelligence, el Churn es el "cubo con agujeros". Analicemos sus cifras:<br><br>
                • <strong>Definición:</strong> Es el porcentaje de clientes que cancelan su suscripción en un periodo.<br>
                • <strong>Su Situación:</strong> Tiene un churn del <code>${metrics.churn_rate}%</code>.<br>
                • <strong>Alerta Pedagógica:</strong> Sus clientes tipo <strong>Startups</strong> están decreciendo un <strong>${top_segments.find(s => s.name === 'Startup').growth}%</strong>.<br><br>
                <em>Explicación Sugerida:</em> El mercado de Startups es volátil. El dato nos dice que debemos fortalecer el onboarding en ese segmento para evitar la fuga.<br><br>
                ¿Desea que profundicemos en las causas de esta deserción?
            </div>
        `;
    }

    if (q.includes('cac') || q.includes('adquisición') || q.includes('coste')) {
        return `
            <div class="professor-lesson">
                <strong>Lección 03: Customer Acquisition Cost (CAC)</strong><br>
                No basta con crecer, hay que crecer eficientemente. Revisemos su CAC:<br><br>
                • <strong>Concepto:</strong> Inversión total para adquirir un nuevo cliente.<br>
                • <strong>Su Dato:</strong> Actualmente le cuesta <code>$${metrics.cac}</code> adquirir un usuario.<br>
                • <strong>Relación LTV/CAC:</strong> Con un LTV de <code>$${metrics.ltv}</code>, su ratio es de <strong>8:1</strong>.<br><br>
                <em>Diagnóstico del Profesor:</em> Un ratio superior a 3:1 es excelente. Su modelo es altamente escalable porque recupera la inversión rápidamente.<br><br>
                ¿Está clara la relación entre lo que invierte y lo que el cliente le devuelve en el tiempo?
            </div>
        `;
    }

    if (q.includes('ayuda') || q.includes('no entiendo') || q.includes('explicar')) {
        return `
            <strong>Intervención Pedagógica:</strong><br>
            Entiendo que el análisis de datos puede ser complejo. Permítame simplificarlo:<br><br>
            Cualquier negocio se resume en tres preguntas que los datos responden:<br>
            1. <strong>¿Cuánto entra?</strong> (MRR)<br>
            2. <strong>¿Quién se va?</strong> (Churn)<br>
            3. <strong>¿Cuánto nos cuesta traerlos?</strong> (CAC)<br><br>
            ¿Sobre cuál de estos tres pilares de su proyecto <strong>DataSocio</strong> quiere que le dé una cátedra con sus cifras actuales?
        `;
    }

    if (q.includes('hola') || q.includes('buenos') || q.includes('quién eres')) {
        return "Buenos días. Soy el <strong>Profesor DataSocio</strong>. Mi cátedra se enfoca en la interpretación estratégica de métricas SaaS. Tengo acceso a su dataset actual. ¿Iniciamos con un análisis de crecimiento o una revisión de rentabilidad?";
    }

    return `
        He tomado nota de su consulta. Como profesor, sugiero que analicemos los fundamentos. 
        Pruebe preguntando: <em>"Explícame el MRR con mis datos"</em> o <em>"¿Qué pasa con el Churn?"</em>. 
        Estoy aquí para asegurar que comprenda la historia que cuentan sus números.
    `;
}
