const app = document.getElementById('app');

const icons = {
  heart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 11c0 5.65-7 10-7 10Z"/><path d="M9 12h2l1-2 1.5 4L15 12h2"/></svg>`,
  calendar: `<svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16M12 13v4M10 15h4"/></svg>`,
  clipboard: `<svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="5" width="14" height="16" rx="2"/><path d="M9 5V3h6v2M8 11h8M8 15h8"/></svg>`,
  flask: `<svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3"/><path d="M8 15h8"/></svg>`,
  help: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M9.7 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1.2.9-1.2 1.7v.5M12 17h.01"/></svg>`,
  back: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m5 12 4 4L19 6"/></svg>`
};

const state = {
  screen: 'home',
  specialty: 'Clínica geral',
  selectedDate: 'Seg, 15 set',
  selectedTime: '10:00',
  appointments: [
    { id: 1, specialty: 'Clínica geral', doctor: 'Dr. Arnaldo Silva', date: 'Seg, 15 set', time: '10:00' },
    { id: 2, specialty: 'Cardiologia', doctor: 'Dra. Helena Costa', date: 'Qui, 25 set', time: '10:30' }
  ],
};

function go(screen) {
  state.screen = screen;
  render();
  window.scrollTo(0,0);
}

function phone(content) { return `<section class="phone">${content}</section>`; }
function topbar(title, back='home') {
  return `<div class="topbar"><button class="back-btn" onclick="go('${back}')" aria-label="Voltar">${icons.back}</button><h1>${title}</h1></div>`;
}
function flowHead(step, text) {
  return `<div class="flow-head"><h1>Agendar consulta</h1><p class="step-label">Etapa ${step} de 3 — ${text}</p><div class="progress"><span class="${step>=1?'on':''} ${step===1?'current':''}"></span><span class="${step>=2?'on':''} ${step===2?'current':''}"></span><span class="${step>=3?'on':''} ${step===3?'current':''}"></span></div></div>`;
}
function menu(icon, color, title, sub, target) {
  return `<button class="menu-card" onclick="go('${target}')"><span class="menu-icon ${color}">${icon}</span><span class="menu-copy"><span class="menu-title">${title}</span><span class="menu-sub">${sub}</span></span><span class="chevron">›</span></button>`;
}

function renderHome() {
  return phone(`
    <div class="home-hero">
      <div class="brand"><div class="brand-mark">${icons.heart}</div><div><p class="brand-title">Bem Cuidar</p><div class="brand-subtitle">Saúde perto de você</div></div></div>
      <p class="hello">Olá, Maria</p><h1>Como podemos ajudar?</h1>
    </div>
    <div class="content">
      <p class="section-label">Escolha uma opção</p>
      ${menu(icons.calendar,'green','Agendar consulta','Escolha o médico e a data','schedule-intro')}
      ${menu(icons.clipboard,'blue','Minhas consultas','Veja seus próximos horários','appointments')}
      ${menu(icons.flask,'yellow','Exames','Acesse pedidos e resultados','exams')}
      ${menu(icons.help,'purple','Ajuda','Fale com nossa equipe','help')}
      <p class="hint">Toque em uma opção para continuar</p>
    </div>`);
}

function renderScheduleIntro() {
  return phone(`${topbar('Agendar consulta','home')}<div class="center-screen"><div class="big-icon">${icons.calendar}</div><h2>Agendar consulta</h2><p>Vamos encontrar um bom horário para você.</p><button class="primary-btn" onclick="go('step1')">Começar agendamento</button><button class="link-btn" onclick="go('home')">Voltar ao início</button></div>`);
}

function renderStep1() {
  const choices = ['Clínica geral','Cardiologia','Geriatria','Oftalmologia'];
  return phone(`<div class="content compact"><button class="back-text-btn" onclick="go('schedule-intro')">${icons.back} Voltar</button></div>${flowHead(1,'Escolha a especialidade')}<div class="content"><div class="option-list">${choices.map(c=>`<button class="choice ${state.specialty===c?'selected':''}" onclick="state.specialty='${c}';render()"><span class="radio">${state.specialty===c?icons.check:''}</span><span>${c}</span></button>`).join('')}</div><div class="bottom-action"><button class="primary-btn" onclick="go('step2')">Continuar</button></div></div>`);
}

function renderStep2() {
  return phone(`<div class="content compact"><button class="back-text-btn" onclick="go('step1')">${icons.back} Voltar</button></div>${flowHead(2,'Escolha data e horário')}<div class="content"><div class="summary-soft"><div class="small">Especialidade escolhida</div><strong>${state.specialty}</strong></div><div class="doctor-card"><strong>Dr. Arnaldo Silva</strong><div class="sub">Especialidade: ${state.specialty}</div></div><div class="date-title">Seg, 15 set</div><div class="time-row">${['09:00','10:00','11:00'].map(t=>`<button class="time-btn ${state.selectedDate==='Seg, 15 set'&&state.selectedTime===t?'selected':''}" onclick="state.selectedDate='Seg, 15 set';state.selectedTime='${t}';render()">${t}</button>`).join('')}</div><div class="date-title">Ter, 16 set</div><div class="time-row">${['14:00','15:00'].map(t=>`<button class="time-btn ${state.selectedDate==='Ter, 16 set'&&state.selectedTime===t?'selected':''}" onclick="state.selectedDate='Ter, 16 set';state.selectedTime='${t}';render()">${t}</button>`).join('')}</div><div class="bottom-action"><button class="primary-btn" onclick="go('step3')">Continuar</button></div></div>`);
}

function reviewCard() {
  return `<div class="review-card"><div class="review-row"><span class="label">Especialidade</span><strong>${state.specialty}</strong></div><div class="review-row"><span class="label">Médico</span><strong>Dr. Arnaldo Silva</strong></div><div class="review-row"><span class="label">Data</span><strong>${state.selectedDate}</strong></div><div class="review-row"><span class="label">Horário</span><strong>${state.selectedTime}</strong></div></div>`;
}
function renderStep3() {
  return phone(`${flowHead(3,'Revise os dados')}<div class="content"><h2 class="review-title">Confira sua consulta</h2>${reviewCard()}<div class="stack"><button class="primary-btn" onclick="confirmAppointment()">Confirmar consulta</button><button class="secondary-btn" onclick="go('step1')">Voltar e alterar</button></div></div>`);
}
function confirmAppointment() {
  if (!state.appointments.some(a=>a.specialty===state.specialty && a.date===state.selectedDate && a.time===state.selectedTime)) {
    state.appointments.unshift({id:Date.now(), specialty:state.specialty, doctor:'Dr. Arnaldo Silva', date:state.selectedDate, time:state.selectedTime});
  }
  go('confirmed');
}
function renderConfirmed() {
  return phone(`${flowHead(3,'Revise os dados')}<div class="content"><h2 class="review-title">Confira sua consulta</h2>${reviewCard()}<div class="success-box"><h2>Consulta confirmada</h2><p>Está tudo certo. Esperamos por você.</p><button class="primary-btn" onclick="go('appointments')">Ver minhas consultas</button></div><button class="secondary-btn" onclick="go('step1')">Voltar e alterar</button></div>`);
}

function appointmentCards() {
  return state.appointments.map(a=>`<div class="appointment-card"><h2>${a.specialty}</h2><div class="doctor">${a.doctor}</div><div class="appt-meta"><div><span>Data</span><strong>${a.date}</strong></div><div><span>Horário</span><strong>${a.time}</strong></div></div><button class="danger-btn" onclick="cancelAppointment(${a.id})">Cancelar consulta</button></div>`).join('') || '<p>Nenhuma consulta agendada.</p>';
}

function renderAppointments() {
  return phone(`${topbar('Minhas consultas','home')}<div class="content"><p class="subheading">Próximas consultas</p>${appointmentCards()}</div>`);
}

function renderAppointmentsCancelled() {
  return phone(`${topbar('Minhas consultas','home')}<div class="content"><p class="subheading">Próximas consultas</p><div class="notice">Consulta cancelada.</div>${appointmentCards()}</div>`);
}

function cancelAppointment(id) {
  state.appointments = state.appointments.filter(a=>a.id!==id);
  go('appointments-cancelled');
}

function renderInfo(title, icon, heading, text, actionText) {
  return phone(`${topbar(title,'home')}<div class="center-screen"><div class="big-icon">${icon}</div><h2>${heading}</h2><p>${text}</p><button class="primary-btn" onclick="void(0)">${actionText}</button><button class="link-btn" onclick="go('home')">Voltar ao início</button></div>`);
}

function render() {
  const screens = {
    home: renderHome,
    'schedule-intro': renderScheduleIntro,
    step1: renderStep1,
    step2: renderStep2,
    step3: renderStep3,
    confirmed: renderConfirmed,
    appointments: renderAppointments,
    'appointments-cancelled': renderAppointmentsCancelled,
    exams: () => renderInfo('Exames',icons.flask,'Exames','Seus pedidos e resultados aparecerão aqui.','Ver meus exames'),
    help: () => renderInfo('Ajuda',icons.help,'Ajuda','Nossa equipe está pronta para ajudar você.','Ligar para atendimento')
  };
  app.innerHTML = screens[state.screen]();
}

render();
