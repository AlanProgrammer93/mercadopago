const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-2304054057155097-122902-c01f81c2b193315517ace74431b0fa14-694460707'
  });


app.post('/checkout', (req, res) => {
    // Crea un objeto de preferencia
    let preference = {
        items: [
        {
            title: req.body.title,
            unit_price: parseInt(req.body.price),
            quantity: 1,
        }
        ]
    };
    
    mercadopago.preferences.create(preference)
    .then(function(response){
    
        console.log(response.body);
        res.redirect(response.body.init_point);
        
    }).catch(function(error){
        console.log(error);
    });
});

app.listen(3000, () => {
    console.log('Server on port 3000');
});
