"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const companyOffers_controller_1 = __importDefault(require("../controllers/companyOffers.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// PSOT
router.post('/addPost', /*authenticateToken,*/ companyOffers_controller_1.default.createOffer); // Swagger à faire + Ajouter protection si éléments manquants
// GET
router.get('/getPosts', auth_middleware_1.authenticateToken, companyOffers_controller_1.default.getOffers); // Swagger à faire 
router.get('/getPostById/:id', auth_middleware_1.authenticateToken, companyOffers_controller_1.default.getOfferById); // Swagger à faire 
router.get('/getPostWithCompanyInfo/:id', auth_middleware_1.authenticateToken, companyOffers_controller_1.default.getOfferWithCompanyInfo); // Swagger à faire
// PUT
router.put('/updatePost/:id', /*authenticateToken,*/ companyOffers_controller_1.default.updateOffer); // Swagger à faire 
// DELETE
router.delete('/deletePost/:id', auth_middleware_1.authenticateToken, companyOffers_controller_1.default.deleteOffer); // Swagger à faire 
exports.default = router;
