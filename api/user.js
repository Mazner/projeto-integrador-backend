module.exports = app => {
    const save = (req, res) =>{
        res.send('user save acessed')
    }
    return {save} //retornando a função como objeto
}