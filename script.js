const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); } });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el=> observer.observe(el));

  // Navbar: solid background once scrolled, hide on scroll down, reveal on scroll up
  const nav = document.querySelector('nav');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateNav(){
    if (!nav) return;
    const currentScrollY = window.scrollY;

    nav.classList.toggle('nav-scrolled', currentScrollY > 40);

    if (currentScrollY > lastScrollY && currentScrollY > 120) {
      nav.classList.add('nav-hidden');      // scrolling down -> hide
    } else {
      nav.classList.remove('nav-hidden');   // scrolling up -> show
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  if (nav) {
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });
  }

  // Mobile nav toggle (only present on the main page, not case study pages)
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (navToggle && mobileNav) {
    function closeMobileNav(){
      mobileNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    function openMobileNav(){
      mobileNav.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      isOpen ? closeMobileNav() : openMobileNav();
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeMobileNav();
    });
  }