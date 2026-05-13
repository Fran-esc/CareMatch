const data = {
  cuidado: [
    { nombre: 'María González', comuna: 'Las Condes', filtro: 'mañana', exp: '5 años de experiencia', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
    { nombre: 'Carlos Rivas', comuna: 'Providencia', filtro: 'tarde', exp: 'Cuidador certificado', img: 'https://randomuser.me/api/portraits/men/43.jpg' },
    { nombre: 'Ana Pérez', comuna: 'Ñuñoa', filtro: 'noche', exp: 'Apoyo en alimentación y movilidad', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { nombre: 'Luis Herrera', comuna: 'Santiago', filtro: 'mañana', exp: 'Turnos diarios y fines de semana', img: 'https://randomuser.me/api/portraits/men/76.jpg' },
    { nombre: 'Camila Soto', comuna: 'La Florida', filtro: 'tarde', exp: 'Cuidados básicos y compañía', img: 'https://randomuser.me/api/portraits/women/12.jpg' },
    { nombre: 'Patricia Muñoz', comuna: 'Maipú', filtro: 'noche', exp: 'Cuidado nocturno', img: 'https://randomuser.me/api/portraits/women/28.jpg' }
  ],
  asistencia: [
    { nombre: 'Dra. Fernanda Lagos', comuna: 'Las Condes', filtro: 'enfermería', exp: 'Enfermería domiciliaria', img: 'https://randomuser.me/api/portraits/women/23.jpg' },
    { nombre: 'Tomás Araya', comuna: 'Providencia', filtro: 'kinesiología', exp: 'Kinesiología adulto mayor', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { nombre: 'Valentina Vera', comuna: 'Ñuñoa', filtro: 'tens', exp: 'TENS con experiencia clínica', img: 'https://randomuser.me/api/portraits/women/52.jpg' },
    { nombre: 'Jorge Pino', comuna: 'Santiago', filtro: 'enfermería', exp: 'Control de signos vitales', img: 'https://randomuser.me/api/portraits/men/52.jpg' },
    { nombre: 'Daniela Torres', comuna: 'Macul', filtro: 'kinesiología', exp: 'Rehabilitación motora', img: 'https://randomuser.me/api/portraits/women/51.jpg' },
    { nombre: 'Ricardo Fuentes', comuna: 'La Reina', filtro: 'tens', exp: 'Apoyo postoperatorio', img: 'https://randomuser.me/api/portraits/men/83.jpg' }
  ],
  acompanamiento: [
    { nombre: 'Sofía Morales', comuna: 'Las Condes', filtro: 'trámites', exp: 'Acompañamiento a bancos y compras', img: 'https://randomuser.me/api/portraits/women/35.jpg' },
    { nombre: 'Pedro Castillo', comuna: 'Providencia', filtro: 'paseos', exp: 'Paseos y actividades recreativas', img: 'https://randomuser.me/api/portraits/men/63.jpg' },
    { nombre: 'Elena Figueroa', comuna: 'Ñuñoa', filtro: 'controles', exp: 'Acompañamiento a controles médicos', img: 'https://randomuser.me/api/portraits/women/73.jpg' },
    { nombre: 'Marco Díaz', comuna: 'Santiago', filtro: 'trámites', exp: 'Gestiones y apoyo diario', img: 'https://randomuser.me/api/portraits/men/84.jpg' },
    { nombre: 'Rocío Medina', comuna: 'Maipú', filtro: 'paseos', exp: 'Compañía y conversación', img: 'https://randomuser.me/api/portraits/women/57.jpg' },
    { nombre: 'Héctor Salas', comuna: 'La Florida', filtro: 'controles', exp: 'Traslado y espera en consultas', img: 'https://randomuser.me/api/portraits/men/24.jpg' }
  ]
};

function renderCards(tipo) {
  const container = document.getElementById('cardsContainer');
  const searchInput = document.getElementById('searchInput');
  const filterSelect = document.getElementById('filterSelect');

  function paint() {
    const text = searchInput.value.toLowerCase().trim();
    const filter = filterSelect.value;

    const results = data[tipo].filter(item => {
      const matchesText = item.nombre.toLowerCase().includes(text) ||
        item.comuna.toLowerCase().includes(text) ||
        item.exp.toLowerCase().includes(text) ||
        item.filtro.toLowerCase().includes(text);

      const matchesFilter = filter === 'todos' || item.filtro === filter;
      return matchesText && matchesFilter;
    });

    container.innerHTML = results.length
      ? results.map(item => `
        <article class="person-card">
          <img src="${item.img}" alt="${item.nombre}">
          <h3>${item.nombre}</h3>
          <p>${item.comuna}</p>
          <p>${item.exp}</p>
          <span class="badge">${item.filtro}</span>
          <button class="btn-primary" onclick="solicitarServicio('${item.nombre}')">Solicitar servicio</button>
        </article>
      `).join('')
      : '<p>No se encontraron resultados con esos filtros.</p>';
  }

  searchInput.addEventListener('input', paint);
  filterSelect.addEventListener('change', paint);
  paint();
}

function solicitarServicio(nombre) {
  alert(`Solicitud enviada para ${nombre}. Un ejecutivo de CareMatch tomará contacto.`);
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const contacto = {
      nombre: document.getElementById('nombreContacto').value,
      telefono: document.getElementById('telefonoContacto').value,
      correo: document.getElementById('correoContacto').value,
      mensaje: document.getElementById('mensajeContacto').value,
      fecha: new Date().toLocaleString()
    };
    const contactos = JSON.parse(localStorage.getItem('contactosCareMatch')) || [];
    contactos.push(contacto);
    localStorage.setItem('contactosCareMatch', JSON.stringify(contactos));
    document.getElementById('contactMsg').textContent = 'Mensaje enviado correctamente. Nos contactaremos a la brevedad.';
    contactForm.reset();
  });
}

const showRegister = document.getElementById('showRegister');
if (showRegister) {
  showRegister.addEventListener('click', () => {
    document.getElementById('registerForm').classList.toggle('hidden');
  });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const user = {
      nombre: document.getElementById('regName').value,
      email: document.getElementById('regEmail').value,
      password: document.getElementById('regPassword').value,
      rol: document.getElementById('regRole').value
    };
    localStorage.setItem('usuarioCareMatch', JSON.stringify(user));
    document.getElementById('authMsg').textContent = 'Usuario registrado correctamente. Ahora puedes iniciar sesión.';
    registerForm.reset();
  });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const user = JSON.parse(localStorage.getItem('usuarioCareMatch'));

    if (!user) {
      document.getElementById('authMsg').textContent = 'Primero debes crear una cuenta.';
      return;
    }

    if (user.email === email && user.password === password) {
      localStorage.setItem('sesionCareMatch', 'activa');
      document.getElementById('authMsg').textContent = `Bienvenido/a ${user.nombre}. Sesión iniciada como ${user.rol}.`;
      loginForm.reset();
    } else {
      document.getElementById('authMsg').textContent = 'Correo o contraseña incorrectos.';
    }
  });
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('sesionCareMatch');
    document.getElementById('authMsg').textContent = 'Sesión cerrada correctamente.';
  });
}
