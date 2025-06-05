document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('ailo-theme');

  // Helper to add/remove background animation containers
  function ensureBackgrounds() {
    if (!document.querySelector('.sunbeams-bg')) {
      const sunbeams = document.createElement('div');
      sunbeams.className = 'sunbeams-bg';
      document.body.appendChild(sunbeams);
    }
    if (!document.querySelector('.meteors-bg')) {
      const meteors = document.createElement('div');
      meteors.className = 'meteors-bg';
      document.body.appendChild(meteors);
    }
  }
  ensureBackgrounds();

  function setTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('ailo-theme', 'dark');
      icon.textContent = '🌚';
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('ailo-theme', 'light');
      icon.textContent = '🌞';
    }
  }

  if (saved === 'dark' || (!saved && prefersDark)) {
    setTheme(true);
    toggle.checked = true;
  } else {
    setTheme(false);
    toggle.checked = false;
  }

  toggle.addEventListener('change', function() {
    setTheme(toggle.checked);
  });
}); 