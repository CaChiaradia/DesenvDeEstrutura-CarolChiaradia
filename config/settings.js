const env = process.env.NODE_ENV || "dev";

const config = () => {
    switch (env) {
        case "dev":
            return{
                dbpath:
                "mongodb+srv://carol:123456@conclusaodecurso.vqna6.mongodb.net/ConclusaoDeCurso?retryWrites=true&w=majority",
            jwt_key: "Navegação",
            jwt_expires: '1d'
            };
        case "prod":
            return{
                dbpath:
                "mongodb+srv://carol:123456@conclusaodecurso.vqna6.mongodb.net/ConclusaoDeCurso?retryWrites=true&w=majority",
                jwt_key: "Navegação",
                jwt_expires: '1d'

            };
    };
};

module.exports = config();