/**
 * @swagger
 * components:
 *   schemas:
 *     ModifierType:
 *       type: string
 *       enum: [ADDON, REPLACEMENT, SIZE, EXTRA]
 *       description: Type of modifier
 *     CreateMenuItemRequest:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - categoryId
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           maxLength: 200
 *           description: Name of the menu item
 *           example: "Margherita Pizza"
 *         description:
 *           type: string
 *           maxLength: 1000
 *           nullable: true
 *           description: Description of the menu item
 *           example: "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil"
 *         price:
 *           type: number
 *           minimum: 0.01
 *           maximum: 9999999.99
 *           multipleOf: 0.01
 *           description: Price of the menu item
 *           example: 15.99
 *         image:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: URL of the menu item image
 *           example: "https://example.com/pizza.jpg"
 *         categoryId:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *           description: Category ID of the menu item
 *           example: "pizza"
 *         isAvailable:
 *           type: boolean
 *           default: true
 *           description: Whether the menu item is available
 *           example: true
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           multipleOf: 0.1
 *           nullable: true
 *           description: Rating of the menu item
 *           example: 4.5
 *         prepTime:
 *           type: integer
 *           minimum: 0
 *           maximum: 300
 *           nullable: true
 *           description: Preparation time in minutes
 *           example: 15
 *         calories:
 *           type: integer
 *           minimum: 0
 *           maximum: 10000
 *           nullable: true
 *           description: Calories in the menu item
 *           example: 450
 *         isVegetarian:
 *           type: boolean
 *           default: false
 *           description: Whether the menu item is vegetarian
 *           example: true
 *         isVegan:
 *           type: boolean
 *           default: false
 *           description: Whether the menu item is vegan
 *           example: false
 *         isGlutenFree:
 *           type: boolean
 *           default: false
 *           description: Whether the menu item is gluten-free
 *           example: false
 *         isSpicy:
 *           type: boolean
 *           default: false
 *           description: Whether the menu item is spicy
 *           example: false
 *         sortOrder:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *           description: Sort order for display
 *           example: 1
 *     UpdateMenuItemRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           maxLength: 200
 *           description: Name of the menu item
 *         description:
 *           type: string
 *           maxLength: 1000
 *           nullable: true
 *           description: Description of the menu item
 *         price:
 *           type: number
 *           minimum: 0.01
 *           maximum: 9999999.99
 *           multipleOf: 0.01
 *           description: Price of the menu item
 *         image:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: URL of the menu item image
 *         categoryId:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *           description: Category ID of the menu item
 *         isAvailable:
 *           type: boolean
 *           description: Whether the menu item is available
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           multipleOf: 0.1
 *           nullable: true
 *           description: Rating of the menu item
 *         prepTime:
 *           type: integer
 *           minimum: 0
 *           maximum: 300
 *           nullable: true
 *           description: Preparation time in minutes
 *         calories:
 *           type: integer
 *           minimum: 0
 *           maximum: 10000
 *           nullable: true
 *           description: Calories in the menu item
 *         isVegetarian:
 *           type: boolean
 *           description: Whether the menu item is vegetarian
 *         isVegan:
 *           type: boolean
 *           description: Whether the menu item is vegan
 *         isGlutenFree:
 *           type: boolean
 *           description: Whether the menu item is gluten-free
 *         isSpicy:
 *           type: boolean
 *           description: Whether the menu item is spicy
 *         sortOrder:
 *           type: integer
 *           minimum: 0
 *           description: Sort order for display
 *     MenuItemResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the menu item
 *         name:
 *           type: string
 *           description: Name of the menu item
 *         description:
 *           type: string
 *           nullable: true
 *           description: Description of the menu item
 *         price:
 *           type: number
 *           description: Price of the menu item
 *         image:
 *           type: string
 *           nullable: true
 *           description: URL of the menu item image
 *         categoryId:
 *           type: string
 *           description: Category ID of the menu item
 *         isAvailable:
 *           type: boolean
 *           description: Whether the menu item is available
 *         rating:
 *           type: number
 *           nullable: true
 *           description: Rating of the menu item
 *         prepTime:
 *           type: integer
 *           nullable: true
 *           description: Preparation time in minutes
 *         calories:
 *           type: integer
 *           nullable: true
 *           description: Calories in the menu item
 *         isVegetarian:
 *           type: boolean
 *           description: Whether the menu item is vegetarian
 *         isVegan:
 *           type: boolean
 *           description: Whether the menu item is vegan
 *         isGlutenFree:
 *           type: boolean
 *           description: Whether the menu item is gluten-free
 *         isSpicy:
 *           type: boolean
 *           description: Whether the menu item is spicy
 *         sortOrder:
 *           type: integer
 *           description: Sort order for display
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 * /api/v1/menu-items:
 *   get:
 *     tags:
 *       - Menu Items
 *     summary: Get all menu items
 *     description: Retrieve all menu items with optional filtering and pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 100
 *         description: Number of items per page
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by category ID
 *       - in: query
 *         name: isAvailable
 *         schema:
 *           type: boolean
 *         description: Filter by availability
 *       - in: query
 *         name: isVegetarian
 *         schema:
 *           type: boolean
 *         description: Filter by vegetarian items
 *       - in: query
 *         name: isVegan
 *         schema:
 *           type: boolean
 *         description: Filter by vegan items
 *       - in: query
 *         name: isGlutenFree
 *         schema:
 *           type: boolean
 *         description: Filter by gluten-free items
 *       - in: query
 *         name: isSpicy
 *         schema:
 *           type: boolean
 *         description: Filter by spicy items
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           maxLength: 100
 *         description: Search term for name/description
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, price, rating, createdAt, sortOrder]
 *           default: sortOrder
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort order direction
 *     responses:
 *       200:
 *         description: Menu items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Menu items retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MenuItemResponse'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *   post:
 *     tags:
 *       - Menu Items
 *     summary: Create a new menu item
 *     description: Create a new menu item entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMenuItemRequest'
 *           examples:
 *             example1:
 *               summary: Basic menu item
 *               value:
 *                 name: "Margherita Pizza"
 *                 description: "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil"
 *                 price: 15.99
 *                 categoryId: "pizza"
 *                 isVegetarian: true
 *                 prepTime: 15
 *                 calories: 450
 *     responses:
 *       201:
 *         description: Menu item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Menu item created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/MenuItemResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 */

/**
 * @swagger
 * /api/v1/menu-items/{id}:
 *   get:
 *     tags:
 *       - Menu Items
 *     summary: Get menu item by ID
 *     description: Retrieve a specific menu item by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu item unique identifier
 *     responses:
 *       200:
 *         description: Menu item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Menu item retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/MenuItemResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *   put:
 *     tags:
 *       - Menu Items
 *     summary: Update a menu item
 *     description: Update an existing menu item by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu item unique identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMenuItemRequest'
 *           examples:
 *             example1:
 *               summary: Update menu item price and availability
 *               value:
 *                 price: 17.99
 *                 isAvailable: false
 *             example2:
 *               summary: Update menu item details
 *               value:
 *                 name: "Supreme Pizza"
 *                 description: "Pizza with pepperoni, sausage, bell peppers, onions, and mushrooms"
 *                 price: 19.99
 *                 prepTime: 20
 *                 calories: 650
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Menu item updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/MenuItemResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *   delete:
 *     tags:
 *       - Menu Items
 *     summary: Delete a menu item
 *     description: Remove a menu item by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu item unique identifier
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Menu item deleted successfully"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategoryRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           maxLength: 100
 *           description: Name of the category
 *           example: "Pizza"
 *         description:
 *           type: string
 *           maxLength: 500
 *           nullable: true
 *           description: Description of the category
 *           example: "Various types of delicious pizzas"
 *         sortOrder:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *           description: Sort order for display
 *           example: 1
 *     UpdateCategoryRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           maxLength: 100
 *           description: Name of the category
 *         description:
 *           type: string
 *           maxLength: 500
 *           nullable: true
 *           description: Description of the category
 *         isActive:
 *           type: boolean
 *           description: Whether the category is active
 *         sortOrder:
 *           type: integer
 *           minimum: 0
 *           description: Sort order for display
 *     CategoryResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the category
 *         name:
 *           type: string
 *           description: Name of the category
 *         description:
 *           type: string
 *           nullable: true
 *           description: Description of the category
 *         isActive:
 *           type: boolean
 *           description: Whether the category is active
 *         sortOrder:
 *           type: integer
 *           description: Sort order for display
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 * /api/v1/categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get all categories
 *     description: Retrieve all categories with optional filtering and pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of categories per page
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for name/description
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, createdAt, sortOrder]
 *           default: sortOrder
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort order direction
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Categories retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CategoryResponse'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create a new category
 *     description: Create a new category entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryRequest'
 *           examples:
 *             example1:
 *               summary: Basic category
 *               value:
 *                 name: "Pizza"
 *                 description: "Various types of delicious pizzas"
 *                 sortOrder: 1
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/CategoryResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 */

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get category by ID
 *     description: Retrieve a specific category by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Category unique identifier
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/CategoryResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *   put:
 *     tags:
 *       - Categories
 *     summary: Update a category
 *     description: Update an existing category by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Category unique identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategoryRequest'
 *           examples:
 *             example1:
 *               summary: Update category name
 *               value:
 *                 name: "Italian Pizza"
 *                 description: "Authentic Italian-style pizzas"
 *             example2:
 *               summary: Deactivate category
 *               value:
 *                 isActive: false
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/CategoryResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete a category
 *     description: Remove a category by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Category unique identifier
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category deleted successfully"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateModifierRequest:
 *       type: object
 *       required:
 *         - name
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           maxLength: 100
 *           description: Name of the modifier
 *           example: "Extra Cheese"
 *         price:
 *           type: number
 *           minimum: 0
 *           maximum: 9999999.99
 *           multipleOf: 0.01
 *           default: 0
 *           description: Additional price for the modifier
 *           example: 2.50
 *         type:
 *           $ref: '#/components/schemas/ModifierType'
 *           example: "ADDON"
 *         description:
 *           type: string
 *           maxLength: 500
 *           nullable: true
 *           description: Description of the modifier
 *           example: "Add extra cheese to your item"
 *         isAvailable:
 *           type: boolean
 *           default: true
 *           description: Whether the modifier is available
 *     UpdateModifierRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           maxLength: 100
 *           description: Name of the modifier
 *         price:
 *           type: number
 *           minimum: 0
 *           maximum: 9999999.99
 *           multipleOf: 0.01
 *           description: Additional price for the modifier
 *         type:
 *           $ref: '#/components/schemas/ModifierType'
 *         description:
 *           type: string
 *           maxLength: 500
 *           nullable: true
 *           description: Description of the modifier
 *         isAvailable:
 *           type: boolean
 *           description: Whether the modifier is available
 *     ModifierResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the modifier
 *         name:
 *           type: string
 *           description: Name of the modifier
 *         price:
 *           type: number
 *           description: Additional price for the modifier
 *         type:
 *           $ref: '#/components/schemas/ModifierType'
 *         description:
 *           type: string
 *           nullable: true
 *           description: Description of the modifier
 *         isAvailable:
 *           type: boolean
 *           description: Whether the modifier is available
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 * /api/v1/modifiers:
 *   get:
 *     tags:
 *       - Modifiers
 *     summary: Get all modifiers
 *     description: Retrieve all modifiers with optional filtering and pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of modifiers per page
 *       - in: query
 *         name: type
 *         schema:
 *           $ref: '#/components/schemas/ModifierType'
 *         description: Filter by modifier type
 *       - in: query
 *         name: isAvailable
 *         schema:
 *           type: boolean
 *         description: Filter by availability
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           maxLength: 100
 *         description: Search term for name/description
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, price, type, createdAt]
 *           default: name
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort order direction
 *     responses:
 *       200:
 *         description: Modifiers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Modifiers retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ModifierResponse'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *   post:
 *     tags:
 *       - Modifiers
 *     summary: Create a new modifier
 *     description: Create a new modifier entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateModifierRequest'
 *           examples:
 *             example1:
 *               summary: Extra topping
 *               value:
 *                 name: "Extra Cheese"
 *                 price: 2.50
 *                 type: "ADDON"
 *                 description: "Add extra cheese to your item"
 *     responses:
 *       201:
 *         description: Modifier created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Modifier created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/ModifierResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 */

/**
 * @swagger
 * /api/v1/modifiers/{id}:
 *   get:
 *     tags:
 *       - Modifiers
 *     summary: Get modifier by ID
 *     description: Retrieve a specific modifier by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Modifier unique identifier
 *     responses:
 *       200:
 *         description: Modifier retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Modifier retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/ModifierResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *   put:
 *     tags:
 *       - Modifiers
 *     summary: Update a modifier
 *     description: Update an existing modifier by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Modifier unique identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateModifierRequest'
 *           examples:
 *             example1:
 *               summary: Update modifier price
 *               value:
 *                 price: 3.00
 *                 isAvailable: true
 *     responses:
 *       200:
 *         description: Modifier updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Modifier updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/ModifierResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *   delete:
 *     tags:
 *       - Modifiers
 *     summary: Delete a modifier
 *     description: Remove a modifier by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Modifier unique identifier
 *     responses:
 *       200:
 *         description: Modifier deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Modifier deleted successfully"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateComboMealRequest:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - categoryId
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           description: Name of the combo meal
 *           example: "Big Mac Meal"
 *         description:
 *           type: string
 *           nullable: true
 *           description: Description of the combo meal
 *           example: "Big Mac burger with fries and drink"
 *         price:
 *           type: number
 *           minimum: 0
 *           description: Price of the combo meal
 *           example: 12.99
 *         image:
 *           type: string
 *           nullable: true
 *           description: URL of the combo meal image
 *         categoryId:
 *           type: string
 *           format: uuid
 *           description: Category ID of the combo meal
 *         isAvailable:
 *           type: boolean
 *           default: true
 *           description: Whether the combo meal is available
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           multipleOf: 0.1
 *           nullable: true
 *           description: Rating of the combo meal
 *         prepTime:
 *           type: integer
 *           minimum: 0
 *           nullable: true
 *           description: Preparation time in minutes
 *         calories:
 *           type: integer
 *           minimum: 0
 *           nullable: true
 *           description: Calories in the combo meal
 *     UpdateComboMealRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           description: Name of the combo meal
 *         description:
 *           type: string
 *           nullable: true
 *           description: Description of the combo meal
 *         price:
 *           type: number
 *           minimum: 0
 *           description: Price of the combo meal
 *         image:
 *           type: string
 *           nullable: true
 *           description: URL of the combo meal image
 *         categoryId:
 *           type: string
 *           format: uuid
 *           description: Category ID of the combo meal
 *         isAvailable:
 *           type: boolean
 *           description: Whether the combo meal is available
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           multipleOf: 0.1
 *           nullable: true
 *           description: Rating of the combo meal
 *     ComboMealResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the combo meal
 *         name:
 *           type: string
 *           description: Name of the combo meal
 *         description:
 *           type: string
 *           nullable: true
 *           description: Description of the combo meal
 *         price:
 *           type: number
 *           description: Price of the combo meal
 *         image:
 *           type: string
 *           nullable: true
 *           description: URL of the combo meal image
 *         isAvailable:
 *           type: boolean
 *           description: Whether the combo meal is available
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 * /api/v1/combo-meals:
 *   get:
 *     tags:
 *       - Combo Meals
 *     summary: Get all combo meals
 *     description: Retrieve all combo meals with optional filtering and pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of combo meals per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for name/description
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, createdAt, sortOrder]
 *           default: sortOrder
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort order direction
 *     responses:
 *       200:
 *         description: Combo meals retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Combo meals retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ComboMealResponse'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *   post:
 *     tags:
 *       - Combo Meals
 *     summary: Create a new combo meal
 *     description: Create a new combo meal entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateComboMealRequest'
 *           examples:
 *             example1:
 *               summary: Basic combo meal
 *               value:
 *                 name: "Big Mac Meal"
 *                 description: "Big Mac burger with fries and drink"
 *                 price: 12.99
 *                 categoryId: "burger-combos"
 *                 prepTime: 10
 *                 calories: 850
 *     responses:
 *       201:
 *         description: Combo meal created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Combo meal created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/ComboMealResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 */

/**
 * @swagger
 * /api/v1/combo-meals/{id}:
 *   get:
 *     tags:
 *       - Combo Meals
 *     summary: Get combo meal by ID
 *     description: Retrieve a specific combo meal by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Combo meal unique identifier
 *     responses:
 *       200:
 *         description: Combo meal retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Combo meal retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/ComboMealResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *   put:
 *     tags:
 *       - Combo Meals
 *     summary: Update a combo meal
 *     description: Update an existing combo meal by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Combo meal unique identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateComboMealRequest'
 *           examples:
 *             example1:
 *               summary: Update combo meal price
 *               value:
 *                 price: 14.99
 *                 isAvailable: true
 *     responses:
 *       200:
 *         description: Combo meal updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Combo meal updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/ComboMealResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *   delete:
 *     tags:
 *       - Combo Meals
 *     summary: Delete a combo meal
 *     description: Remove a combo meal by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Combo meal unique identifier
 *     responses:
 *       200:
 *         description: Combo meal deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Combo meal deleted successfully"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 */

export {};
