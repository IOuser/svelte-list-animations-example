import nanoid from 'nanoid';
import randomWords from 'random-words';

export function createSource(children) {
    const id = nanoid(4);
    return {
        id,
        value: Math.round(Math.random() * 100),
        name: randomWords({ exactly: 1, wordsPerString: 3, formatter }),
        ...(children ? { children: children.map(c => ({ ...c, parentId: id })) } : {}),
    };
}

function formatter(word, index) {
    if (index === 0) {
        return word.slice(0,1).toUpperCase().concat(word.slice(1));
    }

    return word;
};

export function isActive(source, activeSourceId) {
    return source.id === activeSourceId || (source.children && source.children.some(c => c.id === activeSourceId));
}
