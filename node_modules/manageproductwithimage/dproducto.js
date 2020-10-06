var mysql = require('mysql');
const util = require('util');


const con = mysql.createConnection({
    host: "sql10.freemysqlhosting.net",
    user: "sql10366350",
    password: "Df4sZVtIV8",
    database: "sql10366350"

});

const utliquery = util.promisify(con.query).bind(con);

const getProductos = async () => {
    sqllist = "select * from Producto";
    let rows = await utliquery(sqllist);
    let array = [];
    for (var x of rows) {
        objecto = new Producto(x.IdProducto, x.ImgProducto);
        array.push(objecto);
    }
    return array;
    con.end();
}
const getProducto = async (id) => {
    
    sqllist = "select * from Producto where IdProducto=?";
    let row = await utliquery(sqllist,id);
    objecto = new Producto(row[0].IdProducto, row[0].ImgProducto);
    return objecto;
    con.end();
   
}
const updateProducto = async (producto) => {
    sqlupdate = "UPDATE Producto SET ImgProducto= ? WHERE IdProducto = ?;";
    values = [producto.imgproducto, producto.idproducto]
    let x = await con.query(sqlupdate, values);
    con.end();
}
async function insertProducto(producto) {
    sqlinsert = "insert into Producto values ?";
    values = [[null, producto.imgproducto]]
    let x = await con.query(sqlinsert, [values]);
    con.end();
};
async function deleteProducto(producto) {
    sqldelete = "delete from Producto where IdProducto = ?;";
    values = [producto.idproducto]
    let x = await con.query(sqldelete, values);
    con.end();

};

class Producto
{
    constructor(idproducto, imgproducto) {
        this.idproducto = idproducto;
        this.imgproducto = imgproducto;
       
    }
}
module.exports = { getProductos, insertProducto, getProducto, updateProducto,deleteProducto, Producto};
//var c = new Producto(3, "kneptunoh.jpg");
//updateProducto(c).then(data => {
//    console.log(data)
//})
//deleteProducto(c).then(data => {
//    console.log(data)
//})
//getProductos().then(data => {
//    console.log(data)
//})

//getProducto(3).then(data => {
//    console.log(data)
//})

