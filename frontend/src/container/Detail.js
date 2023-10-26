import Header from '../component/Header'
import Footer from '../component/Footer'
import {getProductById} from '../store/actions/productActions'
import {connect} from 'react-redux'
import { useEffect } from 'react'

function Detail (props){
    useEffect(() => {
        props.getProductById(props.match.params.id)
    }, [],)

    const {product} = props.productReducer
    
    return (
        <div>
            <Header/>
            <div class="p-5 my-4 bg-light rounded-3">
                <div class="container-fluid py-5">
                    <h1 class="display-5 fw-bold">{product?.product?.title}</h1>
                    <p class="col-md-8 fs-4">{product?.product?.description}</p>
                    <button class="btn btn-primary btn-lg" type="button">Example button</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

const mapStateToProps = (state) => ({ 
    productReducer: state.productReducer
})

export default connect(mapStateToProps, {getProductById})(Detail)