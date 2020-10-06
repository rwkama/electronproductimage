var axios = require('axios');
url = "http://productimageapi.herokuapp.com/";
async function addrequestp(imagenurl) {
     var data = JSON.stringify({ "imgproducto": imagenurl });

     var config = {
         method: 'get',
         url: url +"uploadproduct",
         headers: {
             'Content-Type': 'application/json'
         },
         data: data
     };
    const response = await axios(config);
    return response.data;
};
async function deleterequestp(id)
{
    try {
    var data = JSON.stringify({ "idproducto": id });

    var config = {
        method: 'get',
        url: url + "deleteproduct",
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    const response = await axios(config);
        return response.data;
    }
    catch (e) {
        console.error(e.message);
    }
}
async function listrequestp()  {
    try {
        var config = {
            method: 'get',
            url: url + "listproduct",
            headers: {}
        };
        const response = await axios(config);
        let array = []
        for (var p of response.data) {
            let product = new Producto(p.idproducto, p.imgproducto);
            array.push(product);
        }

        return array;
    }
    catch (e)
    {
        console.error(e.message);
    }
};
async function searchrequestp(id)
{
    try {
        var config = {
            method: 'get',
            url: url + "searchproduct/"+id,
            headers: {}
        };
        const p = await axios(config);
        let product = new Producto(p.data.idproducto, p.data.imgproducto);
        return product;
    }
    catch (e) {
        console.error(e.message);
    }
}
async function updaterequestp(id, image) {
    var data = JSON.stringify({ "idproducto": id, "imgproducto": image });

    var config = {
        method: 'get',
        url: url + "updateproduct",
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    const response = await axios(config);
    return response.data;
};
class Producto {
    idproducto = 0;
    imgproducto = "";

    getIdProducto() {
        return this.idproducto;
    }
    setIdProducto(x) {
        this.idproducto = x;
    }
    getImgProducto() {
        return this.imgproducto;
    }
    setImgProducto(x) {
        this.imgproducto = x;
    }
    constructor(idproducto, imgproducto) {
        this.setIdProducto(idproducto);
        this.setImgProducto(imgproducto);

    }
}


module.exports = { addrequestp, listrequestp, searchrequestp, deleterequestp, updaterequestp};
