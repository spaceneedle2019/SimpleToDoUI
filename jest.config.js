module.exports = {
  verbose: true,
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jsdom',
  // transformIgnorePatterns: ['node_modules/(?!troublesome-dependency/.*)'],
  transform: { '^.+\\.tsx?$': 'ts-jest' },
}
