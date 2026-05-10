

const args = process.argv.slice(2); 

const method = args[0]?.toLowerCase();

switch (method) {
  case 'get':
    get(args[1]);// uso el índice 1 para pasar solo los argumentos después del método
    break;
  case 'post':
    post(args.slice(1));// uso slice para quitar "post" y pasar todos los demás argumentos a la función
    break;
    case 'delete':
    deleteIt(args[1]);// es igual que get
    break;
  default:
    console.error('Es necesario especificar un método válido: get, post o delete. Usaste: ' + method);
    
    process.exit(1);
}


function get(args) {
  
  if (args === "products") {// catálogo  completo
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => console.log(data));
  } else if (args.includes("products/")) {// producto específico
    const productId = args.split("/")[1];
    if (productId <= 0 || isNaN(productId)) {
      console.error('El ID del producto debe ser un número positivo. Ejemplo: get products/1');
      process.exit(1);
    }
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(response => response.json())
      .then(data => console.log(data));
  } else {
    
      console.error('Los argumentos para el método "get" son inválidos. Debe ser "products" o "products/{id}".');
      process.exit(1);
  }
}


function post(args) {
  
  const product = { 
    title: args[1], 
    price: args[2], 
    category: args[3] 
  };

  if (!product.title || !product.price || !product.category) {
    console.error('Para el método "post" se requieren los argumentos: title, price y category. Ejemplo: post "Nuevo Producto" 19.99 "Categoría del producto".');
    process.exit(1);
  }

  fetch('https://fakestoreapi.com/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(product)
})
  .then(response => response.json())
  .then(data => console.log(`id: ${data.id}, title: '${data.title}', price: '${data.price}', category: "${data.category}"`));
}

function deleteIt(args) {

  if (args.includes("products/")) {
    const productId = args.split("/")[1];
    if (productId <= 0 || isNaN(productId)) {
      console.error('El ID del producto debe ser un número positivo. Ejemplo: delete products/1');
      process.exit(1);
    }
    fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => console.log(`id: ${data.id}, title: '${data.title}', price: ${data.price}, category: "${data.category}"`));
  }
}