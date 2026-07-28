function scrollToId(id: string, behavior: ScrollBehavior = 'smooth') {
	const el = document.getElementById(id);
	if (!el) return false;
	el.scrollIntoView({ behavior, block: 'start' });
	return true;
}

function scrollToLocationHash(behavior: ScrollBehavior = 'smooth') {
	const id = window.location.hash.replace(/^#/, '');
	if (!id) return;
	// Wait a frame so layout/view-transition settle
	requestAnimationFrame(() => {
		if (!scrollToId(id, behavior)) {
			window.setTimeout(() => scrollToId(id, behavior), 120);
		}
	});
}

function isHomePath(pathname = window.location.pathname) {
	return (pathname.replace(/\/$/, '') || '/') === '/';
}

function onProjectsLinkClick(event: MouseEvent) {
	const target = event.target;
	if (!(target instanceof Element)) return;

	const link = target.closest<HTMLAnchorElement>('a[href="#projects"], a[href="/#projects"]');
	if (!link) return;

	// Already on home — scroll instead of a full route swap
	if (isHomePath()) {
		event.preventDefault();
		history.pushState(null, '', '#projects');
		scrollToId('projects', 'smooth');
		window.dispatchEvent(new HashChangeEvent('hashchange'));
	}
	// From other pages: allow navigation to /#projects; page-load handler scrolls
}

document.addEventListener('click', onProjectsLinkClick);
document.addEventListener('astro:page-load', () => scrollToLocationHash('smooth'));
document.addEventListener('astro:after-swap', () => {
	if (window.location.hash === '#projects') {
		scrollToLocationHash('auto');
		window.setTimeout(() => scrollToLocationHash('smooth'), 80);
	}
});

if (window.location.hash === '#projects') {
	scrollToLocationHash('auto');
}
