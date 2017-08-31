const FAILURE_STRATEGIES = {
    CONTINUE: Symbol('CONTINUE'),
    FAIL: Symbol('FAIL'),
    BAIL: Symbol('BAIL')
};
const VERSION_TYPES = ['major', 'minor', 'patch'];

module.exports = {
    FAILURE_STRATEGIES,
    VERSION_TYPES
};
