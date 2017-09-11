const _isArray = require('lodash/isArray');

function generateStyleString(styles, ...templateEntries) {
    function* generateTemplateEntries() {
        yield* templateEntries.map(e => e);
    }

    if (_isArray(styles)) {
        const entries = generateTemplateEntries();
        const thing = [styles[0], ...styles.slice(1).map((styleEntry) => {
            return `${entries.next().value}${styleEntry}`;
        })].join('');

        return thing;
    }

    return null;
}

module.exports = generateStyleString;
