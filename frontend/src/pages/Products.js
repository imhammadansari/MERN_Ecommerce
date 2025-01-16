import axios from 'axios'
import React, { useState } from 'react'

function Products() {

  const [image, setimage] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [brand, setbrand] = useState("")
  const [description, setdescription] = useState("")
  const [color, setcolor] = useState("")
  const [material, setmaterial] = useState("")
  const [dimensions, setdimensions] = useState("")
  const [weight, setweight] = useState("")
  const [size, setsize] = useState("")
  const [discount, setdiscount] = useState("");
  const [category, setcategory] = useState("");
  const [bestseller, setbestseller] = useState("");
  const [unitcount, setunitcount] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("material", material);
    formData.append("color", color);
    formData.append("unitcount", unitcount);
    formData.append("dimensions", dimensions);
    formData.append("weight", weight);
    formData.append("size", size);
    formData.append("discount", discount);
    formData.append("bestseller", bestseller);
    formData.append("category", category);

    console.log(image, name, price, description, brand, discount, material, color, unitcount, dimensions, weight, size, 
      discount, category, bestseller);

    try {
      const response = await axios.post("http://localhost:8080/products/addproducts", 
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        alert("Product Added Successfully");
      }

      setimage("");
        setname("");
        setprice("");
        setdiscount("");
        setcategory("");
        setbrand("");
        setcolor("");
        setdescription("");
        setmaterial("");
        setsize("");
        setdimensions("");
        setweight("");

    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  return (
    <>
      <div className='w-full'>
        <div className='flex flex-col items-start px-10 py-4'>
          <h1 className='font-bold text-xl'>Add Products</h1>
          <form className='mt-6 flex flex-col gap-3' onSubmit={submit}>

            <input className='text-xs' type='file' name='image' onChange={(e) => {
              setimage(e.target.files[0]);
            }} />
            <input className='w-96 p-1 bg-black bg-opacity-10' type='text' placeholder='Enter Title' name='title' onChange={(e) => {
              setname(e.target.value);
            }} />
            <input className='w-96 p-1 bg-black bg-opacity-10' type='number' placeholder='Enter Price' name='price' onChange={(e) => {
              setprice(e.target.value);
            }} />
            <input className='w-96 p-1 bg-black bg-opacity-10' type='number' placeholder='Enter Discount' name='discount' onChange={(e) => {
              setdiscount(e.target.value);
            }} />
            
            <input className='w-96 p-1 bg-black bg-opacity-10' type='text' placeholder='Enter Brand' name='brand' onChange={(e) => {
              setbrand(e.target.value);
            }} />
            
            <input className='w-96 p-1 bg-black bg-opacity-10' type='text' placeholder='Enter color' name='color' onChange={(e) => {
              setcolor(e.target.value);
            }} />
            
            <input className='w-96 p-1 bg-black bg-opacity-10' type='text' placeholder='Enter unitcount' name='unitcount' onChange={(e) => {
              setunitcount(e.target.value);
            }} />
            
            <input className='w-96 p-1 bg-black bg-opacity-10' type='text' placeholder='Enter Material' name='material' onChange={(e) => {
              setmaterial(e.target.value);
            }} />
            
            <input className='w-96 p-1 bg-black bg-opacity-10' type='text' placeholder='Enter Dimensions' name='dimensions' onChange={(e) => {
              setdimensions(e.target.value);
            }} />
            
            <input className='w-96 p-1 bg-black bg-opacity-10' type='text' placeholder='Enter Weight' name='weight' onChange={(e) => {
              setweight(e.target.value);
            }} />
            
            <input className='w-96 p-1 bg-black bg-opacity-10' type='text' placeholder='Enter Size' name='size' onChange={(e) => {
              setsize(e.target.value);
            }} />
            
            <input className='w-96 p-1 bg-black bg-opacity-10' type='text' placeholder='Enter Description' name='description' onChange={(e) => {
              setdescription(e.target.value);
            }} />

            <input className='w-96 p-1 bg-black bg-opacity-10' type='text' placeholder='Enter Bestseller' name='bestseller' onChange={(e) => {
              setbestseller(e.target.value);
            }} />

            
            <select className='bg-black bg-opacity-10 p-1' onChange={(e) => {
              setcategory(e.target.value);
            }}>
              <option value="">Select Category</option>
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

            <button type='submit' className='w-32 h-9 mt-5 bg-black bg-opacity-10'>Add Product</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Products;
