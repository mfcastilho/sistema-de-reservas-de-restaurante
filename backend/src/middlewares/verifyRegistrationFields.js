const Joi = require("joi");

const verifyRegistrationFields = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .trim()
      .required()
      .messages({
        'string.base': "O campo nome deve ser um texto.",
        'any.required': "O campo nome é obrigatório.",
        'string.min': "O nome tem que ter no mínimo 3 e no máximo 30 caracteres.",
        'string.max': "O nome tem que ter no mínimo 3 e no máximo 30 caracteres.",
        'string.empty': "Todos os campos são obrigatórios."
      }),

    email: Joi.string()
      .trim()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'any.required': "O campo email é obrigatório.",
        'string.base': "Formato de email inválido.",
        'string.email': "Formato de email inválido.",
        'string.empty': "Todos os campos são obrigatórios."
      }),

    password: Joi.string()
      .trim()
      .min(5)
      .max(16)
      .required()
      .messages({
        'any.required': "O campo senha é obrigatório.",
        'string.min': "A senha deve conter no mínimo 5 e no máximo 16 caracteres.", 
        'string.max': "A senha deve conter no mínimo 5 e no máximo 16 caracteres.", 
        'string.empty': "Todos os campos são obrigatórios."
      })
  });

  try {
    await user.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = verifyRegistrationFields;
