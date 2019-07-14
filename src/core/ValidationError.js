export class ValidationError extends Error {
    constructor(issues) {
        super('validation error');
        this.issues = issues;
    }
}