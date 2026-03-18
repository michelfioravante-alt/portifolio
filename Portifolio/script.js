/* ============================================
   PORTFOLIO — SCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Fade-in por scroll ──────────────────────────────────────
    const sections = document.querySelectorAll('.hero, .kpis, .sobre, .skills, .projetos, .contato');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(10px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // ── BPMN nodes: entrada escalonada ─────────────────────────
    const bpmnElements = document.querySelectorAll('.bpmn-node, .bpmn-line, .projeto');
    bpmnElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(8px)';
        el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;

        const bpmnObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        bpmnObserver.observe(el);
    });

    // ── Contador animado nos KPIs ───────────────────────────────
    function animateCount(el, target, prefix, suffix) {
        const duration = 1400;
        const start = performance.now();

        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = prefix + Math.round(ease * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    const kpiNumbers = document.querySelectorAll('.kpi-number[data-target]');

    const kpiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el     = entry.target;
                const target = parseInt(el.dataset.target, 10);
                // data-suffix define o que vai depois (ex: "+" ou "%")
                const raw    = el.dataset.suffix;
                // Se o sufixo original aparece antes do número (ex: "+20"), prefixo; se depois ("100%"), sufixo
                const prefix = (raw === '+') ? '+' : '';
                const suffix = (raw === '%') ? '%' : '';
                animateCount(el, target, prefix, suffix);
                kpiObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    kpiNumbers.forEach(el => kpiObserver.observe(el));

    // ── Lightbox para os diagramas BPMN ────────────────────────
    document.querySelectorAll('.bpmn-fig img, .workflow-fig img').forEach(img => {
        img.addEventListener('click', () => {
            const lb = document.createElement('div');
            lb.className = 'lightbox';
            lb.innerHTML = `<img src="${img.src}" alt="${img.alt}" />`;
            document.body.appendChild(lb);
            lb.addEventListener('click', () => lb.remove());
        });
    });

});
