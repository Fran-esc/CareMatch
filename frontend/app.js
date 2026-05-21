const API_BASE_URL = 'http://localhost:8000/api';

// Datos locales de fallback
const localData = {
  cuidado: [
    { id: 1, nombre: 'María González', comuna: 'Las Condes', filtro: 'mañana', exp: '5 años de experiencia en cuidado domiciliario', img: 'https://randomuser.me/api/portraits/women/65.jpg', avg_rating: 4.8, telefono: '+56 9 8123 4567', rut: '12.345.678-9' },
    { id: 2, nombre: 'Carlos Rivas', comuna: 'Providencia', filtro: 'tarde', exp: 'Cuidador certificado con formación en geriatría', img: 'https://randomuser.me/api/portraits/men/43.jpg', avg_rating: 4.5, telefono: '+56 9 7234 5678', rut: '11.223.344-5' },
    { id: 3, nombre: 'Ana Pérez', comuna: 'Ñuñoa', filtro: 'noche', exp: 'Apoyo en alimentación y movilidad nocturna', img: 'https://randomuser.me/api/portraits/women/44.jpg', avg_rating: 4.7, telefono: '+56 9 8345 6789', rut: '10.987.654-3' },
    { id: 4, nombre: 'Luis Herrera', comuna: 'Santiago', filtro: 'mañana', exp: 'Turnos diarios y fines de semana', img: 'https://randomuser.me/api/portraits/men/76.jpg', avg_rating: 4.6, telefono: '+56 9 7456 7890', rut: '17.654.321-0' },
    { id: 5, nombre: 'Camila Soto', comuna: 'La Florida', filtro: 'tarde', exp: 'Cuidados básicos y compañía en el hogar', img: 'https://randomuser.me/api/portraits/women/12.jpg', avg_rating: 4.9, telefono: '+56 9 8567 8901', rut: '14.321.098-7' },
    { id: 6, nombre: 'Patricia Muñoz', comuna: 'Maipú', filtro: 'noche', exp: 'Cuidado nocturno con control de medicación', img: 'https://randomuser.me/api/portraits/women/28.jpg', avg_rating: 4.4, telefono: '+56 9 9678 9012', rut: '19.876.543-2' }
  ],
  asistencia: [
    { id: 7, nombre: 'Dra. Fernanda Lagos', comuna: 'Las Condes', filtro: 'enfermería', exp: 'Enfermería domiciliaria y control de signos vitales', img: 'https://randomuser.me/api/portraits/women/23.jpg', avg_rating: 4.9, telefono: '+56 9 9123 4567', rut: '13.456.789-0' },
    { id: 8, nombre: 'Tomás Araya', comuna: 'Providencia', filtro: 'kinesiología', exp: 'Kinesiología adulto mayor y rehabilitación', img: 'https://randomuser.me/api/portraits/men/32.jpg', avg_rating: 4.7, telefono: '+56 9 8234 5678', rut: '16.223.344-8' },
    { id: 9, nombre: 'Valentina Vera', comuna: 'Ñuñoa', filtro: 'tens', exp: 'TENS con experiencia clínica y seguimiento personalizado', img: 'https://randomuser.me/api/portraits/women/52.jpg', avg_rating: 4.8, telefono: '+56 9 9345 6789', rut: '15.987.654-1' },
    { id: 10, nombre: 'Jorge Pino', comuna: 'Santiago', filtro: 'enfermería', exp: 'Control de medicamentos y presión arterial', img: 'https://randomuser.me/api/portraits/men/52.jpg', avg_rating: 4.6, telefono: '+56 9 7456 7801', rut: '18.654.321-6' },
    { id: 11, nombre: 'Daniela Torres', comuna: 'Macul', filtro: 'kinesiología', exp: 'Rehabilitación motora y apoyo kinésico', img: 'https://randomuser.me/api/portraits/women/51.jpg', avg_rating: 4.5, telefono: '+56 9 8567 8902', rut: '12.321.098-3' },
    { id: 12, nombre: 'Ricardo Fuentes', comuna: 'La Reina', filtro: 'tens', exp: 'Apoyo postoperatorio y manejo de dolor', img: 'https://randomuser.me/api/portraits/men/83.jpg', avg_rating: 4.7, telefono: '+56 9 9678 9013', rut: '11.876.543-9' }
  ],
  acompanamiento: [
    { id: 13, nombre: 'Sofía Morales', comuna: 'Las Condes', filtro: 'trámites', exp: 'Acompañamiento a bancos, compras y gestiones', img: 'https://randomuser.me/api/portraits/women/35.jpg', avg_rating: 4.8, telefono: '+56 9 8123 8765', rut: '19.234.567-1' },
    { id: 14, nombre: 'Pedro Castillo', comuna: 'Providencia', filtro: 'paseos', exp: 'Paseos y actividades recreativas al aire libre', img: 'https://randomuser.me/api/portraits/men/63.jpg', avg_rating: 4.6, telefono: '+56 9 7234 8765', rut: '18.223.344-2' },
    { id: 15, nombre: 'Elena Figueroa', comuna: 'Ñuñoa', filtro: 'controles', exp: 'Acompañamiento a controles médicos y exámenes', img: 'https://randomuser.me/api/portraits/women/73.jpg', avg_rating: 4.7, telefono: '+56 9 8345 8765', rut: '17.987.654-4' },
    { id: 16, nombre: 'Marco Díaz', comuna: 'Santiago', filtro: 'trámites', exp: 'Gestiones y apoyo diario para adultos mayores', img: 'https://randomuser.me/api/portraits/men/84.jpg', avg_rating: 4.5, telefono: '+56 9 7456 8765', rut: '16.654.321-7' },
    { id: 17, nombre: 'Rocío Medina', comuna: 'Maipú', filtro: 'paseos', exp: 'Compañía y conversación en paseos y actividades', img: 'https://randomuser.me/api/portraits/women/57.jpg', avg_rating: 4.9, telefono: '+56 9 8567 8765', rut: '15.321.098-5' },
    { id: 18, nombre: 'Héctor Salas', comuna: 'La Florida', filtro: 'controles', exp: 'Traslado y espera en consultas médicas', img: 'https://randomuser.me/api/portraits/men/24.jpg', avg_rating: 4.6, telefono: '+56 9 9678 8765', rut: '14.876.543-8' }
  ]
};

// Obtener datos de proveedores del backend
async function getProviders(tipo) {
  try {
    const response = await fetch(`${API_BASE_URL}/proveedores/?tipo=${tipo}`);
    if (response.ok) {
      const data = await response.json();
      try {
        return data.map(item => ({
          id: item.id,
          nombre: item.nombre,
          comuna: item.comuna,
          filtro: item.especialidad,
          exp: item.experiencia,
          img: item.imagen,
          avg_rating: Number(item.avg_rating) || 0,
          telefono: (item.usuario && (item.usuario.telefono || (item.usuario.perfil && item.usuario.perfil.telefono))) || '',
          rut: (item.usuario && (item.usuario.rut || item.usuario.username)) || ''
        }));
      } catch (mapErr) {
        console.error('Error mapeando proveedores recibidos:', mapErr, data);
        // Fall back to local data if mapping fails
        console.log('Usando datos locales por error de mapeo');
      }
    } else {
      console.warn('Respuesta no OK de proveedores:', response.status);
    }
  } catch (error) {
    console.log('Error al conectar con backend de proveedores:', error);
  }
  
  let results = [...(localData[tipo] || [])];
  
  const tipoToRol = {
    'cuidado': 'cuidador',
    'asistencia': 'profesional',
    'acompanamiento': 'acompañante'
  };

  const users = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
  
  users.forEach(user => {
    if (user.rol === tipoToRol[tipo]) {
      results.push({
        id: user.id || Date.now() + Math.floor(Math.random()*1000),
        nombre: user.nombre,
        comuna: 'Sin comuna',
        filtro: user.profesion || 'General',
        exp: user.experiencia || 'No especificada',
        img: user.foto || 'img/Logo.png',
        telefono: user.telefono || '',
        rut: user.rut || user.username || ''
      });
    }
  });

  // Ensure avg_rating exists for local fallbacks
  results = results.map(r => ({ ...r, avg_rating: r.avg_rating ? Number(r.avg_rating) : 0 }));

  return results;
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
      ? (function(){
          // Ordenar por calificación promedio (mayor a menor)
          results.sort((a,b) => (b.avg_rating || 0) - (a.avg_rating || 0));
          return results.map(item => `
            <article class="person-card" data-id="${item.id}">
              <img src="${item.img}" alt="${item.nombre}">
              <h3>${item.nombre}</h3>
              <p>${item.comuna}</p>
              <p>${item.exp}</p>
              <div class="rating">${renderStars(item.avg_rating)} <small>(${(item.avg_rating||0).toFixed(1)})</small></div>
              <span class="badge">${item.filtro}</span>
              <button class="btn-primary" onclick="reservarServicio(${item.id}, '${item.nombre.replace(/'/g, "\\'").replace(/"/g, '\\"')}', '${tipo}', '${(item.rut || 'No disponible').replace(/'/g, "\\'").replace(/"/g, '\\"')}', '${(item.telefono || 'No disponible').replace(/'/g, "\\'").replace(/"/g, '\\"')}')">Contratar servicio</button>
              <div class="recent-eval" id="eval-${item.id}"></div>
            </article>
          `).join('');
        })()
      : '<p>No se encontraron resultados con esos filtros.</p>';

    // Cargar evaluaciones recientes para cada proveedor mostrado
    (async () => {
      for (const item of results) {
        const containerEval = document.getElementById(`eval-${item.id}`);
        if (!containerEval) continue;
        const evals = await showProviderEvaluations(item.id);
        if (evals.length > 0) {
          const e = evals[0];
          containerEval.innerHTML = `<p class="eval-comment">"${e.comentario || 'Sin comentario'}" — <strong>${e.usuario_nombre}</strong> (${e.calificacion}★)</p>`;
        } else {
          containerEval.innerHTML = `<p class="eval-comment">Aún sin evaluaciones</p>`;
        }
      }
    })();
  }

  searchInput.addEventListener('input', paint);
  filterSelect.addEventListener('change', paint);
  paint();
}

function reservarServicio(id, nombre, tipo, rut = 'No disponible', telefono = 'No disponible') {
  const userId = localStorage.getItem('userId');
  const sesion = localStorage.getItem('sesionCareMatch');
  
  if (!userId && !sesion) {
    alert('Debes iniciar sesión antes de contratar un servicio. Redirigiendo a login...');
    window.location.href = 'login.html';
    return;
  }
  
  const booking = {
    proveedorId: id,
    proveedorNombre: nombre,
    proveedorRut: rut,
    proveedorTelefono: telefono,
    tipo,
    monto: getServiceAmount(tipo),
    fecha_solicitud: new Date().toISOString()
  };
  localStorage.setItem('bookingCareMatch', JSON.stringify(booking));
  window.location.href = 'booking.html';
}

// --- Messages (local inbox) ---
function getMessages() {
  return JSON.parse(localStorage.getItem('mensajesInbox')) || [];
}

function addMessage(msg) {
  const all = getMessages();
  all.unshift(msg);
  localStorage.setItem('mensajesInbox', JSON.stringify(all));
}

function renderMessagesPage() {
  const container = document.getElementById('messagesContainer');
  const msgs = getMessages();
  if (!container) return;
  if (!msgs.length) {
    container.innerHTML = '<p>No hay mensajes.</p>';
    return;
  }
  container.innerHTML = msgs.map(m => `
    <article class="message-item">
      <div class="message-meta"><strong>${m.title || 'Mensaje'}</strong> — <small>${new Date(m.date).toLocaleString()}</small></div>
      <div class="message-body">${m.preview || m.text || ''}</div>
      ${m.type === 'contrato' ? `<div style="margin-top:8px;"><button class="btn-primary" onclick="(function(){ window.showContractFromMessage('${m.id}') })()">Ver contrato</button></div>` : ''}
    </article>
  `).join('');
}

window.showContractFromMessage = function(messageId) {
  const msgs = getMessages();
  const m = msgs.find(x => x.id === messageId);
  if (!m) return alert('Mensaje no encontrado');
  if (m.contract) {
    const printWindow = window.open('', '_blank', 'width=900,height=1100');
    if (!printWindow) return alert('Permite popups para imprimir el contrato.');
    const contract = m.contract;
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Contrato - ${contract.orderId || ''}</title><link rel="stylesheet" href="styles.css"></head><body>` +
      `<div style="position:absolute; right:40px; top:30px; opacity:0.12; font-size:72px; color:#006178; font-weight:900">CareMatch</div>` +
      `<div style="padding:40px">` +
      `<h1 style="color:#006178; text-align:center">CONTRATO DE PRESTACIÓN DE SERVICIOS</h1>` +
      `<h3 style="text-align:center; margin-top:6px;">CUIDADO DE ADULTO MAYOR - CAREMATCH</h3>` +
      `<pre style="white-space:pre-wrap; font-family:inherit;">${m.contract.fullText || m.contract.descripcion || ''}</pre>` +
      `<div style="margin-top:40px; display:flex; gap:20px; justify-content:space-between"><div>Firma Contratante<br><br>RUT: ____________</div><div>Firma Contratado/a<br><br>RUT: ____________</div><div>Firma Adulto Mayor/Rep.<br><br>RUT: ____________</div></div>` +
      `</div></body></html>`;
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(()=>{ printWindow.print(); }, 500);
  }
}

function getServiceAmount(tipo) {
  const amounts = {
    cuidado: 45000,
    asistencia: 55000,
    acompanamiento: 35000
  };
  return amounts[tipo] || 40000;
}

function formatCurrency(amount) {
  return amount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}

function renderStars(avg) {
  const n = Math.round(Number(avg) || 0);
  let s = '';
  for (let i = 0; i < 5; i++) {
    s += i < n ? '★' : '☆';
  }
  return `<span class="stars">${s}</span>`;
}

let selectedSchedule = null;

function initBookingPage() {
  const userId = localStorage.getItem('userId');
  const sesion = localStorage.getItem('sesionCareMatch');
  
  if (!userId && !sesion) {
    const bookingSummary = document.getElementById('bookingSummary');
    if (bookingSummary) {
      bookingSummary.innerHTML = '<p style="color: red;">Debes iniciar sesión para acceder a esta página. <a href="login.html">Ir a login</a></p>';
    }
    document.getElementById('continuePaymentBtn').disabled = true;
    return;
  }
  
  const booking = JSON.parse(localStorage.getItem('bookingCareMatch')) || null;
  const bookingSummary = document.getElementById('bookingSummary');
  const scheduleContainer = document.getElementById('scheduleContainer');
  const continueBtn = document.getElementById('continuePaymentBtn');
  const bookingMsg = document.getElementById('bookingMsg');

  if (!booking || !booking.proveedorNombre) {
    bookingSummary.innerHTML = '<p>No se encontró una reserva activa. Regresa a servicios para seleccionar un proveedor.</p>';
    continueBtn.disabled = true;
    return;
  }

  bookingSummary.innerHTML = `
    <div class="booking-info">
      <h2>${booking.proveedorNombre}</h2>
      <p>Servicio: <strong>${booking.tipo}</strong></p>
      <p>Precio estimado: <strong>${formatCurrency(booking.monto)}</strong></p>
      <p class="booking-help">Selecciona un horario disponible en el calendario.</p>
    </div>
  `;

  scheduleContainer.innerHTML = '';
  const slots = generateAvailableCalendar(booking.tipo);
  slots.forEach(day => {
    const dayCard = document.createElement('article');
    dayCard.className = 'day-card';
    dayCard.innerHTML = `
      <h3>${day.label}</h3>
      <div class="slots-row"></div>
    `;
    const row = dayCard.querySelector('.slots-row');
    day.times.forEach(slot => {
      const slotButton = document.createElement('button');
      slotButton.type = 'button';
      slotButton.className = 'time-slot';
      slotButton.textContent = slot.label;
      slotButton.addEventListener('click', () => selectScheduleSlot(slot, slotButton, bookingMsg, continueBtn));
      row.appendChild(slotButton);
    });
    scheduleContainer.appendChild(dayCard);
  });

  continueBtn.addEventListener('click', continueToPayment);
}

function generateAvailableCalendar(tipo) {
  const timeOptions = {
    cuidado: ['08:00', '10:00', '14:00', '16:00'],
    asistencia: ['09:00', '11:00', '15:00', '17:00'],
    acompanamiento: ['10:00', '12:00', '16:00', '18:00']
  };
  const baseDate = new Date();
  baseDate.setHours(0, 0, 0, 0);
  const days = [];

  for (let i = 1; i <= 5; i++) {
    const current = new Date(baseDate);
    current.setDate(current.getDate() + i);
    const label = current.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'short' });
    const times = timeOptions[tipo] || ['09:00', '12:00', '15:00'];
    days.push({
      label: label.charAt(0).toUpperCase() + label.slice(1),
      times: times.map(time => ({
        label: time,
        value: `${current.getFullYear()}-${String(current.getMonth()+1).padStart(2,'0')}-${String(current.getDate()).padStart(2,'0')}T${time}:00`
      }))
    });
  }

  return days;
}

function selectScheduleSlot(slot, button, bookingMsg, continueBtn) {
  selectedSchedule = slot;
  document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('selected'));
  button.classList.add('selected');
  bookingMsg.textContent = `Horario seleccionado: ${slot.label} el ${slot.value.slice(0, 10)}`;
  continueBtn.disabled = false;
}

function continueToPayment() {
  if (!selectedSchedule) {
    return;
  }

  const booking = JSON.parse(localStorage.getItem('bookingCareMatch')) || {};
  booking.fecha_requerida = selectedSchedule.value;
  booking.horario = selectedSchedule.label;
  booking.orderId = `CM-${Math.floor(Math.random() * 900000) + 100000}`;
  localStorage.setItem('bookingCareMatch', JSON.stringify(booking));
  window.location.href = 'webpay.html';
}

async function initWebpayPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const paymentStatus = urlParams.get('payment');
  const returnBtn = document.getElementById('returnServicesBtn');
  const paymentMessage = document.getElementById('paymentMessage');
  const paymentSummary = document.getElementById('paymentSummary');
  const webpayLoading = document.getElementById('webpayLoading');

  if (paymentStatus) {
    // Return from Transbank
    if (webpayLoading) webpayLoading.classList.add('hidden');
    if (returnBtn) returnBtn.classList.remove('hidden');

    if (paymentStatus === 'success') {
      const order = urlParams.get('order');
      paymentMessage.textContent = '¡Pago aprobado! El servicio ha quedado contratado. Orden: ' + order;
      paymentMessage.classList.add('success');
      const booking = JSON.parse(localStorage.getItem('bookingCareMatch'));
      const userId = localStorage.getItem('userId');
      if (booking && userId) {
        await createSolicitudOnBackend(booking, userId);
        // Do not add contract directly to reservations list. Instead, send contract to messages inbox.
        const contractObj = {
          orderId: order || booking.orderId || `C-${Date.now()}`,
          tipo: booking.tipo,
          proveedorNombre: booking.proveedorNombre,
          proveedorRut: booking.proveedorRut || 'No disponible',
          proveedorTelefono: booking.proveedorTelefono || 'No disponible',
          fechaContratacion: booking.fecha_solicitud || new Date().toISOString(),
          fechaServicio: booking.fecha_requerida || null,
          monto: booking.monto,
          estado: 'Confirmado',
          descripcion: `Contrato de servicio ${booking.tipo} con ${booking.proveedorNombre}`,
          fullText: `CONTRATO DE PRESTACIÓN DE SERVICIOS\nCUIDADO DE ADULTO MAYOR - CAREMATCH\n\nContrato: ${booking.tipo} con ${booking.proveedorNombre}`
        };

        addMessage({
          id: 'm-' + Date.now() + '-' + Math.floor(Math.random()*1000),
          type: 'contrato',
          title: `Contrato ${contractObj.orderId}`,
          date: new Date().toISOString(),
          preview: `Contrato generado: ${contractObj.tipo} - ${contractObj.proveedorNombre}`,
          contract: contractObj
        });
        saveContractToHistory(contractObj);
      }
      localStorage.removeItem('bookingCareMatch');
    } else if (paymentStatus === 'failed') {
      paymentMessage.textContent = 'El pago fue rechazado. Por favor intenta nuevamente.';
      paymentMessage.classList.remove('success');
    } else if (paymentStatus === 'aborted') {
      paymentMessage.textContent = 'El pago fue cancelado.';
      paymentMessage.classList.remove('success');
    } else {
      paymentMessage.textContent = 'Ocurrió un error con el pago.';
      paymentMessage.classList.remove('success');
    }
    
    if (returnBtn) returnBtn.addEventListener('click', () => window.location.href = 'servicios.html');
    return;
  }

  // Not returning from Transbank, let's initiate it.
  const userId = localStorage.getItem('userId');
  const sesion = localStorage.getItem('sesionCareMatch');
  
  if (!userId && !sesion) {
    if (paymentSummary) {
      paymentSummary.innerHTML = '<p style="color: red;">Debes iniciar sesión para acceder a esta página. <a href="login.html">Ir a login</a></p>';
    }
    if (webpayLoading) webpayLoading.classList.add('hidden');
    return;
  }
  
  const booking = JSON.parse(localStorage.getItem('bookingCareMatch')) || null;

  if (!booking || !booking.proveedorNombre || !booking.fecha_requerida) {
    paymentSummary.innerHTML = '<p>No hay una reserva registrada. Regresa a servicios para seleccionar un horario.</p>';
    if (webpayLoading) webpayLoading.classList.add('hidden');
    return;
  }

  paymentSummary.innerHTML = `
    <div class="payment-summary-item"><strong>Proveedor:</strong> ${booking.proveedorNombre}</div>
    <div class="payment-summary-item"><strong>Servicio:</strong> ${booking.tipo}</div>
    <div class="payment-summary-item"><strong>Horario:</strong> ${booking.horario} - ${booking.fecha_requerida.slice(0, 10)}</div>
    <div class="payment-summary-item"><strong>Monto:</strong> ${formatCurrency(booking.monto)}</div>
    <div class="payment-summary-item"><strong>Orden:</strong> ${booking.orderId}</div>
  `;

  if (returnBtn) returnBtn.addEventListener('click', () => window.location.href = 'servicios.html');

  startTransbankTransaction(booking, userId);
}

async function startTransbankTransaction(booking, userId) {
  const paymentMessage = document.getElementById('paymentMessage');
  const webpayLoading = document.getElementById('webpayLoading');
  const returnBtn = document.getElementById('returnServicesBtn');

  try {
    const response = await fetch(`${API_BASE_URL}/pagos/crear/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        monto: booking.monto,
        session_id: 'user_' + (userId || '1'),
        buy_order: booking.orderId,
        usuario_id: Number(userId),
        proveedor_id: Number(booking.proveedorId),
        descripcion: `Reserva de servicio ${booking.tipo} con ${booking.proveedorNombre}`,
        fecha_requerida: booking.fecha_requerida
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.url && data.token) {
        if (data.url.includes('webpay_simulator.html')) {
          const simulatorUrl = `${data.url}?token=${encodeURIComponent(data.token)}&order=${encodeURIComponent(booking.orderId)}&amount=${encodeURIComponent(booking.monto)}`;
          window.location.href = simulatorUrl;
          return;
        }

        const tbForm = document.getElementById('transbankForm');
        tbForm.action = data.url;
        document.getElementById('token_ws').value = data.token;
        tbForm.submit();
      } else {
        throw new Error('Respuesta inválida de Transbank');
      }
    } else {
      throw new Error('Error al conectar con el backend de pagos');
    }
  } catch (error) {
    if (webpayLoading) webpayLoading.classList.add('hidden');
    paymentMessage.textContent = 'Error al iniciar el pago. Asegúrate de que el backend esté en ejecución.';
    if (returnBtn) returnBtn.classList.remove('hidden');
  }
}

async function createSolicitudOnBackend(booking, userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/solicitudes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario_id: Number(userId),
        proveedor_id: Number(booking.proveedorId),
        descripcion: `Reserva de servicio ${booking.tipo} con ${booking.proveedorNombre}`,
        fecha_requerida: booking.fecha_requerida
      })
    });

    return response.ok;
  } catch (error) {
    return false;
  }
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
    const nombre = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const user = {
      username: email,
      nombre,
      email,
      password: document.getElementById('regPassword').value,
      rol: document.getElementById('regRole').value,
      id: Date.now()
    };
    
    const users = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    const existingIdx = users.findIndex(u => u.email === email);
    if (existingIdx >= 0) {
      users[existingIdx] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem('usuariosRegistrados', JSON.stringify(users));

    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/registro/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      
      if (response.ok) {
        const savedUser = await response.json();
        const localUser = { ...user, id: savedUser.id || user.id };
        localStorage.setItem('usuarioCareMatch', JSON.stringify(localUser));
        localStorage.setItem('usuariosRegistrados', JSON.stringify(users));

        document.getElementById('authMsg').textContent = 'Usuario registrado correctamente. Ahora puedes iniciar sesión.';
        registerForm.reset();
        // Automatically switch back to login form
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
      } else {
        const errorData = await response.json();
        let errorMsg = 'Error al registrar usuario.';
        if (errorData.username) errorMsg = 'Ese correo ya está registrado.';
        else if (errorData.email) errorMsg = 'Correo inválido o ya registrado.';
        else if (errorData.detail) errorMsg = errorData.detail;
        else errorMsg = 'Error: ' + JSON.stringify(errorData);
        
        document.getElementById('authMsg').textContent = errorMsg;
      }
    } catch (error) {
      localStorage.setItem('usuarioCareMatch', JSON.stringify(user));
      document.getElementById('authMsg').textContent = 'Usuario registrado correctamente. Ahora puedes iniciar sesión.';
      registerForm.reset();
    }
  });
}

if (loginForm) {
  loginForm.dataset.loginHandlerInstalled = '1';
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, email, password })
      });

      const authMsg = document.getElementById('authMsg');
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('sesionCareMatch', 'activa');
        
        // Ensure frontend expected fields are present
        const userData = data.user;
        userData.nombre = userData.nombre || `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.username;
        localStorage.setItem('usuarioCareMatch', JSON.stringify(userData));

        if (authMsg) {
          authMsg.className = 'success-msg';
          authMsg.textContent = `Bienvenido/a ${userData.nombre}. Sesión iniciada. Redirigiendo...`;
        }
        loginForm.reset();
        setTimeout(() => {
          window.location.href = 'profile.html';
        }, 1000);
      } else {
        const errorData = await response.json().catch(() => null);
        const serverMessage = errorData?.error || errorData?.detail || 'Usuario o contraseña incorrectos.';
        const users = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
        const user = users.find(u => u.email === email && u.password === password) || JSON.parse(localStorage.getItem('usuarioCareMatch'));
        if (user && user.email === email && user.password === password) {
          localStorage.setItem('sesionCareMatch', 'activa');
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userId', user.id || '1');
          localStorage.setItem('usuarioCareMatch', JSON.stringify(user));
          if (authMsg) {
            authMsg.className = 'success-msg';
            authMsg.textContent = `Bienvenido/a ${user.nombre}. Sesión iniciada. Redirigiendo...`;
          }
          setTimeout(() => {
            window.location.href = 'profile.html';
          }, 1000);
        } else {
          if (authMsg) {
            authMsg.className = 'error-msg';
            authMsg.textContent = serverMessage;
          }
        }
      }
    } catch (error) {
      const users = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
      const user = users.find(u => u.email === email && u.password === password) || JSON.parse(localStorage.getItem('usuarioCareMatch'));
      
      if (user && user.email === email && user.password === password) {
        localStorage.setItem('sesionCareMatch', 'activa');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userId', user.id || '1');
        localStorage.setItem('usuarioCareMatch', JSON.stringify(user));
        if (authMsg) {
          authMsg.className = 'success-msg';
          authMsg.textContent = `Bienvenido/a ${user.nombre}. Sesión iniciada. Redirigiendo...`;
        }
        setTimeout(() => {
          window.location.href = 'profile.html';
        }, 1000);
      } else {
        if (authMsg) {
          authMsg.className = 'error-msg';
          authMsg.textContent = 'No se pudo conectar con el backend y las credenciales no coinciden con el usuario local.';
        }
      }
    }
  });
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('sesionCareMatch');
    document.getElementById('authMsg').textContent = 'Sesión cerrada correctamente.';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  });
}

// Navbar dynamic link
function updateNavbar() {
  const sesion = localStorage.getItem('sesionCareMatch');
  const token = localStorage.getItem('token');
  const nav = document.querySelector('header.navbar nav');
  if (!nav) return;

  // Ensure base links exist
  const ensureLink = (href, text, cls) => {
    let a = nav.querySelector(`a[href="${href}"]`);
    if (!a) {
      a = document.createElement('a');
      a.href = href;
      a.textContent = text;
      if (cls) a.className = cls;
      nav.appendChild(a);
    }
    return a;
  };

  // Hide any extra links initially: messages and profile
  const profileLink = nav.querySelector('a[href="profile.html"]');
  const messagesLink = nav.querySelector('a[href="messages.html"]');
  const loginBtn = nav.querySelector('.btn-login');

  if (!(sesion === 'activa' || token)) {
    // Not authenticated: show Inicio, Servicios, Contacto, Iniciar sesión
    if (profileLink) profileLink.classList.add('hidden');
    if (messagesLink) messagesLink.classList.add('hidden');
    if (loginBtn) loginBtn.classList.remove('hidden');
  } else {
    // Authenticated: show Inicio, Servicios, Contacto, Mensajes, Mi Perfil (green)
    if (loginBtn) loginBtn.classList.add('hidden');
    let msg = messagesLink;
    if (!msg) {
      msg = document.createElement('a');
      msg.href = 'messages.html';
      msg.textContent = 'Mensajes';
      nav.appendChild(msg);
    }
    msg.classList.remove('hidden');

    let prof = profileLink;
    if (!prof) {
      prof = document.createElement('a');
      prof.href = 'profile.html';
      prof.textContent = 'Mi Perfil';
      nav.appendChild(prof);
    }
    prof.classList.remove('hidden');
    prof.classList.add('nav-profile-green');

    // Add logout button if not present
    let logoutBtn = nav.querySelector('button.logout-nav-btn');
    if (!logoutBtn) {
      logoutBtn = document.createElement('button');
      logoutBtn.textContent = 'Cerrar sesión';
      logoutBtn.className = 'btn-primary logout-nav-btn';
      logoutBtn.style.marginLeft = '10px';
      logoutBtn.onclick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('sesionCareMatch');
        alert('Sesión cerrada correctamente.');
        window.location.href = 'index.html';
      };
      nav.appendChild(logoutBtn);
    }
  }
}

document.addEventListener("DOMContentLoaded", updateNavbar);


const profileForm = document.getElementById('profileForm');
if (profileForm) {
  const profileMsg = document.getElementById('profileMsg');
  const imgPreview = document.getElementById('profileImagePreview');
  const inputFoto = document.getElementById('profileFoto');

  async function loadPerfil() {
    const userEmail = localStorage.getItem('userEmail');
    const sesion = localStorage.getItem('sesionCareMatch');
    const token = localStorage.getItem('token');

    if (!userEmail && !sesion && !token) {
      profileMsg.textContent = 'Debes iniciar sesión antes de acceder a tu perfil.';
      return;
    }

    // Try localStorage first for pure frontend fallback if no backend is running
    const localUser = JSON.parse(localStorage.getItem('usuarioCareMatch'));
    let dataToUse = localUser || {};

    try {
      if (token || userEmail) {
        const response = await fetch(`${API_BASE_URL}/usuarios/perfil/?username=${encodeURIComponent(userEmail)}`);
        if (response.ok) {
          const data = await response.json();
          // Merge local picture with backend data
          dataToUse = { ...data, foto: localUser?.foto || null, rol: data.rol || localUser?.rol || 'solicitante', telefono: data.telefono || localUser?.telefono || '' };
          dataToUse.nombre = `${data.first_name || ''} ${data.last_name || ''}`.trim() || localUser?.nombre;
        }
      }
    } catch (error) {
      console.log('Usando datos de fallback locales para perfil.');
    }

    document.getElementById('profileName').value = dataToUse.nombre || '';
    document.getElementById('profileEmail').value = dataToUse.email || userEmail || '';

    if (dataToUse.foto && imgPreview) {
      imgPreview.src = dataToUse.foto;
    }

    const rol = dataToUse.rol || 'solicitante';
    
    const fieldTelefono = document.getElementById('fieldTelefono');
    const fieldEdad = document.getElementById('fieldEdad');
    const fieldCondicion = document.getElementById('fieldCondicion');
    const fieldCertificado = document.getElementById('fieldCertificado');
    const fieldRut = document.getElementById('fieldRut');
    const adminDashboard = document.getElementById('adminDashboard');
    const myServicesBox = document.getElementById('myServicesBox');
    const toggleMyServicesBtn = document.getElementById('toggleMyServicesBtn');

    if (fieldTelefono) fieldTelefono.classList.add('hidden');
    if (fieldEdad) fieldEdad.classList.add('hidden');
    if (fieldCondicion) fieldCondicion.classList.add('hidden');
    if (fieldCertificado) fieldCertificado.classList.add('hidden');
    if (fieldRut) fieldRut.classList.add('hidden');
    if (adminDashboard) adminDashboard.classList.add('hidden');
    if (myServicesBox) myServicesBox.classList.add('hidden');
    if (toggleMyServicesBtn) toggleMyServicesBtn.classList.add('hidden');

    if (rol === 'cuidador' || rol === 'acompañante') {
      if (fieldTelefono) fieldTelefono.classList.remove('hidden');
      if (document.getElementById('profileTelefono')) document.getElementById('profileTelefono').value = dataToUse.telefono || '';
    } else if (rol === 'profesional') {
      if (fieldTelefono) fieldTelefono.classList.remove('hidden');
      if (fieldCertificado) fieldCertificado.classList.remove('hidden');
      if (document.getElementById('profileTelefono')) document.getElementById('profileTelefono').value = dataToUse.telefono || '';
      
      const statusMsg = document.getElementById('certificadoStatusMsg');
      if (statusMsg) {
        statusMsg.classList.remove('hidden');
        if (dataToUse.certificadoEstado === 'aprobado') {
          statusMsg.textContent = 'Estado de certificado: Aprobado';
          statusMsg.style.color = '#147a20';
        } else if (dataToUse.certificadoEstado === 'rechazado') {
          statusMsg.textContent = 'Estado de certificado: Rechazado';
          statusMsg.style.color = '#d9534f';
        } else if (dataToUse.certificadoNombre) {
          statusMsg.textContent = 'Estado de certificado: Pendiente de revisión';
          statusMsg.style.color = '#e67e22';
        } else {
          statusMsg.textContent = 'Estado de certificado: No subido';
          statusMsg.style.color = '#536a71';
        }
      }

      const certLink = document.getElementById('profileCertificadoLink');
      if (certLink && dataToUse.certificadoNombre) {
        certLink.classList.remove('hidden');
        certLink.textContent = `Ver certificado: ${dataToUse.certificadoNombre}`;
      }
    } else if (rol === 'solicitante') {
      if (fieldEdad) fieldEdad.classList.remove('hidden');
      if (fieldCondicion) fieldCondicion.classList.remove('hidden');
      if (document.getElementById('profileEdad')) document.getElementById('profileEdad').value = dataToUse.edad || '';
      if (document.getElementById('profileCondicion')) document.getElementById('profileCondicion').value = dataToUse.condicion || '';
      if (toggleMyServicesBtn) {
        toggleMyServicesBtn.classList.remove('hidden');
        toggleMyServicesBtn.addEventListener('click', toggleMyServicesSection);
      }
      if (myServicesBox) {
        myServicesBox.classList.add('hidden');
        renderSolicitanteServices();
      }
    } else if (rol === 'administrador') {
      if (fieldRut) fieldRut.classList.remove('hidden');
      if (document.getElementById('profileRut')) document.getElementById('profileRut').value = dataToUse.rut || '';
      if (adminDashboard) {
        adminDashboard.classList.remove('hidden');
        window.loadAdminDashboard();
      }
    }
  }

  if (inputFoto) {
    inputFoto.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          if (imgPreview) imgPreview.src = evt.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  function getSolicitanteContracts() {
    return JSON.parse(localStorage.getItem('serviciosContratados')) || [];
  }

  function saveContractToHistory(contract) {
    const current = getSolicitanteContracts();
    if (!current.some(item => item.orderId === contract.orderId)) {
      current.unshift(contract);
      localStorage.setItem('serviciosContratados', JSON.stringify(current));

      const localUser = JSON.parse(localStorage.getItem('usuarioCareMatch')) || {};
      localUser.serviciosContratados = current;
      localStorage.setItem('usuarioCareMatch', JSON.stringify(localUser));

      const users = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
      const idx = users.findIndex(u => u.email === localUser.email);
      if (idx >= 0) {
        users[idx].serviciosContratados = current;
        localStorage.setItem('usuariosRegistrados', JSON.stringify(users));
      }
    }
  }

  function renderSolicitanteServices() {
    const list = document.getElementById('myServicesList');
    if (!list) return;

    // Try to load solicitudes from backend for logged user
    const userId = localStorage.getItem('userId');
    if (userId) {
      (async () => {
        try {
          const resp = await fetch(`${API_BASE_URL}/solicitudes/?usuario_id=${userId}`);
          if (resp.ok) {
            const data = await resp.json();
            if (!data.length) {
              list.innerHTML = `<tr><td colspan="6" style="text-align:center;">No tienes servicios contratados aún.</td></tr>`;
              return;
            }
            list.innerHTML = data.map(s => `
              <tr>
                <td>${s.id}</td>
                <td>${s.proveedor.tipo_servicio || s.proveedor.tipo || 'N/A'}</td>
                <td>${s.proveedor.nombre}</td>
                <td>${s.fecha_requerida ? s.fecha_requerida.replace('T',' ') : s.fecha_solicitud.replace('T',' ')}</td>
                <td>${s.estado}</td>
                <td><button class="btn-primary" type="button" onclick="window.showContractForOrder('${s.id}')">Ver contrato</button></td>
              </tr>
            `).join('');
            return;
          }
        } catch (e) {
          console.log('No se pudieron cargar solicitudes desde backend:', e);
        }

        // Fallback: use local messages/contracts if backend not available
        const contracts = getSolicitanteContracts();
        if (!contracts.length) {
          list.innerHTML = `<tr><td colspan="6" style="text-align:center;">No tienes servicios contratados aún.</td></tr>`;
          return;
        }
        list.innerHTML = contracts.map(contract => `
          <tr>
            <td>${contract.orderId || contract.id || 'N/A'}</td>
            <td>${contract.tipo}</td>
            <td>${contract.proveedorNombre}</td>
            <td>${contract.fechaServicio ? contract.fechaServicio.replace('T', ' ') : contract.fechaContratacion.replace('T', ' ')}</td>
            <td>${contract.estado}</td>
            <td><button class="btn-primary" type="button" onclick="window.showContractDetails('${contract.orderId || contract.id}')">Ver contrato</button></td>
          </tr>
        `).join('');
      })();
      return;
    }

    // If no userId, show empty state
    list.innerHTML = `<tr><td colspan="6" style="text-align:center;">Debes iniciar sesión para ver tus reservas.</td></tr>`;
  }

// show contract for backend order id by searching messages
window.showContractForOrder = function(orderId) {
  // orderId here is solicitud id; messages store contract.orderId as CM-... or similar
  const msgs = getMessages();
  const m = msgs.find(x => x.contract && (String(x.contract.orderId) === String(orderId) || String(x.contract.id) === String(orderId) || String(x.contract.solicitud_id) === String(orderId)));
  if (m) return window.showContractFromMessage(m.id);
  // If not found, show a notice in panel
  const panel = document.getElementById('contractDetailsPanel');
  const details = document.getElementById('contractDetails');
  if (!panel || !details) return alert('Contrato no disponible. Revisa tu bandeja de mensajes.');
  details.innerHTML = `<p>El contrato aún no está disponible en la bandeja de mensajes. Revísala para descargarlo cuando llegue.</p>`;
  panel.classList.remove('hidden');
  panel.scrollIntoView({ behavior: 'smooth' });
}

  window.showContractDetails = function(contractId) {
    const contract = getSolicitanteContracts().find(c => c.orderId === contractId || c.id === contractId);
    const panel = document.getElementById('contractDetailsPanel');
    const details = document.getElementById('contractDetails');
    if (!contract || !panel || !details) return;

    // Build contract document HTML (preview inside profile)
    const contractHTML = `
      <div class="contract-summary">
        <h4>${contract.contratoTitulo || 'CONTRATO DE PRESTACIÓN DE SERVICIOS'}</h4>
        <div class="contract-meta">
          <p><strong>Servicio:</strong> ${contract.tipo}</p>
          <p><strong>Proveedor contratado:</strong> ${contract.proveedorNombre}</p>
          <p><strong>RUT proveedor:</strong> ${contract.proveedorRut || 'No disponible'}</p>
          <p><strong>Teléfono proveedor:</strong> ${contract.proveedorTelefono || 'No disponible'}</p>
          <p><strong>Fecha de contratación:</strong> ${contract.fechaContratacion ? contract.fechaContratacion.replace('T', ' ') : 'No disponible'}</p>
          <p><strong>Fecha del servicio:</strong> ${contract.fechaServicio ? contract.fechaServicio.replace('T', ' ') : 'No disponible'}</p>
          <p><strong>Monto:</strong> ${formatCurrency(contract.monto || 0)}</p>
          <p><strong>Estado:</strong> ${contract.estado}</p>
        </div>
        <hr>
        <div class="contract-body">
          <pre style="white-space: pre-wrap; font-family: inherit;">${`CONTRATO DE PRESTACIÓN DE SERVICIOS\nCUIDADO DE ADULTO MAYOR - CAREMATCH\nDocumento modelo para uso en plataforma web. Complete los datos antes de firmar.\n\nEn ______________________, a ____ de __________________ de 20____, comparecen las partes que se individualizan a continuación y\nacuerdan el presente contrato:\n\nCONTRATANTE: Nombre: ${contract.contratanteNombre || '____________________________________________'} RUT: ${contract.contratanteRut || '____________________________'}\n\nCONTRATADO/A: Nombre: ${contract.proveedorNombre || '____________________________________________'} RUT: ${contract.proveedorRut || '____________________________'}\n\nADULTO MAYOR: Nombre: ${contract.adultoNombre || '____________________________________________'} RUT: ${contract.adultoRut || '____________________________'}\n\nDomicilio/lugar del servicio: ${contract.domicilio || '__________________________________________________________________________'}\n\n1. Objeto. El/la Contratado/a prestará apoyo de cuidado, acompañamiento y asistencia diaria al adulto mayor indicado, incluyendo,\nsegún se acuerde, higiene básica, alimentación, movilidad, compañía, registro de novedades y recordatorio de medicamentos\nprescritos. No comprende diagnósticos, procedimientos invasivos ni actos de salud reservados a profesionales habilitados, salvo\nacreditación y acuerdo escrito.\n\n2. Jornada, lugar y pago. Días y horario: ${contract.jornada || '__________________________________________'}. Lugar: ${contract.lugar || '____________________________________________'}. Honorario/remuneración: ${contract.monto ? formatCurrency(contract.monto) : '____________________________'}, pagadero en forma ${contract.pagoForma || '____________________'}. Gastos extraordinarios sólo serán reembolsados si fueron previamente autorizados por el/la Contratante.\n\n3. Obligaciones del Contratante. Entregar información relevante, indicaciones médicas vigentes, teléfonos de emergencia, insumos\nnecesarios y condiciones seguras para el cuidado; pagar oportunamente; informar cambios relevantes; y tratar al/la Contratado/a\ncon respeto y colaboración.\n\n4. Obligaciones del Contratado/a. Ejecutar el servicio en forma personal, diligente, respetuosa y confidencial; resguardar la dignidad,\nautonomía, seguridad e intimidad del adulto mayor; avisar de inmediato accidentes, emergencias o cambios relevantes; mantener\nregistro básico de novedades; y no delegar funciones sin autorización escrita.\n\n5. Leyes especiales de Chile. Las partes declaran conocer y respetar: Ley 21.719, sobre protección y tratamiento de datos personales,\nespecialmente datos sensibles de salud, bajo principios de finalidad, proporcionalidad, seguridad y confidencialidad; Ley\n20.584, sobre derechos y deberes de las personas en acciones vinculadas a su atención de salud, incluyendo trato digno,\ninformación, consentimiento y reserva; y Ley 21.805, que reconoce el derecho al cuidado, a ser cuidado y al autocuidado,\npromoviendo autonomía, corresponsabilidad, inclusión y prevención de abuso, negligencia o discriminación.\n\n6. Plataforma CareMatch. CareMatch actúa como plataforma web de contacto, registro y apoyo operativo entre usuarios y cuidadores,\npudiendo establecer protocolos de seguridad, verificación y tratamiento de datos. La plataforma no reemplaza la supervisión\nfamiliar, médica ni las obligaciones legales de las partes.\n\n7. Responsabilidad y término. Cualquier parte podrá poner término con aviso escrito de ____ días. El término podrá ser inmediato ante\nmaltrato, negligencia grave, riesgo para el adulto mayor, incumplimiento de pago, falsedad de antecedentes o vulneración de\nconfidencialidad. Si en la práctica se configura subordinación y dependencia, se aplicará la normativa laboral chilena que\ncorresponda.\n\nFirma Contratante\nRUT: __________________\n\nFirma Contratado/a\nRUT: __________________\n\nFirma Adulto Mayor/Rep.\nRUT: ______`}</pre>
        </div>
      </div>
    `;

    details.innerHTML = contractHTML;

    // Attach print/download button handler
    const printBtn = document.getElementById('printContractBtn');
    if (printBtn) {
      printBtn.onclick = () => printContract(contract.orderId || contract.id || null);
    }

    // Attach close button
    const closeBtn = document.getElementById('closeContractPanelBtn');
    if (closeBtn) {
      closeBtn.onclick = closeContractPanel;
    }

    panel.classList.remove('hidden');
    panel.scrollIntoView({ behavior: 'smooth' });
  };

  // Close contract panel
  function closeContractPanel() {
    const panel = document.getElementById('contractDetailsPanel');
    if (!panel) return;
    panel.classList.add('hidden');
    // hide contract details content to release memory
    const details = document.getElementById('contractDetails');
    if (details) details.innerHTML = '';
  }

  // Open printable contract in new window and trigger print
  function printContract(contractId) {
    const contract = getSolicitanteContracts().find(c => c.orderId === contractId || c.id === contractId) || {};
    const printWindow = window.open('', '_blank', 'width=900,height=1100');
    if (!printWindow) {
      alert('El navegador bloqueó la ventana de impresión. Permite popups para esta página.');
      return;
    }

    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Contrato - ${contract.orderId || ''}</title><style>
      body{font-family: Arial, Helvetica, sans-serif; color:#222; padding:40px}
      .stamp{position: absolute; right:40px; top:30px; opacity:0.12; transform: rotate(-10deg); font-size:72px; color:#006178; font-weight:900}
      h1{color:#006178; text-align:center}
      .meta{margin-top:20px}
      .meta p{margin:6px 0}
      pre{white-space: pre-wrap; font-family: inherit; line-height:1.45}
      .signatures{margin-top:40px; display:flex; gap:20px; justify-content:space-between}
      .signature-box{width:30%; text-align:left}
      .small{font-size:0.9rem; color:#555}
    </style></head><body>
      <div class="stamp">CareMatch</div>
      <h1>CONTRATO DE PRESTACIÓN DE SERVICIOS</h1>
      <h3 style="text-align:center; margin-top:6px;">CUIDADO DE ADULTO MAYOR - CAREMATCH</h3>
      <p class="small" style="text-align:center;">Documento modelo para uso en plataforma web. Complete los datos antes de firmar.</p>
      <div class="meta">
        <p><strong>CONTRATANTE:</strong> ${contract.contratanteNombre || '__________________________________________'} &nbsp;&nbsp; RUT: ${contract.contratanteRut || '________________'}</p>
        <p><strong>CONTRATADO/A:</strong> ${contract.proveedorNombre || '__________________________________________'} &nbsp;&nbsp; RUT: ${contract.proveedorRut || '________________'}</p>
        <p><strong>ADULTO MAYOR:</strong> ${contract.adultoNombre || '__________________________________________'} &nbsp;&nbsp; RUT: ${contract.adultoRut || '________________'}</p>
        <p><strong>Domicilio/lugar del servicio:</strong> ${contract.domicilio || '_______________________________________________________________'}</p>
      </div>
      <hr>
      <pre>${`1. Objeto. El/la Contratado/a prestará apoyo de cuidado, acompañamiento y asistencia diaria al adulto mayor indicado, incluyendo,\nsegún se acuerde, higiene básica, alimentación, movilidad, compañía, registro de novedades y recordatorio de medicamentos\nprescritos. No comprende diagnósticos, procedimientos invasivos ni actos de salud reservados a profesionales habilitados, salvo\nacreditación y acuerdo escrito.\n\n2. Jornada, lugar y pago. Días y horario: ${contract.jornada || '____________________________________'}. Lugar: ${contract.lugar || '____________________________________'}.\nHonorario/remuneración: ${contract.monto ? formatCurrency(contract.monto) : '________________'} , pagadero en forma ${contract.pagoForma || '________________'}.\n\n3. Obligaciones del Contratante. Entregar información relevante, indicaciones médicas vigentes, teléfonos de emergencia, insumos\nnecesarios y condiciones seguras para el cuidado; pagar oportunamente; informar cambios relevantes; y tratar al/la Contratado/a\ncon respeto y colaboración.\n\n4. Obligaciones del Contratado/a. Ejecutar el servicio en forma personal, diligente, respetuosa y confidencial; resguardar la dignidad,\nautonomía, seguridad e intimidad del adulto mayor; avisar de inmediato accidentes, emergencias o cambios relevantes; mantener\nregistro básico de novedades; y no delegar funciones sin autorización escrita.\n\n5. Leyes especiales de Chile. Las partes declaran conocer y respetar: Ley 21.719, sobre protección y tratamiento de datos personales,\nespecialmente datos sensibles de salud, bajo principios de finalidad, proporcionalidad, seguridad y confidencialidad; Ley\n20.584, sobre derechos y deberes de las personas en acciones vinculadas a su atención de salud, incluyendo trato digno,\ninformación, consentimiento y reserva; y Ley 21.805, que reconoce el derecho al cuidado, a ser cuidado y al autocuidado,\npromoviendo autonomía, corresponsabilidad, inclusión y prevención de abuso, negligencia o discriminación.\n\n6. Plataforma CareMatch. CareMatch actúa como plataforma web de contacto, registro y apoyo operativo entre usuarios y cuidadores,\npudiendo establecer protocolos de seguridad, verificación y tratamiento de datos. La plataforma no reemplaza la supervisión\nfamiliar, médica ni las obligaciones legales de las partes.\n\n7. Responsabilidad y término. Cualquier parte podrá poner término con aviso escrito de ____ días. El término podrá ser inmediato ante\nmaltrato, negligencia grave, riesgo para el adulto mayor, incumplimiento de pago, falsedad de antecedentes o vulneración de\nconfidencialidad. Si en la práctica se configura subordinación y dependencia, se aplicará la normativa laboral chilena que\ncorresponda.\n\nFirma Contratante\nRUT: __________________\n\nFirma Contratado/a\nRUT: __________________\n\nFirma Adulto Mayor/Rep.\nRUT: ______`}</pre>
      <div class="signatures">
        <div class="signature-box">Firma Contratante<br><br>RUT: ____________</div>
        <div class="signature-box">Firma Contratado/a<br><br>RUT: ____________</div>
        <div class="signature-box">Firma Adulto Mayor/Rep.<br><br>RUT: ____________</div>
      </div>
    </body></html>`;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    // Give browser a moment to render then print
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  }

  function toggleMyServicesSection() {
    const box = document.getElementById('myServicesBox');
    if (!box) return;
    box.classList.toggle('hidden');
    const button = document.getElementById('toggleMyServicesBtn');
    if (button) {
      button.textContent = box.classList.contains('hidden') ? 'Ver servicios contratados' : 'Cerrar servicios contratados';
    }
  }

  const inputCertificado = document.getElementById('profileCertificado');
  if (inputCertificado) {
    inputCertificado.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        let localUser = JSON.parse(localStorage.getItem('usuarioCareMatch')) || {};
        localUser.certificadoNombre = file.name;
        localUser.certificadoEstado = 'pendiente';
        localStorage.setItem('usuarioCareMatch', JSON.stringify(localUser));

        const users = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
        const idx = users.findIndex(u => u.email === localUser.email);
        if (idx >= 0) {
          users[idx] = localUser;
          localStorage.setItem('usuariosRegistrados', JSON.stringify(users));
        }

        const statusMsg = document.getElementById('certificadoStatusMsg');
        if (statusMsg) {
          statusMsg.classList.remove('hidden');
          statusMsg.textContent = 'Certificado subido. Pendiente de revisión.';
          statusMsg.style.color = '#e67e22';
        }
        const certLink = document.getElementById('profileCertificadoLink');
        if (certLink) {
          certLink.classList.remove('hidden');
          certLink.textContent = `Ver certificado: ${file.name}`;
        }
      }
    });
  }

  profileForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const userEmail = localStorage.getItem('userEmail');
    let localUser = JSON.parse(localStorage.getItem('usuarioCareMatch')) || { email: userEmail };

    localUser.nombre = document.getElementById('profileName').value;
    
    if (imgPreview && !imgPreview.src.endsWith('img/Logo.png')) {
      localUser.foto = imgPreview.src;
    }

    const rol = localUser.rol || 'solicitante';
    if (rol === 'cuidador' || rol === 'acompañante' || rol === 'profesional') {
      localUser.telefono = document.getElementById('profileTelefono').value;
    } 
    if (rol === 'solicitante') {
      const pEdad = document.getElementById('profileEdad');
      if(pEdad) localUser.edad = pEdad.value;
      const pCond = document.getElementById('profileCondicion');
      if(pCond) localUser.condicion = pCond.value;
    }
    if (rol === 'administrador') {
      const pRut = document.getElementById('profileRut');
      if(pRut) localUser.rut = pRut.value;
    }

    localStorage.setItem('usuarioCareMatch', JSON.stringify(localUser));

    const users = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    const idx = users.findIndex(u => u.email === localUser.email);
    if (idx >= 0) {
      users[idx] = localUser;
    } else {
      users.push(localUser);
    }
    localStorage.setItem('usuariosRegistrados', JSON.stringify(users));

    try {
      const formData = new FormData();
      formData.append('username', userEmail);
      formData.append('nombre', localUser.nombre);
      if (document.getElementById('profileTelefono')) formData.append('telefono', document.getElementById('profileTelefono').value);
      formData.append('rol', rol);

      const response = await fetch(`${API_BASE_URL}/usuarios/perfil/`, {
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        profileMsg.textContent = 'Perfil actualizado correctamente.';
      } else {
        throw new Error('Backend update failed');
      }
    } catch (error) {
      profileMsg.textContent = 'Perfil actualizado correctamente (localmente).';
    }
  });

  loadPerfil();
}

// Inicializar página de evaluación
function initEvaluationPage() {
  const userId = localStorage.getItem('userId');
  const evaluationForm = document.getElementById('evaluationForm');
  const evaluationSummary = document.getElementById('evaluationSummary');
  const evaluationMessage = document.getElementById('evaluationMessage');

  if (!userId) {
    evaluationSummary.innerHTML = '<p style="color: red;">Debes iniciar sesión para evaluar. <a href="login.html">Ir a login</a></p>';
    evaluationForm.querySelector('button[type=submit]').disabled = true;
    return;
  }

  // Obtener datos de la evaluación desde localStorage
  const booking = JSON.parse(localStorage.getItem('bookingCareMatch')) || null;

  if (!booking || !booking.proveedorNombre || !booking.proveedorId) {
    evaluationSummary.innerHTML = '<p>No hay una reserva registrada para evaluar. Regresa a servicios.</p>';
    evaluationForm.querySelector('button[type=submit]').disabled = true;
    return;
  }

  // Mostrar resumen de la reserva
  evaluationSummary.innerHTML = `
    <h3>Evalúa el servicio de ${booking.proveedorNombre}</h3>
    <p><strong>Servicio:</strong> ${booking.tipo}</p>
    <p><strong>Fecha de servicio:</strong> ${booking.fecha_requerida ? booking.fecha_requerida.slice(0, 10) : 'No especificada'}</p>
    <p><strong>Tu opinión ayuda a mejorar la plataforma</strong></p>
  `;

  // Manejar envío de evaluación
  evaluationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const calificacion = parseInt(document.querySelector('input[name="calificacion"]:checked').value);
    const comentario = document.getElementById('comentario').value;

    try {
      const response = await fetch(`${API_BASE_URL}/evaluaciones/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario_id: Number(userId),
          proveedor_id: Number(booking.proveedorId),
          calificacion: calificacion,
          comentario: comentario,
          solicitud: null
        })
      });

      if (response.ok) {
        evaluationMessage.textContent = '¡Gracias por tu evaluación! Tu opinión ha sido registrada.';
        evaluationMessage.classList.add('success');
        evaluationMessage.classList.remove('error');
        evaluationForm.reset();
        // Limpiar localStorage después de evaluar
        localStorage.removeItem('bookingCareMatch');
        setTimeout(() => {
          window.location.href = 'servicios.html';
        }, 2000);
      } else {
        const errorData = await response.json();
        evaluationMessage.textContent = errorData.detail || 'Error al enviar la evaluación.';
        evaluationMessage.classList.add('error');
        evaluationMessage.classList.remove('success');
      }
    } catch (error) {
      evaluationMessage.textContent = 'Error de conexión al enviar la evaluación.';
      evaluationMessage.classList.add('error');
      evaluationMessage.classList.remove('success');
    }
  });
}

// Cargar y mostrar evaluaciones de un proveedor
async function showProviderEvaluations(proveedorId) {
  try {
    const response = await fetch(`${API_BASE_URL}/evaluaciones/?proveedor=${proveedorId}`);
    if (response.ok) {
      const evaluaciones = await response.json();
      return evaluaciones.slice(0, 3); // Mostrar últimas 3 evaluaciones
    }
  } catch (error) {
    console.log('No se pudieron cargar las evaluaciones');
  }
  return [];
}

// Funciones de Administrador
window.loadAdminDashboard = function() {
  const adminCertificadosList = document.getElementById('adminCertificadosList');
  if (!adminCertificadosList) return;

  const users = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
  const pendingCertificates = users.filter(u => u.rol === 'profesional' && u.certificadoEstado === 'pendiente');

  adminCertificadosList.innerHTML = pendingCertificates.length ? pendingCertificates.map(u => `
    <tr>
      <td>${u.nombre}</td>
      <td>${u.email}</td>
      <td>${u.certificadoNombre || 'Sin nombre'}</td>
      <td>
        <button class="btn-primary" onclick="window.aprobarCertificado('${u.email}')">Aprobar</button>
        <button class="btn-reject" onclick="window.rechazarCertificado('${u.email}')">Rechazar</button>
      </td>
    </tr>
  `).join('') : '<tr><td colspan="4" style="text-align:center;">No hay certificados pendientes de revisión.</td></tr>';
};

window.aprobarCertificado = function(email) {
  if(confirm(`¿Estás seguro de aprobar el certificado de ${email}?`)) {
    updateCertificadoStatus(email, 'aprobado');
  }
};

window.rechazarCertificado = function(email) {
  if(confirm(`¿Estás seguro de rechazar el certificado de ${email}?`)) {
    updateCertificadoStatus(email, 'rechazado');
  }
};

function updateCertificadoStatus(email, status) {
  let users = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
  const idx = users.findIndex(u => u.email === email);
  if (idx >= 0) {
    users[idx].certificadoEstado = status;
    localStorage.setItem('usuariosRegistrados', JSON.stringify(users));
    
    let localUser = JSON.parse(localStorage.getItem('usuarioCareMatch')) || {};
    if(localUser.email === email) {
      localUser.certificadoEstado = status;
      localStorage.setItem('usuarioCareMatch', JSON.stringify(localUser));
    }

    alert(`Certificado ${status}.`);
    window.loadAdminDashboard();
  }
}

// User Directory logic
window.toggleAdminUsersView = function() {
  const adminUsersView = document.getElementById('adminUsersView');
  const btn = document.querySelector('button[onclick="window.toggleAdminUsersView()"]');
  
  if (adminUsersView.classList.contains('hidden')) {
    adminUsersView.classList.remove('hidden');
    btn.textContent = 'Ocultar usuarios';
    window.showUserTab('solicitante'); // Load default tab
  } else {
    adminUsersView.classList.add('hidden');
    btn.textContent = 'Ver todos los usuarios';
  }
};

window.showUserTab = function(role) {
  // Update active tab styling
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick').includes(`'${role}'`)) {
      btn.classList.add('active');
    }
  });

  const adminUsersList = document.getElementById('adminUsersList');
  if (!adminUsersList) return;

  const users = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
  const filteredUsers = users.filter(u => u.rol === role);

  adminUsersList.innerHTML = filteredUsers.length ? filteredUsers.map(u => `
    <tr>
      <td>${u.nombre}</td>
      <td>${u.email}</td>
      <td>${u.telefono || (u.edad ? `Edad: ${u.edad}` : 'No especificado')}</td>
    </tr>
  `).join('') : `<tr><td colspan="3" style="text-align:center;">No hay usuarios registrados con el rol "${role}".</td></tr>`;
};

