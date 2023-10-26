import {useEffect} from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import {getProducts, deleteProduct} from '../store/actions/productActions'
import {getCategories} from '../store/actions/categoryActions'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'

function Home (props) {
  useEffect (() => {
    props.getProducts()
    props.getCategories()
  }, [],)

  const history = useHistory()

  const deleteItem = (id) => {
    props.deleteProduct(id)
  }

  const openDetail = (id) => {
    history.push(`/detail/${id}`)
  }

  const {products} = props.productReducer
  console.log(products)

  let productRow = products.map(item => (
    <div className="col">
      <div className="card shadow-sm">
        <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
        <div className="card-body">
          <h3>{item.title}</h3>
          <p className="card-text">{item.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => openDetail(item.id)}>View</button>
              <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={()=> deleteItem(item.id)}>Delete</button>
            </div>
            <small className="text-muted">{item.created_at}</small>
          </div>
        </div>
      </div>
    </div>
  ))

  const {categories} = props.categoryReducer
  let categoryRow = categories.map(item => (
    <a href="#" className="btn btn-secondary m-2">{item.name}</a>
  ))

  return (
    <div>
      <Header/>
        <main>
          <section className="py-5 text-center container">
            <div className="row py-lg-5">
              <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">Album example</h1>
                <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                <p>
                  {categoryRow}
                </p>
              </div>
            </div>
          </section>  

          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {productRow}
              </div>
            </div>
          </div>
        </main>
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => ({ 
  categoryReducer: state.categoryReducer,
  productReducer: state.productReducer
})

export default connect(mapStateToProps, {getCategories, getProducts, deleteProduct})(Home)