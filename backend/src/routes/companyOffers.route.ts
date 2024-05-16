import express, { Router } from 'express';
import cOfferController from '../controllers/companyOffers.controller';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware'

const router: Router = express.Router();

// PSOT
router.post('/addPost', cOfferController.createOffer); // Swagger à faire + Ajouter protection si éléments manquants

// GET
router.get('/getPosts', cOfferController.getOffers); // Swagger à faire 

router.get('/getPostById/:id', cOfferController.getOfferById); // Swagger à faire 

router.get('/getPostWithCompanyInfo/:id', cOfferController.getOfferWithCompanyInfo); // Swagger à faire

// PUT
router.put('/updatePost/:id', cOfferController.updateOffer); // Swagger à faire 

// DELETE
router.delete('/deletePost/:id', cOfferController.deleteOffer); // Swagger à faire 

export default router;