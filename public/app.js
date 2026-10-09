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
  social: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M2.5 20c.7-3.4 2.6-5 5.5-5 1.3 0 2.4.3 3.3.9"/><path d="M16 7h5M18.5 4.5v5"/><path d="M14 14h7v6h-7z"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/><path d="M7.5 10.5h6M10.5 7.5v6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.6 2.4 8 7 10 4.6-2 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  clipboard: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5H6a2 2 0 0 0-2 2v13h16V7a2 2 0 0 0-2-2h-3"/><path d="M9 3h6v4H9z"/><path d="M8 12h8M8 16h5"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 2-8 12h6l-1 8 9-13h-6V2Z"/></svg>',
  group: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c.6-3.6 2.6-5.5 6-5.5s5.4 1.9 6 5.5"/><path d="M14.5 14.8c.7-.4 1.6-.6 2.5-.6 2.5 0 4 1.4 4.5 4.3"/></svg>'
};

const appGrid = document.getElementById('appGrid');
const appSearch = document.getElementById('appSearch');
const resultSummary = document.getElementById('resultSummary');
const emptyState = document.getElementById('emptyState');
const filterButtons = document.querySelectorAll('.filter-button');
const appTotal = document.getElementById('appTotal');

const counts = {
  all: apps.length,
  live: apps.filter((app) => app.status === 'Live').length,
  dev: apps.filter((app) => app.status === 'Dev').length
};
document.getElementById('allCount').textContent = counts.all;
document.getElementById('liveCount').textContent = counts.live;
document.getElementById('devCount').textContent = counts.dev;
appTotal.textContent = apps.length + (apps.length === 1 ? ' app' : ' apps');

let activeFilter = 'all';
const arrowIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m0 0-5-5m5 5-5 5"/></svg>';
const fallbackIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg>';

function createCard(app) {
  const card = document.createElement('a');
  card.className = 'app-card';
  card.href = app.url;
  card.setAttribute('aria-label', 'Open ' + app.name + (app.status === 'Dev' ? ' development app' : ''));

  const top = document.createElement('div');
  top.className = 'card-top';

  const iconWrap = document.createElement('span');
  iconWrap.className = 'app-icon';
  iconWrap.dataset.icon = app.icon || 'grid';
  iconWrap.innerHTML = icons[app.icon] || fallbackIcon;

  const status = document.createElement('span');
  status.className = 'status ' + (app.status === 'Dev' ? 'dev' : 'live');
  status.textContent = app.status;
  top.append(iconWrap, status);

  const content = document.createElement('div');
  content.className = 'card-content';
  const title = document.createElement('h2');
  title.textContent = app.name;
  const description = document.createElement('p');
  description.textContent = app.description || '';
  content.append(title, description);

  const bottom = document.createElement('div');
  bottom.className = 'card-bottom';
  const label = document.createElement('span');
  label.textContent = 'Open app';
  const arrow = document.createElement('span');
  arrow.className = 'open-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.innerHTML = arrowIcon;
  bottom.append(label, arrow);

  card.append(top, content, bottom);
  return card;
}

function renderApps() {
  const search = appSearch.value.trim().toLocaleLowerCase('en-GB');
  const visible = apps.filter((app) => {
    const statusMatch = activeFilter === 'all' || app.status.toLowerCase() === activeFilter;
    const searchable = (app.name + ' ' + (app.description || '') + ' ' + app.status).toLocaleLowerCase('en-GB');
    return statusMatch && searchable.includes(search);
  });

  const fragment = document.createDocumentFragment();
  visible.forEach((app) => fragment.appendChild(createCard(app)));
  appGrid.replaceChildren(fragment);

  const total = apps.length;
  resultSummary.textContent = (search || activeFilter !== 'all')
    ? 'Showing ' + visible.length + ' of ' + total + (total === 1 ? ' app' : ' apps')
    : total + (total === 1 ? ' app available' : ' apps available');

  appGrid.hidden = visible.length === 0;
  emptyState.hidden = visible.length !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      filterButton.setAttribute('aria-pressed', String(filterButton === button));
    });
    renderApps();
  });
});

appSearch.addEventListener('input', renderApps);
document.getElementById('resetFilters').addEventListener('click', () => {
  activeFilter = 'all';
  appSearch.value = '';
  filterButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.filter === 'all'));
  });
  renderApps();
  appSearch.focus();
});
renderApps();

const brandLogo = document.getElementById('brandLogo');
if (brandLogo) {
  const showLogoFallback = () => brandLogo.parentElement.classList.add('logo-unavailable');
  brandLogo.addEventListener('error', showLogoFallback);
  if (brandLogo.complete && !brandLogo.naturalWidth) showLogoFallback();
}

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
      // The app menu is still available online without a service worker.
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
