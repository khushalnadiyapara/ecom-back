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

function wrapHtml(title, color, contentRows) {
  const rows = Object.entries(contentRows)
    .filter(([_, val]) => val !== undefined && val !== null && val !== '')
    .map(([key, val]) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; width: 160px; vertical-align: top; color: #555; background-color: #fcfcfc;">
          ${escapeHtml(key)}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; vertical-align: top; color: #222; word-break: break-word;">
          ${val}
        </td>
      </tr>
    `).join('');

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <div style="background-color: ${color}; color: white; padding: 20px; text-align: center;">
        <h2 style="margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.5px;">${escapeHtml(title)}</h2>
      </div>
      <div style="padding: 0; background-color: #ffffff;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
      <div style="background-color: #f7fafc; padding: 15px; text-align: center; font-size: 12px; color: #718096; border-top: 1px solid #e2e8f0;">
        Automated alert from <strong>${escapeHtml(Vars.loggerOptions?.appName || 'Backend API')}</strong> Monitor
      </div>
    </div>
  `;
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

  const html = wrapHtml('API Route Failure (5xx)', '#e53e3e', {
    'Server Environment': escapeHtml(Vars.env),
    'Service Name': escapeHtml(service),
    'Timestamp': new Date().toISOString(),
    'Status Code': `<span style="color: #e53e3e; font-weight: bold;">${Number(statusCode)}</span>`,
    'HTTP Method': escapeHtml(method),
    'Request URL': escapeHtml(url),
    'Error Message': escapeHtml(message),
    'Stack Trace': stack ? `<pre style="font-size: 11px; color: #4a5568; white-space: pre-wrap; margin: 0; background: #edf2f7; padding: 10px; border-radius: 4px; border: 1px solid #cbd5e0;">${escapeHtml(stack)}</pre>` : null,
  });

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

  const html = wrapHtml('Process Crash (Fatal Error)', '#c53030', {
    'Server Environment': escapeHtml(Vars.env),
    'Service Name': escapeHtml(service),
    'Timestamp': new Date().toISOString(),
    'Error Type': `<span style="color: #c53030; font-weight: bold;">${escapeHtml(kind)}</span>`,
    'Error Message': escapeHtml(message),
    'Stack Trace': stack ? `<pre style="font-size: 11px; color: #4a5568; white-space: pre-wrap; margin: 0; background: #edf2f7; padding: 10px; border-radius: 4px; border: 1px solid #cbd5e0;">${escapeHtml(stack)}</pre>` : null,
  });

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

  const restartCmdDisplay = Vars.pm2?.restartCmd ? escapeHtml(Vars.pm2.restartCmd) : 'Default (process.exit)';

  const html = wrapHtml('Server Booted / Restarted', '#38a169', {
    'Server Environment': escapeHtml(Vars.env),
    'Service Name': escapeHtml(service),
    'Timestamp': new Date().toISOString(),
    'System Status': '<span style="color: #38a169; font-weight: bold;">Online & Listening for Connections</span>',
    'Restart Triggered By': isPM2 ? 'PM2 Auto-Restart' : 'Manual / Other',
    'PM2 Restart Count': isPM2 ? restarts : null,
    'Configured PM2 Command': `<code style="background: #f7fafc; padding: 2px 6px; border-radius: 4px; border: 1px solid #e2e8f0; color: #2d3748;">${restartCmdDisplay}</code>`,
  });

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
