(() => {
  const hero = document.querySelector('.hero');
  const product = hero.querySelector('.hero-product');
  const can = product.querySelector('.concept-can');
  const caption = product.querySelector('.product-caption');
  const drinks = {
    mojito: {name:'MOJITO', label:'МОХИТО / ДИЗАЙН-КОНЦЕПТ'},
    tea: {name:'ICE TEA', label:'ХОЛОДНЫЙ ЧАЙ / ДИЗАЙН-КОНЦЕПТ'},
    cola: {name:'COLA', label:'КОЛА / ДИЗАЙН-КОНЦЕПТ'}
  };
  const paused = () => document.body.classList.contains('motion-paused') || matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-drink]').forEach(button => {
    button.addEventListener('click', () => {
      const key=button.dataset.drink;
      if(hero.dataset.flavor===key) return;
      hero.dataset.flavor=key;
      can.querySelector('strong').textContent=drinks[key].name;
      can.className='concept-can concept-can--hero concept-can--'+key;
      caption.textContent=drinks[key].label;
      document.querySelectorAll('[data-drink]').forEach(item => item.setAttribute('aria-pressed',String(item===button)));
      can.classList.remove('drink-enter');
      if(!paused()) { void can.offsetWidth; can.classList.add('drink-enter'); }
    });
  });
  let tiltFrame;
  hero.addEventListener('pointermove', e => {
    if(paused() || e.pointerType!=='mouse') return;
    const rect=hero.getBoundingClientRect();
    const rx=((e.clientY-rect.top)/rect.height-.5)*-6;
    const ry=((e.clientX-rect.left)/rect.width-.5)*8;
    cancelAnimationFrame(tiltFrame);
    tiltFrame=requestAnimationFrame(() => { product.style.setProperty('--rx',rx+'deg'); product.style.setProperty('--ry',ry+'deg'); });
  });
  const reset=() => { cancelAnimationFrame(tiltFrame); product.style.removeProperty('--rx'); product.style.removeProperty('--ry'); };
  hero.addEventListener('pointerleave',reset);
  document.querySelector('.motion-toggle').addEventListener('click',reset);
  const bar=document.querySelector('.reading-progress');
  let scrollFrame;
  const progress=() => { const max=document.documentElement.scrollHeight-innerHeight; bar.style.transform=`scaleX(${max>0?Math.max(0,Math.min(1,scrollY/max)):0})`; };
  const schedule=() => { cancelAnimationFrame(scrollFrame); scrollFrame=requestAnimationFrame(progress); };
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule);
  addEventListener('load',schedule);
  progress();
})();

(() => {
  const menu=document.querySelector('.mobile-menu');
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click',() => { menu.open=false; }));
  document.addEventListener('keydown',event => {
    if(event.key==='Escape' && menu.open){ menu.open=false; menu.querySelector('summary').focus(); }
  });
  document.addEventListener('click',event => {
    if(menu.open && !menu.contains(event.target)) menu.open=false;
  });
})();
