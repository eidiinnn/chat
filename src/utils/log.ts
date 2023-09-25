enum LogLevel {
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

const log = {
  info(message: string, data?: any): void {
    this._showLog(LogLevel.INFO, message, data);
  },

  warning(message: string, data?: any): void {
    this._showLog(LogLevel.WARNING, message, data);
  },

  error(message: string, data?: any): void {
    this._showLog(LogLevel.ERROR, message, data);
  },

  _showLog(level: LogLevel, msg: string, data: any) {
    console.log(`${new Date().toISOString()} [${level}] ${msg}`);
    if (data) console.log(data);
  },
};

export default log;
