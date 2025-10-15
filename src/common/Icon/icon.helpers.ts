export const getValidIconName = (name: string): string => {
    if (name.startsWith('fa') && name.length > 2) {
        const validIconName = name.slice(2).charAt(0).toLowerCase() + name.slice(3);
        return validIconName === 'times' ? 'close' : validIconName;
    }

    return name === 'times' ? 'close' : name;
};