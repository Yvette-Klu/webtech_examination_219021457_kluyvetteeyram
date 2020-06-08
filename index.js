const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/goodhealthDb', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(results => { console.log('Database connected  ..') })
	.catch(error => { console.log(`❌ Sorry ${error.message} ...`) });



app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const schema = mongoose.Schema;

const PatientSchema = new schema({
	fname: {
		type: String,


	},
	lname: {
		type: String,

	},
	dateofbirth: {
		type: Date,

	}, contact: {
		type: Number,

	},
	address: {
		type: String,

	},
	emergency: {
		type: String,

	},

});
const Patient = mongoose.model('Patient', PatientSchema)





const PaymentSchema = new schema({
	name: {
		type: String,


	},
	dateofpayment: {
		type: Date,

	},
	amountpaid: {
		type: Number,

	}, balance: {
		type: Number,

	},
	totalpayment: {
		type: Number,

	},


});
const Payment = mongoose.model('Payment', PaymentSchema)



app.post('/upload', (req, res) => {
	const data = {
		name: req.body.fname,
		lname: req.body.lname,
		dateofbirth: req.body.dateofbirth,
		contact: req.body.contact,
		address: req.body.address,
		emmergency: req.body.emergency,
	}
	//  return  console.log(data)
	Patient.create(data).then(result => {
		if (result) {
			return res.redirect('/payment')
		}
	}).catch(error => {
		console.log(error.message)
	});

});


app.post('/reload', (req, res) => {
	const data = {
		name: req.body.name,
		date: req.body.dateofpayment,
		balance: req.body.balance,
		totalpayment: req.body.totalpayment,

	}
	//  return  console.log(data)
	Payment.create(data).then(result => {
		if (result) {
			return res.redirect('/')
		}
	}).catch(error => {
		console.log(error.message)
	});

});


app.get('/views',(req,res)=>{
	Patient.find({}).then(patients=>{
		console.log(patients)
		res.render('views',{
			patients
		})
	}).catch(error =>{
		console.log(error.message)
	})

})

app.get('/produce',(req,res)=>{
	Patient.find({}).then(payments=>{
		res.render('produce',{
			payments
		})
	}).catch(error =>{
		console.log(error.message)
	})

})





app.get('/patient', (req, res ) => {
	res.render('patient')
});

app.get('/payment', (req, res ) => {
	res.render('payment')
});
app.get('/', (req, res ) => {
	res.render('home')
	// res.redirect('/patients')
});
app.get('/views', (req,res)=>{
	res.render('views')
})
app.get('/produce',(req,res)=>{
	res.render('produce')
})



app.use('/material', require('./routes/app'));









const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
