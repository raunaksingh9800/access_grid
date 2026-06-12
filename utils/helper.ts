// src/utils/helpers.ts

export const initials = (name: string): string =>
    name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

export const validateProjectTitle = (title: string): boolean => {
    const projectTitleRegex = /^[A-Za-z0-9]+-.+/;
    return projectTitleRegex.test(title);
};

export const countWords = (text: string): number => {
    return text?.trim()?.split(/\s+/).filter(Boolean).length || 0;
};