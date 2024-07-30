import React from "react";
//example of class components


class Product extends React.Component {
    componentWillUnmount() {
        console.log('UNMOUNT!');
    }

    render() {
        const { title, price } = this.props.product;
        const { isOpen } = this.props;
        if (!isOpen) return null;  // If not open, render nothing
        return (
            <div>{title} - {price}</div>
        );
    }
}

class Products extends React.Component {
    constructor(props) {
        console.log('constructor method!');
        super(props);
        this.state = {
            products: [],
            isLoading: true,
            error: '',
            count: 0,
            isOpen: true
        };
    }

    componentDidMount() {
        const getProducts = () => {
            this.setState({ isLoading: true });
            fetch('https://fakestoreapi.com/products')
                .then(data => {
                    console.log('component did mount method!');
                    return data.json();
                })
                .then(products => this.setState({ products: products, error: '' }))
                .catch((error) => this.setState({ error: error.message }))
                .finally(() => this.setState({ isLoading: false }));
        }
        getProducts();
    }

    handleClick = () => {
        this.setState((prevState) => ({ count: prevState.count + 1 }));
    }

    componentDidUpdate() {
        console.log('update!');
    }

    handleRemove = () => {
        this.setState({ isOpen: false });
    }

    render() {
        console.log('render method!');
        const { isLoading, error, products, count, isOpen } = this.state;

        if (isLoading) return (<div>Loading...</div>);
        if (error) return <div>Error: {error}</div>;

        return (
            <>
                { isOpen && <ul>
                    {products.map((product) => (
                        <Product key={product.id} isOpen={isOpen} product={product} />
                    ))}
                </ul>}
                <button onClick={this.handleClick}>Click {count} times</button>
                <button onClick={this.handleRemove}>Clear</button>
            </>
        );
    }
}

export default Products;
