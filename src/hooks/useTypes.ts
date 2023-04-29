export interface Item {
    _id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
  }

  // const { data: product } = useGetProductByIdQuery(id);

  // const idNumber = Number(id);
  // if (isNaN(idNumber) || id === undefined) {
  // // handle the case where the id is not a number or is undefined
  // } else {
  // const { data: product } = useGetProductByIdQuery(idNumber);
  // // rest of your code that uses the product data
  // }

  // const product = products?.find((p) => p._id === id);