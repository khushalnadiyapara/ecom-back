const Vars = require('../../config/var');
const Logger = require('../logger');
const Mail = require('./index');

let lastRouteAlertAt = 0;
let lastProcessAlertAt = 0;

function escapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function shouldSend(alerts, lastAt) {
  if (!alerts.enabled || !alerts.to.length) return false;
  const now = Date.now();
  if (now - lastAt < alerts.rateLimitMs) return false;
  return true;
}

async function sendRouteFailure(req, err, { statusCode }) {
  const { alerts } = Vars;
  if (!shouldSend(alerts, lastRouteAlertAt)) return;
  lastRouteAlertAt = Date.now();

  const method = req.method || '';
  const url = req.originalUrl || req.url || '';
  const message = err.message || err.code || 'Unknown error';
  const stack = alerts.includeStack && err.stack ? err.stack : '';

  const service = Vars.loggerOptions?.appName || 'api';
  const subject = `[${Vars.env}][${service}] ${statusCode} ${method} ${url}`.slice(0, 250);
  const html = `
    <h2>API error (5xx)</h2>
    <p><strong>Environment:</strong> ${escapeHtml(Vars.env)}</p>
    <p><strong>Status:</strong> ${Number(statusCode)}</p>
    <p><strong>Method:</strong> ${escapeHtml(method)}</p>
    <p><strong>Route / URL:</strong> ${escapeHtml(url)}</p>
    <p><strong>Reason:</strong> ${escapeHtml(message)}</p>
    ${stack ? `<pre style="white-space:pre-wrap;">${escapeHtml(stack)}</pre>` : ''}
  `;

  const to = alerts.to.join(',');
  try {
    await Mail.send(to, subject, html);
  } catch (e) {
    Logger.error('alertOps: failed to send route failure email', { err: e.message || e });
  }
}

async function sendProcessFailure(kind, err) {
  const { alerts } = Vars;
  if (!shouldSend(alerts, lastProcessAlertAt)) return;
  lastProcessAlertAt = Date.now();

  const message = err && err.message ? err.message : String(err);
  const stack = alerts.includeStack && err && err.stack ? err.stack : '';

  const service = Vars.loggerOptions?.appName || 'api';
  const subject = `[${Vars.env}][${service}] ${kind}`.slice(0, 250);
  const html = `
    <h2>Process error</h2>
    <p><strong>Environment:</strong> ${escapeHtml(Vars.env)}</p>
    <p><strong>Kind:</strong> ${escapeHtml(kind)}</p>
    <p><strong>Reason:</strong> ${escapeHtml(message)}</p>
    ${stack ? `<pre style="white-space:pre-wrap;">${escapeHtml(stack)}</pre>` : ''}
  `;

  const to = alerts.to.join(',');
  try {
    await Mail.send(to, subject, html);
  } catch (e) {
    Logger.error('alertOps: failed to send process failure email', { err: e.message || e });
  }
}

async function sendServerRestart() {
  const { alerts } = Vars;
  if (!alerts.enabled || !alerts.to.length) return;

  const restarts = process.env.restart_time || 0;
  const isPM2 = typeof process.env.pm_id !== 'undefined';

  const service = Vars.loggerOptions?.appName || 'api';
  const subject = `[${Vars.env}][${service}] PM2 App Restarted`.slice(0, 250);
  
  const sshDetails = alerts.ssh && alerts.ssh.host && alerts.ssh.user 
    ? `
      <hr />
      <h3>Server Access Details</h3>
      <p><strong>SSH Command:</strong> ssh ${escapeHtml(alerts.ssh.user)}@${escapeHtml(alerts.ssh.host)}</p>
      ${alerts.ssh.password ? `<p><strong>SSH Password:</strong> ${escapeHtml(alerts.ssh.password)}</p>` : ''}
    ` : '';

  const html = `
    <h2>Application Started / Restarted</h2>
    <p><strong>Environment:</strong> ${escapeHtml(Vars.env)}</p>
    <p><strong>Time:</strong> ${new Date().toISOString()}</p>
    ${isPM2 ? `<p><strong>PM2 Restart Count:</strong> ${restarts}</p>` : '<p>Started without PM2.</p>'}
    <p>The Node.js server process has successfully booted up and is listening for connections.</p>
    ${sshDetails}
  `;

  const to = alerts.to.join(',');
  try {
    await Mail.send(to, subject, html);
  } catch (e) {
    Logger.error('alertOps: failed to send server restart email', { err: e.message || e });
  }
}

module.exports = {
  sendRouteFailure,
  sendProcessFailure,
  sendServerRestart,
};
