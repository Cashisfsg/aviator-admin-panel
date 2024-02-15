const ruOrdinalRules = new Intl.PluralRules("en-EN");

const suffixes = new Map([
    ["one", "заявка"],
    ["two", "заявки"],
    ["three", "заявки"],
    ["few", "заявок"],
    ["other", "заявки"]
]);

export const formatOrdinals = (n: number) => {
    const rule = ruOrdinalRules.select(n);
    const suffix = suffixes.get(rule);

    return `${n} ${suffix}`;
};
