import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorMessage from '../components/ErrorMessage'

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        )
        if (!cancelled) {
          setProduct(response.data.product)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Could not load product details.')
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      cancelled = true
    }
  }, [barcode])

  const isSaved = saved.some(p => p.code === barcode)

  const handleSaveToggle = () => {
    if (isSaved) {
      dispatch({ type: 'REMOVE', code: barcode })
    } else {
      dispatch({ type: 'ADD', product: product })
    }
  }

  if (loading) return <div className="page"><p className="loading">Loading product details...</p></div>
  if (error) return <div className="page"><ErrorMessage message={error} /></div>
  if (!product) return <div className="page"><p>Product not found.</p></div>

  return (
    <div className="page">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-header">
        {product.image_url && (
          <img src={product.image_url} alt={product.product_name} className="detail-image" />
        )}
        <div className="detail-info">
          <h1>{product.product_name}</h1>
          {product.brands && <p className="detail-brand">{product.brands}</p>}
        </div>
      </div>

      <div className="nutrition-table">
        <h3>Nutrition per 100g</h3>
        <table>
          <tbody>
            {product.nutriments?.['energy-kcal_100g'] && (
              <tr>
                <td>Energy (kcal)</td>
                <td>{product.nutriments['energy-kcal_100g']}</td>
              </tr>
            )}
            {product.nutriments?.['proteins_100g'] && (
              <tr>
                <td>Protein</td>
                <td>{product.nutriments['proteins_100g']}g</td>
              </tr>
            )}
            {product.nutriments?.['carbohydrates_100g'] && (
              <tr>
                <td>Carbohydrates</td>
                <td>{product.nutriments['carbohydrates_100g']}g</td>
              </tr>
            )}
            {product.nutriments?.['fat_100g'] && (
              <tr>
                <td>Fat</td>
                <td>{product.nutriments['fat_100g']}g</td>
              </tr>
            )}
            {product.nutriments?.['fiber_100g'] && (
              <tr>
                <td>Fiber</td>
                <td>{product.nutriments['fiber_100g']}g</td>
              </tr>
            )}
            {product.nutriments?.['sugars_100g'] && (
              <tr>
                <td>Sugars</td>
                <td>{product.nutriments['sugars_100g']}g</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button className="save-button" onClick={handleSaveToggle}>
        {isSaved ? '★ Remove from Saved' : '☆ Save to My List'}
      </button>
    </div>
  )
}

export default DetailPage
