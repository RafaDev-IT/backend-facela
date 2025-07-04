const { validationResult } = require('express-validator');
const { empleadoValidationRules, empleadoUpdateValidationRules, idValidation } = require('../src/utils/validators');

// Mock de request y response
const mockRequest = (body = {}, params = {}) => ({
  body,
  params
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Helper para ejecutar validaciones
const runValidation = async (validators, req) => {
  for (const validator of validators) {
    await validator.run(req);
  }
  return validationResult(req);
};

describe('Validators Tests', () => {
  describe('empleadoValidationRules', () => {
    it('debería validar un empleado válido', async () => {
      const req = mockRequest({
        nombre: 'Juan Pérez',
        edad: 30,
        puesto: 'Desarrollador',
        departamento: 'Tecnología'
      });

      const result = await runValidation(empleadoValidationRules(), req);
      expect(result.isEmpty()).toBe(true);
    });

    it('debería rechazar nombre vacío', async () => {
      const req = mockRequest({
        nombre: '',
        edad: 30,
        puesto: 'Desarrollador',
        departamento: 'Tecnología'
      });

      const result = await runValidation(empleadoValidationRules(), req);
      expect(result.isEmpty()).toBe(false);
      expect(result.errors.some(e => e.path === 'nombre')).toBe(true);
    });

    it('debería rechazar nombre corto', async () => {
      const req = mockRequest({
        nombre: 'AB',
        edad: 30,
        puesto: 'Desarrollador',
        departamento: 'Tecnología'
      });

      const result = await runValidation(empleadoValidationRules(), req);
      expect(result.isEmpty()).toBe(false);
      expect(result.errors.some(e => 
        e.path === 'nombre' && e.msg.includes('3 caracteres')
      )).toBe(true);
    });

    it('debería rechazar edad negativa', async () => {
      const req = mockRequest({
        nombre: 'Juan Pérez',
        edad: -5,
        puesto: 'Desarrollador',
        departamento: 'Tecnología'
      });

      const result = await runValidation(empleadoValidationRules(), req);
      expect(result.isEmpty()).toBe(false);
      expect(result.errors.some(e => e.path === 'edad')).toBe(true);
    });

    it('debería rechazar edad no numérica', async () => {
      const req = mockRequest({
        nombre: 'Juan Pérez',
        edad: 'treinta',
        puesto: 'Desarrollador',
        departamento: 'Tecnología'
      });

      const result = await runValidation(empleadoValidationRules(), req);
      expect(result.isEmpty()).toBe(false);
      expect(result.errors.some(e => e.path === 'edad')).toBe(true);
    });

    it('debería limpiar espacios en blanco', async () => {
      const req = mockRequest({
        nombre: '  Juan Pérez  ',
        edad: 30,
        puesto: '  Desarrollador  ',
        departamento: '  Tecnología  '
      });

      await runValidation(empleadoValidationRules(), req);
      expect(req.body.nombre).toBe('Juan Pérez');
      expect(req.body.puesto).toBe('Desarrollador');
      expect(req.body.departamento).toBe('Tecnología');
    });
  });

  describe('empleadoUpdateValidationRules', () => {
    it('debería permitir actualización parcial', async () => {
      const req = mockRequest({ edad: 35 });
      const result = await runValidation(empleadoUpdateValidationRules(), req);
      expect(result.isEmpty()).toBe(true);
    });

    it('debería validar campos opcionales cuando están presentes', async () => {
      const req = mockRequest({ 
        nombre: 'A',  // Muy corto
        edad: -5      // Negativo
      });

      const result = await runValidation(empleadoUpdateValidationRules(), req);
      expect(result.isEmpty()).toBe(false);
      expect(result.errors).toHaveLength(2);
    });

    it('debería permitir body vacío', async () => {
      const req = mockRequest({});
      const result = await runValidation(empleadoUpdateValidationRules(), req);
      expect(result.isEmpty()).toBe(true);
    });
  });

  describe('idValidation', () => {
    it('debería validar ID numérico válido', async () => {
      const req = mockRequest({}, { id: '123' });
      const result = await runValidation(idValidation(), req);
      expect(result.isEmpty()).toBe(true);
    });

    it('debería rechazar ID no numérico', async () => {
      const req = mockRequest({}, { id: 'abc' });
      const result = await runValidation(idValidation(), req);
      expect(result.isEmpty()).toBe(false);
      expect(result.errors.some(e => e.path === 'id')).toBe(true);
    });

    it('debería rechazar ID cero', async () => {
      const req = mockRequest({}, { id: '0' });
      const result = await runValidation(idValidation(), req);
      expect(result.isEmpty()).toBe(false);
    });

    it('debería rechazar ID negativo', async () => {
      const req = mockRequest({}, { id: '-5' });
      const result = await runValidation(idValidation(), req);
      expect(result.isEmpty()).toBe(false);
    });
  });
});