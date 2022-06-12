// ===========================
// Port
// ===========================

process.env.PORT = process.env.PORT || 8000;

// ===========================
// Env
// ===========================

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ===========================
// BASE DE DATOS
// ===========================

process.env.URLDB = "mongodb://localhost:27017/vaccine-app";

// ===========================
// Vencimiento de token
// ===========================

process.env.CADUCIDAD_TOKEN = "48h";

// ===========================
// SEED de autenticación
// ===========================

process.env.SEED_AUTENTICACION =
  process.env.SEED_AUTENTICACION || "this-is-a-seed-for-auth";
