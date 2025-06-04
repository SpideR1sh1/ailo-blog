document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('ailo-theme');
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
    icon.textContent = '🌚';
  } else {
    document.body.classList.remove('dark-mode');
    toggle.checked = false;
    icon.textContent = '🌞';
  }
  toggle.addEventListener('change', function() {
    if (toggle.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('ailo-theme', 'dark');
      icon.textContent = '🌚';
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('ailo-theme', 'light');
      icon.textContent = '🌞';
    }
  });
}); 