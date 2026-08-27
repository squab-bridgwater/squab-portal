const apps = [
  {
    name: 'Social Creator',
    description: 'Plan, create, review and export Squab social content.',
    url: 'https://squab-bridgwater.github.io/squab-social-creator/',
    status: 'Live',
    icon: 'social'
  },
  {
    name: 'Pricing / Unit Finder',
    description: 'Find suitable vacant units and check current pricing.',
    url: 'https://squab-pricing-app.web.app/',
    status: 'Live',
    icon: 'search'
  },
  {
    name: 'Insurance Audit',
    description: 'Review and manage storage insurance audit checks.',
    url: 'https://squab-insurance-audit.web.app/',
    status: 'Live',
    icon: 'shield'
  },
  {
    name: 'Operations',
    description: 'Open the Squab operations workspace and branch tools.',
    url: 'https://squab-operations-dev.web.app/',
    status: 'Dev',
    icon: 'clipboard'
  },
  {
    name: 'Electricity',
    description: 'Manage and review electricity information and records.',
    url: 'https://squab-electricity.web.app/',
    status: 'Live',
    icon: 'bolt'
  }
];

const icons = {
  social: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M2.5 20c.7-3.4 2.6-5 5.5-5 1.3 0 2.4.3 3.3.9"/><path d="M16 7h5M18.5 4.5v5"/><path d="M14 14h7v6h-7z"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/><path d="M7.5 10.5h6M10.5 7.5v6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.6 2.4 8 7 10 4.6-2 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  clipboard: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5H6a2 2 0 0 0-2 2v13h16V7a2 2 0 0 0-2-2h-3"/><path d="M9 3h6v4H9z"/><path d="M8 12h8M8 16h5"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 2-8 12h6l-1 8 9-13h-6V2Z"/></svg>'
};

const appGrid = document.getElementById('appGrid');

apps.forEach((app) => {
  const card = document.createElement('a');
  card.className = 'app-card';
  card.href = app.url;
  card.setAttribute('aria-label', `Open ${app.name}${app.status === 'Dev' ? ' development app' : ''}`);

  card.innerHTML = `
    <div class="card-top">
      <span class="icon-wrap">${icons[app.icon]}</span>
      <span class="status ${app.status.toLowerCase()}">${app.status}</span>
    </div>
    <h3>${app.name}</h3>
    <p>${app.description}</p>
    <span class="card-link">Open app →</span>
  `;

  appGrid.appendChild(card);
});

const offlineNotice = document.getElementById('offlineNotice');
const setNetworkState = () => {
  offlineNotice.hidden = navigator.onLine;
};
window.addEventListener('online', setNetworkState);
window.addEventListener('offline', setNetworkState);
setNetworkState();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {
      // Portal remains usable online if service-worker registration fails.
    });
  });
}

let deferredInstallPrompt;
const installButton = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installButton.hidden = false;
});

installButton.addEventListener('click', async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installButton.hidden = true;
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  installButton.hidden = true;
});
