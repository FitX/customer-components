global.console = {
  log: console.log,
  error: console.error,
  warn: jest.fn(), // overwrite native behaviour to reduce noise
  info: console.info,
  debug: console.debug,
};
