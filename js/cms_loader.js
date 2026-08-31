// Dynamic CMS Loader for Hockley County Dems
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 1. Load Settings
    const settingsRes = await fetch('data/settings.json').catch(() => null);
    if (settingsRes && settingsRes.ok) {
      const s = await settingsRes.json();
      
      // Update phone links
      if (s.phone) {
        document.querySelectorAll('a[href^="tel:"]').forEach(el => {
          el.href = 'tel:' + s.phone.replace(/\D/g, '');
          el.textContent = s.phone;
        });
      }
      
      // Update email links
      if (s.email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
          el.href = 'mailto:' + s.email;
          if (el.textContent.includes('@')) el.textContent = s.email;
        });
      }

      // Update donate links
      if (s.donate_link) {
        document.querySelectorAll('.tx-clone-btn-donate, a[href*="actblue.com"]').forEach(el => {
          el.href = s.donate_link;
        });
      }

      // Update Linktree links
      if (s.linktree_link) {
        document.querySelectorAll('a[href*="linktr.ee"]').forEach(el => {
          el.href = s.linktree_link;
        });
      }
    }

    // 2. Load Leadership on about.html
    const leadRes = await fetch('data/leadership.json').catch(() => null);
    if (leadRes && leadRes.ok) {
      const l = await leadRes.json();
      const cecList = document.querySelector('.glass-card ul');
      if (cecList && window.location.pathname.includes('about.html')) {
        let html = '<li><strong>' + (l.chair_title || 'County Chair & Parliamentarian') + ':</strong> ' + (l.chair || 'Aaron Gonzalez') + '</li>' +
                   '<li><strong>' + (l.vice_chair_title || 'Vice-Chair & Treasurer') + ':</strong> ' + (l.vice_chair || 'Lucidora Perez') + '</li>' +
                   '<li><strong>' + (l.secretary_title || 'Secretary & Historian') + ':</strong> ' + (l.secretary || 'Victoria Dodge') + '</li>' +
                   '<li><strong>' + (l.social_media_title || 'Social Media Liaison') + ':</strong> ' + (l.social_media || 'Anastasia Maldonado') + '</li>';
        if (l.precinct_chairs && Array.isArray(l.precinct_chairs)) {
          l.precinct_chairs.forEach(p => {
            html += '<li><strong>' + p.precinct + ' Chair:</strong> ' + p.name + '</li>';
          });
        }
        cecList.innerHTML = html;
      }
    }
  } catch (e) {
    console.debug('CMS Loader running with static base');
  }
});
