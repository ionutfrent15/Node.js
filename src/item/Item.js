import { Issue, SEVERITY } from "../core";


export function Item(text, isActive) {
    this.text = text;
    this.isActive = isActive;
}

Item.prototype.toString = function (){
    return `${this.text} ${this.isActive}`;
};

export const validate = (item) => {
    const issues = [];
    if (!item.text || typeof item.text !== 'string' || item.text.trim().length === 0) {
        issues.push(new Issue(SEVERITY.WARNING, 'text', 'Invalid text property'));
    }
    return issues;
};


