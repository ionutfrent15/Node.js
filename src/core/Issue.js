export const SEVERITY = {
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'information'
};

export function Issue(severity, code, details) {
    this.severity = severity;
    this.code = code;
    this.details = details;
}