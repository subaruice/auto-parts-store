export const getProductsByCategoryId = `
    SELECT 
    p.*, 
    pp.photoID AS picture_id,
    pp.filename,
    pp.thumbnail,
    pp.enlarged
    FROM avl_products p
    LEFT JOIN avl_product_pictures pp ON p.productID = pp.productID
    WHERE p.categoryID IN (
    SELECT categoryID
    FROM avl_categories
    WHERE parent = ? OR categoryID = ?
    )
`;

export const getProductById = `
  SELECT * FROM avl_products WHERE productID = ?
`;

export const getAllCategories = `
  SELECT categoryID, name, parent 
  FROM avl_categories 
  ORDER BY name, sort_order;
`;

export const getAllProducts = `
  SELECT 
    p.*, 
    pic.photoID AS picture_id, 
    pic.filename, 
    pic.thumbnail, 
    pic.enlarged 
  FROM avl_products p
  LEFT JOIN avl_product_pictures pic 
    ON p.productID = pic.productID
`;
