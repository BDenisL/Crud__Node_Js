var express = require( 'express' )
var router = express.Router()

var db = require( './data_base' )


// Create Table Objects
router.get( '/create', function( request, response ) {
    db.query( 'drop table if exists objects', function( error, result ) {
        if( error )
            console.log( error, ' at... create data base - drop if exists table' )
            return
    } )
    db.query( 'create table objects (' +
              'code int primary key auto_increment,' +
              'name varchar(20), ' +
              'description varchar(50)' +
              ')', function( error, result ) {
                if( error )
                    console.log( error, ' at... create data base - create table objects' )
              } )
    response.render( 'messageObjects', { message: 'table objects created.' } )
} )


// Add items to table Objects
router.get( '/add', function( require, response ,next ) {
    response.render( 'addToObjects' )
} )

router.post( '/add', function( request, response, next ) {
    const record = {
        name: request.body.name,
        description: request.body.description
    }
    db.query( 'insert into objects set ?', record, 
        function( error, result ) {
            if( error )
                console.log( error, ' at ... Add items to table Objetcs' )
        })
    response.render( 'messageObjects', { message: 'Item added to Objects.' } )
} )


// List table
router.get( '/list', function( request, response, next ) {
    db.query( 'select * from objects', 
        function( error, filas ) {
            if( error ){
                console.log( error, ' at... listing all items in objects' )
                return
            }
        response.render( 'listObjects', { object: filas } )
        } )
} )

// Request 
router.get( '/request', function( request, response, next ) {
    response.render( 'requestForObjects' )
} )

router.post( '/request', function( request, response, next ) {
    db.query( 'select * from objects where code=?', request.body.code,
        function( error, filas ){
            if( error ){
                console.log( 'Error in Request' )
                return
            }
            if( filas.length > 0 ) {
                response.render( 'requestList',{ object: filas } )
            } else {
                response.render( 'messageObjects', { message: 'Theres no item with that code' } )
            }
        } )
} )


// Modify
router.get( '/modify', function( request, response, next ) {
    response.render( 'requestModification' )
} )

router.post( '/modify', function( request, response, next ) {
    db.query( 'select * from objects where code=?', request.body.code,
        function( error, filas ) {
            if( error ) {
                console.log( error, ' at... modify in .post' )
                return
            }
            if( filas.length > 0 ) {
                response.render( 'formModify', { object: filas } )
            } else {
                response.render( 'messageObjects', { message: 'Theres no item with that code' } )
            }
        } )
} )


// Confirm Modification
router.post( '/confirmModification', function( request, response, next ) {
    const record = {
        name: request.body.name,
        description: request.body.description
    }
    db.query( 'update objects set ? where ?', [ record, { code: request.body.code } ],
        function( error, filas ){
            if( error ){
                console.log( error, ' at... confirmModification' )
                return
            }
            response.render( 'messageObjects', { message: 'Item modificated succesfully.' } )
        } )
} )

module.exports = router