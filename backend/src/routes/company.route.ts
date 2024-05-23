import express, { Router } from 'express';
import companyController from '../controllers/company.controller';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware'

const router: Router = express.Router();

// POST
router.post(`/addCompany`, authenticateToken, companyController.createCompany); // Swagger à faire + Ajouter protection si élements manquants + Protection si nom déjà utilisé

// GET
router.get(`/getCompanies`, authenticateToken, companyController.getCompanies); // Swagger à faire + Perfectionner la gestion d'erreur

router.get(`/getCompany/:param`, authenticateToken, companyController.getCompany); // Swagger à faire

router.get(`/getCompanyBasicInfo/:param`, authenticateToken, companyController.getCompanyBasicInfo); // Swagger à faire

// PUT
router.put(`/updateCompany/:param`, authenticateToken, companyController.updateCompany); // Swagger à faire + surement à modifier

// DELETE
router.delete(`/deleteCompany/:id`, authenticateToken, companyController.deleteCompany); // Swagger à faire 

export default router;