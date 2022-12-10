const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;


exports.checkAuth = (request, response, next) => {

    const authHeader = request.get('authorization');
    if (!authHeader) {
        return response.status(401).send({
            message: 'Não autorizado!',
            statusCode: 401
        });
    }

    const token = authHeader.split(' ')[1];
    console.log("tokenzinhooo", token)

    if (!token) {
        return response.status(401).send({
            message: "erro no token ok?"
        })
    }

    try {
        jwt.verify(token, SECRET, (err) => {
            if (err) {
                return response.status(401).send({
                    message: "Nao autorizada!"
                })
            }
            next();
        })
    } catch (err) {
        console.error(err)
    }
}