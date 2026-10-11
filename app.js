(() => {
  'use strict';
  const config = window.BIRTHDAY_CONFIG;
  const $ = (selector) => document.querySelector(selector);
  const scenes = [...document.querySelectorAll('[data-scene]')];
  const chapters = [...document.querySelectorAll('[data-step]')];
  let unlocked = 0;
  let currentPhoto = 0;
  let confettiTimer;
  const dialog = $('#photo-dialog');
  function character(key, className) {
    const image = document.createElement('img');
    image.src = config.characters[key];
    image.alt = '';
    image.className = `character ${className}`;
    image.draggable = false;
    image.setAttribute('aria-hidden', 'true');
    return image;
  }
  const backdrop = document.createElement('div');
  backdrop.className = 'character-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  backdrop.append(character('bearsKiss', 'backdrop-bears'), character('dogLoveWhite', 'backdrop-dog-white'), character('dogLoveYellow', 'backdrop-dog-yellow'));
  document.body.prepend(backdrop);
  $('.gift-art').append(character('bearsHug', 'gift-bears'), character('dogLoveYellow', 'gift-dog'));
  $('#cake').append(character('dogLoveWhite', 'cake-dog-white'), character('dogParty', 'cake-dog-party'));
  $('#envelope').append(character('dogSmile', 'envelope-dog'));
  const letterFriends = document.createElement('div');
  letterFriends.className = 'letter-friends';
  letterFriends.setAttribute('aria-hidden', 'true');
  letterFriends.append(character('bearsHug', ''), character('dogLoveWhite', ''));
  $('#letter').prepend(letterFriends);
  $('.ending-art').replaceChildren(character('dogLoveWhite', 'ending-dog'), character('bearsKiss', 'ending-bears'), character('dogLoveYellow', 'ending-dog'));
  document.title = `给${config.recipient} · 一份生日礼物`;
  document.querySelectorAll('[data-recipient]').forEach(el => { el.textContent = config.recipient; });
  $('[data-opening]').textContent = config.opening;
  $('[data-ending]').textContent = config.ending;
  $('.letter-salutation').textContent = `${config.recipient}：`;
  $('#signature').textContent = config.signature;
  config.letter.forEach(text => {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    $('#letter-body').append(paragraph);
  });

  function goTo(step) {
    unlocked = Math.max(unlocked, step);
    scenes.forEach((scene, index) => { scene.hidden = index !== step; });
    chapters.forEach((button, index) => {
      button.disabled = index > unlocked;
      button.classList.toggle('active', index === step);
      if (index === step) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    $('#progress-label').textContent = `0${step + 1} / 05`;
    $('#progress-bar').style.width = `${(step + 1) * 20}%`;
    $('#main').focus({ preventScroll: true });
    $('#main').scrollIntoView({ behavior: 'auto', block: 'start' });
  }
  chapters.forEach(button => button.addEventListener('click', () => goTo(Number(button.dataset.step))));
  $('.wordmark').addEventListener('click', event => { event.preventDefault(); goTo(0); });
  $('#start').addEventListener('click', () => goTo(1));
  $('#to-letter').addEventListener('click', () => goTo(2));
  $('#to-photos').addEventListener('click', () => goTo(3));
  $('#to-ending').addEventListener('click', () => goTo(4));

  function resetCake() {
    $('#cake').classList.remove('extinguished');
    $('#cake-title').textContent = '闭上眼睛，许一个愿望';
    $('#cake-message').textContent = '愿你的每一个小小心愿，都被温柔听见。许好愿后，一起吹灭蜡烛吧。';
    $('#blow').hidden = false;
    $('#relight').hidden = true;
    $('#to-letter').hidden = true;
    clearTimeout(confettiTimer);
    $('#confetti').replaceChildren();
  }
  $('#blow').addEventListener('click', () => {
    $('#cake').classList.add('extinguished');
    $('#cake-title').textContent = '生日快乐，愿你永远闪闪发光';
    $('#cake-message').textContent = config.birthdayWish;
    $('#blow').hidden = true;
    $('#relight').hidden = false;
    $('#to-letter').hidden = false;
    $('#to-letter').focus({ preventScroll: true });
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const colors = ['#c78999', '#e6bf87', '#f0d6d0', '#b9c3ae'];
      for (let i = 0; i < 48; i++) {
        const piece = document.createElement('span');
        piece.className = 'confetti-piece';
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = colors[i % colors.length];
        piece.style.animationDelay = `${Math.random() * .7}s`;
        $('#confetti').append(piece);
      }
      confettiTimer = setTimeout(() => $('#confetti').replaceChildren(), 4000);
    }
  });
  $('#relight').addEventListener('click', () => { resetCake(); $('#blow').focus({ preventScroll: true }); });
  function setLetter(open) {
    $('#letter').hidden = !open;
    $('#envelope').hidden = open;
    $('#envelope').setAttribute('aria-expanded', String(open));
    (open ? $('#close-letter') : $('#envelope')).focus({ preventScroll: true });
  }
  $('#envelope').addEventListener('click', () => setLetter(true));
  $('#close-letter').addEventListener('click', () => setLetter(false));

  const tileColors = ['#eddbd4', '#e8dfcf', '#dce3db', '#e3dce6', '#e9d5d9', '#dbe2e5'];
  const icons = ['♡', '✧', '☼', '❀', '♡', '∞'];
  function photoArt(photo, index) {
    const art = document.createElement('div');
    art.className = 'photo-art';
    art.style.setProperty('--tile', tileColors[index % tileColors.length]);
    const icon = document.createElement('span');
    icon.className = 'placeholder-icon';
    icon.textContent = icons[index % icons.length];
    icon.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.className = 'placeholder-label';
    label.textContent = '等待我们的合照';
    art.append(icon, label);
    if (photo.src) {
      const img = document.createElement('img');
      img.alt = photo.alt;
      img.addEventListener('load', () => { icon.hidden = true; label.hidden = true; });
      img.addEventListener('error', () => { img.remove(); label.textContent = '照片暂时无法加载'; });
      img.src = photo.src;
      art.append(img);
    }
    return art;
  }
  config.photos.forEach((photo, index) => {
    const button = document.createElement('button');
    button.className = 'photo-card';
    button.setAttribute('aria-label', `查看照片 ${index + 1}：${photo.caption}`);
    button.append(photoArt(photo, index));
    const caption = document.createElement('span');
    caption.className = 'photo-caption';
    caption.textContent = photo.caption;
    button.append(caption);
    button.addEventListener('click', () => { showPhoto(index); dialog.showModal(); });
    $('#photo-grid').append(button);
  });
  if (config.photos.every(photo => photo.src)) $('.photo-note').textContent = '点击相片，读读我们的回忆';
  function showPhoto(index) {
    currentPhoto = (index + config.photos.length) % config.photos.length;
    const photo = config.photos[currentPhoto];
    $('#preview-art').replaceChildren(photoArt(photo, currentPhoto));
    $('#preview-caption').textContent = photo.caption;
    $('#preview-memory').textContent = photo.memory || '';
    $('#preview-memory').hidden = !photo.memory;
    $('#photo-count').textContent = `${currentPhoto + 1} / ${config.photos.length}`;
  }
  $('#prev-photo').addEventListener('click', () => showPhoto(currentPhoto - 1));
  $('#next-photo').addEventListener('click', () => showPhoto(currentPhoto + 1));
  $('#close-preview').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(currentPhoto + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  $('#replay').addEventListener('click', () => {
    resetCake();
    $('#letter').hidden = true;
    $('#envelope').hidden = false;
    $('#envelope').setAttribute('aria-expanded', 'false');
    unlocked = 0;
    goTo(0);
  });
})();
