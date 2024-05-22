import express, { Router } from 'express';
import cOfferController from '../controllers/companyOffers.controller';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware'

const router: Router = express.Router();

// PSOT
router.post('/addPost', authenticateToken, cOfferController.createOffer); // Swagger à faire + Ajouter protection si éléments manquants

// GET
router.get('/getPosts', authenticateToken, cOfferController.getOffers); // Swagger à faire 

router.get('/getPostById/:id', authenticateToken, cOfferController.getOfferById); // Swagger à faire 

router.get('/getPostWithCompanyInfo/:id', authenticateToken, cOfferController.getOfferWithCompanyInfo); // Swagger à faire

// PUT
router.put('/updatePost/:id', authenticateToken, cOfferController.updateOffer); // Swagger à faire 

// DELETE
router.delete('/deletePost/:id', authenticateToken, cOfferController.deleteOffer); // Swagger à faire 

export default router;