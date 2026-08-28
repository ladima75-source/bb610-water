
const artboard = document.getElementById('artboard');
// HERO uses normal responsive CSS layout. No transform scaling is applied.


// Final UX: active navigation state while scrolling.
const topNavLinks = [...document.querySelectorAll('.header nav a[href^="#"]')];
const navSections = topNavLinks
  .map(a => ({a, el: document.querySelector(a.getAttribute('href'))}))
  .filter(x => x.el);

function syncTopNav(){
  const y = window.scrollY + 120;
  let current = navSections[0];
  navSections.forEach(item => {
    if (item.el.offsetTop <= y) current = item;
  });
  topNavLinks.forEach(a => a.classList.remove('active'));
  if (current) current.a.classList.add('active');
}
window.addEventListener('scroll', syncTopNav, {passive:true});
window.addEventListener('load', syncTopNav);
syncTopNav();

// Until backend is connected, do not imitate a successful submission.
const contactForm = document.getElementById('contactForm');
if (contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"], button:not([type])');
    if (!btn) return;
    const original = btn.textContent;
    btn.textContent = 'НАДСИЛАННЯ БУДЕ АКТИВОВАНО ПІСЛЯ ПІДКЛЮЧЕННЯ СЕРВЕРА';
    btn.disabled = true;
    setTimeout(()=>{
      btn.textContent = original;
      btn.disabled = false;
    }, 2600);
  });
}



// Screen-composition navigation: land each section just below fixed header.
document.querySelectorAll('.header nav a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const headerH = window.innerWidth <= 760 ? 104 : 86;
    const y = target.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({top:y, behavior:'smooth'});
  });
});

