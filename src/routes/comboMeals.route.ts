import { Router } from 'express';
import { createComboMeal, getComboMeals, getComboMealById, updateComboMeal, deleteComboMeal } from '../controllers/ComboMealController';

const comboMealsRouter = Router();

comboMealsRouter.post('/', createComboMeal);
comboMealsRouter.get('/', getComboMeals);
comboMealsRouter.get('/:id', getComboMealById);
comboMealsRouter.put('/:id', updateComboMeal);
comboMealsRouter.delete('/:id', deleteComboMeal);

export default comboMealsRouter;