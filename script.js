document.addEventListener('DOMContentLoaded', () => {
  // NAV toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  // Close nav when link clicked (mobile)
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && navMenu) {
        navMenu.classList.remove('show');
      }
    });
  });

  // Scroll sections active link
  const sections = document.querySelectorAll('section[id]');
  
  function activateLinkOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const id = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav__link').forEach(l => {
          l.classList.remove('active-link');
        });
        
        const activeLink = document.querySelector(`.nav__link[href*="${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active-link');
        }
      }
    });
  }
  
  window.addEventListener('scroll', activateLinkOnScroll);
  activateLinkOnScroll(); // Initialize on load

  // Project modal logic
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalDemo = document.getElementById('modal-demo');
  const modalFigma = document.getElementById('modal-figma');
  const modalGithub = document.getElementById('modal-github');
  const modalClose = document.getElementById('modal-close');

  if (modal) {
    document.querySelectorAll('.project__card').forEach(card => {
      card.addEventListener('click', () => {
        const title = card.dataset.title || 'Project';
        const desc = card.dataset.desc || '';
        const tech = card.dataset.tech || '';
        const demo = card.dataset.demo || '';
        const figma = card.dataset.figma || '';
        const github = card.dataset.github || '';

        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalTech.textContent = tech;

        // Reset all buttons
        modalDemo.style.display = "none";
        modalFigma.style.display = "none";
        modalGithub.style.display = "none";

        // Handle Live Demo
        if (demo && demo !== '#') {
          modalDemo.style.display = "inline-block";
          modalDemo.href = demo;
        }

        // Handle Figma
        if (figma && figma !== '#') {
          modalFigma.style.display = "inline-block";
          modalFigma.href = figma;
        }

        // Handle GitHub
        if (github && github !== '#') {
          modalGithub.style.display = "inline-block";
          modalGithub.href = github;
        }

        modal.setAttribute('aria-hidden', 'false');
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modal.setAttribute('aria-hidden', 'true');
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }
});