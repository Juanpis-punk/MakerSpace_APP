import './style.css'
import { initMakerSpace } from './cola.js'; 

document.querySelector('#app').innerHTML = `
<header class="header">
  <div class="container header-content">
    <div class="logo">
      <a href="#inicio"><img src="assets/img/MKSPC_logo.png" alt="logo"></a>
    </div>  
    <nav id="nav" class="nav">
      <ul>
        <li><a href="#inicio">Cola de Espera</a></li>
        <li><a href="">Filamentos</a></li>
      </ul>
    </nav>
    <div class="redes"><i class="fa-solid fa-user"></i></div>
    <button class="menu-toggle" type="button" aria-label="Abrir menu de navegacion" aria-expanded="false" aria-controls="nav">
      <i class="fa-solid fa-bars"></i>
    </button>
  </div>
</header>

<main>
<section id="inicio">
  <div class="container hero">
    <h1>¡¡BIENVENIDO MONITOR!!</h1>
    <h3>Hoy el Maker necesita de ti</h3>
  </div>
</section>

<section class="contenido">
  <div class="container">
    <div class="queue-sketch">
      <div class="queue-heading">
        <p class="eyebrow">Cola de Espera MakerSpace</p>
      </div>
      <div class="queue-board-wrapper">
        <div class="queue-board" id="queueBoard" aria-live="polite"></div>
      </div>
      <div class="queue-controls">
        <div class="queue-form">
          <label>Color: <input type="color" id="cardColor" value="#24b4d1"></label>
          <label>Nombre del propietario <input type="text" id="ownerName" placeholder="Ej: Juan Perez"></label>
          <label>Nombre de la impresion <input type="text" id="printName" placeholder="Ej: Base para celular"></label>
        </div>
        <button class="queue-add-btn" id="addQueueCard" type="button">Añadir impresión</button>
      </div>
    </div>
  </div>
</section>
</main>

<footer>
  <div class="logo-footer"><img src="assets/img/MKSPC_logo.png" alt="logo"></div>
</footer>
`;

// ESTA LÍNEA ES LA QUE ACTIVA TODO LO QUE HAY EN cola.js
initMakerSpace();