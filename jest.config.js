module.exports = {
    testEnvironment: "node",
    verbose: true,
    preset: "ts-jest",
    clearMocks: true,
    setupFilesAfterEnv: ["./src/Esercizio13/lib/prisma/client.mock.ts"]
}