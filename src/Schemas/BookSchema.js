export default class BookSchema{
    static schema = {
        name:'Book',
        primaryKey: '_id',
        properties:{
            _id:{type:'int', indexed:true},
            nome:'string',
            preco:'string',
        }
    }
}