const logger = {
    log: (...args) => {
      console.log('[LOG]:', ...args);
    },
    warn: (...args) => {
      console.warn('[WARN]:', ...args);
    },
    error: (...args) => {
      console.error('[ERROR]:', ...args);
    },
    info: (...args) => {
      console.info('[INFO]:', ...args);
    }
  };
  
  export default logger;
  