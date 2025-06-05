// Sunbeams and Meteors Background Animation
(function() {
  // Sunbeams animation for light mode
  function createSunbeams(container) {
    container.innerHTML = '';
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100vw');
    svg.setAttribute('height', '100vh');
    svg.setAttribute('viewBox', '0 0 1920 1080');
    svg.style.width = '100vw';
    svg.style.height = '100vh';
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.pointerEvents = 'none';
    // Create 8-12 sunbeams
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      const length = 900 + Math.random() * 200;
      const x2 = 960 + Math.cos(angle) * length;
      const y2 = 200 + Math.sin(angle) * length;
      const beam = document.createElementNS(svgNS, 'line');
      beam.setAttribute('x1', '960');
      beam.setAttribute('y1', '200');
      beam.setAttribute('x2', x2);
      beam.setAttribute('y2', y2);
      beam.setAttribute('stroke', '#ffe066');
      beam.setAttribute('stroke-width', 48 + Math.random() * 16);
      beam.setAttribute('stroke-linecap', 'round');
      beam.setAttribute('opacity', '0.18');
      svg.appendChild(beam);
    }
    container.appendChild(svg);
    // Animate rotation
    let angle = 0;
    function animate() {
      angle += 0.02;
      svg.style.transform = `rotate(${angle}rad)`;
      container._sunbeamsRAF = requestAnimationFrame(animate);
    }
    animate();
  }
  function destroySunbeams(container) {
    if (container._sunbeamsRAF) cancelAnimationFrame(container._sunbeamsRAF);
    container.innerHTML = '';
  }

  // Meteors animation for dark mode
  function createMeteors(container) {
    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);
    let meteors = [];
    function spawnMeteor() {
      const x = Math.random() * canvas.width;
      const y = -40;
      const len = 120 + Math.random() * 60;
      const speed = 8 + Math.random() * 6;
      const angle = Math.PI / 2.5 + (Math.random() - 0.5) * 0.2;
      meteors.push({ x, y, len, speed, angle, alpha: 1 });
    }
    let lastMeteor = 0;
    function animate() {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw meteors
      for (let m of meteors) {
        ctx.save();
        ctx.globalAlpha = m.alpha;
        ctx.strokeStyle = '#b7bfff';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x + Math.cos(m.angle) * m.len, m.y + Math.sin(m.angle) * m.len);
        ctx.stroke();
        ctx.restore();
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.008;
      }
      meteors = meteors.filter(m => m.alpha > 0 && m.y < canvas.height + 100);
      // Spawn new meteors occasionally
      if (Date.now() - lastMeteor > 800 + Math.random() * 1200) {
        spawnMeteor();
        lastMeteor = Date.now();
      }
      container._meteorsRAF = requestAnimationFrame(animate);
    }
    animate();
    // Handle resize
    function onResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', onResize);
    container._meteorsResize = onResize;
  }
  function destroyMeteors(container) {
    if (container._meteorsRAF) cancelAnimationFrame(container._meteorsRAF);
    if (container._meteorsResize) window.removeEventListener('resize', container._meteorsResize);
    container.innerHTML = '';
  }

  // Mode switching logic
  function updateAnimations() {
    const isDark = document.body.classList.contains('dark-mode');
    const sunbeams = document.querySelector('.sunbeams-bg');
    const meteors = document.querySelector('.meteors-bg');
    if (sunbeams && meteors) {
      if (isDark) {
        destroySunbeams(sunbeams);
        createMeteors(meteors);
      } else {
        destroyMeteors(meteors);
        createSunbeams(sunbeams);
      }
    }
  }
  // Initial run
  document.addEventListener('DOMContentLoaded', updateAnimations);
  // Listen for mode changes
  const observer = new MutationObserver(updateAnimations);
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
})(); 