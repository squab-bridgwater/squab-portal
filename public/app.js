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
  },
  {
    name: 'Group Activity',
    description: 'Open the Squab Group Activity site.',
    url: 'https://squab-group-activity.squab-storag-8905.chatgpt.site/',
    status: 'Live',
    icon: 'group'
  }
];

const icons = {
  social: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2.4"/><circle cx="8.5" cy="9" r="1.6"/><path d="m4.5 17 5-5 3.2 3 2.6-2.5L20 17.5"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10H3V10Z"/><path d="M9 20v-7h6v7"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4.5 5.5v6.1c0 4.6 2.5 7.9 7.5 10.4 5-2.5 7.5-5.8 7.5-10.4V5.5L12 2Z"/><path d="m8.4 12.2 2.5 2.5 5-5"/></svg>',
  clipboard: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.9 3.2h4.2l.5 2 1.6.9 2-.7 2.2 3.7-1.5 1.4v1.8l1.5 1.4-2.2 3.7-2-.7-1.6.9-.5 2H9.9l-.5-2-1.6-.9-2 .7-2.2-3.7 1.5-1.4v-1.8L3.6 9.1l2.2-3.7 2 .7 1.6-.9.5-2Z"/><circle cx="12" cy="11.4" r="3"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 2 5 13.5h6.7L10.6 22 19 10.3h-6.5L13.5 2Z"/></svg>',
  group: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="7.7" r="3"/><path d="M3.2 20c.5-4 2.7-6 6.8-6s6.3 2 6.8 6H3.2Z"/><path d="M17 5.2a2.7 2.7 0 0 1 0 5.3M17.5 14.3c2.4.5 3.7 2.2 4 4.8"/></svg>'
};

const fallbackIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg>';
const arrowIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>';

const appGrid = document.getElementById('appGrid');
const appSearch = document.getElementById('appSearch');
const resultSummary = document.getElementById('resultSummary');
const emptyState = document.getElementById('emptyState');
const filterButtons = document.querySelectorAll('.filter-button');
const counts = {
  all: apps.length,
  live: apps.filter((app) => app.status === 'Live').length,
  dev: apps.filter((app) => app.status === 'Dev').length
};
document.getElementById('allCount').textContent = counts.all;
document.getElementById('liveCount').textContent = counts.live;
document.getElementById('devCount').textContent = counts.dev;

let activeFilter = 'all';

function createCard(app) {
  const card = document.createElement('a');
  card.className = 'app-card';
  card.dataset.icon = app.icon || 'default';
  card.href = app.url;
  card.setAttribute('aria-label', 'Open ' + app.name + (app.status === 'Dev' ? ' development app' : ''));

  const tile = document.createElement('span');
  tile.className = 'app-icon';
  tile.innerHTML = icons[app.icon] || fallbackIcon;

  const content = document.createElement('div');
  content.className = 'card-content';

  const title = document.createElement('h2');
  title.textContent = app.name;

  const description = document.createElement('p');
  description.textContent = app.description || '';

  const status = document.createElement('span');
  status.className = 'card-status ' + (app.status === 'Dev' ? 'dev' : 'live');
  status.textContent = app.status;

  content.append(title, description, status);

  const arrow = document.createElement('span');
  arrow.className = 'card-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.innerHTML = arrowIcon;

  card.append(tile, content, arrow);
  return card;
}

function renderApps() {
  const query = appSearch.value.trim().toLocaleLowerCase('en-GB');
  const visible = apps.filter((app) => {
    const matchesStatus = activeFilter === 'all' || app.status.toLowerCase() === activeFilter;
    const text = (app.name + ' ' + (app.description || '') + ' ' + app.status).toLocaleLowerCase('en-GB');
    return matchesStatus && text.includes(query);
  });

  const list = document.createDocumentFragment();
  visible.forEach((app) => list.appendChild(createCard(app)));
  appGrid.replaceChildren(list);

  resultSummary.textContent = (query || activeFilter !== 'all')
    ? 'Showing ' + visible.length + ' of ' + apps.length + ' apps'
    : apps.length + (apps.length === 1 ? ' app available' : ' apps available');

  appGrid.hidden = visible.length === 0;
  emptyState.hidden = visible.length !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((other) => {
      other.setAttribute('aria-pressed', String(other === button));
    });
    renderApps();
  });
});

appSearch.addEventListener('input', renderApps);
document.getElementById('resetFilters').addEventListener('click', () => {
  activeFilter = 'all';
  appSearch.value = '';
  filterButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === 'all')));
  renderApps();
  appSearch.focus();
});
renderApps();

const brandLogo = document.getElementById('brandLogo');
if (brandLogo) {
  const showFallback = () => brandLogo.parentElement.classList.add('logo-unavailable');
  brandLogo.addEventListener('error', showFallback);
  if (brandLogo.complete && !brandLogo.naturalWidth) showFallback();
}

const offlineNotice = document.getElementById('offlineNotice');
function setNetworkState() {
  offlineNotice.hidden = navigator.onLine;
}
window.addEventListener('online', setNetworkState);
window.addEventListener('offline', setNetworkState);
setNetworkState();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {
      // The Portal menu remains usable online without the service worker.
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
