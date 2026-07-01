import dotenv from "dotenv";

// Cargar el .env desde la raíz del proyecto
dotenv.config();

import inquirer from "inquirer";
import chalk from "chalk";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface UserAnswers {
  nombre: string;
  email: string;
  contrasena: string;
  direccion: string;
  telefono: string;
  rol: "ADMIN" | "CLIENTE";
}

async function createUser() {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error(
        "No se encontró la variable MONGO_URI. Revisa el archivo .env en la raíz del proyecto."
      );
    }

    console.log(chalk.blue("🔄 Conectando a MongoDB Atlas..."));
    await mongoose.connect(mongoUri);
    console.log(chalk.green("✨ Conexión establecida correctamente.\n"));

    const usuarioSchema = new mongoose.Schema(
      {
        nombre: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        contrasena: { type: String, required: true },
        direccion: { type: String },
        telefono: { type: String },
        rol: {
          type: String,
          enum: ["ADMIN", "CLIENTE"],
          default: "CLIENTE",
        },
      },
      {
        timestamps: true,
        collection: "usuarios",
      }
    );

    const Usuario =
      mongoose.models.Usuario ||
      mongoose.model("Usuario", usuarioSchema);

    console.log(chalk.yellow("=== Crear Usuario ===\n"));

    const answers = await inquirer.prompt<UserAnswers>([
      {
        type: "input",
        name: "nombre",
        message: "Nombre:",
      },
      {
        type: "input",
        name: "email",
        message: "Correo Electrónico:",
      },
      {
        type: "password",
        name: "contrasena",
        message: "Contraseña:",
        mask: "*",
      },
      {
        type: "input",
        name: "direccion",
        message: "Dirección:",
      },
      {
        type: "input",
        name: "telefono",
        message: "Teléfono:",
      },
      {
        type: "list",
        name: "rol",
        message: "Rol:",
        choices: ["ADMIN", "CLIENTE"],
      },
    ]);

    console.log(chalk.blue("\n🔎 Verificando si el correo ya está registrado..."));

    const existe = await Usuario.findOne({
      email: answers.email,
    });

    if (existe) {
      console.log(
        chalk.red("❌ Ya existe un usuario con ese correo electrónico.")
      );
      await mongoose.disconnect();
      process.exit(1);
    }

    const passwordHash = await bcrypt.hash(
      answers.contrasena,
      10
    );

    console.log(chalk.blue("💾 Guardando usuario..."));

    const usuario = await Usuario.create({
      nombre: answers.nombre,
      email: answers.email,
      contrasena: passwordHash,
      direccion: answers.direccion,
      telefono: answers.telefono,
      rol: answers.rol,
    });

    console.log(
      chalk.green(
        `\n✅ Usuario creado correctamente: ${usuario.nombre} (${usuario.email})`
      )
    );

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(chalk.red("\n❌ Error durante el proceso:"), error);

    try {
      await mongoose.disconnect();
    } catch {}

    process.exit(1);
  }
}

createUser();