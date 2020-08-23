module.exports = {
    moduleDirectories: ['node_modules', 'js'],
    transform: {
        "^.+\\.jsx?$": "babel-jest"
    },
    "testPathIgnorePatterns": ["<rootDir>/node_modules/"],
    "collectCoverage": true
};