const itemList = document.getElementsByClassName('cart-items')[0]
let contador = document.getElementById("carritoCompras");



let productosCarrito = [];



let productos = [
    {
      id: 1,
      titulo: "Camiseta deportiva",
      descripcion: "Camiseta de alto rendimiento diseñada para entrenamientos intensivos, con tejido transpirable y ligero."
    },
    {
      id: 2,
      titulo: "Auriculares inalámbricos",
      descripcion: "Auriculares Bluetooth con cancelación de ruido, sonido envolvente y batería de larga duración."
    },
    {
      id: 3,
      titulo: "Reloj inteligente",
      descripcion: "Reloj con pantalla táctil, monitor de frecuencia cardíaca y seguimiento de actividades físicas."
    },
    {
      id: 4,
      titulo: "Mochila ergonómica",
      descripcion: "Mochila con múltiples compartimentos, diseño ergonómico y material resistente al agua."
    }
  ];
  

  const contenedor = document.getElementById('contenedor'); 

  actualizar()
  mostrarProductos();

  function mostrarProductos(){
    productos.forEach(producto => {

        const card = document.createElement('div');
        card.className = 'card';
        card.id = producto.id
      
        
        const titulo = document.createElement('h2');
        titulo.className = 'titulo';
        titulo.textContent = producto.titulo;
     
        const descripcion = document.createElement('p');
        descripcion.className = 'descripcion';
        descripcion.textContent = producto.descripcion;
      
    
        const button = document.createElement('button');
        button.className = 'cart-button';
        button.textContent = 'add to cart';
      
        card.appendChild(titulo);
        card.appendChild(descripcion);
        card.appendChild(button);


        button.addEventListener("click",manejadorEvento);
        
       if( contenedor){
        contenedor.appendChild(card);
       }
      
      });
  }

  function manejadorEvento(e){

    const addCart = e.target;
    const card = addCart.parentElement;  
    const cardID = parseInt(card.id);

    console.log(cardID);
    guardarCarrito(cardID);

  }

  function actualizar(){
    productosCarrito = getCartItems()
    contador.textContent = productosCarrito.length;
  }



function getProductById(id){
  let productox = {};

    productos.forEach(producto =>{
        if(producto.id == id){
            productox = producto
        }

    })

    return productox
    
}

function guardarCarrito(id){
    productosCarrito = getCartItems();

    const product = getProductById(id)
    
    productosCarrito.push(product);
    localStorage.setItem("carrito", JSON.stringify(productosCarrito));

    actualizar();
}

if(itemList){
    mostrarCarrito()
}


function mostrarCarrito(){
    const productosCarrito = getCartItems();

    productosCarrito.forEach(producto => {
        const con = document.createElement('div');
              con.className = "item-carrito";

        const tit = document.createElement('h2');
        const delBtn = document.createElement('button')
              delBtn.textContent = "X";
              delBtn.className = "close-btn";

              delBtn.addEventListener("click", eliminarItemCarrito)
        con.id = producto.id;
        tit.textContent = producto.titulo;
        con.appendChild(tit);
        con.append(delBtn)
        itemList.appendChild(con);
        
    })
}

function eliminarItemCarrito(e){
      const productID = parseInt(e.target.parentElement.id);
      const producto = getProductById(productID);
      productosCarrito =  eliminarElemento(productosCarrito,producto); 
      
      localStorage.setItem("carrito", JSON.stringify(productosCarrito));
      itemList.removeChild(e.target.parentElement);

      actualizar();
}

function getCartItems(){
    return JSON.parse(localStorage.getItem("carrito")) || [];
}


function eliminarElemento(array, elementoEliminar) {
  let newArr = [];

  array.forEach(element => {
      element.id === elementoEliminar.id ? console.log("") : newArr.push(element);
  });

  return newArr;
}
