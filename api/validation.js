module.exports = app => {
//função que vê se existe algo, caso não exista, retorna um erro
    function existsOrError(value, message){
        if(!value) throw message
        if(Array.isArray(value) && value.length === 0) throw message
        if(typeof value === 'string' && !value.trim()) throw message

    }

//função que vê se não existe algo, caso exista, retorna um erro
    function notExistsOrError(value, message){
        try{
            existsOrError(value,message)
        } catch (message){
            return
        }
        throw message
    }

//função que vê se são iguais, caso diferentes, retorna erro
    function equalsOrError (valueB,valueA,message){
        if(valueA !== valueB) throw message
    }

    return {existsOrError, notExistsOrError, equalsOrError}
}