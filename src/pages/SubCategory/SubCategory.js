import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ProductCard from "../../Components/cards/ProductCard"
import { getSub } from "../../Components/functions/SubCategory"
import Layout from "../../Components/Layout/Layout"
import Seo from "../../Components/seo/Seo"
import LOGO from "../../images/logo.png"

const SubCategory = ({ match }) => {
    const [category, setCategory] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const { slug } = match.params
    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        setLoading(true)
        getSub(slug).then((res) => {
            setProducts(res.data.products)
            setCategory(res.data.sub)
            setLoading(false)
        })
    }, [])
    return (
        <>
            <Layout>
                <div className="m-5">
                    <Seo

                    />
                    <div className="container">
                        <div className="row">
                            <h4>{loading ? (<div style={{ textAlign: "center" }}>
                                <div style={{ marginBottom: "10rem" }} />
                                <img
                                    style={{ borderRadius: "15rem" }}
                                    className="shadow-lg img-thumbnail"
                                    src={LOGO}
                                    alt="Aquakrt Logo"
                                />
                                <div style={{ marginBottom: "2rem" }} />
                                <span class="loader">
                                    <span class="loader-inner"></span>
                                </span>
                            </div>) : (
                                <h1 className="text-center m-5">{products.length} Products in {category.name}</h1>
                            )}</h4>
                            <hr />
                            <div className="row">
                                {products.map((p, i) => (
                                    <div key={i} className="col-md-4">
                                        <ProductCard product={p} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </Layout>
        </>
    )
}
export default SubCategory