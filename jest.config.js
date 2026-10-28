module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^expo-secure-store$': '<rootDir>/src/__mocks__/expo-secure-store.ts',
        '^@react-navigation/native$':
            '<rootDir>/src/__mocks__/@react-navigation/native.ts',
    },
    globals: {
        __DEV__: true,
    },
    setupFilesAfterEnv: ['<rootDir>/src/__mocks__/setup.ts'],
    collectCoverageFrom: [
        'src/services/bnkPoc/**/*.ts',
        '!src/services/bnkPoc/**/*.test.ts',
        '!src/services/bnkPoc/__tests__/**',
        '!src/services/bnkPoc/index.ts',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    verbose: true,
    testTimeout: 10000,
}
