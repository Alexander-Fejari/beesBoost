import express, { Router } from 'express';
import companyController from '../controllers/company.controller';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware'
import uploadMiddleware from '../middlewares/multer.middleware';

const router: Router = express.Router();

// POST
router.post(`/addCompany`, authenticateToken, companyController.createCompany); // Ajouter protection si élements manquants

// GET
router.get(`/getCompanies`, authenticateToken, companyController.getCompanies); // Perfectionner la gestion d'erreur/les filtres

router.get(`/getCompany/:param`, authenticateToken, companyController.getCompany);

router.get(`/getCompanyBasicInfo/:param`, authenticateToken, companyController.getCompanyBasicInfo);

// PUT
router.put(`/updateCompany/:param`, authenticateToken, companyController.updateCompany); // Surement à modifier

router.put(`/updateProfilePicture/:param`, uploadMiddleware, /* authenticateToken, */ (req, res) => companyController.updateProfilePic(req, res));

// DELETE
router.delete(`/deleteCompany/:id`, authenticateToken, authorizeRoles(`superAdmin`), companyController.deleteCompany);

export default router;