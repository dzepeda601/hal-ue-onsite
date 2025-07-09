import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  const rows = [...block.children];
  rows.forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });

  // Add class based on number of <li> elements
  const liCount = ul.children.length;
  const gridClass = `grid-${Math.min(4, liCount)}`; // Ensure no grid class exceeds grid-4

  if (liCount >= 2 && liCount <= 4) {
    block.classList.add(gridClass);
  } else {
    block.classList.remove('grid-2', 'grid-3', 'grid-4');
  }


  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '350' }]));
  });

  block.textContent = '';
  block.append(ul);
}
