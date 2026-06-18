document.addEventListener('DOMContentLoaded', () => {
  /* ============================================================
     1. HAMBURGER MENU (MOBILE NAVIGATION)
     ============================================================ */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  /* ============================================================
     2. NAVBAR SCROLL EFFECT (BLUR GLASS STATE)
     ============================================================ */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ============================================================
     3. ACTIVE NAV LINK (SCROLL SPY)
     ============================================================ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let currentId = '';
    const scrollY = window.scrollY + 150; // Offset for header

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  /* ============================================================
     4. INSTANT TEXT COPYING WITH TOAST FEEDBACK
     ============================================================ */
  const toast = document.getElementById('copyToast');

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  function copyTextToClipboard(text, successMessage) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => showToast(successMessage))
        .catch(() => showToast('Gagal menyalin teks.'));
    } else {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast(successMessage);
      } catch (err) {
        showToast('Gagal menyalin teks.');
      }
      document.body.removeChild(textarea);
    }
  }

  // IP Copy logic
  const fullIpString = 'sirhc.my.id:12345';
  const ipSuccessMsg = 'IP Server disalin ke clipboard!';

  const navIpBtn = document.getElementById('navIpBtn');
  if (navIpBtn) {
    navIpBtn.addEventListener('click', () => {
      copyTextToClipboard(fullIpString, ipSuccessMsg);
    });
  }

  const heroIpWidget = document.getElementById('heroIpWidget');
  if (heroIpWidget) {
    heroIpWidget.addEventListener('click', () => {
      copyTextToClipboard(fullIpString, ipSuccessMsg);
    });
  }

  const footerIp = document.getElementById('footerIp');
  if (footerIp) {
    footerIp.addEventListener('click', () => {
      copyTextToClipboard(fullIpString, ipSuccessMsg);
    });
  }

  // Copy Registration Form template logic
  const copyFormBtn = document.getElementById('copyFormBtn');
  const formTemplateText = document.getElementById('formTemplateText');

  if (copyFormBtn && formTemplateText) {
    copyFormBtn.addEventListener('click', () => {
      // Clean up text format slightly before copying
      const textToCopy = formTemplateText.textContent.trim();
      copyTextToClipboard(textToCopy, 'Formulir Pendaftaran disalin! Silakan tempel di WhatsApp.');
    });
  }

  /* ============================================================
     5. GALLERY LIGHTBOX
     ============================================================ */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  
  // Cache image data from DOM
  const galleryItems = document.querySelectorAll('.gallery-item');
  const mediaData = Array.from(galleryItems).map(item => {
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-caption h4')?.textContent || '';
    const desc = item.querySelector('.gallery-caption p')?.textContent || '';
    return {
      src: img ? img.src : '',
      alt: img ? img.alt : '',
      caption: title ? `<strong>${title}</strong> — ${desc}` : ''
    };
  });

  window.openLightbox = function(index) {
    if (index >= 0 && index < mediaData.length) {
      const data = mediaData[index];
      lightboxImg.src = data.src;
      lightboxImg.alt = data.alt;
      lightboxCaption.innerHTML = data.caption;
      
      lightbox.style.display = 'flex';
      // Force repaint
      lightbox.offsetHeight;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeLightbox = function() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!lightbox.classList.contains('active')) {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
      }
    }, 300); // Matching CSS transition duration
  };

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
});