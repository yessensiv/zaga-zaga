(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const button = document.querySelector('.motion-toggle');
  let paused = reduce.matches;
  const reset = () => document.querySelectorAll('.image-wrap').forEach(el => { el.style.removeProperty('transform'); });
  const sync = () => { document.body.classList.toggle('motion-paused', paused); button.setAttribute('aria-pressed', String(paused)); button.textContent = paused ? 'Анимация: выкл.' : 'Анимация: вкл.'; if(paused) reset(); };
  button.addEventListener('click', () => { paused = !paused; sync(); });
  reduce.addEventListener('change', e => { paused=e.matches; sync(); });
  sync();
  document.querySelectorAll('.card').forEach(card => {
    const face = card.querySelector('.image-wrap');
    let frame;
    card.addEventListener('pointermove', e => {
      if(paused || e.pointerType !== 'mouse') return;
      const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      cancelAnimationFrame(frame);
      frame=requestAnimationFrame(() => { face.style.transform=`rotateX(${-y*12}deg) rotateY(${x*16}deg) translateZ(16px)`; });
    });
    card.addEventListener('pointerleave', () => { cancelAnimationFrame(frame); face.style.removeProperty('transform'); });
  });
  if('IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), {threshold:.08});
    document.querySelectorAll('.reveal,.section-heading,.card,.social').forEach(el => { el.classList.add('reveal'); observer.observe(el); });
    document.body.classList.add('motion-ready');
  }
})();
