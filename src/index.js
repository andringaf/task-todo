const express = require("express")
const db = require("../db/db")
const bodyParser =  require("body-parser")

const PORT = 8080

//Setup express app

const app = express()

// Parse incoming req data

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended :false
}))


app.get('/api/hello', (req,res) => {
	res.status(200).send({
		succes: true,
		message: "hello"
	})
})

app.get('/api/todos',(req, res) => {
	res.status(200).send({
		succes: true,
		message: "todos loaded",
		data: db
	})
})

app.post('/api/todos',(req, res) => {
	//validation
	if (!req.body.title) {
		return res.status(400).send({
			succes : false,
			message : 'title kosong',
		})
	}else if(!req.body.description){
		return res.status(400).send({
			succes : false, 
			message : 'des kosong', 
		})
	}

	const todo = {
		id : db[db.length - 1].id + 1,
		title : req.body.title,
		description : req.body.description
	}
	db.push(todo)
	return res.status(202).send({
		succes : true,
		message : 'success added todo',
		data: todo
	})
})


app.get('/api/todos/:id', (req,res) => {
	const id = parseInt(req.params.id)
	db.map((todo) =>{
		if(todo.id === id){
			return res.status(200).send({
				succes : true,
				message : 'ketemu',
				data : todo
			})
		}
	})
	return res.status(400).send({
			succes : false,
			message : 'kosong',
	})

})


app.delete('/api/todos/:id', (req,res) =>{
	const id = parseInt(req.params.id)
	db.map((todo, index) =>{
		if(todo.id === id){
			db.splice(index,1)
			return res.status(200).send({
				succes : true,
				message : 'deleted',
				data : todo
			})
		}
	})
	return res.status(400).send({
			succes : false,
			message : 'kosong',
	})
})

app.put('/api/todos/:id', (req,res) => {
	const id = parseInt(req.params.id)
	db.map((todo,index) =>{
		if(todo.id === id){
			db[index].status = true;
			return res.status(200).send({
				succes : true,
				message : 'di rubah',
				data : todo
			})
		}
	})
	return res.status(400).send({
			succes : false,
			message : 'kosong',
	})

})



app.listen(PORT, () => {
	console.log(`server is running on ${PORT}`)
})




















