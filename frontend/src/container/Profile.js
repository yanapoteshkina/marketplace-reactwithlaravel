import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Header from '../component/Header'
import {Modal, Button, Form} from 'react-bootstrap'
import {getCategories} from '../store/actions/categoryActions'
import {connect} from 'react-redux'
import {addProducts, getProducts} from '../store/actions/productActions'
import { propTypes } from 'react-bootstrap/esm/Image'

function Profile (props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history = useHistory()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [img, setImg] = useState('')
    const [like, setLike] = useState('')
    const [dislike, setDislike] = useState('')
    const [category_id, setCategoryId] = useState('')

    const addProduct = () => {
        let productData = {
            title: title,
            description: description,
            price: price,
            img: img,
            like: like,
            dislike: dislike,
            category_id : category_id
        }
       props.addProducts(productData, history) 
    }

    useEffect(()=> {
        props.getCategories()
    }, [],)

    const {categories} = props.categoryReducer
    console.log(categories)

    let categoryRow = categories.map(item => (
        <option value={item.id}>{item.name}</option>
    ))

    return (
        <div>
            <Header />
            <div className="row container mt-5">
                <div className="col-md-4">
                    <div className="card" style={{width: "10rem;"}}>
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="card-img-top" alt="..." style={{width: "25rem"}}/>
                        <div className="card-body">
                            <h5 className="card-title">Name: {localStorage.username}</h5>
                            <p className="card-text">Email: {localStorage.email}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <button className="btn btn-primary" onClick={handleShow}>Add product</button>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" onChange={(e) => setTitle(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Img</Form.Label>
                            <Form.Control type="text" placeholder="Enter img" onChange={(e) => setImg(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter price" onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Category" onChange ={(e) => setCategoryId(e.target.value)}>
                                {categoryRow}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Like</Form.Label>
                            <Form.Control type="number" placeholder="Enter like" onChange={(e) => setLike(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Dislike</Form.Label>
                            <Form.Control type="number" placeholder="Enter dislike" onChange={(e) => setDislike(e.target.value)}/>
                        </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=> addProduct()}>
                        Save 
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({ 
    categoryReducer: state.categoryReducer,
    productReducer: state.productReducer
})

export default connect(mapStateToProps, {getCategories, getProducts, addProducts})(Profile)