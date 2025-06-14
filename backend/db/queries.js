export const getProductsByCategoryId = `
    SELECT * FROM avl_products 
    WHERE categoryID IN (
        SELECT categoryID
        FROM avl_categories
        WHERE parent = ? OR categoryID = ?
    )
`;

export const getProductById = `
  SELECT * FROM avl_product WHERE productID = ?
`;

export const getAllCategories = `
  SELECT categoryID, name, parent 
  FROM avl_categories 
  ORDER BY parent, sort_order;
`;
