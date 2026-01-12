window.addEventListener('load', () => {
  // 1. Page Load Alert (Only on first load ideally, but requirement says "Sayfa ilk açıldığında")
  // To avoid annoyance during dev, we might wrap it, but requirement is strict.
  // Using setTimeout to ensure it renders first
  setTimeout(() => {
     alert("PortCity Tanıtım Sitesine Hoş Geldiniz");
  }, 100);

  // 4. Theme Switcher (Global)
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
    });
  }

  // 2. Menu Interaction (mouseover & mouseout) & 3. Active Page Highlight
  // We determine active page by URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav ul li a');

  navLinks.forEach(link => {
    // 3. Active Class Logic
    // Check if href matches current path
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }

    // click event for active class (visual update if SPA-like, but for standard links it reloads)
    // Requirement says: "Menüde tıklanan sayfa: Aktif class almalıdır"
    // Since these are real links, the new page loads and the logic above handles it.
    // However, strictly following the rule "click event + classList kullanımı zorunludur":
    link.addEventListener('click', (e) => {
        // Remove active from all
        navLinks.forEach(l => l.classList.remove('active'));
        // Add to clicked
        link.classList.add('active');
    });

    // 2. Mouseover/Mouseout
    // Requirement: "Yazı rengi değişmelidir", "Mouse ayrılınca eski haline dönmelidir"
    const originalColor = getComputedStyle(link).color;
    
    link.addEventListener('mouseover', () => {
        link.style.color = '#ffcc00'; // Highlight color
    });

    link.addEventListener('mouseout', () => {
        link.style.color = ''; // Reverts to CSS
    });
  });

  // 7. Beğeni Sayacı (index.html mostly)
  let likeCount = 0;
  const likeBtn = document.getElementById('like-btn');
  const likeDisplay = document.getElementById('like-count');
  
  if (likeBtn && likeDisplay) {
    likeBtn.addEventListener('click', () => {
        likeCount++;
        likeDisplay.textContent = likeCount;
    });
  }

  // 9. Görsel Etkileşimi (index.html)
  const interactiveImg = document.querySelector('.interactive-img');
  if (interactiveImg) {
    interactiveImg.addEventListener('click', () => {
        interactiveImg.classList.toggle('grow');
    });
  }

  // 6. Dinamik Aktivite Listesi & 5. Mouseover Bilgi Kutusu (services.html)
  const activityListContainer = document.getElementById('activity-list');
  if (activityListContainer) {
    const activities = [
        { name: "Tekne Turu", desc: "PortCity koylarını keşfedin" },
        { name: "Dalış Deneyimi", desc: "Sualtı dünyasının büyüleyici güzellikleri" },
        { name: "Marina Restoranları", desc: "Eşsiz lezzetler ve manzaralı akşam yemekleri" },
        { name: "Gün Batımı Yürüyüşü", desc: "Romantik ve huzurlu bir akşam yürüyüşü" }
    ];

    activities.forEach(activity => {
        const li = document.createElement('li');
        li.className = 'activity-item';
        
        const title = document.createElement('h3');
        title.textContent = activity.name;
        li.appendChild(title);

        const desc = document.createElement('p');
        desc.className = 'activity-desc';
        desc.textContent = `→ ${activity.desc}`;
        li.appendChild(desc);

        // 5. Mouseover/Mouseout for description
        li.addEventListener('mouseover', () => {
            desc.style.display = 'block';
        });

        li.addEventListener('mouseout', () => {
            desc.style.display = 'none';
        });

        activityListContainer.appendChild(li);
    });
  }

  // 8. İletişim Formu Kontrolü (contact.html)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            alert("Lütfen tüm alanları doldurunuz!");
        } else {
            alert("Mesajınız başarıyla gönderildi");
            contactForm.reset();
        }
    });
  }
});
