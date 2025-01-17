import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProducts() {
  const { id } = useParams(); // Get product ID from the URL
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [description, setdescription] = useState('');
  const [brand, setbrand] = useState('');
  const [material, setmaterial] = useState('');
  const [color, setcolor] = useState('');
  const [unitcount, setunitcount] = useState('');
  const [dimensions, setdimensions] = useState('');
  const [weight, setweight] = useState('');
  const [size, setsize] = useState('');
  const [discount, setdiscount] = useState('');
  const [category, setcategory] = useState('');
  const [bestseller, setbestseller] = useState(false);


  axios.defaults.withCredentials = true;

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/items/${id}`);
      const productDetails = response.data.product;

      if (productDetails) {
        setname(productDetails.name);
        setprice(productDetails.price);
        setdescription(productDetails.description);
        setbrand(productDetails.brand);
        setmaterial(productDetails.material);
        setcolor(productDetails.color);
        setunitcount(productDetails.unitcount);
        setdimensions(productDetails.dimensions);
        setweight(productDetails.weight);
        setsize(productDetails.size);
        setdiscount(productDetails.discount);
        setcategory(productDetails.category);
        setbestseller(productDetails.bestseller);
      } else {
        alert('Product not found.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          alert('Admin must be logged in');
        } else {
          alert('Something went wrong');
        }
      }
      console.log(error.response?.data || error.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('brand', brand);
    formData.append('material', material);
    formData.append('color', color);
    formData.append('unitcount', unitcount);
    formData.append('dimensions', dimensions);
    formData.append('weight', weight);
    formData.append('size', size);
    formData.append('discount', discount);
    formData.append('category', category);
    formData.append('bestseller', bestseller ? 'true' : 'false');

    try {
      const response = await axios.post(
        `http://localhost:8080/products/editproduct/${id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.status === 200) {
        alert('Product updated successfully');
        setname('');
        setprice('');
        setdescription('');
        setbrand('');
        setmaterial('');
        setcolor('');
        setunitcount('');
        setdimensions('');
        setweight('');
        setsize('');
        setdiscount('');
        setcategory('');
        setbestseller(false);
        navigate('/allproducts');
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <div className="px-8 py-4">
      <h1 className="text-2xl font-bold">Edit Product</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col py-4 gap-4">
        <div className='flex gap-2'>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          placeholder="Product Name"
          className="w-1/2 lg:w-[40rem] p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setprice(e.target.value)}
          placeholder="Price"
          className="w-1/2 lg:w-[40rem] p-2 border rounded"
        />

        </div>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          placeholder="Description"
          className="p-2 border rounded"
        />
        <div className='flex gap-2'>
        <input
          type="text"
          name="brand"
          value={brand}
          onChange={(e) => setbrand(e.target.value)}
          placeholder="Brand"
          className="w-1/2 lg:w-[40rem] p-2 border rounded"
        />
        <input
          type="text"
          name="material"
          value={material}
          onChange={(e) => setmaterial(e.target.value)}
          placeholder="Material"
          className="w-1/2 lg:w-[40rem] p-2 border rounded"
        />

        </div>

        <div className='flex gap-2'>
        <input
          type="text"
          name="color"
          value={color}
          onChange={(e) => setcolor(e.target.value)}
          placeholder="Color"
          className="w-1/2 lg:w-[40rem] p-2 border rounded"
        />
        <input
          type="number"
          name="unitcount"
          value={unitcount}
          onChange={(e) => setunitcount(e.target.value)}
          placeholder="Unit Count"
          className="w-1/2 lg:w-[40rem] p-2 border rounded"
        />
        </div>

        <div className='flex gap-2'>
        <input
          type="text"
          name="dimensions"
          value={dimensions}
          onChange={(e) => setdimensions(e.target.value)}
          placeholder="Dimensions"
          className="w-1/2 lg:w-[40rem] p-2 border rounded"
        />
        <input
          type="text"
          name="weight"
          value={weight}
          onChange={(e) => setweight(e.target.value)}
          placeholder="Weight"
          className="w-1/2 lg:w-[40rem] p-2 border rounded"
        />
        </div>

        <div className='flex gap-2'>
        <input
          type="text"
          name="size"
          value={size}
          onChange={(e) => setsize(e.target.value)}
          placeholder="Size"
          className="w-1/2 lg:w-[40rem] p-2 border rounded"
        />
        <input
          type="number"
          name="discount"
          value={discount}
          onChange={(e) => setdiscount(e.target.value)}
          placeholder="Discount"
          className="w-1/2 lg:w-[40rem] p-2 border rounded"
        />
        </div>

        <div className='flex gap-2'>
        <select className='w-1/2 lg:w-[40rem] p-2 border rounded' onChange={(e) => {
              setcategory(e.target.value);
            }}>
              <option value= {category}>{category}</option>
  <option value="Kitchen Accessories">Kitchen Accessories</option>
  <option value="Men Fashion">Men Fashion</option>
  <option value="Men Jeans">Men Jeans</option>
  <option value="Men Shoes">Men Shoes</option>
  <option value="Men Watches">Men Watches</option>
  <option value="Electronics">Electronics</option>
  <option value="Women Fashion">Women Fashion</option>
  <option value="Women Shoes">Women Shoes</option>
  <option value="Household Accessories">Household Accessories</option>
  <option value="Sports & Outdoors">Sports & Outdoors</option>
            </select>

        <label className='flex items-center gap-2'>
          <input 
            type="checkbox"
            name="bestseller"
            checked={bestseller}
            onChange={(e) => setbestseller(e.target.checked)}
          />
          Bestseller
        </label>
        </div>
        <button type="submit" className="w-32 bg-green-500 text-white p-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProducts;
