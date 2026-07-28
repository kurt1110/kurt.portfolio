import type { APIRoute } from 'astro';

export const prerender = false;

const webhook = import.meta.env.DISCORD_WEBHOOK_URL;

export const POST: APIRoute = async ({ request }) => {
	if (!webhook) {
		return new Response(JSON.stringify({ ok: false, error: 'Webhook not configured' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	let payload: Record<string, unknown>;
	try {
		payload = await request.json();
	} catch {
		return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const name = String(payload.name || '').trim();
	const email = String(payload.email || '').trim();
	const company = String(payload.company || '').trim();
	const projectType = String(payload.projectType || '').trim();
	const details = String(payload.details || '').trim();

	const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	if (!name || !emailOk || !projectType || details.length < 20) {
		return new Response(JSON.stringify({ ok: false, error: 'Validation failed' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const embed = {
		title: 'New portfolio inquiry',
		color: 0x7165ff,
		fields: [
			{ name: 'Name', value: name, inline: true },
			{ name: 'Email', value: email, inline: true },
			...(company ? [{ name: 'Company', value: company, inline: true }] : []),
			{ name: 'Project type', value: projectType, inline: false },
			{ name: 'Details', value: details.slice(0, 1000) },
		],
		timestamp: new Date().toISOString(),
		footer: { text: 'Kurt.dev contact form' },
	};

	const discordRes = await fetch(webhook, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: 'Portfolio Contact',
			embeds: [embed],
		}),
	});

	if (!discordRes.ok) {
		return new Response(JSON.stringify({ ok: false, error: 'Discord webhook failed' }), {
			status: 502,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
};
