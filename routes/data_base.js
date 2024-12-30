var mysql = require( 'mysql' )

var conexion = mysql.createConnection( {
    host : 'localhost',
    user: 'root',
    password : '',
    database: 'base1'
} )

conexion.connect( function( error ) {
    if( error ){
        console.log( 'Error en la conexion con MYSQL' )
    } else{
        console.log( 'Conexion iniciada' )
    }
})

module.exports = conexion