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
router.post(`/addPost`, auth_middleware_1.authenticateToken, companyOffers_controller_1.default.createOffer); // Ajouter protection si éléments manquants
// GET
router.get(`/getPosts`, auth_middleware_1.authenticateToken, companyOffers_controller_1.default.getOffers);
router.get(`/getPostById/:id`, auth_middleware_1.authenticateToken, companyOffers_controller_1.default.getOfferById);
router.get(`/getPostWithCompanyInfo/:id`, auth_middleware_1.authenticateToken, companyOffers_controller_1.default.getOfferWithCompanyInfo);
// PUT
router.put(`/updatePost/:id`, auth_middleware_1.authenticateToken, companyOffers_controller_1.default.updateOffer);
router.put(`/updatePostBody/:id`, auth_middleware_1.authenticateToken, companyOffers_controller_1.default.updateOfferBody);
// DELETE
router.delete(`/deletePost/:id`, auth_middleware_1.authenticateToken, (0, auth_middleware_1.authorizeRoles)(`superAdmin`), companyOffers_controller_1.default.deleteOffer);
exports.default = router;
