import { Schema, model } from 'mongoose';

const EmpresaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  nivelImpacto: {
    type: String,
    required: [true, "El nivel de impacto es obligatorio"],
  },
  yearsTrayectoria: {
    type: Number,
    required: [true, "Los años de trayectoria son obligatorios"],
  },
  categoriaEmpresarial: {
    type: String,
    required: [true, "La categoría empresarial es obligatoria"],
    enum: ["Artesanal", "Comercial", "Servicio", "Tradicional", "Multinacional"]
  }
});

export default model('Empresa', EmpresaSchema);