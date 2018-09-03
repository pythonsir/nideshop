module.exports = class extends think.Model {

    async getlist(param){

        const name = param['name']|| '';
        const attribute_category_id = param['attribute_category_id'];
        const page = param['currentPage'];
        const size = param['pageSize'];

        let _where = {}

        if( name != ""){

            _where = {
                ..._where,
                't.name':['like', `%${name}%`]
            }
        }

        if( attribute_category_id != "" ){

            _where = {
                ..._where,
                't.attribute_category_id':attribute_category_id

            }

        }

        let result = await this.alias('t').join({
            table: 'attribute_category',
            as: 'p',
            on: ['attribute_category_id','id']
          }).where(_where).page(page,size).order(['t.id DESC']).countSelect({
            field:'t.id,t.name,p.`name` as attribute_category_name'
          })

          result.name = name;
          result.attribute_category_id = attribute_category_id;
        

        return result;


    }






}