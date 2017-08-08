const bytes = require('bytes');
const chalk = require('chalk');

const codeColors = ['yellow', 'green', 'green', 'cyan', 'yellow', 'red'];

function fix0(num) {
  return num < 10 ? `0${num}` : num;
}

function prettyDate(date = new Date()) {
  const y = date.getFullYear();
  const m = fix0(date.getMonth() + 1);
  const d = fix0(date.getDate());
  const h = fix0(date.getHours());
  const min = fix0(date.getMinutes());
  const s = fix0(date.getSeconds());
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
}

function prettyResTime(ms) {
  return ms < 10000 ? `${ms}ms` : `${Math.round(ms / 1000)}s`;
}

function prettyResLength(len, status) {
  if (status === '204' || status === '205' || status === '304') {
    return '';
  }
  if (len || len === 0) {
    return bytes(len);
  }
  return '-';
}

function logger() {
  return async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;

    const s = Math.floor(ctx.response.status / 100) || 0;
    const color = codeColors[s];

    const date = prettyDate();
    const ip = chalk.gray(ctx.ip.replace('::ffff:', ''));
    const method = chalk.bold(ctx.method);
    const url = ctx.url;
    const status = chalk[color](ctx.response.status);
    const resTime = chalk.gray(prettyResTime(ms));
    const resLength = chalk.gray(prettyResLength(ctx.response.length, ctx.response.status));
    console.log(`${date} ${ip} ${method} ${url} ${status} - ${resTime} ${resLength}`);
  };
}

module.exports = logger;
