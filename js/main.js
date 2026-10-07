/**
 * PORTFÓLIO LUCAS GABRIEL - JAVASCRIPT OTIMIZADO & PURO (v3)
 * Execução instantânea, sem bibliotecas externas, compatível com GitHub Pages
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggleBtn && mobileMenu) {
    menuToggleBtn.addEventListener('click', () => {
      const isExpanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
      menuToggleBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('open');
    });

    // Fechar ao clicar em qualquer link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !menuToggleBtn.contains(e.target)) {
        mobileMenu.classList.remove('open');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Active Link no Scroll (Intersection Observer)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // 3. Função de Copiar E-mail com Toast
  window.copiarEmail = function(event) {
    if (event) event.preventDefault();
    const email = "g4brielsiqueira@gmail.com";

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(() => {
        showToast("E-mail copiado: " + email);
      }).catch(() => {
        fallbackCopy(email);
      });
    } else {
      fallbackCopy(email);
    }
  };

  function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast("E-mail copiado: " + text);
    } catch (err) {
      showToast("g4brielsiqueira@gmail.com");
    }
    document.body.removeChild(textArea);
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 4. Download do Currículo com suporte relativo a components/
  window.baixarCurriculo = function(event) {
    if (event) event.preventDefault();
    
    // Identifica se a execução está em /components/ ou na raiz
    const isInsideComponents = window.location.pathname.includes('/components/') || window.location.href.includes('/components/');
    const cvPath = isInsideComponents 
      ? "../assets/Curriculo_Lucas_Gabriel_Rodrigues_de_Siqueira.pdf" 
      : "./assets/Curriculo_Lucas_Gabriel_Rodrigues_de_Siqueira.pdf";

    const link = document.createElement('a');
    link.href = cvPath;
    link.download = "Curriculo_Lucas_Gabriel_Rodrigues_de_Siqueira.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Iniciando download do currículo...");
  };
});
