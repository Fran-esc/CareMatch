const API_BASE_URL = 'http://localhost:8000/api';

// Datos locales de fallback
const localData = {
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

// Obtener datos de proveedores del backend
async function getProviders(tipo) {
  try {
    const response = await fetch(`${API_BASE_URL}/proveedores/?tipo=${tipo}`);
    if (response.ok) {
      const data = await response.json();
      return data.map(item => ({
        id: item.id,
        nombre: item.nombre,
        comuna: item.comuna,
        filtro: item.especialidad,
        exp: item.experiencia,
        img: item.imagen
      }));
    }
  } catch (error) {
    console.log('Backend no disponible, usando datos locales');
  }
  return localData[tipo] || [];
}

function renderCards(tipo) {
  const container = document.getElementById('cardsContainer');
  const searchInput = document.getElementById('searchInput');
  const filterSelect = document.getElementById('filterSelect');

  async function paint() {
    const text = searchInput.value.toLowerCase().trim();
    const filter = filterSelect.value;
    
    const data = await getProviders(tipo);

    const results = data.filter(item => {
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

// Manejo de formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const contacto = {
      nombre: document.getElementById('nombreContacto').value,
      telefono: document.getElementById('telefonoContacto').value,
      correo: document.getElementById('correoContacto').value,
      mensaje: document.getElementById('mensajeContacto').value,
      fecha: new Date().toLocaleString()
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}/contactos/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contacto)
      });

      if (response.ok) {
        document.getElementById('contactMsg').textContent = 'Mensaje enviado correctamente. Nos contactaremos a la brevedad.';
        contactForm.reset();
      }
    } catch (error) {
      // Fallback a localStorage
      const contactos = JSON.parse(localStorage.getItem('contactosCareMatch')) || [];
      contactos.push(contacto);
      localStorage.setItem('contactosCareMatch', JSON.stringify(contactos));
      document.getElementById('contactMsg').textContent = 'Mensaje enviado correctamente. Nos contactaremos a la brevedad.';
      contactForm.reset();
    }
  });
}

// Manejo de autenticación
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

if (showRegister) {
  showRegister.addEventListener('click', () => {
    registerForm.classList.toggle('hidden');
    loginForm.classList.toggle('hidden');
  });
}

if (showLogin) {
  showLogin.addEventListener('click', () => {
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
  });
}

if (registerForm) {
  registerForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const user = {
      nombre: document.getElementById('regName').value,
      email: document.getElementById('regEmail').value,
      password: document.getElementById('regPassword').value,
      rol: document.getElementById('regRole').value
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/registro/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      
      if (response.ok) {
        document.getElementById('authMsg').textContent = 'Usuario registrado correctamente. Ahora puedes iniciar sesión.';
        registerForm.reset();
      }
    } catch (error) {
      localStorage.setItem('usuarioCareMatch', JSON.stringify(user));
      document.getElementById('authMsg').textContent = 'Usuario registrado correctamente. Ahora puedes iniciar sesión.';
      registerForm.reset();
    }
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        document.getElementById('authMsg').textContent = `Bienvenido/a ${data.user.first_name} ${data.user.last_name}. Sesión iniciada.`;
        loginForm.reset();
      } else {
        document.getElementById('authMsg').textContent = 'Usuario o contraseña incorrectos.';
      }
    } catch (error) {
      // Fallback a localStorage
      const user = JSON.parse(localStorage.getItem('usuarioCareMatch'));
      if (user && user.email === email && user.password === password) {
        localStorage.setItem('sesionCareMatch', 'activa');
        document.getElementById('authMsg').textContent = `Bienvenido/a ${user.nombre}. Sesión iniciada.`;
        loginForm.reset();
      } else {
        document.getElementById('authMsg').textContent = 'Usuario o contraseña incorrectos.';
      }
    }
  });
}
