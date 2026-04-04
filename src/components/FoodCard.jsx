function FoodCard({ product }) {
  const { product_name, brands, nutriments, image_small_url } = product

  return (
    <div className="food-card">
      {image_small_url && (
        <img src={image_small_url} alt={product_name} className="card-image" />
      )}
      <div className="card-content">
        <h2>{product_name || 'Unknown Product'}</h2>
        {brands && <p className="brand">{brands}</p>}
        <div className="nutrition-info">
          {nutriments?.['energy-kcal_100g'] && (
            <p>
              <strong>Calories:</strong> {nutriments['energy-kcal_100g']} kcal
            </p>
          )}
          {nutriments?.['proteins_100g'] && (
            <p>
              <strong>Protein:</strong> {nutriments['proteins_100g']}g
            </p>
          )}
          {nutriments?.['carbohydrates_100g'] && (
            <p>
              <strong>Carbs:</strong> {nutriments['carbohydrates_100g']}g
            </p>
          )}
          {nutriments?.['fat_100g'] && (
            <p>
              <strong>Fat:</strong> {nutriments['fat_100g']}g
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FoodCard
