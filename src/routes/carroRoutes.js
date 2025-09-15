import express from "express";
import { 
    getAllCarros, getCarrosById, createCarro, deleteCarro, updateCarro} from "../controllers/carroControllers.js";

const router = express.Router();

router.get("/", getAllCarros);
router.get("/:id", getCarrosById);
router.post("/", createCarro);
router.delete("/:id", deleteCarro);
router.put("/:id", updateCarro);

export default router;