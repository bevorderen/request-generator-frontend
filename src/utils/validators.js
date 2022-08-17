import isNumeric from 'revalidate/lib/validators/isNumeric'

export const valueIsNumeric = ()  => isNumeric({message: "Must be number"})
const minLength = (min) => (value) =>
    value && value.length < min ? `Must be ${min} characters long` : undefined;
export const minLength5 = minLength(5); //example use
export const isEmail = (value) =>
    value && value.includes("@") ? undefined : "Should be correct email address";
export const required = (value) => (value ? undefined : "Required");
